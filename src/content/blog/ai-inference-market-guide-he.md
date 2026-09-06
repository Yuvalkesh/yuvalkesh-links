---
title: "שוק ה AI Inference: מדריך ומפת הזדמנויות ליזם ישראלי (ספטמבר 2026)"
description: "מה קורה אחרי שהמודל אומן, איפה הכסף, מי בונה את התשתית, ולמה ההזדמנות למייסד לא טכנולוגי היא שכבת הבקרה ולא השבב. עשר שכבות, כלכלה, שחקנים, תוכנית 12 חודשים."
pubDate: 2026-09-06
lang: he
tags: ["AI Inference", "תשתיות AI", "סוכני קול", "כלכלת טוקנים", "יזמות", "מפת שוק"]
translationOf: ai-inference-market-guide
faq:
  - q: "מה ההבדל בין Training ל Inference?"
    a: "Training הוא שלב הלימוד: המודל לומד משקולות מתוך דאטה, פעם אחת או כמה פעמים, בפרויקט גדול. Inference הוא שלב ההפעלה החוזרת: המודל שכבר למד מקבל שאלה ומייצר תשובה, לפעמים מיליארדי פעמים. Training הוא פרויקט, Inference הוא הוצאה תפעולית חוזרת."
  - q: "האם Fine-tuning נחשב Inference?"
    a: "לא. Fine-tuning משנה את משקולות המודל ולכן הוא Training נוסף, גם אם קטן. RAG, Prompt engineering ו Caching לעומת זאת עובדים בזמן Inference ולא נוגעים במשקולות."
  - q: "מתי משתלם לעבור מ API לשרתים משלי (Self-host)?"
    a: "רק כשאפשר להוכיח בחשבון אמיתי שה workload יציב, שהוצאות ה Inference מהותיות, ושהמעבר יחסוך לפחות 30 עד 40 אחוז all-in אחרי עלות צוות וסיכון. חיסכון קטן יותר נעלם בתקלה הראשונה או ב migration הראשון."
  - q: "למה אין מספר אחד לגודל שוק ה Inference?"
    a: "כי כל אנליסט מגדיר את השוק אחרת: שבבים, ענני GPU, מכירת טוקנים, תוכנה, מכשירי קצה או אפילו אפליקציות. המספרים לא ברי השוואה. ליזם עדיף לחשב Bottom-up: מספר לקוחות יעד כפול נפח כפול מחיר ל workflow."
  - q: "מה ההזדמנות הכי טובה למייסד ישראלי שאינו מהנדס תשתיות?"
    a: "שכבת Inference Assurance אנכית: מדידה, ניתוב, בקרת איכות, פרטיות ועלות עבור workflow שבו כשל עולה כסף. הזווית הישראלית החזקה ביותר היא סוכני קול בעברית וערבית במוקדי שירות, בריאות פרטית, ביטוח, פיננסים ולוגיסטיקה. מתחילים כשירות בתשלום, ממשיכים כתוכנה."
---

תמונת מצב: 6 בספטמבר 2026.

המדריך הזה נכתב עבור מייסד או מנהל שלא מגיע מעולם התשתיות ורוצה להבין את שוק ה AI Inference, לבחור זווית כניסה ולהגיע לפיילוט ראשון. הוא מכסה Inference למודלי שפה, קול, תמונה, וידאו ומודלים קלאסיים, בענן, בדאטה סנטר ובקצה (edge).

מספרים והערכות ספקים מסומנים בגוף הטקסט. כשאני כותב "טענת ספק", זה בדיוק מה שזה: מספר שהחברה פרסמה על עצמה, לא השוואה עצמאית.

> **שורה תחתונה.** Inference הוא שלב ההפעלה החוזרת של מודל מאומן. זה המקום שבו מוצר AI פוגש משתמש, SLA וחשבון ענן. השוק גדול וצומח, אבל שכבות החומרה וה serving הגנריות כבר מאוכלסות על ידי ענקיות וחברות עתירות הון. ליזם לא טכנולוגי עדיף לא לבנות שבב, ענן GPU או עוד מנוע Inference. הכניסה המומלצת היא שכבת Inference Assurance אנכית: מדידה, ניתוב, בקרת איכות, פרטיות ועלות עבור use case שבו latency וכשל עולים כסף. הזווית הישראלית החזקה ביותר: סוכני קול בעברית וערבית בשווקים מפוקחים. תחילה כשירות, בהמשך כתוכנה.

## 1. תקציר מנהלים

### מה זה Inference

אם Training הוא לימוד תלמיד על מיליארדי דוגמאות, Inference הוא הרגע שבו התלמיד שכבר למד מקבל שאלה ומייצר תשובה.

במודל שפה גדול (LLM) המודל מקבל טוקנים (חתיכות טקסט), מפעיל שוב ושוב את המשקולות שנלמדו, ומנבא את הטוקן הבא. אין כאן למידה מחדש בכל שאלה. בדרך כלל המשקולות נשארות קבועות.

### למה זו קטגוריה עסקית חשובה

1. **Training הוא פרויקט. Inference הוא הוצאה תפעולית חוזרת.** מודל מאומן פעם אחת ונקרא מיליארדי פעמים.
2. **סוכנים ומודלי reasoning מגדילים את העבודה לכל משימה.** בקשה עסקית אחת עשויה להפעיל כמה מודלים, חיפושים, כלים וניסיונות חוזרים.
3. **הלקוח מודד מוצר, לא FLOPS.** מה שמעניין אותו הוא זמן תגובה, איכות, זמינות, פרטיות ועלות לפעולה מוצלחת.
4. **המחיר ליחידת יכולת יורד מהר, אבל הצריכה גדלה מהר יותר.** Stanford AI Index 2025 מצא ירידה של יותר מפי 280 בעלות מודל ברמת GPT‑3.5 בין נובמבר 2022 לאוקטובר 2024. במקביל, מודלים חזקים יותר ו agent loops צורכים הרבה יותר Inference [S1].
5. **חשמל וזמינות תשתית הופכים לצוואר בקבוק.** IEA העריכה שדאטה סנטרים צרכו כ415 TWh ב2024, ושבתרחיש הבסיס יגיעו לכ945 TWh ב2030. צריכת שרתים מואצים צפויה לצמוח בכ30 אחוז בשנה [S2].

### איפה נוצר הערך

