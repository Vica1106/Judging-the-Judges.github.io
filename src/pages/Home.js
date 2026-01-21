import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

import homePic from "images/homepic.png";

const HeroContainer = tw.div`relative py-20 md:py-24`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const TextContent = tw.div`lg:py-8 text-center lg:text-left`;
const Subheading = tw(SubheadingBase)`text-center lg:text-left text-primary-500`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center lg:text-left leading-tight`;
const Description = tw.p`mt-4 text-center lg:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-600`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto lg:mx-0`,
  props.buttonRounded && tw`rounded-full`
]);

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;
const HeroImage = tw.img`min-w-0 w-full max-w-lg xl:max-w-xl`;

const StatsContainer = tw.div`mt-20 flex flex-col sm:flex-row justify-center items-center sm:items-stretch`;
const Stat = tw.div`flex flex-col items-center text-center p-4 sm:p-8 tracking-wide`;
const StatValue = tw.div`text-4xl sm:text-5xl font-bold text-primary-500`;
const StatLabel = tw.div`text-sm sm:text-base text-gray-600 mt-2 font-medium`;

const FeatureList = tw.ul`mt-12 leading-loose`;
const Feature = tw.li`flex items-center`;
const FeatureIcon = tw.span`w-5 h-5 bg-primary-500 rounded-full flex-shrink-0`;
const FeatureText = tw.span`ml-3 font-medium text-gray-700`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeroContainer>
            <TwoColumn>
              <LeftColumn>
                <TextContent>
                  <Subheading>Research Project</Subheading>
                  <Heading>Judging the Judges</Heading>
                  <Description>
                  We use an iterative ranking-and-improvement pipeline, combining LLM judges and human evaluations, to identify prompt styles that best support human understanding.
                    </Description>
                  <PrimaryButton as="a" href="#/leaderboard" buttonRounded={true}>
                    View Leaderboard
                  </PrimaryButton>
                </TextContent>
              </LeftColumn>
              <RightColumn>
                <IllustrationContainer>
                  <HeroImage src={homePic} alt="Judging the Judges" />
                </IllustrationContainer>
              </RightColumn>
            </TwoColumn>
          </HeroContainer>

          <StatsContainer>
            <Stat>
              <StatValue>30</StatValue>
              <StatLabel>Concepts Evaluated</StatLabel>
            </Stat>
            <Stat>
              <StatValue>10</StatValue>
              <StatLabel>Prompt Styles Compared</StatLabel>
            </Stat>
            <Stat>
              <StatValue>2</StatValue>
              <StatLabel>Iterative Rounds</StatLabel>
            </Stat>
          </StatsContainer>


          <FeatureList>
            <Feature>
              <FeatureIcon />
              <FeatureText>
                Iterative ranking-and-refinement pipeline for evaluating prompt styles
              </FeatureText>
            </Feature>
            <Feature>
              <FeatureIcon />
              <FeatureText>
                LLM-as-judge comparisons with rubric-based feedback on prompt weaknesses
              </FeatureText>
            </Feature>
            <Feature>
              <FeatureIcon />
              <FeatureText>
                Large-scale human evaluation comparing original and revised prompt styles
              </FeatureText>
            </Feature>
          </FeatureList>

        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
