import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";

import overallPipeline from "images/overall_pipeline.png";

const HeadingRow = tw.div`flex flex-col items-center`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Subheading = tw(SubheadingBase)`text-primary-500 mb-4 text-center`;

const SectionTitle = tw.h2`text-2xl font-bold text-gray-900 mt-16`;
const SectionSubtitle = tw.p`mt-2 text-gray-600`;
const Paragraph = tw.p`mt-4 text-gray-700 leading-relaxed`;
const ContentBlock = tw.div`bg-white rounded-xl border border-gray-100 shadow-sm p-6`;
const BulletList = tw.ul`mt-4 space-y-2 list-disc list-inside text-gray-700`;
const BulletItem = tw.li`leading-relaxed`;
const NextList = tw.ul`mt-4 space-y-3 list-none`;
const NextItem = tw.li`flex gap-3 text-gray-700 leading-relaxed`;
const NextBullet = tw.span`flex-none w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold`;

const LimitationsBox = tw.div`bg-gray-100 rounded-xl p-6 mt-8 border border-gray-200`;
const LimitationsTitle = tw.h4`text-gray-900 font-bold mb-3`;
const LimitationsList = tw.ul`text-gray-700 space-y-2 list-disc list-inside`;

const PipelineSection = tw.div`mt-12 text-center`;
const PipelineDescription = tw.p`mt-4 text-gray-600 leading-relaxed max-w-3xl mx-auto`;
const PipelineImageContainer = tw.div`mt-8 flex justify-center`;
const PipelineImage = tw.img`w-full max-w-6xl rounded-lg shadow-xl`;

const TargetUserList = tw.ul`mt-4 space-y-2 list-disc list-inside text-gray-700`;

const RigorBox = tw.div`bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6`;
const RigorGrid = tw.div`grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4`;
const RigorCard = tw.div`bg-gray-100 rounded-xl border border-gray-200 p-5`;
const RigorCardTitle = tw.h4`text-gray-900 font-semibold mb-2`;
const RigorCardText = tw.p`text-gray-700 leading-relaxed text-sm sm:text-base`;

const ContributionsGrid = tw.div`grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6`;
const ContributionCard = tw.div`bg-white rounded-xl border border-gray-100 shadow-sm p-6`;
const ContributionTitle = tw.h4`text-gray-900 font-semibold mb-3`;
const ContributionList = tw.ul`text-gray-700 space-y-2 list-disc list-inside`;

