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
const PromptCard = tw.div`bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-primary-500`;
const PromptTitle = tw.h3`text-xl font-bold text-gray-900 mb-3`;
const PromptDescription = tw.p`text-gray-600 mb-4`;
const PromptCode = tw.pre`bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto text-sm`;

const ExampleContainer = tw.div`mt-4 bg-gray-100 p-4 rounded-lg`;
const ExampleLabel = tw.span`text-xs font-bold text-primary-500 uppercase tracking-wide`;
const ExampleText = tw.p`mt-2 text-gray-700`;

const categories = ["All", "Evaluation", "Comparison", "Scoring", "Analysis"];

const promptsData = [
  {
    category: "Evaluation",
    title: "Basic Evaluation Prompt",
    description: "A foundational prompt for evaluating the quality of a single response.",
    prompt: `You are an expert evaluator. Please evaluate the following response based on:
1. Accuracy - Is the information correct?
2. Completeness - Does it fully address the question?
3. Clarity - Is it well-organized and easy to understand?

Response to evaluate:
{response}

Please provide a score from 1-10 and explain your reasoning.`,
    example: {
      input: "What is machine learning?",
      response: "Machine learning is a subset of AI that enables systems to learn from data."
    }
  },
  {
    category: "Comparison",
    title: "Pairwise Comparison Prompt",
    description: "Used for comparing two responses and selecting the better one.",
    prompt: `Compare the following two responses and determine which one is better.

Response A:
{response_a}

Response B:
{response_b}

Consider: accuracy, helpfulness, and clarity.
Output: "A" or "B" with explanation.`,
    example: {
      input: "Compare responses about climate change",
      response: "Response A provides more scientific evidence..."
    }
  },
  {
    category: "Scoring",
    title: "Multi-Dimension Scoring Prompt",
    description: "A multi-dimensional scoring prompt for fine-grained evaluation.",
    prompt: `Evaluate the response on the following dimensions (1-5 scale each):

1. Factual Accuracy: [score]
2. Logical Coherence: [score]  
3. Language Quality: [score]
4. Relevance: [score]
5. Depth of Analysis: [score]

Response:
{response}

Provide scores and brief justifications for each dimension.`,
    example: {
      input: "Rate this technical explanation",
      response: "Factual: 4/5, Coherence: 5/5, Language: 4/5..."
    }
  },
  {
    category: "Analysis",
    title: "Bias Detection Prompt",
    description: "A prompt for detecting potential biases in evaluations.",
    prompt: `Analyze the following evaluation for potential biases:

Original Question: {question}
Response: {response}
Evaluation: {evaluation}

Check for:
- Position bias
- Length bias
- Style preference bias
- Factual vs. opinion bias

Report any detected biases with examples.`,
    example: {
      input: "Check for bias in evaluation",
      response: "Detected: Length bias - longer response rated higher..."
    }
  }
];

export default () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredPrompts = activeTab === "All" 
    ? promptsData 
    : promptsData.filter(p => p.category === activeTab);

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Resources</Subheading>
            <Heading>Prompts & Examples</Heading>
            <Description>
              The evaluation prompts and examples we use in our research. 
              These prompts are carefully designed to test various capabilities of LLMs as judges.
            </Description>
          </HeadingRow>

          <TabsContainer>
            {categories.map(cat => (
              <Tab 
                key={cat}
                active={activeTab === cat}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </Tab>
            ))}
          </TabsContainer>

          <ContentSection>
            {filteredPrompts.map((item, index) => (
              <PromptCard key={index}>
                <PromptTitle>{item.title}</PromptTitle>
                <PromptDescription>{item.description}</PromptDescription>
                <PromptCode>{item.prompt}</PromptCode>
                <ExampleContainer>
                  <ExampleLabel>Example Usage</ExampleLabel>
                  <ExampleText><strong>Input:</strong> {item.example.input}</ExampleText>
                  <ExampleText><strong>Expected Output:</strong> {item.example.response}</ExampleText>
                </ExampleContainer>
              </PromptCard>
            ))}
          </ContentSection>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
