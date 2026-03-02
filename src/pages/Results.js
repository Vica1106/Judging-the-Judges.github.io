import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import rankChangeImg from "images/rank_change.png";
import correlationImg from "images/correlation.png";
import transitionsImg from "images/transitions.png";
import similarityImg from "images/similarity.png";
import countImg from "images/count.png";
import overallImg from "images/overall.png";
import domainConsistencyImg from "images/domain_consistency.png";

const HeadingRow = tw.div`flex flex-col items-center`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Subheading = tw(SubheadingBase)`text-primary-500 mb-4 text-center`;
const Description = tw.p`mt-4 text-gray-600 text-center max-w-2xl`;

const SectionTitle = tw.h2`text-2xl font-bold text-gray-900 mt-16`;
const SectionSubtitle = tw.p`mt-2 text-gray-600`;

const MetricRow = tw.div`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10`;
const MetricCard = styled.div`
  ${tw`bg-white rounded-xl shadow p-6 border border-gray-100`}
`;
const MetricValue = tw.div`text-3xl font-bold text-primary-500`;
const MetricLabel = tw.div`text-gray-700 mt-2 font-medium`;

const SliderContainer = tw.div`mt-8 -mx-4 sm:mx-0`;
const SliderTrack = tw.div`flex space-x-6 overflow-x-auto pb-4 px-4 sm:px-0`;
const Slide = tw.div`flex-none w-full sm:w-1/2`;
const SliderHint = tw.p`mt-2 text-xs text-gray-600 text-right pr-4 sm:pr-0`;

const ChartsRow = tw.div`grid grid-cols-1 md:grid-cols-2 gap-8 mt-8`;

const ChartCard = tw.div`bg-white rounded-xl shadow p-6 h-full`;
const ChartTitle = tw.h3`text-lg font-bold text-gray-900 mb-4`;
const ChartImage = tw.img`w-full h-64 md:h-72 lg:h-80 object-contain rounded-lg border border-gray-100 bg-white`;
const ChartCaption = tw.p`text-sm text-gray-600 mt-4 leading-relaxed`;

const ObservationsBox = tw.div`bg-primary-100 rounded-xl p-6 mt-8 border border-primary-100`;
const ObservationsTitle = tw.h4`text-white font-bold mb-3`;
const ObservationsList = tw.ul`text-white space-y-2`;
const ObservationItem = tw.li`leading-relaxed`;

const QualSummaryBox = tw.div`bg-primary-100 rounded-xl p-6 mt-8 border border-primary-100`;
const QualSummaryTitle = tw.h4`text-white font-bold mb-3`;
const QualSummaryList = tw.ul`text-white space-y-2 text-sm sm:text-base`;

const DomainSummaryBox = tw.div`bg-primary-100 rounded-xl p-6 mt-8 border border-primary-100`;
const DomainSummaryTitle = tw.h4`text-white font-bold mb-3`;
const DomainSummaryList = tw.ul`text-white space-y-2 text-sm sm:text-base`;

