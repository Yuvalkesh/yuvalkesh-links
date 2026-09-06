---
title: "The AI Inference Market in 2026: Where the Money Is, Who Owns the Stack, and the One Layer a Founder Can Still Take"
description: "Training is a project. Inference is the bill that never stops. A ten-layer map of the AI inference market, its real unit economics, and a 12-month entry plan."
pubDate: 2026-09-06
lang: en
tags: ["AI inference market", "AI infrastructure", "inference economics", "voice agents", "AI startups", "market map"]
translationOf: ai-inference-market-guide-he
faq:
  - q: "What is the difference between AI training and AI inference?"
    a: "Training is when a model learns its weights from data. It happens rarely and it is a project. Inference is when the trained model answers a request. It happens on every user interaction, sometimes billions of times, and it is a recurring operating cost. Fine-tuning changes weights, so it counts as training. RAG, prompt engineering and caching happen at inference time and leave the weights alone."
  - q: "Is self-hosting an LLM cheaper than paying for an API?"
    a: "Not by default. Self-hosting wins when you have stable, high volume, a model that fits, a capable team, and the ability to keep utilization high. APIs win for small or bursty volume, speed to market, and access to frontier models. A useful rule: stay on APIs until a real bill proves that dedicated or self-hosted capacity saves at least 30 to 40 percent all-in, after team cost and risk."
  - q: "How big is the AI inference market?"
    a: "There is no single trustworthy number, because analysts draw the boundary differently. Some count chips, some count GPU clouds, some count token APIs, software, edge devices or even applications. The numbers are not comparable. A founder should size the market bottom-up: target customers, times workflow volume, times price per workflow, times willingness to pay."
  - q: "What should a founder measure instead of price per million tokens?"
    a: "Cost per successful business action, time to task completion, the share of tasks that need a human, retry rate, and the cost of a failure, a hallucination or an abandoned session. Agents and reasoning models can call a model many times per task, so per-token price alone hides the real economics."
  - q: "Where is the best opportunity for a non-technical founder in AI inference?"
    a: "A vertical inference assurance layer: measurement, routing, quality control, privacy and cost control for one workflow where latency and failure cost real money. The strongest angle from Israel is Hebrew and Arabic voice agents in regulated markets such as contact centers, private healthcare, insurance, finance and logistics. Start as a paid service, then turn it into software."
---

Snapshot date: September 6, 2026.

Every AI product has two lives. The first is training: a model learns from billions of examples, once, in a big expensive project. The second is inference: that trained model answers a request. Then another. Then a billion more.

Inference is where an AI product meets a real user, a service-level agreement, and a cloud invoice. It is the part of AI that never stops costing money.

This guide is written for a founder or executive who does not come from infrastructure and wants three things: to understand how the inference market actually works, to pick an entry angle, and to reach a first pilot. It covers inference for language, voice, image, video and classical models, in the cloud, in the data center and at the edge.

One rule I hold throughout: numbers that come from a vendor are labeled as vendor claims. A company's marketing benchmark is not independent evidence.

> **The short version.** The inference market is large and growing fast, but the generic hardware and serving layers are already occupied by giants and capital-heavy companies. A non-technical founder should not build a chip, a GPU cloud, or another inference engine. The recommended entry is a vertical inference assurance layer: measurement, routing, quality control, privacy and cost control for one workflow where latency and failure cost money. The strongest angle from Israel is Hebrew and Arabic voice agents in regulated markets. Start as a paid service. Turn it into software.

## 1. Why inference is its own business category

If training is a student studying for years, inference is the moment that student gets asked a question and has to answer.

In a large language model, the model receives tokens (chunks of text), runs them through weights it learned during training, and predicts the next token. Nothing is relearned per request. The weights stay fixed.

That simple mechanic has five business consequences.

**Training is a project. Inference is a recurring cost.** A model is trained once and called billions of times. The budget line that grows with your success is inference, not training.

**Agents and reasoning models multiply the work per task.** One business request may trigger several model calls, searches, tool invocations and retries. The unit of work is no longer "one prompt, one answer."

**Customers measure the product, not FLOPS.** They care about response time, quality, availability, privacy and cost per successful action. Nobody buys teraflops.

**Price per unit of capability is falling fast, and consumption is rising faster.** The Stanford AI Index 2025 found that the cost of running a model at GPT-3.5 level fell more than 280-fold between November 2022 and October 2024. Over the same period, stronger models and agent loops began consuming far more inference per task [S1].

**Electricity and capacity are becoming the bottleneck.** The IEA estimates data centers consumed roughly 415 TWh in 2024 and projects around 945 TWh by 2030 in its base case, with accelerated-server consumption growing about 30 percent per year [S2].

### Where the value is created