- **חומרה ומערכות:** ביצועים לוואט, HBM, קישוריות, קירור וזמינות.
- **מנועי serving:** batching, ניהול KV cache, quantization, speculative decoding ו prefill/decode disaggregation.
- **ענני Inference:** מכירת טוקנים דרך API או capacity ייעודי עם SLA.
- **Control plane:** routing בין מודלים וספקים, observability, אבטחה, governance ו FinOps.
- **שכבות אנכיות:** הבטחת תוצאה עסקית בענף או ב workflow מסוים.

### ההמלצה המעשית

לבנות מוצר התחלתי לבקרת Inference עבור סוכני קול בעברית וערבית במוקדי שירות, בריאות פרטית, ביטוח, פיננסים או לוגיסטיקה:

- מדידת latency מקצה לקצה, שיעור קטיעות, השלמת משימה וטעויות קריטיות.
- בדיקות regression אוטומטיות על מבטאים, רעש, שמות ומונחים מקומיים.
- ניתוב בין מודלים וספקים לפי איכות, מחיר, זמינות ומדיניות נתונים.
- redaction של מידע אישי, audit trail ו human handoff.
- מחיר לפי "שיחה שנבדקה" או "פעולה מוצלחת", לא לפי GPU.

ככה מתחילים בלי לבנות תשתית עמוקה, מגיעים להכנסות משירות תוך 60 עד 90 יום, ואוספים דאטה שמייצר moat.

## 2. Inference לעומת Training, בלי ז'רגון מיותר

| נושא | Training | Inference |
|---|---|---|
| מטרה | ללמוד משקולות מתוך דאטה | להשתמש במשקולות כדי להפיק תחזית או תוכן |
| תדירות | מחזורי אימון גדולים, יחסית נדירים | כל בקשת משתמש, לעיתים מיליארדי פעמים |
| אופי העומס | throughput גבוה ומתוכנן מראש | תעבורה משתנה, לעיתים real-time |
| סובלנות לזמן | שעות עד חודשים | מילישניות עד שניות. batch יכול להמתין |
| מדד מרכזי | זמן ועלות להשלמת אימון, איכות המודל | latency, throughput, איכות, זמינות ועלות לתוצאה |
| ניהול משאבים | cluster גדול ורציף | autoscaling, תורים, batching, caches ו SLA |
| כשל טיפוסי | run נופל או לא מתכנס | משתמש ממתין, תשובה שגויה, timeout או חשבון חריג |

### Fine-tuning אינו Inference

Fine-tuning משנה את משקולות המודל ולכן הוא Training נוסף, גם אם קטן. לעומת זאת:

- **RAG** מוסיף מידע לפרומפט בזמן Inference ואינו משנה משקולות.
- **Prompt engineering** משנה הוראות וקונטקסט בלבד.
- **Prompt/KV caching** שומר עבודה חישובית קודמת לשימוש חוזר.
- **Quantization** ממירה בדרך כלל משקולות לדיוק נמוך יותר כדי לחסוך זיכרון וחישוב. לעיתים נדרש calibration או fine-tuning קטן.

### שתי פאזות חשובות ב LLM Inference

1. **Prefill:** עיבוד כל הקלט ובניית KV cache. לרוב compute-bound, ומשפיע על TTFT (Time To First Token).
2. **Decode:** יצירת טוקן אחד בכל צעד. לרוב memory-bandwidth-bound, ומשפיע על ITL (Inter-Token Latency) ועל tokens/sec.

ההבדל הזה מסביר למה מערכות מתקדמות מפרידות בין הפאזות. NVIDIA Dynamo, שהוכרז ב GTC 2025, כולל disaggregated prefill/decode, routing מודע ל KV cache, תכנון משאבים ו offload של cache לזיכרון ואחסון זולים יותר [S3]. המספר "עד פי 30" ש NVIDIA מציגה הוא benchmark של הספק בתצורה מסוימת, לא הבטחה כללית.

### למה reasoning וסוכנים משנים את הכלכלה

מודל reasoning עשוי לייצר הרבה "טוקני חשיבה" לפני התשובה. סוכן עשוי לקרוא למודל שוב ושוב, להשתמש בכלים, להיכשל ולנסות מחדש. לכן יחידת המדידה הנכונה היא לא רק "מחיר למיליון טוקנים", אלא:

- עלות לפעולה עסקית מוצלחת.
- זמן עד השלמת המשימה.
- אחוז המשימות שדורשות אדם.
- שיעור retries.
- עלות כשל, hallucination או נטישה.

## 3. ה Inference Stack המלא: מפעל טוקנים בעשר שכבות

אפשר לחשוב על הסטאק כעל מפעל טוקנים בן עשר שכבות. בעיה בכל שכבה מופיעה ללקוח כתגובה איטית, יקרה או לא נכונה.

### שכבה 1: המודל והארכיטקטורה

- Dense מול Mixture-of-Experts (MoE).
- מספר פרמטרים פעילים, context window, ומודל טקסט, קול, תמונה או וידאו.
- closed API מול open weights.
- איכות בסיסית, רישיון, שפות ויכולת tool use.

**החלטה עסקית:** לבחור את המודל הקטן והזול ביותר שעובר eval אמיתי, לא את המודל עם הדירוג הכללי הגבוה ביותר.

### שכבה 2: פורמט ו optimization של המודל

- quantization: FP8, FP4, INT8, INT4 וכדומה.
- pruning ו distillation.
- compilation ו kernel fusion.
- adapters ו LoRA.
- speculative decoding: מודל קטן מציע טוקנים ומודל גדול מאמת.

**Trade-off:** פחות זיכרון ועלות, מול סיכון לירידת איכות. במיוחד במספרים, בשפות קטנות וב long context.

### שכבה 3: חומרת compute

- **GPU:** NVIDIA היא ה incumbent המרכזית. AMD Instinct היא חלופה משמעותית. MI350, לדוגמה, מוצג עם 288GB HBM3E ו 8TB/s bandwidth [S4].
- **ASIC/TPU:** Google TPU, AWS Inferentia, Groq LPU, Cerebras wafer-scale ועוד.
- **CPU/NPU/edge:** מכשירים, מחשבים אישיים, טלפונים ומצלמות.

Inference אינו "רק כוח חישוב". ב decode, רוחב פס לזיכרון, קיבולת HBM ותנועת נתונים יכולים להיות חשובים יותר מ peak FLOPS.

### שכבה 4: זיכרון, רשת ואחסון

- HBM מחזיק משקולות ו KV cache.
- NVLink, InfiniBand, Ethernet ו ICI מחברים מאיצים.
- CPU RAM, SSD ו object storage משמשים ל offload.
- קירור וחשמל מגבילים צפיפות.

