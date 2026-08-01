import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Scale,
  Gavel,
  ShieldAlert,
  Building2,
  Megaphone,
  Star,
  Radio,
  AlertTriangle,
  FileWarning,
  EyeOff,
  SearchX,
  Repeat,
  BadgePercent,
  Baby,
  Gift,
  Ban,
  MessageSquareWarning,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  ChevronDown,
  BookOpen,
  Sparkles,
  CircleDollarSign,
  ShieldCheck,
  Landmark,
  Info,
  ArrowDown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "AdVerdict | Misleading Advertisement & Endorser Liability",
      },
      {
        name: "description",
        content:
          "AdVerdict is an educational, scenario-based guide to misleading advertisements, endorser liability and India's Consumer Protection Act, 2019.",
      },
    ],
  }),
  component: Index,
});

type PartyId =
  | "manufacturer"
  | "advertiser"
  | "endorser"
  | "influencer";

type ViolationId =
  | "misleading"
  | "false"
  | "concealment"
  | "unsubstantiated"
  | "bait"
  | "surrogate"
  | "freeclaim"
  | "children"
  | "disclaimer"
  | "diligence"
  | "disclosure"
  | "repeated";

type Result = {
  provisions: string[];
  analysis: string;
  consequences: string[];
  note: string;
  tip: string;
};

const PARTIES = [
  {
    id: "manufacturer" as const,
    label: "Manufacturer",
    desc: "Makes or markets the product",
    Icon: Building2,
  },
  {
    id: "advertiser" as const,
    label: "Advertiser",
    desc: "Creates or commissions the ad",
    Icon: Megaphone,
  },
  {
    id: "endorser" as const,
    label: "Endorser",
    desc: "Lends name, image or opinion",
    Icon: Star,
  },
  {
    id: "influencer" as const,
    label: "Influencer",
    desc: "Promotes through digital media",
    Icon: Radio,
  },
];

const VIOLATIONS = [
  {
    id: "misleading" as const,
    label: "Misleading Advertisement",
    desc: "Creates a false or deceptive overall impression",
    Icon: AlertTriangle,
    group: "Claims",
  },
  {
    id: "false" as const,
    label: "False Claim",
    desc: "States a fact, benefit or guarantee that is false",
    Icon: FileWarning,
    group: "Claims",
  },
  {
    id: "concealment" as const,
    label: "Concealment of Material Information",
    desc: "Deliberately hides information important to a consumer",
    Icon: EyeOff,
    group: "Claims",
  },
  {
    id: "unsubstantiated" as const,
    label: "Unsubstantiated Claim",
    desc: "Makes an objective claim without adequate support",
    Icon: SearchX,
    group: "Claims",
  },
  {
    id: "bait" as const,
    label: "Bait Advertisement",
    desc: "Attracts consumers with an offer not genuinely intended or available",
    Icon: BadgePercent,
    group: "Practices",
  },
  {
    id: "surrogate" as const,
    label: "Surrogate Advertisement",
    desc: "Indirectly promotes goods or services whose advertising is restricted",
    Icon: Ban,
    group: "Practices",
  },
  {
    id: "freeclaim" as const,
    label: "Misleading ‘Free’ Claim",
    desc: "Uses ‘free’ or similar language while hiding real costs or conditions",
    Icon: Gift,
    group: "Practices",
  },
  {
    id: "children" as const,
    label: "Misleading Advertising Targeting Children",
    desc: "Uses prohibited or misleading practices aimed at children",
    Icon: Baby,
    group: "Special",
  },
  {
    id: "disclaimer" as const,
    label: "Misleading Disclaimer",
    desc: "Uses fine print to contradict, hide or materially alter the main claim",
    Icon: MessageSquareWarning,
    group: "Special",
  },
  {
    id: "diligence" as const,
    label: "Failure of Endorser Due Diligence",
    desc: "Endorsement is made without adequate verification of claims",
    Icon: ShieldAlert,
    group: "Endorsement",
  },
  {
    id: "disclosure" as const,
    label: "Material Connection Not Disclosed",
    desc: "A paid or material relationship is not clearly disclosed",
    Icon: CircleDollarSign,
    group: "Endorsement",
  },
  {
    id: "repeated" as const,
    label: "Subsequent Contravention",
    desc: "A further false or misleading advertisement after an earlier contravention",
    Icon: Repeat,
    group: "Enforcement",
  },
];