- **Hardware and systems:** performance per watt, HBM memory, interconnect, cooling and availability.
- **Serving engines:** batching, KV cache management, quantization, speculative decoding, and separating prefill from decode.
- **Inference clouds:** selling tokens through an API, or dedicated capacity with an SLA.
- **The control plane:** routing across models and providers, observability, security, governance and FinOps.
- **Vertical layers:** guaranteeing a business outcome in a specific industry or workflow.

The further down that list you go, the less capital you need and the more domain knowledge matters. That is the whole thesis of this guide.

## 2. Training versus inference, without the jargon

| Topic | Training | Inference |
|---|---|---|
| Goal | Learn weights from data | Use weights to produce a prediction or content |
| Frequency | Large, relatively rare training runs | Every user request, sometimes billions of times |
| Load pattern | High, planned throughput | Variable traffic, often real-time |
| Time tolerance | Hours to months | Milliseconds to seconds. Batch jobs can wait |
| Core metric | Time and cost to finish training, model quality | Latency, throughput, quality, availability, cost per outcome |
| Resource management | One large, continuous cluster | Autoscaling, queues, batching, caches and SLAs |
| Typical failure | A run crashes or fails to converge | A user waits, gets a wrong answer, hits a timeout, or the bill spikes |

### Fine-tuning is not inference

Fine-tuning changes the model's weights, so it is additional training, even if it is small. The techniques that happen at inference time and leave the weights alone are different animals:

- **RAG** adds retrieved information to the prompt at inference time.
- **Prompt engineering** changes instructions and context only.
- **Prompt and KV caching** store previous computation for reuse.
- **Quantization** usually converts weights to lower precision to save memory and compute. It sometimes needs calibration or a small fine-tune to hold quality.

### The two phases of LLM inference

Every LLM request has two distinct phases, and they stress different parts of the hardware.

1. **Prefill** processes the whole input and builds the KV cache. It is usually compute-bound and drives TTFT, the time to first token.
2. **Decode** produces one token per step. It is usually memory-bandwidth-bound and drives ITL, the inter-token latency, and tokens per second.

That split explains why advanced systems now separate the two phases onto different resources. NVIDIA Dynamo, announced at GTC 2025, includes disaggregated prefill and decode, KV-cache-aware routing, resource planning, and offloading cache to cheaper memory and storage [S3]. The "up to 30x" figure NVIDIA cites is a vendor benchmark in a specific configuration, not a general promise.

### Why reasoning and agents change the economics

A reasoning model may generate a long stream of "thinking tokens" before it answers. An agent may call the model repeatedly, use tools, fail, and retry. So the right unit of measurement is not only price per million tokens. It is:

- cost per successful business action;
- time to task completion;
- the share of tasks that need a human;
- retry rate;
- the cost of a failure, a hallucination, or an abandoned session.

## 3. The full inference stack: a token factory in ten layers

Think of the stack as a factory with ten floors. A problem on any floor reaches the customer as an answer that is slow, expensive or wrong.

### Layer 1: The model and its architecture

Dense versus Mixture-of-Experts. Active parameter count, context window, and modality (text, voice, image, video). Closed API versus open weights. Base quality, license, language coverage and tool-use ability.

**The business decision:** pick the smallest, cheapest model that passes a real evaluation on your task. Not the model with the highest leaderboard score.

### Layer 2: Model format and optimization

Quantization (FP8, FP4, INT8, INT4). Pruning and distillation. Compilation and kernel fusion. Adapters and LoRA. Speculative decoding, where a small model proposes tokens and a large one verifies them.

**The trade-off:** less memory and lower cost against a risk of quality loss, especially on numbers, small languages and long context.

### Layer 3: Compute hardware

- **GPUs:** NVIDIA is the incumbent. AMD Instinct is a meaningful alternative. The MI350, for example, is listed with 288GB of HBM3E and 8TB/s of bandwidth [S4].
- **ASICs and TPUs:** Google TPU, AWS Inferentia, Groq LPU, Cerebras wafer-scale, and others.
- **CPU, NPU and edge:** devices, PCs, phones and cameras.

Inference is not "just compute." During decode, memory bandwidth, HBM capacity and data movement often matter more than peak FLOPS.

### Layer 4: Memory, network and storage

HBM holds the weights and the KV cache. NVLink, InfiniBand, Ethernet and ICI connect accelerators. CPU RAM, SSD and object storage serve as offload targets. Cooling and power cap density.

Google introduced Ironwood in 2025, a seventh-generation TPU built specifically for inference, with 192GB of HBM per chip, 7.37TB/s of bandwidth, and configurations of 256 or 9,216 chips. Vendor figures [S5].

### Layer 5: Runtime and serving engine

