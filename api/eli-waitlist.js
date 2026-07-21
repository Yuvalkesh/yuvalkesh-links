const SHEET_ID =
  process.env.GOOGLE_SHEET_ID ||
  '1hKBO3fnwv-hvWezPYra2ePprs8zNUXMix75AVpqYSx0';
const SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:H';
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const TELEGRAM_BOT_TOKEN = process.env.LEAD_ALERT_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.LEAD_ALERT_TELEGRAM_CHAT_ID;

function send(response, status, body) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.status(status).send(JSON.stringify(body));
}

function clean(value, max = 500) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, max);
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken() {
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Google Sheets service account is not configured');
  }

  const crypto = await import('node:crypto');
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claims = {
    iss: SERVICE_ACCOUNT_EMAIL,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(claims),
  )}`;
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(unsigned)
    .sign(PRIVATE_KEY);
  const assertion = `${unsigned}.${base64url(signature)}`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Google OAuth failed with status ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    throw new Error('Google OAuth returned no access token');
  }
  return tokenData.access_token;
}

async function appendToGoogleSheet(values) {
  const accessToken = await getAccessToken();
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
      SHEET_RANGE,
    )}:append`,
  );
  url.searchParams.set('valueInputOption', 'USER_ENTERED');
  url.searchParams.set('insertDataOption', 'INSERT_ROWS');
  url.searchParams.set('includeValuesInResponse', 'false');

  const sheetsResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [values] }),
  });

  if (!sheetsResponse.ok) {
    throw new Error(`Google Sheets append failed with status ${sheetsResponse.status}`);
  }

  const result = await sheetsResponse.json();
  if (result.updates?.updatedRows !== 1 || !result.updates?.updatedRange) {
    throw new Error('Google Sheets did not confirm exactly one appended row');
  }
  return result.updates;
}

async function sendTelegramNotice(payload) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  const text = [
    'ליד חדש מהאתר של אלי ורד חזן (נשמר ב-Google Sheets)',
    `שם: ${payload.name || 'לא צוין'}`,
    `אימייל: ${payload.email}`,
    `עניין: ${payload.interest || 'לא צוין'}`,
    `מקור: ${payload.source}`,
    `זמן: ${payload.timestamp}`,
  ].join('\n');

  const telegramResponse = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    },
  );

  if (!telegramResponse.ok) {
    console.error(`Telegram notification failed with status ${telegramResponse.status}`);
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return send(response, 405, { ok: false, error: 'Method not allowed' });
  }

  let body;
  try {
    body =
      typeof request.body === 'string'
        ? JSON.parse(request.body || '{}')
        : request.body || {};
  } catch {
    return send(response, 400, { ok: false, error: 'Invalid JSON body' });
  }

  const email = clean(body.email, 180).toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(response, 400, {
      ok: false,
      error: 'Valid email is required',
    });
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name: clean(body.name, 120),
    email,
    role: clean(body.role, 180),
    country: clean(body.country, 120),
    interest: clean(body.interest, 500),
    source: clean(body.source || 'eli-vered-hazan-landing', 180),
    userAgent: clean(request.headers['user-agent'], 300),
  };

  const row = [
    payload.timestamp,
    payload.name,
    payload.email,
    payload.role,
    payload.country,
    payload.interest,
    payload.source,
    payload.userAgent,
  ];

  try {
    const updates = await appendToGoogleSheet(row);
    await sendTelegramNotice(payload).catch((error) => console.error(error));
    return send(response, 200, {
      ok: true,
      mode: 'google-sheets',
      updatedRange: updates.updatedRange,
    });
  } catch (error) {
    console.error(error);
    return send(response, 500, {
      ok: false,
      error: 'Could not save registration',
    });
  }
}