Google הציגה ב2025 את Ironwood, TPU דור 7 שמיועד במיוחד ל Inference, עם 192GB HBM לשבב, 7.37TB/s bandwidth ותצורות של 256 או 9,216 שבבים. אלה נתוני ספק [S5].

### שכבה 5: runtime ו serving engine

- **vLLM:** PagedAttention, continuous batching ו API תואם OpenAI [S6].
- **SGLang:** RadixAttention ו prefix caching, speculative decoding, disaggregation, parallelism ו quantization [S7].
- **NVIDIA TensorRT‑LLM, Triton, NIM ו Dynamo:** אופטימיזציה ו serving על NVIDIA. Triton תומך גם במספר frameworks ו backends [S8].
- **llama.cpp:** Inference מקומי ו edge ב C/C++ עם quantization ותמיכה רחבה בחומרה [S9].
- **ONNX Runtime:** runtime חוצה פלטפורמות ל CPU, GPU, NPU, ענן, web ומובייל [S10].

זו שכבה טכנית, תחרותית ומהירה. קשה לסטארטאפ חדש לבנות moat רק מ"עוד wrapper ל vLLM".

### שכבה 6: orchestration ו scheduling

- autoscaling ו cold starts.
- admission control ותורים.
- dynamic/continuous batching.
- routing מודע ל cache ול SLO.
- multi-tenancy ובידוד.
- capacity planning ו failover בין אזורים וספקים.

GPU utilization לבדו אינו KPI מספיק. ה cluster יכול להיראות "עסוק" בזמן שהתור גדל וה TTFT נשבר.

### שכבה 7: API ו Inference Cloud

שלושה מודלים מרכזיים:

1. **Serverless / pay-per-token:** מהיר להתחלה, אין התחייבות, פחות שליטה.
2. **Dedicated endpoint / provisioned throughput:** capacity שמורה, latency צפוי יותר, התחייבות גבוהה יותר.
3. **Self-hosted / on-prem:** שליטה ופרטיות, אבל צוות ו utilization הופכים לאחריות הלקוח.

Incumbents: OpenAI, Anthropic, Google Vertex AI, AWS Bedrock ו SageMaker, Microsoft Azure AI.

מומחי Inference ומודלים פתוחים: Together AI, Fireworks AI, Baseten, GroqCloud, Cerebras Inference, Modal, Replicate, fal, Hugging Face endpoints ואחרים.

### שכבה 8: gateway, routing ו FinOps

- abstraction אחיד מעל ספקים.
- fallback ו circuit breakers.
- routing לפי איכות, עלות, latency ו region.
- rate limits, budgets ו chargeback.
- semantic/prompt caching.
- A/B tests ו shadow traffic.

זו שכבה אטרקטיבית אבל צפופה. מוצר גנרי בלי דאטה ייחודי עלול להיבלע בענן, ב gateway או ב observability suite.

### שכבה 9: evaluation, observability, security ו governance

- traces של כל tool call וטוקן.
- evals offline ו online.
- guardrails, PII redaction ו prompt-injection defense.
- drift ו regression בין גרסאות מודל.
- audit, retention, data residency ו human oversight.

ה EU AI Act כבר מפעיל חובות GPAI מאוגוסט 2025, כללי transparency מאוגוסט 2026, ומסגרת מבוססת סיכון שמחמירה ב high-risk use cases [S11]. עבור חברה ישראלית שמוכרת לאירופה, compliance אינו "תוספת אחר כך".

### שכבה 10: המוצר וה workflow העסקי

כאן נקבעת התוצאה. האם התביעה סווגה נכון? האם השיחה הסתיימה בקביעת תור? האם מסמך רפואי סוכם בלי שגיאה קריטית?

זו השכבה שבה ליזם דומייני יש יתרון על מהנדס תשתית טהור.

## 4. כלכלת Inference

### 4.1 מדדים שחייבים למדוד

- **TTFT:** זמן עד הטוקן הראשון.
- **ITL / TPOT:** הזמן בין טוקנים.
- **Output tokens/sec:** מהירות הזרמה למשתמש יחיד.
- **Throughput כולל:** טוקנים או בקשות לשנייה לכל המכונה או ה cluster.
- **P50 / P95 / P99 latency:** הממוצע מסתיר זנבות גרועים.
- **Goodput:** throughput שעומד גם ב SLO וגם באיכות.
- **Utilization:** לא רק GPU busy. גם HBM, bandwidth, queue ו cache hit rate.
- **Cost per successful task:** ה KPI הניהולי המרכזי.
- **Availability, error rate, retry rate.**

MLCommons מדגישה ש benchmark תקין צריך להפריד תרחישים ומדדים, להבדיל בין מערכות זמינות ל preview, ולמדוד power של המערכת המלאה ולא רק TDP של שבב [S12].

### 4.2 נוסחאות פשוטות

**API:**

```
עלות = (טוקני קלט × מחיר קלט) + (טוקני פלט × מחיר פלט) + כלים / אחסון / רשת
```

**Self-host:**

```
עלות אפקטיבית למיליון טוקנים שימושיים ≈ (GPU-hours + CPU/RAM + רשת + תפעול + רזרבה) / טוקנים
```

או, בקירוב:

```
$ למיליון output tokens = מחיר מכונה לשעה ÷ (aggregate tokens/sec × 3,600 × utilization) × 1,000,000
```

הטעות הנפוצה היא להשתמש ב peak throughput וב utilization של 100 אחוז. במוצר אמיתי יש שיאים, idle, warm replicas, failures ו headroom ל SLA.

### 4.3 דוגמה מספרית ל API: מחירים חיים, לא הבטחת עתיד

נכון ל 6.9.2026, Anthropic מציגה ל Claude Sonnet 5 מחיר סטנדרטי של $2 למיליון input tokens ו $10 למיליון output tokens. cache read הוא $0.20 למיליון [S13].

משימה עם 4,000 טוקני קלט ו 1,000 טוקני פלט:

- קלט: 4,000 / 1,000,000 × $2 = $0.008
- פלט: 1,000 / 1,000,000 × $10 = $0.010
- סה"כ: $0.018 למשימה, לפני כלים ותעבורה
- מיליון משימות דומות: $18,000

אם 3,200 מתוך 4,000 טוקני הקלט חוזרים ונקראים מ cache:

- cache: $0.00064
- קלט חדש: $0.0016
- פלט: $0.010
- סה"כ: $0.01224. חיסכון של כ32 אחוז בדוגמה הזאת.

