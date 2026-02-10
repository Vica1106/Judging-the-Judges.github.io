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
  // Round 1 (Original)
  { promptStyle: "Baseline", humanRank: null, llmElo: 1436.33, llmRank: 7, variance: null },
  { promptStyle: "3 Steps", humanRank: null, llmElo: 1614.65, llmRank: 4, variance: null },
  { promptStyle: "5 Steps", humanRank: null, llmElo: 1295.80, llmRank: 8, variance: null },
  { promptStyle: "Academic", humanRank: null, llmElo: 756.23, llmRank: 10, variance: null },
  { promptStyle: "Casual", humanRank: null, llmElo: 1933.70, llmRank: 3, variance: null },
  // Round 2 (Improved)
  { promptStyle: "Baseline (Improved)", humanRank: null, llmElo: 1583.77, llmRank: 5, variance: null },
  { promptStyle: "3 Steps (Improved)", humanRank: null, llmElo: 1954.26, llmRank: 1, variance: null },
  { promptStyle: "5 Steps (Improved)", humanRank: null, llmElo: 1486.98, llmRank: 6, variance: null },
  { promptStyle: "Academic (Improved)", humanRank: null, llmElo: 998.59, llmRank: 9, variance: null },
  { promptStyle: "Casual (Improved)", humanRank: null, llmElo: 1939.70, llmRank: 2, variance: null },
];

export default () => {
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
              Prompt styles are ranked by <strong>human evaluation</strong> (gold standard), with LLM Elo scores for comparison. The <strong>rank variance</strong> measures disagreement: 0% = full agreement, 100% = maximum disagreement.
            </DescriptionParagraph>
          </DescriptionSection>

          <TableContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Human Rank</TableHeader>
                  <TableHeader>Prompt Style</TableHeader>
                  <TableHeader>LLM Elo Score</TableHeader>
                  <TableHeader>LLM Rank</TableHeader>
                  <TableHeader>Rank Variance</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {leaderboardData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {item.humanRank ? (
                        <RankBadge rank={item.humanRank}>{item.humanRank}</RankBadge>
                      ) : (
                        <EmptyCell>—</EmptyCell>
                      )}
                    </TableCell>
                    <TableCell tw="font-semibold">{item.promptStyle}</TableCell>
                    <TableCell>
                      {item.llmElo ? (
                        <span tw="font-medium">{item.llmElo}</span>
                      ) : (
                        <EmptyCell>—</EmptyCell>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.llmRank ? (
                        <span tw="font-medium">{item.llmRank}</span>
                      ) : (
                        <EmptyCell>—</EmptyCell>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.variance !== null ? (
                        <VarianceContainer>
                          <span tw="font-medium w-12">{item.variance}%</span>
                          <VarianceBarBg>
                            <VarianceBar variance={item.variance} />
                          </VarianceBarBg>
                        </VarianceContainer>
                      ) : (
                        <EmptyCell>—</EmptyCell>
                      )}
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
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
