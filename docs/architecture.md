# Architecture

The package is modular and local-first. It does not require a database or a cloud service. A host can add persistence, browser engines, or remote platform adapters at the marked boundaries without changing the canonical report schema.

## Component overview

```mermaid
flowchart LR
  U[Developer or AI agent] --> C[Command parser]
  C --> I[Input loader\nURL, file, inline HTML]
  I --> O[Audit orchestrator]
  O --> R[WCAG rule registry\n2.1 or 2.2 scope]
  O --> D[Deterministic source detectors]
  R --> M[Manual and semi-automated queue]
  D --> F[Report formatter]
  M --> F
  F --> J[JSON / Markdown / HTML]
  J --> G[CI gate or fixing agent]
```

## Data flow

```mermaid
flowchart TD
  A[Target] --> B{Input type}
  B -->|URL| C[Timed fetch]
  B -->|file| D[Local read]
  B -->|HTML| E[Inline source]
  C --> F[Static evidence checks]
  D --> F
  E --> F
  F --> G[Findings plus criterion references]
  G --> H[Manual review queue]
  H --> I[Canonical JSON report]
  I --> J[CI baseline / rendered export / delegation]
```

## Audit sequence

```mermaid
sequenceDiagram
  participant User as Developer/agent
  participant CLI as Command adapter
  participant Load as Input loader
  participant Audit as Orchestrator
  participant Report as Formatter
  User->>CLI: /audit target --level AA --version 2.2
  CLI->>Load: read or fetch with timeout
  Load-->>Audit: HTML and source identity
  Audit->>Audit: deterministic checks + scope resolution
  Audit->>Audit: append mandatory review items
  Audit-->>Report: canonical findings
  Report-->>User: JSON/Markdown/HTML + disclaimer
```

## Platform integration

```mermaid
flowchart LR
  P[Platform request] --> A[Claude MCP adapter]
  P --> B[Codex skill/CLI adapter]
  P --> C[Gemini function adapter]
  A --> K[Canonical command contract]
  B --> K
  C --> K
  K --> L[Core package]
  L --> Q[Optional browser engines]
  L --> T[Task payload]
  T --> X[Host fixing agent]
```

The adapter must preserve report JSON verbatim, label any external-engine evidence with tool/version, and never erase the manual queue. A critical/high delegation is eligible for automatic task creation; applying a repair remains a host-authorized write.