Batch API של Anthropic ושל OpenAI מציע 50 אחוז הנחה לעומסים אסינכרוניים. AWS Bedrock מציגה גם היא 50 אחוז הנחה ל batch במודלים נבחרים [S14][S15][S16].

**הלקח:** עיצוב ה workload, כלומר cache, batch, קיצור context, output caps ורמת reasoning, יכול לחסוך יותר ממשא ומתן קטן על מחיר הטוקן.

### 4.4 טווחי self-host: אומדן המחשה בלבד

הטבלה אינה quote מספק ואינה benchmark. היא מראה עד כמה utilization משנה כלכלה.

| תרחיש היפותטי | עלות compute | throughput כולל | utilization שימושי | עלות compute למיליון output tokens |
|---|---|---|---|---|
| GPU יחיד, tuning בינוני | $3 לשעה | 250 tok/s | 55% | כ $6.06 |
| GPU יחיד, workload מותאם היטב | $3 לשעה | 1,000 tok/s | 75% | כ $1.11 |
| 8 GPUs למודל גדול | $24 לשעה | 1,500 tok/s | 70% | כ $6.35 |

יש להוסיף בדרך כלל 20 עד 50 אחוז עבור CPU/RAM, storage, network, orchestration, idle reserve, engineering ותמיכה. לעיתים יותר. מצד שני, חוזה capacity או חומרה יעילה יכולים להוריד את המחיר.

**מסקנה:** self-host אינו אוטומטית זול. הוא מנצח כשיש נפח יציב וגבוה, מודל מתאים, צוות טוב ויכולת להשיג utilization. API מנצח בנפח קטן או קופצני, ב time-to-market וב frontier model access.

### 4.5 Break-even נכון

אל תשאלו "מתי GPU זול יותר מטוקנים?". שאלו:

1. מהו ה quality floor שלנו?
2. כמה input, output, reasoning ו tool calls יש למשימה?
3. מה ה P95 traffic ומה ה headroom שנדרש?
4. כמה עולה downtime או תשובה גרועה?
5. מה עלות צוות platform / ML infra?
6. האם צריך data residency, isolation או custom weights?
7. כמה מהר מודל או חומרה מתיישנים?

**כלל אצבע:** להישאר ב API עד שניתן להוכיח בחשבון אמיתי שה workload יציב, שהוצאות ה Inference מהותיות, וש dedicated או self-host יחסוך לפחות 30 עד 40 אחוז all-in אחרי צוות וסיכון. חיסכון קטן יותר נעלם מהר בתקלה או ב migration.

### 4.6 מחירים יורדים, אבל אין קומודיטיזציה מלאה

Stanford מציגה ירידה היסטורית חדה בעלות להשגת רמת ביצועים קבועה [S1]. במקביל, Artificial Analysis מציגה בזמן אמת פערים גדולים בין מודלים וספקים במחיר, intelligence, TTFT ומהירות פלט [S17]. המשמעות:

- "טוקן" אינו commodity אחיד. איכות, tokenizer, reasoning ו SLA שונים.
- המרווח בשירות raw inference נתון ללחץ.
- הערך עובר ל proprietary demand, workload optimization, reliability, data/compliance ו outcomes.

## 5. מפת השחקנים והקטגוריות

זו מפה מייצגת, לא רשימה מלאה. סטטוסים ומוצרים אומתו מול מקורות חיים ביום הדוח. טענות ביצועים של חברות מסומנות כטענות ספק ואינן השוואה עצמאית.

| קטגוריה | Incumbents / שחקנים מרכזיים | Startups / challengers מייצגים | מה הם מוכרים |
|---|---|---|---|
| GPUs ומאיצים | NVIDIA, AMD, Intel | Groq, Cerebras, d‑Matrix, Etched ועוד | latency, throughput, perf/watt |
| ASIC של hyperscaler | Google TPU, AWS Inferentia/Trainium, Microsoft Maia | | כלכלה משולבת לענן שלהם |
| שרתים, רשת, קירור | NVIDIA systems, Dell, HPE, Supermicro, Broadcom, Arista | Astera Labs ואחרים | cluster שלם ולא שבב בודד |
| Serving engines | NVIDIA TensorRT‑LLM/Triton/Dynamo, ONNX Runtime | vLLM, SGLang, llama.cpp, KServe ecosystem | ניצול חומרה, batching, cache, APIs |
| Hyperscaler model platforms | AWS Bedrock/SageMaker, Azure AI, Google Vertex AI | | קטלוג מודלים, governance, enterprise procurement |
| Frontier closed APIs | OpenAI, Anthropic, Google, xAI ואחרים | | intelligence מוביל כשירות |
| Open-model inference clouds | | Together AI, Fireworks AI, Baseten, GroqCloud, Cerebras Inference, Anyscale | serverless/dedicated inference ו fine-tuning |
| Serverless compute / media | cloud providers | Modal, Replicate, fal ואחרים | bursty GPU workloads, image/video/audio |
| Gateways / routing | יכולות מובנות בעננים | Portkey, LiteLLM ecosystem ואחרים | multi-provider routing, policy, budgets |
| Evals / observability | Datadog, New Relic מוסיפים AI | Arize/Phoenix, Braintrust, Langfuse, Helicone, W&B Weave | traces, regression, איכות, cost |
| Edge / on-device | Apple, Qualcomm, NVIDIA Jetson, Intel | Hailo ואחרים | privacy, offline, latency נמוך |
| Sovereign / on-prem | clouds, OEMs, NVIDIA NIM | integrators ו infra startups | שליטה בנתונים ובתשתית |

### חברות שכדאי להבין

**NVIDIA.** לא רק GPU: CUDA, TensorRT‑LLM, Triton, NIM, Dynamo, NVLink ו networking ומערכות rack-scale. היתרון הוא stack משולב ואקוסיסטם. הסיכון לסטארטאפ: NVIDIA יכולה להפוך feature תשתיתי למוצר bundled.

**AMD.** מתחרה באמצעות Instinct ו ROCm, זיכרון גדול ו ecosystem משתפר. הזדמנות לחברות תוכנה: portability ו optimization חוצה NVIDIA/AMD. אבל רק אם יש workload אמיתי, לא הבטחה תאורטית [S4].

**Google ו AWS.** Google בונה TPU ו Pathways. AWS בונה Inferentia ו Neuron. AWS טוענת ש Inferentia2 מספק עד פי 4 throughput ועד פי 10 latency טוב יותר מהדור הקודם, ו Inf2 עד 50 אחוז perf/watt טוב יותר ממופעי EC2 מקבילים. טענות ספק שיש לאמת workload-by-workload [S18].