- **vLLM:** PagedAttention, continuous batching, an OpenAI-compatible API [S6].
- **SGLang:** RadixAttention and prefix caching, speculative decoding, disaggregation, parallelism, quantization [S7].
- **NVIDIA TensorRT-LLM, Triton, NIM and Dynamo:** optimization and serving on NVIDIA hardware. Triton also supports multiple frameworks and backends [S8].
- **llama.cpp:** local and edge inference in C/C++ with quantization and broad hardware support [S9].
- **ONNX Runtime:** a cross-platform runtime for CPU, GPU, NPU, cloud, web and mobile [S10].

This layer is technical, competitive and fast-moving. A new startup will struggle to build a moat out of "another wrapper around vLLM."

### Layer 6: Orchestration and scheduling

Autoscaling and cold starts. Admission control and queues. Dynamic and continuous batching. Cache-aware and SLO-aware routing. Multi-tenancy and isolation. Capacity planning and failover across regions and providers.

GPU utilization alone is not a good KPI. A cluster can look "busy" while the queue grows and TTFT breaks.

### Layer 7: APIs and inference clouds

Three commercial models dominate:

1. **Serverless, pay per token.** Fast to start, no commitment, less control.
2. **Dedicated endpoints and provisioned throughput.** Reserved capacity, more predictable latency, bigger commitment.
3. **Self-hosted and on-prem.** Control and privacy, but the team and the utilization become your problem.

Incumbents: OpenAI, Anthropic, Google Vertex AI, AWS Bedrock and SageMaker, Microsoft Azure AI.

Open-model and inference specialists: Together AI, Fireworks AI, Baseten, GroqCloud, Cerebras Inference, Modal, Replicate, fal, Hugging Face endpoints, and others.

### Layer 8: Gateway, routing and FinOps

A uniform abstraction over providers. Fallback and circuit breakers. Routing by quality, cost, latency and region. Rate limits, budgets and chargeback. Semantic and prompt caching. A/B tests and shadow traffic.

Attractive, and crowded. A generic product with no proprietary data gets absorbed into a cloud, a gateway, or an observability suite.

### Layer 9: Evaluation, observability, security and governance

Traces of every tool call and token. Offline and online evals. Guardrails, PII redaction and prompt-injection defense. Drift and regression across model versions. Audit, retention, data residency and human oversight.

The EU AI Act already imposes obligations on general-purpose AI models from August 2025, transparency rules from August 2026, and a risk-based framework that tightens for high-risk use cases [S11]. For an Israeli company selling into Europe, compliance is not a feature you add later.

### Layer 10: The product and the business workflow

This is where the outcome is decided. Was the claim classified correctly? Did the call end with a booked appointment? Was the medical document summarized without a critical error?

It is the one layer where a domain founder has an edge over a pure infrastructure engineer.

## 4. The economics of inference

### 4.1 What you have to measure

- **TTFT:** time to first token.
- **ITL / TPOT:** time between tokens.
- **Output tokens per second:** streaming speed for a single user.
- **Total throughput:** tokens or requests per second across the machine or cluster.
- **P50, P95, P99 latency:** averages hide the ugly tail.
- **Goodput:** throughput that also meets the SLO and the quality bar.
- **Utilization:** not just "GPU busy." Also HBM, bandwidth, queue depth and cache hit rate.
- **Cost per successful task:** the management KPI that matters most.
- **Availability, error rate, retry rate.**

MLCommons stresses that a valid benchmark separates scenarios and metrics, distinguishes available systems from previews, and measures the power draw of the full system rather than a chip's TDP [S12].

### 4.2 Two simple formulas

**API:**

```
cost = (input tokens × input price) + (output tokens × output price) + tools / storage / network
```

**Self-hosting:**

```
effective cost per million useful tokens ≈ (GPU-hours + CPU/RAM + network + operations + reserve) / tokens
```

Or, as a rough approximation:

```
$ per million output tokens = machine price per hour ÷ (aggregate tokens/sec × 3,600 × utilization) × 1,000,000
```

The common mistake is plugging in peak throughput and 100 percent utilization. A real product has peaks, idle time, warm replicas, failures, and headroom for the SLA.

### 4.3 A worked API example (live prices, not a forecast)

As of September 6, 2026, Anthropic lists Claude Sonnet 5 at $2 per million input tokens and $10 per million output tokens, with cache reads at $0.20 per million [S13].

Take a task with 4,000 input tokens and 1,000 output tokens:

- Input: 4,000 / 1,000,000 × $2 = $0.008
- Output: 1,000 / 1,000,000 × $10 = $0.010
- Total: $0.018 per task, before tools and traffic
- One million similar tasks: $18,000

Now assume 3,200 of those 4,000 input tokens repeat and are served from cache:

- Cached input: $0.00064
- Fresh input: $0.0016
- Output: $0.010
- Total: $0.01224, a saving of about 32 percent in this example.

Anthropic and OpenAI both offer a 50 percent discount for asynchronous batch workloads. AWS Bedrock lists a 50 percent batch discount on selected models as well [S14][S15][S16].

**The lesson:** designing the workload (cache, batch, shorter context, output caps, reasoning level) can save more than a small negotiation on token price.

### 4.4 Self-hosting ranges: an illustration, not a quote

This table is not a vendor quote and not a benchmark. It exists to show how much utilization changes the economics.

| Hypothetical scenario | Compute cost | Total throughput | Useful utilization | Compute cost per million output tokens |
|---|---|---|---|---|
| Single GPU, moderate tuning | $3 per hour | 250 tok/s | 55% | about $6.06 |
| Single GPU, well-tuned workload | $3 per hour | 1,000 tok/s | 75% | about $1.11 |
| 8 GPUs for a large model | $24 per hour | 1,500 tok/s | 70% | about $6.35 |

Add 20 to 50 percent, sometimes more, for CPU and RAM, storage and network, orchestration, idle reserve, engineering and support. On the other side, a capacity contract or efficient hardware can pull the price down.

**Conclusion:** self-hosting is not automatically cheaper. It wins with stable high volume, a model that fits, a good team and the ability to hold utilization. The API wins with small or bursty volume, time to market, and access to frontier models.

### 4.5 The right break-even question

Do not ask "when does a GPU get cheaper than tokens?" Ask:

1. What is our quality floor?
2. How many input, output, reasoning and tool-call tokens does one task consume?
3. What is P95 traffic, and how much headroom do we need?
4. What does downtime or a bad answer cost?
5. What does a platform or ML infra team cost?
6. Do we need data residency, isolation or custom weights?
7. How fast do the model and the hardware go stale?

**Rule of thumb:** stay on APIs until a real bill proves the workload is stable, inference spend is material, and dedicated or self-hosted capacity saves at least 30 to 40 percent all-in after team cost and risk. A smaller saving disappears in the first outage or migration.

### 4.6 Prices are falling. That is not full commoditization.

Stanford documents a steep historical fall in the cost of reaching a fixed capability level [S1]. At the same time, Artificial Analysis shows large real-time gaps between models and providers on price, intelligence, TTFT and output speed [S17]. Put together:

- A "token" is not a uniform commodity. Quality, tokenizer, reasoning and SLA all differ.
- Margins in raw inference are under pressure.
- Value is migrating to proprietary demand, workload optimization, reliability, data and compliance, and outcomes.

## 5. The players, by category

This is a representative map, not a full list. Statuses and products were checked against live sources on the snapshot date. Performance claims from companies are vendor claims, not independent comparisons.

| Category | Incumbents and major players | Representative startups and challengers | What they sell |
|---|---|---|---|
| GPUs and accelerators | NVIDIA, AMD, Intel | Groq, Cerebras, d-Matrix, Etched, others | Latency, throughput, performance per watt |
| Hyperscaler ASICs | Google TPU, AWS Inferentia and Trainium, Microsoft Maia | | Integrated economics for their own cloud |
| Servers, networking, cooling | NVIDIA systems, Dell, HPE, Supermicro, Broadcom, Arista | Astera Labs, others | A whole cluster, not a single chip |
| Serving engines | NVIDIA TensorRT-LLM, Triton, Dynamo; ONNX Runtime | vLLM, SGLang, llama.cpp, KServe ecosystem | Hardware utilization, batching, cache, APIs |
| Hyperscaler model platforms | AWS Bedrock and SageMaker, Azure AI, Google Vertex AI | | Model catalog, governance, enterprise procurement |
| Frontier closed APIs | OpenAI, Anthropic, Google, xAI, others | | Leading intelligence as a service |
| Open-model inference clouds | | Together AI, Fireworks AI, Baseten, GroqCloud, Cerebras Inference, Anyscale | Serverless and dedicated inference, fine-tuning |
| Serverless compute and media | Cloud providers | Modal, Replicate, fal, others | Bursty GPU workloads, image, video, audio |
| Gateways and routing | Built-in cloud capabilities | Portkey, LiteLLM ecosystem, others | Multi-provider routing, policy, budgets |
| Evals and observability | Datadog and New Relic adding AI | Arize and Phoenix, Braintrust, Langfuse, Helicone, W&B Weave | Traces, regression, quality, cost |
| Edge and on-device | Apple, Qualcomm, NVIDIA Jetson, Intel | Hailo, others | Privacy, offline, low latency |
| Sovereign and on-prem | Clouds, OEMs, NVIDIA NIM | Integrators and infra startups | Control over data and infrastructure |

### Companies worth understanding

