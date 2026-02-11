import React, { useState } from "react";
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

const DescriptionSection = tw.div`mt-6 text-gray-600 max-w-4xl mx-auto text-left`;
const DescriptionParagraph = tw.p`mb-4 leading-relaxed`;

const TableContainer = tw.div`mt-12 overflow-x-auto`;
const Table = tw.table`w-full border-collapse`;
const TableHead = tw.thead`bg-primary-500 text-white`;
const TableRow = tw.tr`border-b border-gray-200 hover:bg-gray-500`;
const TableHeader = tw.th`px-6 py-4 text-left font-semibold text-sm`;
const TableBody = tw.tbody``;
const TableCell = tw.td`px-6 py-4`;

const RankBadge = styled.span`
  ${tw`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm`}
  ${props => props.rank === 1 && tw`bg-yellow-400 text-yellow-900`}
  ${props => props.rank === 2 && tw`bg-gray-300 text-gray-700`}
  ${props => props.rank === 3 && tw`bg-orange-400 text-white`}
  ${props => props.rank > 3 && tw`bg-gray-100 text-gray-600`}
`;

const VarianceBar = styled.div`
  ${tw`h-2 rounded-full`}
  width: ${props => props.variance || 0}%;
  background-color: ${props => {
    const v = props.variance || 0;
    if (v <= 20) return '#10B981'; // green - good agreement
    if (v <= 50) return '#F59E0B'; // yellow - moderate
    return '#EF4444'; // red - high disagreement
  }};
`;

const VarianceContainer = tw.div`flex items-center gap-3`;
const VarianceBarBg = tw.div`flex-1 h-2 rounded-full bg-gray-200 w-20`;

const EmptyCell = tw.span`text-gray-400`;

const SectionTitle = tw.h3`text-2xl font-bold text-gray-900 mt-16 mb-6 text-center`;
const SmallTableContainer = tw.div`mt-6 overflow-x-auto max-w-2xl mx-auto`;

const SortToggleContainer = tw.div`flex justify-center mt-8 mb-4`;
const SortToggleWrapper = styled.div`
  ${tw`relative bg-gray-200 rounded-full p-1 flex`}
`;
const SortSlider = styled.div`
  ${tw`absolute bg-primary-500 rounded-full transition-all duration-300 ease-in-out`}
  top: 4px;
  bottom: 4px;
  width: calc(50% - 4px);
  left: ${props => props.isLLM ? 'calc(50% + 2px)' : '4px'};
`;
const SortOption = styled.button`
  ${tw`relative z-10 px-6 py-2 font-semibold transition-colors duration-300 rounded-full`}
  ${props => props.active ? tw`text-white` : tw`text-gray-600`}
`;
const SortLabel = tw.span`text-sm text-gray-500 mx-4`;

// Round 1 only data (sorted by Elo for LLM rank within Round 1)
const round1Data = [
  { promptStyle: "Casual", llmElo: 1937.16, llmRank: 1 },
  { promptStyle: "3 Steps", llmElo: 1636.60, llmRank: 2 },
  { promptStyle: "Baseline", llmElo: 1490.52, llmRank: 3 },
  { promptStyle: "5 Steps", llmElo: 1422.03, llmRank: 4 },
  { promptStyle: "Academic", llmElo: 1013.68, llmRank: 5 },
];

// Prompt styles data (LLM Rank based on Elo: higher Elo = better rank)
// 
// Variance Calculation:
// variance = |humanRank - llmRank| / (maxRank - 1) * 100
// where maxRank = 10 (total prompts), so max possible difference = 9
// Example: humanRank=1, llmRank=5 → |1-5|/9*100 = 44.4%
// 0% = perfect agreement, 100% = maximum disagreement
//
const leaderboardData = [
  // Ordered by Human Rank
  { promptStyle: "Baseline (Improved)", humanRank: 1, humanScore: 7.13, llmElo: 1583.77, llmRank: 5, variance: 44.4 },
  { promptStyle: "3 Steps", humanRank: 2, humanScore: 6.80, llmElo: 1614.65, llmRank: 4, variance: 22.2 },
  { promptStyle: "Casual", humanRank: 3, humanScore: 6.63, llmElo: 1933.70, llmRank: 3, variance: 0 },
  { promptStyle: "3 Steps (Improved)", humanRank: 4, humanScore: 6.61, llmElo: 1954.26, llmRank: 1, variance: 33.3 },
  { promptStyle: "Casual (Improved)", humanRank: 5, humanScore: 6.19, llmElo: 1939.70, llmRank: 2, variance: 33.3 },
  { promptStyle: "5 Steps", humanRank: 6, humanScore: 5.98, llmElo: 1295.80, llmRank: 8, variance: 22.2 },
  { promptStyle: "5 Steps (Improved)", humanRank: 7, humanScore: 5.72, llmElo: 1486.98, llmRank: 6, variance: 11.1 },
  { promptStyle: "Baseline", humanRank: 8, humanScore: 5.41, llmElo: 1436.33, llmRank: 7, variance: 11.1 },
  { promptStyle: "Academic (Improved)", humanRank: 9, humanScore: 3.38, llmElo: 998.59, llmRank: 9, variance: 0 },
  { promptStyle: "Academic", humanRank: 10, humanScore: 1.13, llmElo: 756.23, llmRank: 10, variance: 0 },
];

