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

const TableContainer = tw.div`mt-12 overflow-x-auto`;
const Table = tw.table`w-full border-collapse`;
const TableHead = tw.thead`bg-primary-500 text-white`;
const TableRow = tw.tr`border-b border-gray-200 hover:bg-gray-100`;
const TableHeader = tw.th`px-6 py-4 text-left font-semibold`;
const TableBody = tw.tbody``;
const TableCell = tw.td`px-6 py-4`;

const RankBadge = styled.span`
  ${tw`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm`}
  ${props => props.rank === 1 && tw`bg-yellow-400 text-yellow-900`}
  ${props => props.rank === 2 && tw`bg-gray-300 text-gray-700`}
  ${props => props.rank === 3 && tw`bg-orange-500 text-white`}
  ${props => props.rank > 3 && tw`bg-gray-100 text-gray-600`}
`;

const ScoreBar = styled.div`
  ${tw`h-2 rounded-full bg-primary-500`}
  width: ${props => props.score}%;
`;

const ScoreContainer = tw.div`flex items-center gap-3`;
const ScoreBarBg = tw.div`flex-1 h-2 rounded-full bg-gray-200`;

// Sample data - replace with real data later
const leaderboardData = [
  { rank: 1, model: "GPT-4", accuracy: 92.5, consistency: 89.3, fairness: 91.2, overall: 91.0 },
  { rank: 2, model: "Claude-3", accuracy: 91.2, consistency: 90.1, fairness: 88.5, overall: 89.9 },
  { rank: 3, model: "Gemini Pro", accuracy: 88.7, consistency: 86.5, fairness: 87.2, overall: 87.5 },
  { rank: 4, model: "LLaMA-3", accuracy: 85.3, consistency: 84.2, fairness: 86.1, overall: 85.2 },
  { rank: 5, model: "Mistral", accuracy: 83.1, consistency: 82.8, fairness: 84.5, overall: 83.5 },
];

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Rankings</Subheading>
            <Heading>Leaderboard</Heading>
            <Description>
              Below are the comprehensive rankings of various LLMs as judges. 
              Scores are based on multiple dimensions including accuracy, consistency, and fairness.
            </Description>
          </HeadingRow>

          <TableContainer>
            <Table>
              <TableHead>
                <tr>
                  <TableHeader>Rank</TableHeader>
                  <TableHeader>Model</TableHeader>
                  <TableHeader>Accuracy</TableHeader>
                  <TableHeader>Consistency</TableHeader>
                  <TableHeader>Fairness</TableHeader>
                  <TableHeader>Overall Score</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {leaderboardData.map((item) => (
                  <TableRow key={item.rank}>
                    <TableCell>
                      <RankBadge rank={item.rank}>{item.rank}</RankBadge>
                    </TableCell>
                    <TableCell tw="font-semibold">{item.model}</TableCell>
                    <TableCell>{item.accuracy}%</TableCell>
                    <TableCell>{item.consistency}%</TableCell>
                    <TableCell>{item.fairness}%</TableCell>
                    <TableCell>
                      <ScoreContainer>
                        <span tw="font-bold text-primary-500">{item.overall}%</span>
                        <ScoreBarBg>
                          <ScoreBar score={item.overall} />
                        </ScoreBarBg>
                      </ScoreContainer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