**Groq.** LPU ו GroqCloud מתמקדים ב Inference real-time. בדצמבר 2025 החברה חתמה על הסכם רישוי לא בלעדי עם NVIDIA. חלק מההנהלה והצוות עבר ל NVIDIA, בעוד Groq נותרה חברה עצמאית ו GroqCloud המשיך לפעול [S19]. ביוני 2026 Groq הודיעה על $650M growth capital ועל 13 data centers. זהו דיווח חברה, לא נתון מבוקר [S20].

**Cerebras.** Wafer-Scale Engine וענן Inference שמדגיש מהירות. החברה טוענת לעד פי 30 מול מערכות GPU ולמחיר ביצועים מוביל. יש לבדוק במודל, ב batch size וב SLO הספציפיים [S21].

**Together AI.** פלטפורמה ל open/custom models, inference, fine-tuning ו GPU clusters. ביולי 2026 החברה הודיעה על Series C של $800M ועל התחייבויות ליותר מ 500MW capacity. ההודעה מפנה גם ל New York Times, אבל המספרים התפעוליים והטענות לחיסכון של פי 6 עד פי 20 הם בעיקר דיווח החברה [S22].

**Fireworks AI, Baseten, Modal.** שלוש זוויות שונות לשוק המנוהל. Fireworks מתמקדת ב fast inference ו model customization. Baseten ב production model serving. Modal ב serverless compute. Modal מדגימה למה serverless יכול לנצח בעומס קופצני אף שמחיר GPU-hour גבוה יותר: משלמים על ממוצע שימוש נמוך יותר, לא על capacity שיא [S23].

### ישראל: NeuReality ו Hailo

NeuReality מציגה ב2026 את NR‑NEXUS כ Inference Operating System ו AI‑SuperNIC / AI‑CPU לניהול compute הטרוגני, routing, observability ו policy [S24].

Hailo מייצגת את חוזקת ישראל ב edge AI accelerators, בעיקר vision ו on-device generative AI.

Run:ai היא דוגמה היסטורית ליכולת ישראלית ב GPU orchestration. NVIDIA הודיעה על הסכם רכישה ב2024, ובתמונת 2026 המוצר משווק כ NVIDIA Run:ai [S26]. Deci היא דוגמה ישראלית נוספת ל inference optimization. היא מוזכרת כאן כדוגמת ecosystem בלבד.

**הלקח הישראלי:** יש בארץ עומק בשבבים, networking, cyber ו ML systems. אבל מייסד לא טכני צריך להתחבר לעומק הזה כשותף, לקוח או יועץ. לא להתחרות בו ביום הראשון.

## 6. מבנה השוק וכוחות תחרותיים

### 6.1 מה דוחף ביקוש

- מעבר מ chat חד פעמי לסוכנים שפועלים ברצף.
- reasoning ארוך ו test-time compute.
- קול, תמונה ווידאו בזמן אמת.
- AI בתוך כל מוצר SaaS.
- open models שמאפשרים deployment פרטי.
- רגולציה ו sovereignty שמפצלים deployments לפי אזור.
- "AI factories" ארגוניים שמשרתים מודלים רבים.

### 6.2 מה דוחף מחירים למטה

- חומרה חדשה ו perf/watt טוב יותר.
- תחרות בין hyperscalers ו neoclouds.
- open-weight models.
- quantization, distillation, caching ו batch.
- serving engines פתוחים כמו vLLM ו SGLang.
- מעבר ל small models ו routing/cascades.

### 6.3 למה אין מספר TAM יחיד אמין

"שוק Inference" עשוי לכלול שבבים, GPU cloud, token APIs, software, edge devices או אפילו אפליקציות. דוחות אנליסטים שמערבבים גבולות אלה יוצרים מספרים לא ברי השוואה. לכן המדריך הזה לא מציג תחזית TAM יחידה כאילו היא עובדה.

הדרך הנכונה ליזם היא bottom-up:

```
מספר לקוחות יעד × נפח workflows × מחיר ל workflow × willingness-to-pay על סיכון או חיסכון
```

לדוגמה: 200 מוקדי שירות × 500 אלף דקות AI בחודש × ₪0.02 לדקת שיחה עבור assurance. זה ₪2 מיליון ARR? לא: 200 × 500,000 × 0.02 × 12 = ₪24 מיליון ARR. זהו תרחיש, לא תחזית. יש לאמת את ארבעת המשתנים בשיחות לקוח.

### 6.4 איפה נבנה moat

**Moat חלש:**

- wrapper פשוט ל API.
- dashboard על token spend בלבד.
- benchmark חד פעמי.
- reseller ללא workflow או data.

**Moat חזק יותר:**

- dataset אנכי איכותי ומתעדכן.
- integration עמוק לתהליך ול system of record.
- feedback loop מתוצאות אמיתיות.
- policy/compliance pack לענף.
- switching costs דרך eval history ו routing policy.
- demand aggregation או distribution ייחודי.
- algorithm/IP שמוכח ב goodput או cost per outcome.

## 7. הזדמנויות שוק: דירוג עבור מייסד לא טכנולוגי

ציונים: 1 נמוך, 5 גבוה. "התאמה" גבוהה פירושה שניתן להתחיל עם domain ו GTM ולהשלים הנדסה בהדרגה.

| הזדמנות | כאב לקוח | התאמה למייסד לא טכני | הון נדרש | תחרות | ציון כולל |
|---|---|---|---|---|---|
| Assurance לסוכני קול בעברית וערבית | 5 | 5 | 2 | 3 | 4.5 |
| Inference FinOps אנכי למגזר מפוקח | 4 | 4 | 2 | 4 | 4.0 |
| שירות deployment פרטי / on-prem | 4 | 4 | 3 | 3 | 3.8 |
| Edge AI solution בענף ספציפי | 4 | 3 | 4 | 3 | 3.3 |
| Multi-model gateway גנרי | 3 | 3 | 2 | 5 | 2.8 |
| ענן GPU / neocloud חדש | 4 | 1 | 5 | 5 | 1.8 |
| שבב inference חדש | 5 | 1 | 5 | 5 | 1.5 |

### הזדמנות A: Inference Assurance לסוכני קול

**הבעיה:** demo טוב אינו production טוב. רעש, מבטאים, שמות, interruption, tool latency, hallucination ו handoff גרוע שוברים שיחה. 500ms נוספים בכל שלב יכולים להפוך חוויה ללא טבעית. OpenAI הפכה את Realtime API לזמין באופן כללי באוגוסט 2025. סימן לבשלות התשתית, אבל לא פתרון לבקרת workflow אנכי [S25].