**NVIDIA.** Not just GPUs. CUDA, TensorRT-LLM, Triton, NIM, Dynamo, NVLink and networking, rack-scale systems. The advantage is an integrated stack and ecosystem. The risk for a startup: NVIDIA can turn any infrastructure feature into a bundled product.

**AMD.** Competes with Instinct and ROCm, large memory, and an improving ecosystem. The opening for software companies is portability and optimization across NVIDIA and AMD. But only with a real workload, not a theoretical one [S4].

**Google and AWS.** Google builds TPUs and Pathways. AWS builds Inferentia and Neuron. AWS claims Inferentia2 delivers up to 4x the throughput and up to 10x lower latency than the previous generation, and that Inf2 instances offer up to 50 percent better performance per watt than comparable EC2 instances. Vendor claims, to be verified workload by workload [S18].

**Groq.** The LPU and GroqCloud focus on real-time inference. In December 2025 the company signed a non-exclusive licensing agreement with NVIDIA. Part of the leadership and team moved to NVIDIA, while Groq remained independent and GroqCloud kept operating [S19]. In June 2026 Groq announced $650M in growth capital and 13 data centers. Company-reported, not audited here [S20].

**Cerebras.** The Wafer-Scale Engine and an inference cloud built around speed. The company claims up to 30x versus GPU systems and leading price-performance. Test it on your own model, batch size and SLO [S21].

**Together AI.** A platform for open and custom models, inference, fine-tuning and GPU clusters. In July 2026 the company announced an $800M Series C and commitments to more than 500MW of capacity. The announcement links to the New York Times, but the operating figures and the "6x to 20x savings" claims are mostly company-reported [S22].

**Fireworks AI, Baseten, Modal.** Three different angles on the managed market. Fireworks leans into fast inference and model customization. Baseten into production model serving. Modal into serverless compute. Modal is a good illustration of why serverless can win on bursty load even at a higher GPU-hour price: you pay for a lower average usage, not for peak capacity [S23].

### Israel: NeuReality and Hailo

NeuReality presents NR-NEXUS in 2026 as an "Inference Operating System" with an AI-SuperNIC and AI-CPU for managing heterogeneous compute, routing, observability and policy [S24].

Hailo represents Israel's strength in edge AI accelerators, mainly vision and on-device generative AI.

Run:ai is the historical proof point for Israeli GPU orchestration. NVIDIA announced the acquisition in 2024, and by 2026 the product is marketed as NVIDIA Run:ai [S26]. Deci is another Israeli example in inference optimization, mentioned here only as an ecosystem reference.

**The Israeli lesson:** the country has deep talent in chips, networking, cyber and ML systems. A non-technical founder should plug into that depth as a partner, customer or advisor. Not compete with it on day one.

## 6. Market structure and competitive forces

### What is driving demand

- The shift from one-shot chat to agents that run in sequences.
- Long reasoning and test-time compute.
- Real-time voice, image and video.
- AI inside every SaaS product.
- Open models that allow private deployment.
- Regulation and sovereignty that fragment deployments by region.
- Enterprise "AI factories" serving many models.

### What is pushing prices down

- New hardware and better performance per watt.
- Competition between hyperscalers and neoclouds.
- Open-weight models.
- Quantization, distillation, caching and batch.
- Open serving engines like vLLM and SGLang.
- The move to small models and routing cascades.

### Why there is no single trustworthy TAM

The "inference market" can mean chips, GPU cloud, token APIs, software, edge devices or even applications. Analyst reports that blur those lines produce numbers that cannot be compared. So this guide does not present one TAM forecast as if it were a fact.

The right approach for a founder is bottom-up:

```
target customers × workflow volume × price per workflow × willingness to pay for risk or savings
```

Example: 200 contact centers × 500,000 AI minutes per month × ₪0.02 per minute for assurance. Is that ₪2M ARR? No: 200 × 500,000 × 0.02 × 12 = ₪24M ARR. That is a scenario, not a forecast. All four variables need to be validated in customer conversations.

### Where a moat actually gets built

**Weak moats:**

- A thin wrapper around an API.
- A dashboard that shows token spend and nothing else.
- A one-time benchmark.
- Reselling without a workflow or data.

**Stronger moats:**

- A high-quality vertical dataset that keeps updating.
- Deep integration into the process and the system of record.
- A feedback loop from real outcomes.
- A policy and compliance pack for an industry.
- Switching costs through eval history and routing policy.
- Demand aggregation or unique distribution.
- An algorithm or IP proven on goodput or cost per outcome.

## 7. Market opportunities, ranked for a non-technical founder

Scores run 1 (low) to 5 (high). A high "fit" score means you can start with domain knowledge and go-to-market, and add engineering gradually.