const CreditsBox = tw.div`bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6`;
const CreditsList = tw.ul`text-gray-700 space-y-2 list-disc list-inside`;
const CreditLink = tw.a`text-primary-500 hover:text-primary-700 underline underline-offset-2`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Overview</Subheading>
            <Heading>Overview</Heading>
            <Paragraph css={tw`text-center max-w-2xl mt-4`}>
              What we solve, who it&apos;s for, and how we approach it.
            </Paragraph>
          </HeadingRow>

          <SectionTitle>🎯 Problem Statement</SectionTitle>
          <SectionSubtitle>
            What problem are we solving?
          </SectionSubtitle>

          <ContentBlock css={tw`mt-6`}>
            <Paragraph>
              Large language models are increasingly used to explain complex technical concepts to
              students and general users. However, existing benchmarks mainly evaluate correctness
              and reasoning accuracy, rather than how effectively models communicate explanations
              to real learners.
            </Paragraph>
            <Paragraph>
              Moreover, automated evaluation systems such as LLM-as-Judge are widely adopted for
              scalability, yet their alignment with human judgment remains unclear. Small changes in
              prompt wording, style, or persona can significantly alter explanation quality and
              model rankings.
            </Paragraph>
            <Paragraph css={tw`mt-4 font-semibold`}>Our project addresses two core problems:</Paragraph>
            <BulletList>
              <BulletItem>
                How sensitive are LLM explanations to prompt style, audience specification, and
                persona framing?
              </BulletItem>
              <BulletItem>
                How well do automated LLM-based evaluations align with real human judgments?
              </BulletItem>
            </BulletList>
            <Paragraph>
              By systematically studying these issues, we aim to better understand both
              explanation quality and the reliability of evaluation systems themselves.
            </Paragraph>
          </ContentBlock>

          <SectionTitle>Target Users</SectionTitle>
          <SectionSubtitle>
            Who benefits from this benchmark and its findings?
          </SectionSubtitle>

          <ContentBlock css={tw`mt-6`}>
            <TargetUserList>
              <li>
                <strong>Researchers</strong> studying LLM evaluation, explainability, or
                human–AI alignment who need rigorous comparisons of prompt styles and judge
                reliability.
              </li>
              <li>
                <strong>Developers</strong> building explanation systems, tutoring tools, or
                content pipelines who want to choose and refine prompts that align with human
                preferences.
              </li>
              <li>
                <strong>Educators and institutions</strong> adopting LLMs for teaching or support;
                the benchmark helps assess whether automated scores reflect real learner
                understanding and where human feedback remains essential.
              </li>
            </TargetUserList>
          </ContentBlock>

          <SectionTitle>Our Pipeline</SectionTitle>
          <SectionSubtitle>
            How we combine LLM judges and human evaluation to identify effective prompt styles.
          </SectionSubtitle>

          <PipelineSection>
            <PipelineDescription>
              An iterative ranking-and-improvement pipeline that combines LLM judges with human
              evaluations to systematically identify and refine the most effective prompt styles.
            </PipelineDescription>
            <PipelineImageContainer>
              <PipelineImage src={overallPipeline} alt="Overall Pipeline" />
            </PipelineImageContainer>
          </PipelineSection>

          <SectionTitle>Rigor</SectionTitle>
          <SectionSubtitle>
            Dataset description, splits, and leakage/validity considerations.
          </SectionSubtitle>

          <RigorBox>
            <RigorGrid>
              <RigorCard>
                <RigorCardTitle>Dataset</RigorCardTitle>
                <RigorCardText>
                  Concepts are constructed from publicly available Wikipedia domain glossaries
                  (Artificial Intelligence, Computer Science, and Statistics). We select{" "}
                  <strong>30 concepts</strong> total, split evenly as <strong>10 per domain</strong>.
                </RigorCardText>
              </RigorCard>

              <RigorCard>
                <RigorCardTitle>Splits & protocol</RigorCardTitle>
                <RigorCardText>
                  We evaluate across <strong>domains</strong> (AI/CS/Stats), <strong>rounds</strong>{" "}
                  (Round 1 base prompts vs Round 2 refined prompts), and <strong>judges</strong>{" "}
                  (LLM-as-Judge pairwise comparison and Human-Judge rubric scoring). Round 1 uses{" "}
                  <strong>5 base prompt templates</strong> per concept (150 explanations). Round 2
                  adds <strong>5 refined prompts</strong> (300 explanations total across both rounds).
                </RigorCardText>
              </RigorCard>

              <RigorCard>
                <RigorCardTitle>Leakage & validity</RigorCardTitle>
                <RigorCardText>
                  Concepts come from Wikipedia glossaries, which may be present in model pretraining.
                  We therefore focus evaluation on <em>explanation quality</em> (clarity, readability,
                  approachability) rather than novelty of facts. To mitigate positional/stochastic
                  artifacts in LLM judging, each pair is evaluated in reverse order (A→B and B→A),
                  with ties when inconsistent and up to three retries for invalid outputs. A further
                  validity consideration is that the same model family is used for generation and
                  judging, which can introduce correlated preferences; we report human-vs-LLM
                  agreement and analyze divergence.
                </RigorCardText>
              </RigorCard>
            </RigorGrid>
          </RigorBox>

          <SectionTitle>Contributions</SectionTitle>
          <SectionSubtitle>
            What we built vs. what we reused.
          </SectionSubtitle>

          <ContributionsGrid>
            <ContributionCard>
              <ContributionTitle>Built by the team</ContributionTitle>
              <ContributionList>
                <li>
                  End-to-end evaluation pipeline: concept selection, prompt templating, explanation
                  generation, pairwise judging, Elo aggregation, and leaderboard.
                </li>
                <li>
                  Iterative prompt refinement loop: identify systematic weaknesses and produce a
                  second-round refined prompt set for re-evaluation.
                </li>
                <li>
                  Bias-mitigation protocol for LLM-as-Judge: reverse-order comparisons, tie policy,
                  and validity retries.
                </li>
                <li>
                  Human evaluation rubric workflow and human-vs-LLM comparison analyses (correlation,
                  stability, and qualitative preference differences).
                </li>
                <li>
                  Public website: interactive leaderboard and visualization dashboard for results.
                </li>
              </ContributionList>
            </ContributionCard>

            <ContributionCard>
              <ContributionTitle>Reused / external components</ContributionTitle>
              <ContributionList>
                <li>Wikipedia domain glossaries for concept sourcing.</li>
                <li>Hosted LLM APIs for generation and LLM-as-Judge evaluation.</li>
                <li>
                  Standard Elo rating methodology to aggregate noisy pairwise outcomes into stable
                  rankings.
                </li>
                <li>Open-source frontend tooling (React, React Router, Twin.macro, Styled Components).</li>
              </ContributionList>
            </ContributionCard>
          </ContributionsGrid>

          <SectionTitle>Credits & citations</SectionTitle>
          <SectionSubtitle>
            External datasets, tools, and models used in this project (where relevant).
          </SectionSubtitle>

          <CreditsBox>
            <CreditsList>
              <li>
                Concept sources: Wikipedia glossaries (AI/CS/Stats).{" "}
                <CreditLink
                  href="https://en.wikipedia.org/wiki/Wikipedia:Glossaries"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wikipedia Glossaries
                </CreditLink>
              </li>
              <li>
                Generation + LLM-as-Judge model: GPT-5-Nano (hosted API).{" "}
                <CreditLink href="https://openai.com/" target="_blank" rel="noreferrer">
                  OpenAI
                </CreditLink>
              </li>
              <li>
                Pairwise aggregation: Elo rating system.{" "}
                <CreditLink href="https://en.wikipedia.org/wiki/Elo_rating_system" target="_blank" rel="noreferrer">
                  Elo rating system
                </CreditLink>
              </li>
            </CreditsList>
          </CreditsBox>

          <SectionTitle>Why This Project Matters</SectionTitle>
          <SectionSubtitle>
            Our project highlights two critical gaps:
          </SectionSubtitle>

          <ContentBlock css={tw`mt-6`}>
            <BulletList>
              <BulletItem>
                <strong>Prompt Sensitivity</strong> – Small changes in instruction style can
                dramatically affect explanation quality. Without systematic testing, model
                performance may appear better (or worse) than it truly is.
              </BulletItem>
              <BulletItem>
                <strong>Judge Misalignment</strong> – Automated LLM-based evaluation does not
                always agree with human judgment. Understanding this gap is essential before
                relying on LLM-as-Judge systems for research or deployment.
              </BulletItem>
            </BulletList>
            <Paragraph css={tw`mt-4`}>
              By systematically comparing prompt styles, automated judging, and human preferences,
              our benchmark helps researchers and developers better understand how explanation
              quality is shaped — and how evaluation systems themselves may be biased or unstable.
            </Paragraph>
            <Paragraph css={tw`mt-4`}>
              Ultimately, this work contributes to building more transparent, robust, and
              human-aligned AI systems.
            </Paragraph>
          </ContentBlock>

          <SectionTitle>Limitations / failure modes acknowledged</SectionTitle>
          <SectionSubtitle>
            Our results also reveal limits and failure modes that users of this benchmark and
            LLM-as-Judge systems should keep in mind.
          </SectionSubtitle>

          <LimitationsBox>
            <LimitationsTitle>Limitations</LimitationsTitle>
            <LimitationsList>
              <li>
                <strong>Moderate human–LLM agreement.</strong> Spearman ρ ≈ 0.73 indicates
                reasonable but imperfect alignment. The LLM judge can disagree with human rankings
                on specific prompts; scatter plots show clear outliers where automated and human
                judgments diverge. Relying on LLM-as-Judge alone may misrank or miss such cases.
              </li>
              <li>
                <strong>Stylistic bias.</strong> Humans favor structured, comprehensive
                explanations, while our LLM judge tends to prefer shorter, more concise and fluent
                responses. This divergence implies that high LLM-as-Judge scores do not guarantee
                human-preferred style or clarity; evaluation can be biased toward a particular
                presentation style.
              </li>
              <li>
                <strong>Scale of human evaluation.</strong> Human annotations in this benchmark are
                limited in size and diversity. Broader or more representative human feedback could
                refine or change conclusions about correlation, stability, and preferred style.
              </li>
              <li>
                <strong>Single judge and domains.</strong> Findings are based on a particular
                LLM-as-Judge setup and domain set. Cross-domain stability (τ ≈ 0.90) is strong but
                not universal; new domains or judge models may behave differently. Calibration and
                validation with human feedback remain important before deployment.
              </li>
            </LimitationsList>
          </LimitationsBox>

          <SectionTitle>What&apos;s Next?</SectionTitle>
          <SectionSubtitle>
            This project opens several future directions:
          </SectionSubtitle>

          <ContentBlock css={tw`mt-6`}>
            <NextList>
              <NextItem>
                <NextBullet>1</NextBullet>
                <span>
                  <strong>Larger-Scale Human Evaluation</strong> — Expand beyond small external
                  samples and collect more diverse human feedback across institutions.
                </span>
              </NextItem>
              <NextItem>
                <NextBullet>2</NextBullet>
                <span>
                  <strong>Adaptive Prompt Optimization</strong> — Use automated optimization (e.g.,
                  DSPy) to design prompts that are consistently aligned with human preferences.
                </span>
              </NextItem>
              <NextItem>
                <NextBullet>3</NextBullet>
                <span>
                  <strong>Judge Calibration Framework</strong> — Develop methods to calibrate
                  LLM-as-Judge systems using human feedback loops.
                </span>
              </NextItem>
              <NextItem>
                <NextBullet>4</NextBullet>
                <span>
                  <strong>Educational Deployment</strong> — Integrate the benchmark into real
                  educational settings to test whether higher-scoring explanations actually improve
                  student understanding.
                </span>
              </NextItem>
            </NextList>
          </ContentBlock>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
