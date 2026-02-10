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
const Description = tw.p`mt-4 text-gray-600 text-center max-w-2xl`;

const TabsContainer = tw.div`mt-10 flex flex-wrap justify-center gap-2`;
const Tab = styled.button`
  ${tw`px-6 py-3 rounded-lg font-semibold transition duration-300`}
  ${props => props.active 
    ? tw`bg-primary-500 text-white` 
    : tw`bg-gray-100 text-gray-600 hover:bg-gray-200`}
`;

const ContentSection = tw.div`mt-12`;

const VersionToggle = tw.div`flex justify-center mb-8`;
const VersionButton = styled.button`
  ${tw`px-6 py-2 font-semibold transition duration-300 first:rounded-l-lg last:rounded-r-lg`}
  ${props => props.active 
    ? tw`bg-primary-500 text-white` 
    : tw`bg-gray-200 text-gray-600 hover:bg-gray-300`}
`;

const PromptCard = styled.div`
  ${tw`bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition duration-300 border-l-4 border-primary-500`}
  ${props => props.isFlipped && `background-color: #FFF8DC;`}
`;

const CardHeader = tw.div`p-6 border-b border-gray-100`;
const PromptTitle = tw.h3`text-xl font-bold text-gray-900`;
const PromptDescription = tw.p`text-gray-600 mt-2`;

const CardBody = tw.div`p-6`;
const PromptLabel = tw.span`text-xs font-bold text-primary-500 uppercase tracking-wide`;
const PromptCode = tw.pre`bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm mt-2 whitespace-pre-wrap`;

const ResultSection = styled.div`
  ${tw`mt-6 overflow-hidden transition-all duration-300`}
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

const ResultContainer = tw.div`bg-blue-100 p-4 rounded-lg border border-blue-200`;
const ResultLabel = tw.span`text-xs font-bold text-blue-600 uppercase tracking-wide`;
const ResultText = tw.p`mt-2 text-gray-700`;

const ShowResultButton = styled.button`
  ${tw`mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300`}
`;

const ImprovementBadge = tw.span`ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full`;

// Prompt styles data
const promptStyles = ["Baseline", "3 Steps", "5 Steps", "Academic", "Casual"];