| Opportunity | Customer pain | Fit for non-technical founder | Capital required | Competition | Overall |
|---|---|---|---|---|---|
| Assurance for Hebrew and Arabic voice agents | 5 | 5 | 2 | 3 | 4.5 |
| Vertical inference FinOps for a regulated sector | 4 | 4 | 2 | 4 | 4.0 |
| Private and on-prem deployment as a service | 4 | 4 | 3 | 3 | 3.8 |
| Edge AI solution for a specific industry | 4 | 3 | 4 | 3 | 3.3 |
| Generic multi-model gateway | 3 | 3 | 2 | 5 | 2.8 |
| A new GPU cloud or neocloud | 4 | 1 | 5 | 5 | 1.8 |
| A new inference chip | 5 | 1 | 5 | 5 | 1.5 |

### Opportunity A: Inference assurance for voice agents

**The problem.** A good demo is not a good production system. Noise, accents, names, interruptions, tool latency, hallucination and clumsy handoffs break conversations. An extra 500ms at each step turns a natural exchange into an awkward one. OpenAI made the Realtime API generally available in August 2025, a sign the infrastructure has matured, but not a solution for controlling a vertical workflow [S25].

**The product.** Capture of traces and audio, automated evals, redaction, a quality and cost dashboard, alerts, and a router across STT, LLM and TTS or speech-to-speech.

**The buyer.** VP Customer Service, Head of CX, contact center operations, compliance, or a vendor that builds voice agents.

**The moat.** A Hebrew and Arabic corpus, a taxonomy of failures, a link to the CRM outcome, and a history of regressions.

### Opportunity B: FinOps and routing for a regulated sector

Not "we found a cheaper API." A policy engine that decides:

- which model is allowed for each data class;
- in which region;
- when to use a small model, a cache, or batch;
- when to escalate to a frontier model or a human;
- what each case, claim or successful call actually costs.

The wedge has to be sector-specific: insurance, healthcare, banking or government. A generic product ends up competing with gateways and clouds.

### Opportunity C: Private inference deployment as a productized service

Organizations want open weights, data residency and on-prem, but do not want an ML infra team. Start with a fixed-price assessment and deployment, then add a control plane, upgrades and a managed SLA.

**The risk.** Becoming a project shop with no recurring software. Define one standard template, two or three supported stacks, and clear success metrics.

### Opportunity D: Edge inference for one industry

Cameras, factories, vehicles, retail and defense-adjacent work all need low latency, offline operation and privacy. Israel is strong in the hardware and the computer vision. But sales cycles, integration and hardware raise both capital and risk. Better with a technical or industrial partner.

## 8. Technical and business risks

### Technical risks

1. **Benchmark illusion.** A result on short prompts and large batches says nothing about the customer's P95.
2. **Quality after optimization.** Quantization or a cascade can hurt small languages and edge cases.
3. **Cold starts and autoscaling.** Capacity comes up slower than the queue grows.
4. **KV cache explosion.** Long context and multi-tenancy eat HBM.
5. **Vendor and model churn.** The model is replaced before the integration pays back.
6. **Reliability chains.** An agent depends on the model, a vector DB, tools, identity and the network. Availabilities multiply.
7. **Security.** Prompt injection, data exfiltration, poisoned retrieval, leaked traces, over-privileged tools.
8. **Observability gaps.** Providers report usage and reasoning tokens differently.
9. **Data residency and retention.** An endpoint's "region" is not necessarily the whole processing path.
10. **Energy and capacity.** Grid connections, cooling and GPU supply cap scaling. The IEA stresses high uncertainty across scenarios [S2].

### Business risks

1. **Compression by incumbents.** Routing, cache and evals become cloud features.
2. **Token price erosion.** A reseller's margin erodes with it.
3. **Customer concentration.** One large customer dictates the provider or the stack.
4. **Cloud credits distort product-market fit.** "Revenue" that runs on credits is not stable unit economics.
5. **Capex and commitment mismatch.** A long GPU commitment against uncertain demand.
6. **Open-source commoditization.** The code is accessible. The difference is operations and distribution.
7. **Regulatory liability.** Especially employment, credit, health, biometrics and public services under the EU AI Act [S11].
8. **Model-provider dependency.** A change in pricing, limits or terms can wipe out gross margin.
9. **Quality liability.** A 30 percent saving is worthless if a critical error costs more.
10. **Procurement friction.** Security review, DPA, sub-processors and data mapping stretch the sales cycle.

### Mitigations

- Build on at least two providers, but do not promise full portability on day one.
- Own the eval set. It belongs to your company, not to the model provider.
- Measure cost per outcome and P95, not averages.
- Separate the policy layer from the provider SDK.
- Write contracts with pass-through for API price increases.
- Avoid GPU commitments before demand is stable.
- Privacy by design and minimal retention.
- A human fallback for high-risk outcomes.