**המוצר:** capture של traces ואודיו, eval אוטומטי, redaction, quality/cost dashboard, alerts, ו router בין STT, LLM ו TTS או speech-to-speech.

**הלקוח:** VP Customer Service, Head of CX, Contact Center Ops, compliance, או vendor שבונה voice agents.

**ה moat:** קורפוס עברית וערבית, taxonomy של כשלים, חיבור לתוצאת CRM והיסטוריית regressions.

### הזדמנות B: FinOps ו Routing למגזר מפוקח

לא "מצאנו API זול יותר", אלא policy engine שמחליט:

- איזה model מותר לכל data class.
- באיזה region.
- מתי להשתמש ב small model, cache או batch.
- מתי escalate ל frontier model או לאדם.
- מה העלות לתיק, לתביעה או לשיחה מוצלחת.

ה wedge צריך להיות מגזרי: ביטוח, בריאות, בנקאות או ממשלה. מוצר גנרי יתחרה ב gateways וב clouds.

### הזדמנות C: Private inference deployment כשירות מוצרי

ארגונים רוצים open weights, data residency ו on-prem, אבל לא רוצים צוות ML infra. מתחילים ב assessment ו deployment קבועי מחיר, ואז מוסיפים control plane, upgrades ו managed SLA.

**סיכון:** להפוך לבית תוכנה פרויקטלי בלי recurring software. יש להגדיר template אחיד, 2 עד 3 stacks נתמכים ומדדי success.

### הזדמנות D: Edge inference בענף

מצלמות, מפעלים, רכב, retail ו defense-adjacent דורשים latency, offline ו privacy. כאן ישראל חזקה בחומרה וב computer vision. אבל sales cycles, integration וחומרה מעלים הון וסיכון. מתאים יותר עם שותף טכני או תעשייתי.

## 8. סיכונים טכניים ועסקיים

### סיכונים טכניים

1. **Benchmark illusion:** תוצאה על prompt קצר וב batch גדול אינה מייצגת P95 של הלקוח.
2. **איכות לאחר optimization:** quantization או cascade עלולים לפגוע בשפות קטנות או במקרי קצה.
3. **Cold starts ו autoscaling:** capacity עולה לאט יותר מהתור.
4. **KV cache explosion:** long context ומולטי טננטיות צורכים HBM.
5. **Vendor/model churn:** מודל מתחלף לפני שה integration החזיר השקעה.
6. **Reliability chains:** סוכן תלוי במודל, vector DB, tools, identity ו network. הזמינויות מוכפלות.
7. **Security:** prompt injection, data exfiltration, poisoned retrieval, leaked traces ו over-privileged tools.
8. **Observability gaps:** ספקים שונים מדווחים usage ו reasoning tokens אחרת.
9. **Data residency/retention:** "region" של endpoint אינו בהכרח כל מסלול העיבוד.
10. **Energy/capacity:** grid connection, cooling ו GPU supply מגבילים scaling. IEA מדגישה אי ודאות גבוהה ותרחישים שונים [S2].

### סיכונים עסקיים

1. **Compression by incumbents:** routing, cache ו evals הופכים ל feature בענן.
2. **מחיר טוקן נשחק:** margin של reseller נשחק יחד איתו.
3. **Customer concentration:** לקוח גדול אחד מכתיב ספק או stack.
4. **Cloud credits distort PMF:** "הכנסה" שמבוססת על credits אינה unit economics יציב.
5. **Capex/commitment mismatch:** התחייבות GPU ארוכה מול ביקוש לא ודאי.
6. **Open-source commoditization:** הקוד נגיש. ההבדל הוא operations ו distribution.
7. **Regulatory liability:** במיוחד employment, credit, health, biometrics ו public services לפי EU AI Act [S11].
8. **Model-provider dependency:** שינוי pricing, limits או terms יכול למחוק gross margin.
9. **Quality liability:** חיסכון של 30 אחוז אינו שווה אם error קריטי עולה יותר.
10. **Procurement friction:** security review, DPA, sub-processors ו data mapping מאריכים מכירה.

### Mitigations

- לבנות על לפחות שני ספקים, אבל לא להבטיח portability מלאה ביום הראשון.
- להחזיק eval set בבעלות החברה, לא של ספק המודל.
- למדוד cost per outcome ו P95, לא ממוצעים.
- להפריד שכבת policy מה provider SDK.
- חוזים עם pass-through לעליית מחיר API.
- להימנע מהתחייבות GPU לפני demand יציב.
- privacy-by-design ו minimal retention.
- human fallback לתוצאות בסיכון גבוה.

## 9. תוכנית כניסה מעשית: 12 חודשים

### שבוע 0 עד 2: Thesis צרה

בחרו workflow אחד בלבד. למשל: "קביעת תור ושינוי תור בשיחות עברית עבור רשת מרפאות פרטית".

הגדירו:

- buyer אחד.
- failure יקר אחד.
- KPI עסקי אחד.
- latency budget.
- data/compliance constraints.
- 20 חברות יעד בישראל + 20 באירופה.

לא לבנות dashboard. להכין demo ידני ו scorecard.

### שבוע 2 עד 6: 30 שיחות גילוי

חלוקה מומלצת:

- 10 מפעילי מוקדים / Head of CX.
- 8 ספקי voice-agent / contact-center.
- 6 security / compliance.
- 6 אנשי ML / platform.

שאלות:

1. כמה דקות או שיחות AI יש היום?
2. איזה כשל גרם escalation או עצירת rollout?
3. מה P95 latency ומה abandonment?
4. איך בודקים גרסת מודל חדשה?
5. מי מאשר data residency ו retention?
6. מה חשבון ה Inference ומה עלות אדם חלופי?
7. על מה ישלמו בתוך 60 יום?

**Gate:** לפחות 8 מתוך 30 מתארים אותו כאב, 4 מוכנים לשתף traces או recordings בצורה חוקית, ו 2 חותמים LOI או paid diagnostic.

### שבוע 4 עד 8: Paid diagnostic לפני SaaS

הצעה: "בדיקת Inference Reliability ל 14 יום" במחיר קבוע.

Deliverables:

- baseline של TTFT, P95 ו end-to-end.
- 100 עד 300 תרחישי eval.
- taxonomy של failures.
- cost per successful call.
- שלוש המלצות: model, routing, cache, prompt או tool design.
- ROI estimate.

אפשר לבצע חלק גדול ידנית עם APIs קיימים ו fractional ML engineer. המטרה היא ללמוד, לא לבנות platform.