const promptsData = {
  "Baseline": {
    original: {
      description: "A straightforward evaluation prompt without structured guidance.",
      prompt: `Please evaluate the following response.

Response: {response}

Provide your evaluation.`,
      result: "The response is generally good and addresses the main points..."
    },
    improved: {
      description: "Enhanced baseline with clearer instructions and criteria.",
      prompt: `Please evaluate the following response based on accuracy, completeness, and clarity.

Response: {response}

Provide a detailed evaluation with specific feedback.`,
      result: "The response demonstrates strong understanding. Specifically: 1) Accuracy: High - all facts verified..."
    }
  },
  "3 Steps": {
    original: {
      description: "A three-step evaluation approach for structured analysis.",
      prompt: `Evaluate the response in 3 steps:

Step 1: Identify the main claims
Step 2: Verify accuracy of each claim
Step 3: Provide overall assessment

Response: {response}`,
      result: "Step 1: Main claims identified - A, B, C. Step 2: Claim A verified, Claim B partially correct..."
    },
    improved: {
      description: "Refined 3-step approach with clearer criteria per step.",
      prompt: `Evaluate the response using this 3-step framework:

Step 1 - IDENTIFY: List all key claims and arguments made
Step 2 - ANALYZE: For each claim, rate accuracy (1-5) with evidence
Step 3 - SYNTHESIZE: Provide overall score and actionable feedback

Response: {response}`,
      result: "Step 1 - IDENTIFY: Found 4 key claims. Step 2 - ANALYZE: Claim 1 (5/5) - verified with sources..."
    }
  },
  "5 Steps": {
    original: {
      description: "A comprehensive five-step evaluation for thorough analysis.",
      prompt: `Evaluate using 5 steps:

1. Read and understand
2. Check factual accuracy
3. Assess logical flow
4. Evaluate language quality
5. Give final verdict

Response: {response}`,
      result: "1. Understanding: Response about ML basics. 2. Accuracy: Mostly correct. 3. Logic: Good flow..."
    },
    improved: {
      description: "Enhanced 5-step framework with detailed rubrics.",
      prompt: `Comprehensive 5-Step Evaluation:

1. COMPREHENSION: Summarize the response in 2-3 sentences
2. FACT-CHECK: List each fact and verify (✓/✗/?)
3. LOGIC ANALYSIS: Rate coherence and reasoning (1-10)
4. LANGUAGE REVIEW: Assess clarity, grammar, tone
5. VERDICT: Overall score (1-100) with key strengths/weaknesses

Response: {response}`,
      result: "1. COMPREHENSION: Explains neural networks as interconnected nodes... 2. FACT-CHECK: ✓ Nodes process data..."
    }
  },
  "Academic": {
    original: {
      description: "Formal academic-style evaluation with scholarly language.",
      prompt: `Conduct an academic evaluation of the following response.

Consider scholarly merit, citation quality, and argumentative rigor.

Response: {response}

Provide your academic assessment.`,
      result: "The response demonstrates moderate scholarly merit. The argumentation lacks sufficient citations..."
    },
    improved: {
      description: "Balanced academic approach with practical applicability.",
      prompt: `Academic Evaluation Framework:

Assess the response on:
• Scholarly accuracy and depth
• Logical argumentation quality
• Evidence and support provided
• Practical applicability

Use clear, accessible language while maintaining rigor.

Response: {response}`,
      result: "Academic Assessment: The response shows strong foundational understanding. Evidence quality: Good use of examples..."
    }
  },
  "Casual": {
    original: {
      description: "Conversational, user-friendly evaluation style.",
      prompt: `Hey! Can you check out this response and let me know what you think?

Response: {response}

What's good? What could be better?`,
      result: "This is pretty solid! I like how it explains things simply. Could maybe use more examples though..."
    },
    improved: {
      description: "Friendly tone with structured feedback points.",
      prompt: `Take a look at this response and give me your thoughts!

Response: {response}

Tell me:
👍 What works well
👎 What needs improvement  
💡 Suggestions for making it better`,
      result: "👍 What works: Clear explanation, good examples, easy to follow. 👎 Needs work: Missing some context..."
    }
  }
};

export default () => {
  const [activeTab, setActiveTab] = useState("Baseline");
  const [showImproved, setShowImproved] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentPrompt = promptsData[activeTab];
  const version = showImproved ? currentPrompt.improved : currentPrompt.original;

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Resources</Subheading>
            <Heading>Prompts & Examples</Heading>
            <Description>
              Explore our 5 prompt styles and their improved versions. 
              Click to see generated results and compare original vs. improved prompts.
            </Description>
          </HeadingRow>

          <TabsContainer>
            {promptStyles.map(style => (
              <Tab 
                key={style}
                active={activeTab === style}
                onClick={() => {
                  setActiveTab(style);
                  setShowResult(false);
                }}
              >
                {style}
              </Tab>
            ))}
          </TabsContainer>

          <ContentSection>
            <VersionToggle>
              <VersionButton 
                active={!showImproved}
                onClick={() => {
                  setShowImproved(false);
                  setShowResult(false);
                }}
              >
                Original (Round 1)
              </VersionButton>
              <VersionButton 
                active={showImproved}
                onClick={() => {
                  setShowImproved(true);
                  setShowResult(false);
                }}
              >
                Improved (Round 2)
              </VersionButton>
            </VersionToggle>

            <PromptCard isFlipped={showImproved}>
              <CardHeader>
                <PromptTitle>
                  {activeTab} Prompt
                  {showImproved && <ImprovementBadge>Improved</ImprovementBadge>}
                </PromptTitle>
                <PromptDescription>{version.description}</PromptDescription>
              </CardHeader>
              
              <CardBody>
                <PromptLabel>Prompt Template</PromptLabel>
                <PromptCode>{version.prompt}</PromptCode>

                <ShowResultButton onClick={() => setShowResult(!showResult)}>
                  {showResult ? "Hide" : "Show"} Generated Result
                </ShowResultButton>

                <ResultSection isOpen={showResult}>
                  <ResultContainer>
                    <ResultLabel>Example Generated Result</ResultLabel>
                    <ResultText>{version.result}</ResultText>
                  </ResultContainer>
                </ResultSection>
              </CardBody>
            </PromptCard>
          </ContentSection>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