function computeResult(
  party: PartyId,
  violation: ViolationId,
): Result {
  const provisions = [
    "Consumer Protection Act, 2019 — Section 2(28): misleading advertisement",
    "Consumer Protection Act, 2019 — Section 21: CCPA directions and penalties",
  ];

  const consequences: string[] = [];

  let analysis =
    "The CCPA may investigate a false or misleading advertisement and direct the concerned trader, manufacturer, endorser, advertiser or publisher to discontinue or modify it under Section 21(1).";

  let note =
    "The exact consequence depends on the facts, evidence, role of each person and the authority's findings after investigation.";

  const guidelineMap: Partial<Record<ViolationId, string>> = {
    bait:
      "CCPA Guidelines for Prevention of Misleading Advertisements and Endorsements for Misleading Advertisements, 2022 — bait advertisements",

    surrogate:
      "CCPA Guidelines, 2022 — prohibition of surrogate advertisements",

    freeclaim:
      "CCPA Guidelines, 2022 — free claim advertisements",

    children:
      "CCPA Guidelines, 2022 — advertisements targeted at children",

    disclaimer:
      "CCPA Guidelines, 2022 — disclaimers in advertisements",

    diligence:
      "Consumer Protection Act, 2019 — Section 21(5), read with CCPA Guidelines, 2022 — due diligence for endorsements",

    disclosure:
      "CCPA Guidelines, 2022 — disclosure of material connection in endorsements",
  };

  if (guidelineMap[violation]) {
    provisions.push(guidelineMap[violation]!);
  }

  if (violation === "concealment") {
    provisions.push(
      "Consumer Protection Act, 2019 — Section 2(47): unfair trade practice may also be relevant depending on the facts",
    );
  }

  if (party === "manufacturer") {
    consequences.push(
      "CCPA penalty may extend to ₹10 lakh for a false or misleading advertisement; a subsequent contravention may extend to ₹50 lakh under Section 21(2).",

      "The CCPA may order the advertisement to be discontinued or modified under Section 21(1).",

      "Where Section 89 is attracted, a manufacturer may face imprisonment up to 2 years and fine up to ₹10 lakh; for every subsequent offence, up to 5 years and fine up to ₹50 lakh.",
    );

    provisions.push(
      "Consumer Protection Act, 2019 — Section 89: punishment for a manufacturer or service provider causing a false or misleading advertisement prejudicial to consumers",
    );
  } else if (party === "endorser") {
    consequences.push(
      "CCPA penalty may extend to ₹10 lakh; a subsequent contravention may extend to ₹50 lakh under Section 21(2).",

      "The CCPA may prohibit endorsements for up to 1 year; for a subsequent contravention, up to 3 years under Section 21(3).",

      "No penalty under Sections 21(2) and 21(3) applies if the endorser proves due diligence under Section 21(5).",
    );

    analysis +=
      " For an endorser, due diligence is especially important because Section 21(5) creates a statutory defence where the endorser has verified the veracity of the claims.";
  } else if (party === "influencer") {
    consequences.push(
      "If the influencer is acting as an endorser, the endorser provisions of Section 21 may become relevant, including penalty and endorsement prohibition, subject to the facts.",

      "If the person publishes or is party to publication of a misleading advertisement, Section 21(4) may allow a penalty up to ₹10 lakh, subject to the statutory defence in Section 21(6).",

      "Material connections should be disclosed clearly where the endorsement framework requires disclosure.",
    );

    provisions.push(
      "Consumer Protection Act, 2019 — Sections 21(3)–(6): endorser and publication-related provisions",
    );

    note =
      "‘Influencer’ is not a separate penalty category in Section 21. Liability depends on the influencer's legal role in the particular advertisement, including whether they are an endorser or are involved in publication.";
  } else {
    consequences.push(
      "The CCPA may direct an advertiser to discontinue or modify a false or misleading advertisement under Section 21(1).",

      "A person found to publish, or be party to publication of, a misleading advertisement may face a penalty up to ₹10 lakh under Section 21(4), subject to Section 21(6).",

      "A monetary penalty under Section 21(2) is specifically framed for a manufacturer or an endorser, so it should not automatically be assigned to every advertiser.",
    );

    provisions.push(
      "Consumer Protection Act, 2019 — Sections 21(1), 21(4) and 21(6)",
    );
  }

  if (violation === "repeated") {
    analysis +=
      " A later contravention can trigger the enhanced limits expressly provided for manufacturers and endorsers under Section 21 and, where Section 89 applies, for manufacturers or service providers.";
  }

  if (
    violation === "diligence" &&
    party !== "endorser" &&
    party !== "influencer"
  ) {
    note =
      "Failure of endorser due diligence is primarily an endorsement issue. For the selected party, another violation type may describe the legal issue more accurately.";
  }

  if (
    violation === "disclosure" &&
    party !== "endorser" &&
    party !== "influencer"
  ) {
    note =
      "Non-disclosure of a material connection is principally relevant to endorsements. The selected party may still have other responsibilities, but this scenario is most directly suited to an endorser or influencer.";
  }

  const tips: Record<ViolationId, string> = {
    misleading:
      "Read the overall message, not only the headline. Images, omissions and fine print can change what an advertisement communicates.",

    false:
      "Objective claims should be capable of proof. Treat dramatic guarantees as claims to verify, not facts to assume.",

    concealment:
      "Check conditions, exclusions, ingredients, risks and eligibility requirements before relying on the headline claim.",

    unsubstantiated:
      "Ask what evidence supports measurable claims such as ‘clinically proven’, ‘No. 1’ or specific performance percentages.",

    bait:
      "Check whether the advertised price, quantity and availability genuinely match what is offered when you try to buy.",

    surrogate:
      "Consider whether the advertisement is genuinely for the displayed product or is using branding to promote something else indirectly.",

    freeclaim:
      "‘Free’ should not quietly become ‘free after compulsory payment’. Read every condition attached to the offer.",

    children:
      "Advertising aimed at children receives special scrutiny because children may be more vulnerable to exaggerated or persuasive claims.",

    disclaimer:
      "A disclaimer should clarify a claim, not rescue a headline that is misleading on its face.",

    diligence:
      "A famous face is not evidence. Endorsers should verify claims, and consumers should independently assess them.",

    disclosure:
      "Paid, gifted or otherwise material brand relationships should be easy for viewers to recognize.",

    repeated:
      "Repeated conduct can attract enhanced consequences. Keep records of advertisements, dates and previous complaints where relevant.",
  };

  return {
    provisions: [...new Set(provisions)],
    analysis,
    consequences,
    note,
    tip: tips[violation],
  };
}