### שבוע 6 עד 12: MVP

רק חמישה רכיבים:

1. ingestion של trace ו metadata.
2. redaction והפרדת PII.
3. eval runner על תרחישים בעברית וערבית.
4. dashboard של quality, latency ו cost.
5. webhook alert + recommendation.

Routing אוטומטי יגיע רק אחרי שיש אמון במדידה. בהתחלה shadow mode.

### חודשים 3 עד 6: Design partners

יעד:

- 3 עד 5 לקוחות משלמים.
- לפחות 100 אלף אינטראקציות נמדדות.
- KPI אחיד: למשל 20 אחוז פחות escalations או 15 אחוז פחות cost/success.
- שני ספקי מודל ו stack קול אחד לפחות.
- security baseline: DPA, retention controls, audit log, RBAC.

מחיר אפשרי:

- onboarding / diagnostic: €5k עד €15k.
- platform: €2k עד €10k לחודש.
- usage: לפי דקות, שיחות או trace volume.
- enterprise premium ל private deployment ו SLA.

אלה טווחי ניסוי, לא מחיר שוק מוכח.

### חודשים 6 עד 12: Productize והתרחבות

- connectors ל Twilio, Genesys, Five9, CRM ולספקי voice מובילים.
- benchmark suite עברית וערבית עם consent ו governance.
- policy packs לענף.
- automated model migration regression.
- outcome-based routing.
- expansion לאירופה בשפה או ענף נוסף.

**יעד 12 חודשים:** €300k עד €750k ARR, gross margin תוכנה מעל 70 אחוז לאחר pass-through של inference, ולפחות 30 אחוז usage expansion רבעונית אצל design partners. אלה יעדי ניהול, לא תחזית.

## 10. צוות, הון ושותפויות

### הצוות המינימלי

- CEO / מייסד דומייני: discovery, sales, partnerships, compliance narrative.
- founding engineer חזק ב backend, data ו AI APIs.
- fractional ML systems advisor ל benchmarks ו serving.
- domain QA linguist לעברית וערבית לפי שעות.
- privacy/security counsel לפי צורך.

אין צורך בתחילת הדרך ב chip architect, cluster team או GPU capex.

### שותפויות ישראליות אפשריות

- integrators ו contact-center vendors להפצה.
- חברות cyber ל redaction ו prompt security.
- ספקי GPU/cloud מקומיים ל private deployments.
- Hailo, NeuReality וחברות infra כשותפים טכניים בהמשך. לא כתלות ל MVP.
- אוניברסיטאות ומכללות לבניית evals שפתיים עם הסכמה וממשל נתונים.

### מימון

- Bootstrap או angel עד שני paid diagnostics.
- pre-seed רק לאחר אות חוזר: אותו buyer, אותו pain, אותו KPI.
- לא לגייס כדי לקנות capacity לפני utilization מוכח.
- להפריד "credits" מ cash gross margin בדוחות פנימיים.

## 11. Due diligence: שאלות לספק Inference

1. באיזה model version מדויק משתמשים, ומה מדיניות deprecation?
2. מה P50, P95 ו P99 TTFT ו ITL על workload דומה לשלנו?
3. מה hard rate limits ומה קורה ב burst?
4. האם pricing כולל reasoning, cache writes, tools, audio ו egress?
5. מה SLA, service credits ו RTO/RPO?
6. האם capacity shared, dedicated או provisioned?
7. איפה data, logs, cache ו backups מעובדים ונשמרים?
8. מה retention והאם יש zero-data-retention?
9. האם משתמשים בנתונים לאימון?
10. מה sub-processors והסמכות?
11. האם אפשר export של traces ו raw usage?
12. האם API תואם באמת או רק happy path?
13. מה איכות בעברית וערבית לפי eval שלנו?
14. האם structured output ו tool calling נשמר תחת עומס?
15. מה exit plan אם המחיר עולה או המודל נעלם?

## 12. המלצות קונקרטיות

### לעשות

1. לבחור outcome, לא שכבת טכנולוגיה. למשל: "להפחית escalations בשיחות תיאום תור".
2. למדוד 5 KPIs מהיום הראשון: success rate, critical error rate, P95 latency, cost/success, human handoff.
3. להתחיל ב managed APIs. לעבור dedicated או self-host רק אחרי חשבון break-even all-in.
4. לבנות eval set בבעלותכם. זה הנכס שמאפשר החלפת מודל והוכחת ROI.
5. למכור diagnostic בתשלום לפני SaaS. הוא מסנן סקרנות ומייצר דאטה.
6. להיות multi-provider ברמת policy ו data model. לא לנסות לתמוך בכל feature של כל ספק מיד.
7. להכניס privacy ו compliance לארכיטקטורה, במיוחד אם היעד אירופי.
8. להשתמש ב batch, cache ו small-model routing לפני חיפוש הנחת ספק.

### לא לעשות

1. לא לבנות "עוד GPU cloud" בלי access ייחודי לחשמל, chips והון.
2. לא לבנות "עוד inference engine" בלי צוות מחקר systems עולמי ו benchmark advantage.
3. לא למכור "50 אחוז זול יותר" בלי quality ו SLA. המחירים נשחקים.
4. לא להסתמך על benchmark של ספק.
5. לא לחתום על capacity ארוך לפני workload יציב.
6. לא לשמור אודיו או PII "למקרה שנצטרך".
7. לא להניח ש OpenAI-compatible פירושו portability מלאה.
8. לא לבצע auto-routing ב production לפני shadow evaluation ו fallback.

### החלטת Go / No-Go בתוך 90 יום

**Go אם:**

- 2 לקוחות משלמים ומעלה.
- אותו failure pattern חוזר.
- לפחות 15 אחוז שיפור ב cost/success או ב KPI תפעולי.
- הנתונים ניתנים לעיבוד חוקי.
- buyer ברור ובעל budget.
- אין צורך ב capex.

**Pivot** אם יש כאב אבל אין willingness-to-pay: לעבור ל deployment/compliance service ולחפש רכיב recurring.

**No-Go** אם כל לקוח דורש stack שונה, אין גישה ל traces ו outcomes, או שהערך היחיד הוא הנחת API.

## 13. מילון קצר