const InterpretationBox = tw.div`bg-white rounded-xl p-6 mt-6 border border-gray-100 shadow-sm`;
const InterpretationTitle = tw.h4`text-gray-900 font-semibold mb-2`;
const InterpretationText = tw.p`text-gray-700 leading-relaxed text-sm sm:text-base`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Results</Subheading>
            <Heading>Results & Analysis</Heading>
            <Description>
              LLM-as-a-Judge demonstrates moderate agreement with human evaluation, strong
              cross-domain robustness, and measurable stylistic divergence.
            </Description>
          </HeadingRow>

          <MetricRow>
            <MetricCard>
              <MetricValue>&rho; = 0.73</MetricValue>
              <MetricLabel>Human-LLM Ranking Correlation</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>&tau; ≈ 0.90</MetricValue>
              <MetricLabel>Cross-Domain Stability</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>0.84</MetricValue>
              <MetricLabel>Highest Prompt Win Rate</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>+0.20</MetricValue>
              <MetricLabel>Largest Refinement Gain</MetricLabel>
            </MetricCard>
          </MetricRow>

          <SectionTitle>Human vs. LLM Ranking Comparison Analysis</SectionTitle>
          <SectionSubtitle>
            We compare original and refined prompt rankings under Human-Judge and LLM-as-Judge
            evaluations.
          </SectionSubtitle>

          <SliderContainer>
            <SliderTrack>
              <Slide>
                <ChartCard>
                  <ChartTitle>Rank Change After Refinement</ChartTitle>
                  <ChartImage src={rankChangeImg} alt="Rank change after refinement" />
                  <ChartCaption>
                    The bar chart quantifies the rank changes for each prompt pair, comparing human
                    and LLM evaluations. Negative values indicate that the improved prompt was
                    ranked better than the original. The chart highlights where refinements had the
                    most significant impact on ranking.
                  </ChartCaption>
                </ChartCard>
              </Slide>

              <Slide>
                <ChartCard>
                  <ChartTitle>Human-LLM Correlation</ChartTitle>
                  <ChartImage src={correlationImg} alt="Human and LLM correlation chart" />
                  <ChartCaption>
                    The scatter plot compares human and LLM-assigned rankings and reveals a moderate
                    positive correlation, with Spearman &rho; ≈ 0.73. While the overall alignment is
                    reasonably strong, several points deviate noticeably from the diagonal line of
                    perfect agreement, indicating prompts where human and LLM judgments diverge and
                    may reflect differences in evaluation criteria.
                  </ChartCaption>
                </ChartCard>
              </Slide>

              <Slide>
                <ChartCard>
                  <ChartTitle>Rank Transitions (Original → Improved)</ChartTitle>
                  <ChartImage
                    src={transitionsImg}
                    alt="Rank transitions from original to improved prompts"
                  />
                  <ChartCaption>
                    The slopegraphs summarize how ranks change from original to improved prompts
                    under both human and LLM evaluation. For each prompt, a line connects its
                    original rank to its improved rank; downward slopes indicate rank improvements.
                    Most lines tilt downward, showing that refined prompts generally receive better
                    rankings from both humans and the LLM, though the magnitude of improvement
                    varies across prompts.
                  </ChartCaption>
                </ChartCard>
              </Slide>
            </SliderTrack>
          </SliderContainer>

          <SliderHint>Swipe or scroll to view all charts →</SliderHint>

          <ObservationsBox>
            <ObservationsTitle>Key Findings:</ObservationsTitle>
            <ObservationsList>
              <ObservationItem>Most refined prompts improve in rank.</ObservationItem>
              <ObservationItem>Human and LLM trends are largely consistent.</ObservationItem>
              <ObservationItem>Moderate correlation (&rho; ≈ 0.73).</ObservationItem>
            </ObservationsList>
          </ObservationsBox>

          <SectionTitle>Qualitative Analysis: Human vs. LLM Preferences</SectionTitle>
          <SectionSubtitle>
            We analyze lexical similarity, structural features, and distributional patterns between
            human-preferred and LLM-preferred explanations.
          </SectionSubtitle>

          <ChartsRow>
            <ChartCard>
              <ChartTitle>Similarity Matrix</ChartTitle>
              <ChartImage src={similarityImg} alt="Lexical similarity matrix" />
              <ChartCaption>
                The similarity matrix compares human-preferred and LLM-preferred explanations in the
                embedding space. Near-zero cosine similarity indicates that responses are highly
                term-specific rather than generic, reflecting distinct lexical choices across
                preference groups.
              </ChartCaption>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Count Distribution</ChartTitle>
              <ChartImage src={countImg} alt="Count distribution comparison" />
              <ChartCaption>
                The count distribution reveals that human-preferred answers tend to be longer and
                more structurally articulated, whereas LLM-preferred answers are shorter, more
                compact, and slightly more lexically diverse, aligning with the model&apos;s bias
                toward concise fluency.
              </ChartCaption>
            </ChartCard>
          </ChartsRow>

          <QualSummaryBox>
            <QualSummaryTitle>Key Findings:</QualSummaryTitle>
            <QualSummaryList>
              <li>Near-zero cosine similarity indicates term-specific responses.</li>
              <li>Human-preferred answers are longer and more structured.</li>
              <li>LLM-preferred answers are shorter, more compact, and slightly more lexically diverse.</li>
            </QualSummaryList>
          </QualSummaryBox>

          <InterpretationBox>
            <InterpretationTitle>Interpretation</InterpretationTitle>
            <InterpretationText>
              Humans favor structured and comprehensive explanations, whereas the LLM judge prefers
              concise and fluent responses. This divergence suggests implicit stylistic bias in
              LLM-as-Judge evaluation.
            </InterpretationText>
          </InterpretationBox>

          <SectionTitle>Winning Rate Across Prompts and Domains</SectionTitle>
          <SectionSubtitle>
            Takeaway: Iterative prompt refinement improves explanation quality and generalizes across
            domains.
          </SectionSubtitle>

          <ChartsRow>
            <ChartCard>
              <ChartTitle>Overall Winning Rate</ChartTitle>
              <ChartImage src={overallImg} alt="Overall winning rate across prompts" />
              <ChartCaption>
                Overall winning rates comparing refined prompts against their originals, aggregated
                across all prompts. Refined prompts win substantially more often, reflecting
                consistent quality gains from iterative refinement.
              </ChartCaption>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Domain Consistency</ChartTitle>
              <ChartImage src={domainConsistencyImg} alt="Winning rate consistency across domains" />
              <ChartCaption>
                Winning rates broken down by domain show that refinement benefits generalize beyond a
                single task type. Gains are broadly stable across domains, indicating cross-domain
                robustness of the refinement procedure.
              </ChartCaption>
            </ChartCard>
          </ChartsRow>

          <DomainSummaryBox>
            <DomainSummaryTitle>Key Findings:</DomainSummaryTitle>
            <DomainSummaryList>
              <li>Round 2 prompts consistently outperform Round 1.</li>
              <li>Prompt ranking remains highly stable across domains.</li>
              <li>Domain has minimal impact on relative performance.</li>
            </DomainSummaryList>
          </DomainSummaryBox>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