## 9. A practical 12-month entry plan

### Weeks 0 to 2: A narrow thesis

Pick exactly one workflow. For example: "booking and rescheduling appointments in Hebrew calls for a private clinic chain."

Define:

- one buyer;
- one expensive failure;
- one business KPI;
- a latency budget;
- data and compliance constraints;
- 20 target companies in Israel and 20 in Europe.

Do not build a dashboard. Prepare a manual demo and a scorecard.

### Weeks 2 to 6: Thirty discovery calls

Suggested split:

- 10 contact center operators and Heads of CX;
- 8 voice-agent and contact-center vendors;
- 6 security and compliance people;
- 6 ML and platform people.

Questions:

1. How many AI minutes or calls do you handle today?
2. Which failure caused an escalation or stopped a rollout?
3. What is your P95 latency, and what is your abandonment rate?
4. How do you test a new model version?
5. Who approves data residency and retention?
6. What is your inference bill, and what does the human alternative cost?
7. What would you pay for within 60 days?

**Gate:** at least 8 of 30 describe the same pain, 4 are willing to share traces or recordings legally, and 2 sign an LOI or a paid diagnostic.

### Weeks 4 to 8: A paid diagnostic before any SaaS

The offer: a fixed-price "14-day Inference Reliability Review."

Deliverables:

- a baseline of TTFT, P95 and end-to-end latency;
- 100 to 300 eval scenarios;
- a taxonomy of failures;
- cost per successful call;
- three recommendations across model, routing, cache, prompt or tool design;
- an ROI estimate.

Much of this can be done by hand with existing APIs and a fractional ML engineer. The goal is to learn, not to build a platform.

### Weeks 6 to 12: The MVP

Only five components:

1. Ingestion of traces and metadata.
2. Redaction and PII separation.
3. An eval runner for Hebrew and Arabic scenarios.
4. A dashboard for quality, latency and cost.
5. Webhook alerts with a recommendation.

Automatic routing comes only after the measurement has earned trust. Start in shadow mode.

### Months 3 to 6: Design partners

Targets:

- 3 to 5 paying customers;
- at least 100,000 measured interactions;
- one shared KPI, for example 20 percent fewer escalations or 15 percent lower cost per success;
- two model providers and at least one voice stack;
- a security baseline: DPA, retention controls, audit log, RBAC.

Possible pricing:

- onboarding or diagnostic: €5k to €15k;
- platform: €2k to €10k per month;
- usage: by minutes, calls or trace volume;
- an enterprise premium for private deployment and SLA.

These are experimental ranges, not a proven market price.

### Months 6 to 12: Productize and expand

- Connectors to Twilio, Genesys, Five9, CRMs and the leading voice providers.
- A Hebrew and Arabic benchmark suite with consent and governance.
- Policy packs per industry.
- Automated regression testing for model migrations.
- Outcome-based routing.
- Expansion into Europe by language or by industry.

**12-month target:** €300k to €750k ARR, software gross margin above 70 percent after inference pass-through, and at least 30 percent quarterly usage expansion at design partners. These are management targets, not a forecast.

## 10. Team, capital and partnerships

### The minimum team

- CEO and domain founder: discovery, sales, partnerships, the compliance narrative.
- A strong founding engineer in backend, data and AI APIs.
- A fractional ML systems advisor for benchmarks and serving.
- A Hebrew and Arabic domain QA linguist, hourly.
- Privacy and security counsel, as needed.

No chip architect, cluster team or GPU capex is needed at the start.

### Possible Israeli partnerships

- Integrators and contact-center vendors for distribution.
- Cyber companies for redaction and prompt security.
- Local GPU and cloud providers for private deployments.
- Hailo, NeuReality and infra companies as technical partners later, not as MVP dependencies.
- Universities and colleges for building language evals with consent and data governance.

### Funding

- Bootstrap or angel money until two paid diagnostics.
- Pre-seed only after a repeated signal: same buyer, same pain, same KPI.
- Never raise to buy capacity before utilization is proven.
- Separate "credits" from cash gross margin in internal reporting.

## 11. Due diligence: fifteen questions for any inference provider

1. Which exact model version do you run, and what is your deprecation policy?
2. What are P50, P95 and P99 TTFT and ITL on a workload like ours?
3. What are the hard rate limits, and what happens in a burst?
4. Does pricing include reasoning, cache writes, tools, audio and egress?
5. What are the SLA, service credits, RTO and RPO?
6. Is capacity shared, dedicated or provisioned?
7. Where are data, logs, cache and backups processed and stored?
8. What is the retention policy, and is there a zero-data-retention option?
9. Is our data used for training?
10. Who are the sub-processors, and which certifications do you hold?
11. Can we export traces and raw usage?
12. Is the API truly compatible, or only on the happy path?
13. What is the Hebrew and Arabic quality on our own eval?
14. Do structured output and tool calling hold up under load?
15. What is the exit plan if the price rises or the model disappears?

