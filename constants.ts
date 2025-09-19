
import type { Diagram } from './types';

// Shared class for exception nodes
const CLASSDEF = "classDef ex fill:#fff3cd,stroke:#f0ad4e,color:#8a6d3b;\n";

export const DIAGRAMS: Diagram[] = [
  // GROUP: Alie Network — Growth Engine
  {
    id: "AG0",
    group: "Alie Network — Growth Engine",
    title: "System Overview (Use-Case)",
    code: `flowchart LR\n  A1([Prospect Project])\n  A2([KOL Creator])\n  A3([Alie Team])\n  subgraph SYS[Alie Growth Engine]\n    UC1((Request SAGA Lite))\n    UC2((Book Call))\n    UC3((Run SAGA Scoring))\n    UC4((Build 30-day Plan))\n    UC5((Launch KOL Campaign))\n    UC6((Publish Content))\n    UC7((Track UTMs and Events))\n    UC8((Weekly Snapshot))\n    UC9((Optimize and Retarget))\n  end\n  A1 --> UC1\n  A1 --> UC2\n  A3 --> UC3\n  A3 --> UC4\n  A3 --> UC5\n  A2 --> UC5\n  A3 --> UC6\n  A3 --> UC7\n  A3 --> UC8\n  A3 --> UC9`,
  },
  {
    id: "AG1",
    group: "Alie Network — Growth Engine",
    title: "Growth Funnel (Activity with swimlanes)",
    code: `flowchart LR\n  ${CLASSDEF}  subgraph CL[Client Team]\n    C0([Kickoff])\n    C1[Approve ICP and Offer]\n    C2[Green-light KOL shortlist]\n    C3[Publish site updates and CTA]\n    C4([Handoff and Review])\n  end\n  subgraph AL[Alie Network]\n    A1[Run SAGA score]\n    A2[Build 30-day plan]\n    A3[Draft posts and thread and prompt]\n    A4[Brief KOLs<br/>unique links + codes]\n    A5[UTM and event setup]\n    A6[Weekly snapshot and report]\n  end\n  subgraph KO[KOL Creators]\n    K1[Accept brief]\n    K2[Post #ad content]\n    K3[Drive to CTA link]\n  end\n  subgraph CM[Community]\n    M1[See content]\n    M2[Click CTA]\n    M3[Join Discord]\n    M4[First action: claim / swap / book]\n  end\n  C0-->A1-->A2-->C1-->A3-->C2-->A4-->K1-->K2-->M1-->M2-->A5-->M3-->M4-->A6-->C4\n  D1{CTR above target?}\n  D2{Activation above target?}\n  K2-->D1\n  D1-- Yes -->M1\n  D1-- No -->A3\n  M4-->D2\n  D2-- Yes -->A6\n  D2-- No -->A4\n  E1{{Creator delay}}:::ex\n  E2{{Tracking broken}}:::ex\n  E3{{Negative feedback spike}}:::ex\n  K1-->E1\n  A5-->E2\n  M1-->E3`,
  },
  {
    id: "AG2",
    group: "Alie Network — Growth Engine",
    title: "Measurement Map (Use-Case)",
    code: `flowchart LR\n  U([Visitor or User])\n  subgraph SYS[Growth Stack]\n    EV1((wallet_connect))\n    EV2((swap_one))\n    EV3((claim_ai_land))\n    EV4((book_call))\n    EV5((join_discord))\n    KP((Dashboard and UTM))\n  end\n  U --> EV1\n  U --> EV3\n  U --> EV4\n  EV1 --> EV2\n  EV3 --> KP\n  EV4 --> KP\n  EV5 --> KP`,
  },
  {
    id: "AG3",
    group: "Alie Network — Growth Engine",
    title: "KOL Collaboration (Sequence)",
    code: `sequenceDiagram\n  autonumber\n  participant G as Growth Lead (Client)\n  participant A as Alie Network\n  participant K as KOL\n  participant T as Tracking\n  G->>A: Approve shortlist and budget\n  A-->>G: Briefs and talking points\n  A->>K: Outreach and #ad policy\n  K-->>A: Accept and publish window\n  A->>T: Create UTM and unique codes\n  K->>G: Post goes live (#ad)\n  G-->>T: Traffic and events flow in\n  T-->>A: Weekly snapshot\n  A-->>G: Optimize: creative or creator\n  alt Issues\n    K-->>A: Delay or reshoot\n    T-->>A: Broken link or mismatch\n  end`,
  },
  {
    id: "AG4",
    group: "Alie Network — Growth Engine",
    title: "14-Day Launch Plan (Swimlane summary)",
    code: `flowchart LR\n  ${CLASSDEF}  subgraph Week1\n    W1a[Day1: Publish Offer Matrix and SAGA page]\n    W1b[Day2: KOL shortlist and briefs]\n    W1c[Day3: AI Land promo push - 2 creatives]\n    W1d[Day4: Dev AMA announcement]\n    W1e[Day5: KOL wave 1 live]\n    W1f[Day6 to 7: Iterate and community recap]\n  end\n  subgraph Week2\n    W2a[Day8: Agent Launch demo clip]\n    W2b[Day9: KOL wave 2 and retarget copy]\n    W2c[Day10: Mini case study 1]\n    W2d[Day11: Spaces or AMA live]\n    W2e[Day12: Update deck and metrics]\n    W2f[Day13 to 14: Growth report and next sprint]\n  end\n  W1a-->W1b-->W1c-->W1d-->W1e-->W1f-->W2a-->W2b-->W2c-->W2d-->W2e-->W2f\n  E1{{Budget shift}}:::ex\n  E2{{Creator drop}}:::ex\n  E3{{Platform policy flag}}:::ex\n  W1e-->E2\n  W1c-->E3\n  W2b-->E1`,
  },
  {
    id: "AG5",
    group: "Alie Network — Growth Engine",
    title: "Risk and Trust Mitigation (Flow)",
    code: `flowchart LR\n  ${CLASSDEF}  S1([Start])-->A1[Request contract audit]\n  A1-->A2[Publish LP lock proof]\n  A2-->A3[Holder distribution post]\n  A3-->A4[Public roadmap and status]\n  A4-->A5[Weekly transparency update]\n  A5-->E([End])\n  A1-.Missing audit.->X1{{High risk}}:::ex\n  A2-.LP not locked.->X2{{High risk}}:::ex`,
  },
  // GROUP: TAIX AI — Growth Proposal
  {
    id: "TX0",
    group: "TAIX AI — Growth Proposal",
    title: "TAIX AI Partnership Proposal (Sequence)",
    code: `sequenceDiagram
  autonumber
  participant AN as Alie Network
  participant TX as TAIX AI Team
  participant AWS as AWS
  participant QW as QORPO World
  AN->>TX: S.A.G.A. Lite audit & transparency concerns
  TX-->>AN: Acknowledge risks (GitHub, Whitepaper)
  AN->>TX: Request partner verification
  TX->>AWS: Confirm AWS Gen AI partnership
  AWS-->>TX: Provide verification assets
  TX->>QW: Confirm integration details
  QW-->>TX: Provide joint marketing assets
  TX-->>AN: Share verified partner info
  AN->>TX: Propose 'Trust & Traction' Growth Plan
  TX-->>AN: Green-light 30-day sprint`,
  },
  {
    id: "TX1",
    group: "TAIX AI — Growth Proposal",
    title: "Trust Building Workflow (Swimlanes)",
    code: `flowchart LR
  ${CLASSDEF}
  subgraph AN[Alie Network]
    A1["Identify trust gaps<br/>(GitHub, Whitepaper, Team)"]
    A2[Draft 'Trust Package' content]
    A3[Verify partner claims with AWS/QORPO]
    A4[Monitor community sentiment]
  end
  subgraph TX[TAIX AI Team]
    T1[Provide internal docs<br/>and team bios]
    T2[Request official partner statements]
    T3[Review and approve all public content]
  end
  subgraph PC[Public Communications]
    P1[Publish 'Meet the Founders' blog post]
    P2[Launch technical deep-dive series]
    P3[Add official contract address to site]
    P4[Update website with accessible Whitepaper]
  end
  A1-->T1-->A2
  A1-->T2-->A3
  A2-->T3
  A3-.Partner claim unverified.->E1{{High Risk}}:::ex
  T3-->P1
  T3-->P2
  T3-->P3
  T3-->P4
  P1-->A4
  P2-->A4`,
  },
  {
    id: "TX2",
    group: "TAIX AI — Growth Proposal",
    title: "30-Day 'Trust & Traction' Plan (Flow)",
    code: `flowchart TD
  ${CLASSDEF}
  S([Start])-->W1[Week 1: Transparency Push<br/>Publish Whitepaper & 'Meet the Team' series]
  W1-->W2[Week 2: Technical Showcase<br/>Dev blog on AWS integration & open-source key libraries]
  W2-->W3[Week 3: Product in Action<br/>KOL streams using TAIX in Citizen Conflict]
  W3-->W4[Week 4: Ecosystem AMA<br/>Host joint AMA with QORPO World. Announce updated roadmap.]
  W4-->E([End])
  W2-.Cannot open-source code.->X1{{Transparency Fail}}:::ex
  W3-.KOLs report tech issues.->X2{{Product Risk}}:::ex`,
  },
  {
    id: "TX3",
    group: "TAIX AI — Growth Proposal",
    title: "Core Features for Stakeholders (Use-Case)",
    code: `flowchart TD
  subgraph Actors
    direction LR
    A1(Streamer)
    A2(Viewer)
    A3(Game Studio)
  end
  subgraph TAIX[TAIX AI Platform]
    U1((AI Commentary &<br/>Multilingual Translation))
    U2((Auto-Generated<br/>Highlight Clips))
    U3((Stream-to-Earn<br/>with Diamond Rewards))
    U4((Real-time Player<br/>Sentiment Analytics))
  end
  A1 --> U1
  A1 --> U2
  A2 --> U3
  A3 --> U4`,
  },
  {
    id: "TX4",
    group: "TAIX AI — Growth Proposal",
    title: "Ecosystem Integration Map (Use-Case)",
    code: `flowchart LR
  TAIX(TAIX AI Core)
  subgraph "Infrastructure & Launch"
    direction TB
    AWS([AWS Gen AI Center])
    TOY([TOY CHAIN])
    SEEDIFY([Seedify Launchpad])
  end
  subgraph "Gaming Ecosystem"
    direction TB
    QORPO([QORPO World])
    CC([Citizen Conflict])
    AM([AneeMate])
  end
  TAIX -- built on --> TOY
  TAIX -- powered by --> AWS
  TAIX -- launched via --> SEEDIFY
  TAIX -- integrates with --> QORPO
  QORPO -- features --> CC
  QORPO -- features --> AM`,
  },
];