export default () => {
  const [sortBy, setSortBy] = useState("human");

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortBy === "human") {
      return a.humanRank - b.humanRank;
    } else {
      return a.llmRank - b.llmRank;
    }
  });

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Rankings</Subheading>
            <Heading>Unified Leaderboard</Heading>
          </HeadingRow>

          <DescriptionSection>
            <DescriptionParagraph>
            Compare human and LLM rankings. Variance shows disagreement: 0% = agreement, 100% = max disagreement.
            </DescriptionParagraph>
          </DescriptionSection>

          <SortToggleContainer>
            <SortToggleWrapper>
              <SortSlider isLLM={sortBy === "llm"} />
              <SortOption active={sortBy === "human"} onClick={() => setSortBy("human")}>
                Human Rank
              </SortOption>
              <SortOption active={sortBy === "llm"} onClick={() => setSortBy("llm")}>
                LLM Rank
              </SortOption>
            </SortToggleWrapper>
          </SortToggleContainer>

          <TableContainer>
            <Table>
              <TableHead>
                <tr>
                  {sortBy === "human" ? (
                    <>
                      <TableHeader>Human Rank</TableHeader>
                      <TableHeader>Prompt Style</TableHeader>
                      <TableHeader>Human Score</TableHeader>
                      <TableHeader>LLM Elo</TableHeader>
                      <TableHeader>LLM Rank</TableHeader>
                      <TableHeader>Rank Variance</TableHeader>
                    </>
                  ) : (
                    <>
                      <TableHeader>LLM Rank</TableHeader>
                      <TableHeader>Prompt Style</TableHeader>
                      <TableHeader>LLM Elo</TableHeader>
                      <TableHeader>Human Score</TableHeader>
                      <TableHeader>Human Rank</TableHeader>
                      <TableHeader>Rank Variance</TableHeader>
                    </>
                  )}
                </tr>
              </TableHead>
              <TableBody>
                {sortedData.map((item, index) => (
                  <TableRow key={index}>
                    {sortBy === "human" ? (
                      <>
                        <TableCell>
                          <RankBadge rank={item.humanRank}>{item.humanRank}</RankBadge>
                        </TableCell>
                        <TableCell tw="font-semibold">{item.promptStyle}</TableCell>
                        <TableCell>
                          <span tw="font-bold text-primary-500">{item.humanScore.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <span tw="font-medium">{item.llmElo}</span>
                        </TableCell>
                        <TableCell>
                          <span tw="font-medium">{item.llmRank}</span>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <RankBadge rank={item.llmRank}>{item.llmRank}</RankBadge>
                        </TableCell>
                        <TableCell tw="font-semibold">{item.promptStyle}</TableCell>
                        <TableCell>
                          <span tw="font-medium">{item.llmElo}</span>
                        </TableCell>
                        <TableCell>
                          <span tw="font-bold text-primary-500">{item.humanScore.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <span tw="font-medium">{item.humanRank}</span>
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <VarianceContainer>
                        <span tw="font-medium w-12">{item.variance}%</span>
                        <VarianceBarBg>
                          <VarianceBar variance={item.variance} />
                        </VarianceBarBg>
                      </VarianceContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <SectionTitle>Round 1 LLM Rankings</SectionTitle>
          <SmallTableContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>LLM Rank</TableHeader>
                  <TableHeader>Prompt Style</TableHeader>
                  <TableHeader>Elo Score</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {round1Data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <RankBadge rank={item.llmRank}>{item.llmRank}</RankBadge>
                    </TableCell>
                    <TableCell tw="font-semibold">{item.promptStyle}</TableCell>
                    <TableCell tw="font-medium">{item.llmElo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SmallTableContainer>

          <SectionTitle>How Variance is Calculated</SectionTitle>
          <DescriptionSection>
            <DescriptionParagraph>
              The <strong>Rank Variance</strong> measures the disagreement between human and LLM rankings using a normalized metric:
            </DescriptionParagraph>
            <DescriptionParagraph tw="font-mono bg-gray-100 p-4 rounded-lg text-center">
              Variance = |Human Rank - LLM Rank| ÷ (Max Rank - 1) × 100%
            </DescriptionParagraph>
            <DescriptionParagraph>
              With 10 prompt styles, the maximum possible rank difference is 9. This normalization yields a percentage where:
            </DescriptionParagraph>
            <DescriptionParagraph>
              • <strong>0%</strong> = Perfect agreement (same rank for both human and LLM)<br/>
              • <strong>100%</strong> = Maximum disagreement (ranks differ by 9 positions)
            </DescriptionParagraph>
            <DescriptionParagraph>
              <strong>Example:</strong> If a prompt has Human Rank = 1 and LLM Rank = 5, the variance is |1 - 5| ÷ 9 × 100 = <strong>44.4%</strong>
            </DescriptionParagraph>
          </DescriptionSection>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