## 12. Concrete recommendations

### Do

1. Choose an outcome, not a technology layer. For example: "reduce escalations in appointment-booking calls."
2. Measure five KPIs from day one: success rate, critical error rate, P95 latency, cost per success, human handoff.
3. Start on managed APIs. Move to dedicated or self-hosted only after an all-in break-even calculation.
4. Build an eval set you own. It is the asset that lets you switch models and prove ROI.
5. Sell a paid diagnostic before SaaS. It filters out curiosity and generates data.
6. Be multi-provider at the policy and data-model level. Do not try to support every feature of every provider at once.
7. Put privacy and compliance into the architecture, especially if Europe is the target.
8. Use batch, cache and small-model routing before you go looking for a vendor discount.

### Do not

1. Do not build "another GPU cloud" without unique access to power, chips and capital.
2. Do not build "another inference engine" without a world-class systems research team and a benchmark advantage.
3. Do not sell "50 percent cheaper" without quality and an SLA. Prices erode.
4. Do not rely on a vendor's benchmark.
5. Do not sign long capacity commitments before the workload is stable.
6. Do not keep audio or PII "in case we need it."
7. Do not assume "OpenAI-compatible" means full portability.
8. Do not auto-route in production before shadow evaluation and a fallback exist.

### The 90-day go or no-go

**Go if:**

- two or more paying customers;
- the same failure pattern keeps showing up;
- at least a 15 percent improvement in cost per success or an operational KPI;
- the data can be processed legally;
- a clear buyer with a budget;
- no capex required.

**Pivot** if there is pain but no willingness to pay: move to a deployment and compliance service and look for a recurring component.

**No-go** if every customer needs a different stack, there is no access to traces and outcomes, or the only value you offer is an API discount.

## 13. A short glossary

- **Token:** a unit of text the model reads or writes. Not necessarily a word.
- **Weights:** the numbers learned during training.
- **Context window:** how many tokens the model can process in one request or conversation.
- **KV cache:** intermediate states that avoid recomputing the whole context for every token.
- **Batching:** grouping requests to use hardware more efficiently.
- **Quantization:** representing weights in lower-precision numbers.
- **Throughput:** work per unit of time.
- **Latency:** how long a request waits.
- **TTFT:** time until the answer starts.
- **ITL:** time between tokens while streaming.
- **Goodput:** work that meets both the time target and the quality bar.
- **SLO / SLA:** a service objective versus a contractual commitment.
- **Open weights:** weights available to run. Not necessarily open code or data, and not necessarily free to use.
- **RAG:** retrieving information and adding it to the prompt at inference time.
- **MoE:** a model in which only some "experts" are active for each token.
- **Edge inference:** running on a device or a site close to the data source.

## 14. Methodology and reliability

Sources were live pages opened between September 5 and 6, 2026, with priority given to official product and pricing documents, regulators, MLCommons, Stanford and the IEA.

Price and product data change. They are a snapshot as of the report date and should be rechecked before any purchasing decision.

"Up to X" claims, customer counts, token volumes, megawatts and funding rounds that originate from a company are labeled as company claims. A marketing benchmark is not independent evidence.

Self-hosting costs, bottom-up TAM, ARR targets and MVP prices are labeled as estimates or scenarios.

No single "market size" is given because analyst definitions are inconsistent across chips, cloud, software and applications.

Verification was done directly against official and well-known URLs and live documents, without press cross-checks of every private funding round. Funding rounds are not the basis for any recommendation here.

## The verdict

The inference market is real, essential and growing. But "inference infrastructure" by itself is not a thesis. Competition keeps pushing the price of compute down and the capital and engineering bar up.

The good opportunity for a non-technical founder is to be the system that guarantees inference works for a valuable workflow. Not the system that produces tokens cheaply.

The first step on Monday morning: pick one vertical, build a scorecard of 20 failures in Hebrew calls, and schedule 10 interviews with contact center operators and voice-agent vendors. Do not write code before two buyers are willing to pay for a diagnostic.

If you run a contact center, build voice agents, or are weighing an entry into this market and want to work through it together, [book a call](https://futureproofagents.com/) or read about [how we work](https://futureproofagents.com/).

## 15. Sources

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

More useful sources: [OpenAI prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching) · [OpenAI pricing](https://openai.com/business/pricing/#api) · [Google Vertex AI pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) · [AWS Bedrock service tiers](https://aws.amazon.com/bedrock/service-tiers/) · [IEA Energy and AI](https://www.iea.org/reports/energy-and-ai)