function Index() {
  const [party, setParty] = useState<PartyId | null>(null);
  const [violation, setViolation] = useState<ViolationId | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>("misleading");
  const [isResetting, setIsResetting] = useState(false);
  const [isNavigatingToResult, setIsNavigatingToResult] = useState(false);
  const [showPartyNotice, setShowPartyNotice] = useState(false);
const [closingNotice, setClosingNotice] = useState(false);

  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventDrag = (event: DragEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDrag);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDrag);
    };
  }, []);

  const result = useMemo(
    () =>
      party && violation
        ? computeResult(party, violation)
        : null,
    [party, violation],
  );

  const selectedParty = PARTIES.find((p) => p.id === party);

  const selectedViolation = VIOLATIONS.find(
    (v) => v.id === violation,
  );

  return (
    <div className="min-h-screen overflow-hidden">
      {/* HERO */}
      <header className="hero-shell text-primary-foreground">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />

        <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-center px-5 py-14 sm:px-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
            <Scale className="h-4 w-4" />
            Consumer Protection · India
          </div>

          {/* ADVERDICT BRAND */}
          <div className="mt-5 flex items-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em]">
              <span className="text-gold">AD</span>
              <span className="text-white">VERDICT</span>
            </span>
          </div>

          <h1 className="mt-3 max-w-3xl font-serif text-[3.2rem] leading-[0.88] tracking-[-0.045em] sm:text-7xl">
            Behind the Ad.
            <br />
            <span className="text-gold">
              Beyond the Claim.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-primary-foreground/72 sm:text-base">
            A concise guide to misleading advertisements,
            endorser liability and the legal consequences behind
            persuasive claims.
          </p>

          <a
            href="#intro"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2.5 text-xs font-semibold backdrop-blur-md transition hover:bg-white/14"
          >
            Explore
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main
  className={`transition-all duration-500 ${
    isResetting || isNavigatingToResult
      ? "blur-[3px] opacity-75 scale-[0.995]"
      : "blur-0 opacity-100 scale-100"
  }`}
>
        {/* INTRO */}
        <section
          id="intro"
          className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <IntroCard
              eyebrow="01 · THE CLAIM"
              title="Misleading Advertisement"
text="An advertisement may be misleading when it falsely describes a product or service, gives a false guarantee, misleads consumers about its nature, substance, quantity or quality, conveys a representation amounting to an unfair trade practice, or deliberately conceals important information."            />

            <IntroCard
              eyebrow="02 · THE FACE"
              title="Endorser Liability"
              text="Endorsers cannot treat advertising claims as somebody else's problem. Indian consumer law allows action against misleading endorsements, while also recognising a due-diligence defence."
            />
          </div>
        </section>

        {/* CALCULATOR */}
        <section
          id="calculator"
          className="mx-auto max-w-6xl px-4 pb-14 sm:px-8"
        >
          <div className="section-kicker">
            <Sparkles className="h-4 w-4" />
            Interactive Legal Scenario
          </div>

          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            Build the scenario.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Choose the role first, then the conduct. The result
            explains which provisions may be relevant instead of
            pretending every click produces the same penalty.
          </p>

{/* STEP 01 */}
<div
  id="party-section"
  className="mt-8 scroll-mt-6"
>
            <StepHeader
              step="01"
              title="Responsible Party"
            />
            {showPartyNotice && (
  <div
  className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]
  ${
    closingNotice
      ? "max-h-0 opacity-0 scale-y-95 mt-0"
      : "max-h-40 opacity-100 mt-4"
  }`}
>

    <div className="flex items-center gap-3 px-5 py-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
      </div>

      <div>
        <p className="font-semibold text-amber-900">
          Responsible Party Required
        </p>

        <p className="text-sm text-amber-700">
          Please select a responsible party before choosing a violation.
        </p>
      </div>

    </div>

  </div>
)}
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {PARTIES.map((p) => (
  <OptionCard
    key={p.id}
    active={party === p.id}
    onClick={() => {
      setParty(p.id);
      setClosingNotice(true);

setTimeout(() => {
  setShowPartyNotice(false);
  setClosingNotice(false);
}, 350);

      setTimeout(() => {
        document.getElementById("violation-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);
    }}
    Icon={p.Icon}
    label={p.label}
    desc={p.desc}
  />
))}
            </div>
          </div>

{/* STEP 02 */}
<div
  id="violation-section"
  className="mt-10 scroll-mt-6"
>
            <StepHeader
              step="02"
              title="Type of Violation"
            />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {VIOLATIONS.map((v) => (
  <OptionCard
    key={v.id}
    active={violation === v.id}
onClick={() => {

  // Don't allow selecting a violation first
if (!party) {

  setShowPartyNotice(true);

  document.getElementById("party-section")?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  return;
}

  // Select the violation
  setViolation(v.id);

  // Existing animation
  setIsNavigatingToResult(true);

  setTimeout(() => {
    document.getElementById("scenario-result")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

  setTimeout(() => {
    setIsNavigatingToResult(false);
  }, 700);

}}    Icon={v.Icon}
    label={v.label}
    desc={v.desc}
    tag={v.group}
  />
))}
            </div>
          </div>

          {/* STEP 03 */}
          <div id="scenario-result" className="mt-10 scroll-mt-6">

            {result &&
            selectedParty &&
            selectedViolation ? (
              <div className="mt-4 overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-elegant animate-result-reveal">
                <div className="result-head px-5 py-6 text-primary-foreground sm:px-7">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.22em] text-gold">
                    <ShieldAlert className="h-4 w-4" />
                    Scenario analysis
                  </div>

                  <h3 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
                    {selectedParty.label}{" "}
                    <span className="text-gold">×</span>{" "}
                    {selectedViolation.label}
                  </h3>
                </div>

                <div className="space-y-4 p-4 sm:p-7">
                  <ResultSection
                    Icon={BookOpen}
                    title="Applicable Law"
                    items={result.provisions}
                  />

                  <div className="result-panel">
                    <div className="result-title">
                      <Scale className="h-4 w-4" />
                      How the law applies
                    </div>

                    <p>{result.analysis}</p>
                  </div>

                  <ResultSection
                    Icon={Gavel}
                    title="Possible Legal Consequences"
                    items={result.consequences}
                    accent
                  />

                  <div className="result-panel border-gold/35 bg-accent/45">
                    <div className="result-title">
                      <Info className="h-4 w-4" />
                      Important legal note
                    </div>

                    <p>{result.note}</p>
                  </div>

                  <div className="result-panel border-gold/35 bg-accent/45">
                    <div className="result-title">
                      <Lightbulb className="h-4 w-4" />
                      Consumer awareness
                    </div>

                    <p>{result.tip}</p>
                  </div>

                  <button
  onClick={() => {
    setIsResetting(true);

    document.getElementById("calculator")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      setParty(null);
      setViolation(null);
    }, 300);

    setTimeout(() => {
      setIsResetting(false);
    }, 650);
  }}
  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:bg-muted active:scale-95"
>
  <RotateCcw
    className={`h-3.5 w-3.5 ${
      isResetting ? "animate-spin" : ""
    }`}
  />
  {isResetting ? "Resetting..." : "Reset scenario"}
</button>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-[1.6rem] border border-dashed border-border bg-card/55 p-8 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent">
                  <Scale className="h-5 w-5" />
                </div>

                <h3 className="mt-3 font-serif text-xl">
                  Waiting for your scenario
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                  Select one responsible party and one violation
                  to generate a structured legal overview.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* KNOWLEDGE SECTION */}
        <section className="knowledge-shell border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
            <div className="section-kicker">
              <BookOpen className="h-4 w-4" />
              Understand the framework
            </div>

            <h2 className="mt-2 max-w-2xl font-serif text-3xl sm:text-5xl">
              The detail behind the result.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              The calculator is the quick version. This section
              explains the ideas that matter when reading the
              result.
            </p>

            <div className="mt-8 space-y-3">
              <InfoAccordion
                id="misleading"
                open={openInfo === "misleading"}
                onClick={() =>
                  setOpenInfo(
                    openInfo === "misleading"
                      ? null
                      : "misleading",
                  )
                }
                Icon={AlertTriangle}
                title="Understanding Misleading Advertisements"
              >
                <p>
                  Section 2(28) of the Consumer Protection Act,
                  2019 covers advertisements that falsely describe
                  a product or service, give a false guarantee,
                  convey an express or implied representation
                  amounting to an unfair trade practice, or
                  deliberately conceal important information.
                </p>

                <p>
                  The legal question is therefore wider than
                  whether one sentence is literally false. The
                  overall representation, material omissions and
                  the effect on consumers can matter.
                </p>
              </InfoAccordion>

              <InfoAccordion
                id="endorser"
                open={openInfo === "endorser"}
                onClick={() =>
                  setOpenInfo(
                    openInfo === "endorser"
                      ? null
                      : "endorser",
                  )
                }
                Icon={Star}
                title="Endorser Liability & Due Diligence"
              >
                <p>
                  Section 21 allows the CCPA to act against
                  misleading endorsements. An endorser may face a
                  monetary penalty and, where the Authority
                  considers it necessary, a temporary prohibition
                  on making endorsements.
                </p>

                <p>
                  Section 21(5) is crucial: an endorser is not
                  liable to the penalties under Sections 21(2)
                  and 21(3) if due diligence was exercised to
                  verify the truth of the claims. The 2022 CCPA
                  Guidelines further explain standards for
                  endorsements and due diligence.
                </p>
              </InfoAccordion>

              <InfoAccordion
                id="ccpa"
                open={openInfo === "ccpa"}
                onClick={() =>
                  setOpenInfo(
                    openInfo === "ccpa"
                      ? null
                      : "ccpa",
                  )
                }
                Icon={Landmark}
                title="What the CCPA Can Do"
              >
                <p>
                  After investigation, Section 21(1) allows the
                  Central Consumer Protection Authority to direct
                  a trader, manufacturer, endorser, advertiser or
                  publisher to discontinue or modify a false or
                  misleading advertisement.
                </p>

                <p>
                  Section 21 separately provides monetary
                  consequences for manufacturers, endorsers and
                  persons involved in publication. The exact
                  subsection matters, which is why the scenario
                  result distinguishes between roles.
                </p>
              </InfoAccordion>

              <InfoAccordion
                id="guidelines"
                open={openInfo === "guidelines"}
                onClick={() =>
                  setOpenInfo(
                    openInfo === "guidelines"
                      ? null
                      : "guidelines",
                  )
                }
                Icon={ShieldCheck}
                title="2022 Advertising & Endorsement Guidelines"
              >
                <p>
                  The CCPA's 2022 Guidelines supplement the Act
                  with practical standards for valid
                  advertisements and endorsements. They address
                  matters including bait advertisements, free
                  claims, advertisements targeted at children,
                  surrogate advertising, disclaimers and due
                  diligence by endorsers.
                </p>

                <p>
                  They help turn broad consumer-protection
                  principles into more specific advertising
                  standards.
                </p>
              </InfoAccordion>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-shell text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-gold" />

            <span className="text-[10px] font-bold uppercase tracking-[.24em]">
              <span className="text-gold">AD</span>
              <span className="text-white">VERDICT</span>
            </span>
          </div>

          <h2 className="mt-3 font-serif text-2xl">
            Know the claim. Know the law.
          </h2>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-[11px] leading-5 text-white/60">
            <strong className="text-white/80">
              Educational disclaimer.
            </strong>{" "}
            This project is created solely for educational and
            academic purposes. It provides general legal
            information and does not constitute legal advice,
            legal opinion or a substitute for consultation with
            a qualified legal professional. Statutory text and
            official government publications should be consulted
            for authoritative information.
          </div>

          <div className="mt-7 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.16em] text-white/40">
            © 2026 AdVerdict. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function IntroCard({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-card">
      <div className="text-[9px] font-bold uppercase tracking-[.22em] text-muted-foreground">
        {eyebrow}
      </div>

      <h2 className="mt-2 font-serif text-2xl">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

function StepHeader({
  step,
  title,
}: {
  step: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
        {step}
      </span>

      <h2 className="font-serif text-2xl">
        {title}
      </h2>
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  Icon,
  label,
  desc,
  tag,
}: {
  active: boolean;
  onClick: () => void;
  Icon: typeof Scale;
  label: string;
  desc: string;
  tag?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative min-h-[132px] rounded-[1.35rem] border p-4 text-left transition-all ${
        active
          ? "border-gold bg-primary text-primary-foreground shadow-elegant -translate-y-0.5"
          : "border-border bg-card hover:border-gold/60 hover:-translate-y-0.5 hover:shadow-card"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          active
            ? "bg-gold text-primary"
            : "bg-accent text-primary"
        }`}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>

      {tag && (
        <span
          className={`absolute right-3 top-3 text-[8px] font-bold uppercase tracking-[.16em] ${
            active
              ? "text-white/45"
              : "text-muted-foreground"
          }`}
        >
          {tag}
        </span>
      )}

      <div className="mt-3 pr-2 text-sm font-semibold leading-tight">
        {label}
      </div>

      <div
        className={`mt-1 text-[11px] leading-4 ${
          active
            ? "text-white/65"
            : "text-muted-foreground"
        }`}
      >
        {desc}
      </div>

      {active && (
        <CheckCircle2 className="absolute bottom-3 right-3 h-4 w-4 text-gold" />
      )}
    </button>
  );
}

function ResultSection({
  Icon,
  title,
  items,
  accent,
}: {
  Icon: typeof Scale;
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="result-panel">
      <div className="result-title">
        <Icon
          className={`h-4 w-4 ${
            accent ? "text-destructive" : ""
          }`}
        />

        {title}
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex gap-2.5 rounded-xl bg-muted/60 p-3 text-xs leading-5"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                accent
                  ? "bg-destructive"
                  : "bg-gold"
              }`}
            />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoAccordion({
  open,
  onClick,
  Icon,
  title,
  children,
}: {
  id: string;
  open: boolean;
  onClick: () => void;
  Icon: typeof Scale;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent">
          <Icon className="h-4 w-4" />
        </span>

        <span className="flex-1 font-serif text-lg">
          {title}
        </span>

        <ChevronDown
          className={`h-4 w-4 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-3 border-t border-border px-4 py-4 text-sm leading-6 text-muted-foreground animate-fade-up">
          {children}
        </div>
      )}
    </div>
  );
}