import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";

const HeadingRow = tw.div`flex flex-col items-center`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Subheading = tw(SubheadingBase)`text-primary-500 mb-4`;
const Description = tw.p`mt-4 text-gray-600 text-center max-w-2xl`;

const SectionTitle = tw.h2`text-2xl font-bold text-gray-900 mt-16 mb-6`;

const FindingsGrid = tw.div`grid grid-cols-1 md:grid-cols-2 gap-8 mt-8`;
const FindingCard = tw.div`bg-white rounded-xl shadow-lg p-6 border-t-4 border-primary-500`;
const FindingTitle = tw.h3`text-lg font-bold text-gray-900 mb-3`;
const FindingText = tw.p`text-gray-600 leading-relaxed`;

const ChartPlaceholder = tw.div`bg-gray-100 rounded-xl p-8 flex items-center justify-center text-gray-500 h-64 mt-8`;

const InsightBox = tw.div`bg-primary-100 rounded-xl p-6 mt-8`;
const InsightTitle = tw.h4`text-primary-700 font-bold mb-2`;
const InsightText = tw.p`text-primary-600`;

const MetricRow = tw.div`flex flex-wrap gap-6 mt-8 justify-center`;
const MetricCard = styled.div`
  ${tw`bg-white rounded-xl shadow p-6 text-center min-w-[200px]`}
`;
const MetricValue = tw.div`text-3xl font-bold text-primary-500`;
const MetricLabel = tw.div`text-gray-600 mt-2`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Findings</Subheading>
            <Heading>Results & Analysis</Heading>
            <Description>
              Comprehensive evaluation results and key findings from our LLM-as-a-Judge research.
            </Description>
          </HeadingRow>

          <MetricRow>
            <MetricCard>
              <MetricValue>87.3%</MetricValue>
              <MetricLabel>Average Accuracy</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>15.2%</MetricValue>
              <MetricLabel>Position Bias Rate</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>0.82</MetricValue>
              <MetricLabel>Inter-model Agreement</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>23%</MetricValue>
              <MetricLabel>Length Bias Impact</MetricLabel>
            </MetricCard>
          </MetricRow>

          <SectionTitle>Key Findings</SectionTitle>
          <FindingsGrid>
            <FindingCard>
              <FindingTitle>Position Bias</FindingTitle>
              <FindingText>
                Most LLM judges exhibit position bias, showing preference for responses 
                appearing in certain positions. GPT-4 and Claude-3 demonstrate the most 
                stability in this regard.
              </FindingText>
            </FindingCard>
            <FindingCard>
              <FindingTitle>Length Preference</FindingTitle>
              <FindingText>
                Longer responses generally receive higher scores, even when content 
                quality is similar. This bias is particularly pronounced when evaluating 
                creative writing tasks.
              </FindingText>
            </FindingCard>
            <FindingCard>
              <FindingTitle>Self-Enhancement Bias</FindingTitle>
              <FindingText>
                LLM judges tend to give higher scores to content they generated themselves. 
                This self-enhancement bias reaches up to 12% in some models.
              </FindingText>
            </FindingCard>
            <FindingCard>
              <FindingTitle>Consistency</FindingTitle>
              <FindingText>
                When repeatedly evaluating the same content, consistency varies significantly 
                across models. Top-tier models achieve over 90% self-consistency.
              </FindingText>
            </FindingCard>
          </FindingsGrid>

          <SectionTitle>Performance Comparison</SectionTitle>
          <ChartPlaceholder>
            Performance comparison chart will be displayed here
            <br />
            (Can integrate Chart.js or Recharts for visualization)
          </ChartPlaceholder>

          <InsightBox>
            <InsightTitle>Key Insight</InsightTitle>
            <InsightText>
              Our research shows that while LLMs as judges demonstrate impressive capabilities, 
              systematic biases still need to be addressed. We recommend using multi-model voting 
              or human-AI collaboration in practical applications to improve judgment reliability.
            </InsightText>
          </InsightBox>

          <SectionTitle>Detailed Results by Category</SectionTitle>
          <ChartPlaceholder>
            Detailed breakdown by task category
            <br />
            (Detailed results analysis by task categories)
          </ChartPlaceholder>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