- **Token:** יחידת טקסט שהמודל קורא או כותב. לא בהכרח מילה.
- **Weights:** המספרים שנלמדו באימון.
- **Context window:** כמה טוקנים המודל יכול לעבד בבקשה או בשיחה.
- **KV cache:** מצבי ביניים שמאפשרים לא לחשב מחדש את כל ההקשר בכל טוקן.
- **Batching:** איחוד בקשות כדי לנצל חומרה טוב יותר.
- **Quantization:** ייצוג משקולות במספרים בעלי דיוק נמוך יותר.
- **Throughput:** כמות עבודה לזמן.
- **Latency:** זמן המתנה לבקשה.
- **TTFT:** זמן עד תחילת התשובה.
- **ITL:** זמן בין טוקנים בזמן ההזרמה.
- **Goodput:** עבודה שעומדת גם ביעד זמן וגם באיכות.
- **SLO / SLA:** יעד שירות / התחייבות חוזית.
- **Open weights:** משקולות נגישות להרצה. לא בהכרח קוד או דאטה פתוחים, ולא בהכרח שימוש חופשי.
- **RAG:** שליפת מידע והוספתו לפרומפט בזמן Inference.
- **MoE:** מודל שבו רק חלק מה"מומחים" פעילים לכל טוקן.
- **Edge inference:** הרצה במכשיר או באתר קרוב למקור הנתונים.

## 14. מתודולוגיה ואמינות

נעשה שימוש במקורות חיים שנפתחו בין 5 ל 6 בספטמבר 2026, עם עדיפות למסמכי מוצר ומחיר רשמיים, רגולטור, MLCommons, Stanford ו IEA.

נתוני מחיר ומוצר משתנים. הם snapshot ליום הדוח ויש לבדוק שוב לפני החלטת רכש.

טענות "עד פי X", מספרי לקוחות, tokens, MW וגיוסים שמקורם בחברה מסומנים כטענות חברה. benchmark שיווקי אינו evidence עצמאי.

מספרי עלות self-host, TAM bottom-up, יעדי ARR ומחירי MVP מסומנים כאומדן או תרחיש.

לא הוצג "גודל שוק" יחיד משום שהגדרות האנליסטים אינן עקביות בין chips, cloud, software ו applications.

האימות בוצע ישירות מול URLs רשמיים ומסמכים חיים, ללא הצלבה עיתונאית של כל גיוס פרטי. הגיוסים אינם בסיס להמלצה.

## פסק הדין

שוק ה Inference אמיתי, חיוני וצומח. אבל "תשתית Inference" כשלעצמה אינה thesis מספקת. התחרות מורידה את מחיר החישוב ומעלה את רף ההון וההנדסה.

ההזדמנות הטובה ליזם ישראלי לא טכנולוגי היא להיות המערכת שמבטיחה שה Inference עובד עבור workflow בעל ערך. לא המערכת שמייצרת טוקנים בזול.

הצעד הראשון ביום שני בבוקר: לבחור vertical אחד, להכין scorecard של 20 כשלים בשיחות עברית, ולתאם 10 ראיונות עם מפעילי מוקדים וספקי voice agents. לא לכתוב קוד לפני שיש שני buyers שמוכנים לשלם על diagnostic.

אם אתם מנהלים מוקד, בונים סוכני קול, או שוקלים כניסה לשוק הזה ורוצים לעבור על זה יחד, [דברו איתנו בוואטסאפ](https://wa.me/972526414555) או קראו על [איך אנחנו עובדים](https://futureproofagents.com/he/).

## 15. מקורות

- [S1] Stanford HAI, 2025 AI Index Report (inference cost, hardware efficiency): https://hai.stanford.edu/ai-index/2025-ai-index-report · PDF: https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf
- [S2] International Energy Agency, Energy demand from AI: https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai
- [S3] NVIDIA, Introducing NVIDIA Dynamo (2025): https://developer.nvidia.com/blog/introducing-nvidia-dynamo-a-low-latency-distributed-inference-framework-for-scaling-reasoning-ai-models/
- [S4] AMD, Instinct MI350 Series: https://www.amd.com/en/products/accelerators/instinct/mi350.html
- [S5] Google, Ironwood TPU for the age of inference (April 2025): https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/ironwood-tpu-age-of-inference/
- [S6] vLLM, official site: https://vllm.ai/
- [S7] SGLang, official repository: https://github.com/sgl-project/sglang
- [S8] NVIDIA Triton Inference Server, documentation: https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html
- [S9] llama.cpp, official repository: https://github.com/ggml-org/llama.cpp
- [S10] ONNX Runtime, official site: https://onnxruntime.ai/
- [S11] European Commission, AI Act regulatory framework: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- [S12] MLCommons, MLPerf Inference: Datacenter: https://mlcommons.org/benchmarks/inference-datacenter/
- [S13] Anthropic, API pricing: https://platform.claude.com/docs/en/about-claude/pricing
- [S14] Anthropic, Message Batches API: https://platform.claude.com/docs/en/build-with-claude/batch-processing
- [S15] OpenAI, Batch API: https://developers.openai.com/api/docs/guides/batch
- [S16] AWS, Amazon Bedrock pricing: https://aws.amazon.com/bedrock/pricing/
- [S17] Artificial Analysis, models leaderboard: https://artificialanalysis.ai/models · https://artificialanalysis.ai/leaderboards/models
- [S18] AWS, Inferentia: https://aws.amazon.com/ai/machine-learning/inferentia/
- [S19] Groq, non-exclusive NVIDIA licensing agreement (December 2025): https://groq.com/newsroom/groq-and-nvidia-enter-non-exclusive-inference-technology-licensing-agreement-to-accelerate-ai-inference-at-global-scale
- [S20] Groq, $650M growth capital announcement (June 2026): https://groq.com/newsroom/groq-raises-usd650m-to-scale-its-ai-inference-cloud-business
- [S21] Cerebras, Inference Cloud: https://www.cerebras.ai/inference
- [S22] Together AI, $800M Series C announcement (July 2026): https://www.together.ai/blog/announcing-our-series-c
- [S23] Modal, pricing: https://modal.com/pricing
- [S24] NeuReality, product and press pages: https://www.neureality.ai/ · https://www.neureality.ai/press/
- [S25] OpenAI, Realtime API (general availability, August 2025): https://openai.com/index/introducing-the-realtime-api/
- [S26] NVIDIA, Run:ai acquisition and product page: https://blogs.nvidia.com/blog/runai/ · https://www.nvidia.com/en-us/software/run-ai/

מקורות שימושיים נוספים: [OpenAI prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) · [OpenAI pricing](https://openai.com/business/pricing/#api) · [Google Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) · [AWS Bedrock service tiers](https://aws.amazon.com/bedrock/service-tiers/) · [IEA Energy and AI](https://www.iea.org/reports/energy-and-ai)
