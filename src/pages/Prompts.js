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
  max-height: ${props => props.isOpen ? '2000px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

const ResultContainer = tw.div`bg-blue-100 p-4 rounded-lg border border-blue-200 overflow-auto`;
const ResultLabel = tw.span`text-xs font-bold text-blue-600 uppercase tracking-wide`;
const ResultText = styled.p`
  ${tw`mt-2 text-gray-700 text-sm`}
  white-space: pre-wrap;
`;

const ShowResultButton = styled.button`
  ${tw`mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300`}
`;

const ImprovementBadge = tw.span`ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full`;

// Prompt styles data
const promptStyles = ["Baseline", "3 Steps", "5 Steps", "Academic", "Casual"];

// Example concept: Big O notation
const promptsData = {
  "Baseline": {
    original: {
      description: "A straightforward prompt without structured guidance.",
      prompt: `Explain the following concept in plain language in 200 words or less: {concept}`,
      result: `Big O notation is a way to describe how the amount of work an algorithm does grows as the input gets bigger. It's about growth rate, not exact time, and it usually refers to the worst case, ignoring tiny constants.

Common examples:
- O(1) — constant time: the work doesn't change with input size.
- O(log n) — logarithmic: grows slowly (like binary search).
- O(n) — linear: grows in direct proportion to n (scanning a list).
- O(n^2) — quadratic: grows faster with nested loops.
- O(2^n) — exponential: doubles with each extra item, very fast growth.

Key idea: as n gets large, we focus on the dominant term and drop constants, so O(n+5) = O(n).

Use it to compare algorithms or data structures. Example: searching an unsorted list is O(n); with a sorted list and binary search you get O(log n). For AI, Big O helps gauge how well an approach scales with bigger datasets or models.`
    },
    improved: {
      description: "Enhanced baseline with clearer structure and examples.",
      prompt: `Explain the following concept to a non-specialist college student in plain language. Use a concise, scaffolded structure to build intuition quickly, and keep the total length under 200 words. Do not reveal or output chain-of-thought, and do not request interaction.

1) Start with a simple, concrete everyday analogy that grounds the idea.
2) Provide a brief, plain-language definition of the concept (define any essential term in simple words in parentheses).
3) Offer a one- to two-sentence intuition that connects the idea to familiar concepts.
4) Give one clear, concrete example or mini-step-by-step illustration showing the concept in action (prefer a general, non-technical context or a relatable AI tie-in).
5) End with a succinct Takeaway: why it matters and one common pitfall to avoid.

{concept}`,
      result: `1) Everyday analogy: Think of checking items in a growing pile. How many checks you need depends on how big the pile gets. Big O is a simple way to describe that growth.

2) Definition (essential terms): Big O (a way to describe an algorithm's time or space) tells you how the running time or memory usage grows as input size n increases. n = how much data you have; time = how long it runs; space = how much memory it uses.

3) Intuition: It lets you compare methods for large datasets. If one method's time grows linearly with n (O(n)) and another's grows quadratically (O(n^2)), the linear one usually stays faster as n gets big.

4) Example in action:
- Linear search in a list: you may check items one by one until you find a match. Worst case: you check all n items → O(n).
- Nested checks for all pairs: you compare every item with every other item. Rough count: n*(n−1)/2 → O(n^2).
In AI, scanning many features (O(n)) vs comparing many pairs (O(n^2)) shows how the approach scales.

5) Takeaway: Big O helps predict scalability and compare algorithms. Pitfall: it ignores constant factors and small-n behavior; focus on growth rate, not exact times.`
    }
  },
  "3 Steps": {
    original: {
      description: "A multi-aspect approach covering definition, example, and importance.",
      prompt: `Explain the concept {concept} for a non-expert. Please cover: (1) its basic meaning, (2) a simple real-world example, and (3) why it is important. Please keep the entire explanation under 200 words.`,
      result: `Big O notation is a way to describe how an algorithm's time or space (memory) grows as the input size grows. It focuses on growth trends, not exact times, and ignores small details like constant steps.

- Basic idea: O(n) means time grows in line with the input size, O(log n) grows slowly (doubling input only adds a few steps), O(n^2) grows quickly as input grows.

- Real-world example: Finding a card in a shuffled deck by checking cards one by one is O(n). If the deck is sorted and you can halve the search each time (binary search), you need about log2(n) checks—much faster for large n.

- Why it matters: It helps compare how scalable different algorithms are. As data grows, you can predict performance, choose faster methods, and budget for hardware or time accordingly, which is especially important in AI tasks like data processing and model training.`
    },
    improved: {
      description: "Refined multi-aspect approach with clearer structure.",
      prompt: `Explain the concept {concept} to a non-expert college student. Use plain, approachable language and one simple, relatable analogy. Present the explanation in three concise parts: \n (1) the basic idea in one sentence, \n (2) a brief real-world example in 1–2 sentences, \n (3) why it matters with a quick takeaway. Keep the total length under 200 words. Use bullets or a short, skimmable paragraph and avoid heavy jargon or formal notation. Do NOT ask questions or propose follow-ups. Do NOT reveal chain-of-thought.`,
      result: `- Basic idea: Big O notation is a simple way to describe how the time (or space) an algorithm needs grows as the amount of data increases.
- Real-world example: Looking up a name in a long list by checking each entry one by one gets noticeably slower as the list gets bigger; if the list is well organized and you can jump to the right spot, the search grows much more slowly.
- Why it matters: It helps you predict performance and choose faster algorithms as data gets larger. Quick takeaway: aim for methods whose growth rate stays small even as data grows.`
    }
  },
  "5 Steps": {
    original: {
      description: "Moderate complexity; requires a structured explanation in five distinct steps, balancing clarity and conciseness for beginners.",
      prompt: `Explain the concept of {concept} using a structured 5-step format: \n 1.**One-sentence definition**: Provide a clear and concise definition of {concept} in a single sentence. \n 2.**Simple intuition based on the definition**: Offer an intuitive explanation that helps relate the definition to everyday experiences or familiar ideas. \n 3.**Key components of the topic and related concepts**: Identify and briefly describe the essential elements of {concept}, along with any related concepts that enhance understanding. \n 4.**Clear real-world analogy**: Create a relatable analogy that simplifies {concept}.Clearly map each part of the analogy back to the technical aspects of {concept}. \n 5.**Common misconception or confusion**: Highlight a frequent misunderstanding or confusion regarding {concept} and clarify why it is misleading or incorrect.Keep the entire response concise and accessible for beginners, ensuring it does not exceed 200 words.`,
      result: `1) One-sentence definition
Big O notation expresses how the worst-case running time or memory usage of an algorithm grows as input size n increases, focusing on the dominant term and ignoring constants.

2) Simple intuition based on the definition
As inputs get larger, the growth pattern matters more than exact timings. Constant factors and small terms fade away, so two algorithms with the same growth rate feel similar for large n.

3) Key components of the topic and related concepts
n = input size; T(n) = time/space. Common classes: O(1), O(log n), O(n), O(n log n), O(n^2). Worst-case focus. Related concepts: Theta (tight bound), Omega (lower bound).

4) Clear real-world analogy
Analogy: finding a book on a shelf. If you know the exact position, it's O(1). If you scan left to right, it's O(n). If the shelf is sorted and you binary-search, it's O(log n). Map: n = number of books; steps = checks; growth reflects time with increasing shelf size.

5) Common misconception or confusion
Big O is not the exact run time. It's an upper bound that ignores constants and hardware; it may differ from average-case and from Theta/Omega. Use Big O to compare growth rates, not precise timings.`
    },
    improved: {
      description: "Enhanced 5-step framework with detailed components.",
      prompt: `Explain the concept of {concept} in a learner-friendly, 5-step format tailored for college students outside the major. The entire explanation must be concise (no more than 200 words). Do not request interaction or follow-up questions, and do not reveal chain-of-thought.

1. One-sentence definition: state a clear, plain-language definition of {concept} in a single sentence.
2. Simple intuition with everyday example: give an intuition that connects the idea to ordinary experiences or familiar ideas.
3. Key components and related concepts: briefly list the essential elements of {concept} and any closely related ideas, using simple terms.
4. Clear real-world analogy with mapping: provide a relatable analogy and explicitly map each part of the analogy to the technical aspects of {concept}.
5. Common misconceptions and clarifications: name a frequent misunderstanding, explain why it's wrong, and give the correct perspective.

Keep language accessible, minimize jargon, and ensure the structure is easy to follow.`,
      result: `1) One-sentence definition: Big O notation describes how an algorithm's runtime or memory grows as the input size grows.

2) Simple intuition with everyday example: Imagine searching for a card in a pile of n cards by checking one by one; you'll do about n/2 checks on average, and doubling the deck roughly doubles the work.

3) Key components and related concepts:
- Input size n; T(n) is the work (time/space) as a function of n
- Big O = upper bound on growth
- Common classes: O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n)
- Related ideas: Big Omega, Big Theta, average vs worst case, space complexity

4) Real-world analogy with mapping: Library lookup
- n = number of recipes/books
- O(1) = instant exact lookup via a perfect index
- O(log n) = use an organized index to halve the search space (binary-like)
- O(n) = flip through items one by one
- O(n log n) = sort first (n log n) then search efficiently
- Mapping: growth class mirrors how many items you touch as n grows

5) Common misconceptions and clarifications:
- Not exact runtime; it's an upper bound and asymptotic
- Constants/hardware affect actual time but not the growth class
- O(n^2) vs O(n log n): n^2 dominates for large n, but small-n behavior may differ
- Big O can describe time or space, not both by default`
    }
  },
  "Casual": {
    original: {
      description: "Low pressure, approachable, informal learning.",
      prompt: `Explain {concept} as if you are a knowledgeable friend chatting with someone new to the topic. Use casual language, one simple real-life analogy, and avoid jargon. Keep the tone friendly and the explanation under 200 words.`,
      result: `Big O notation is a simple way to say how the amount of work (time) or memory a program needs grows as the input gets bigger.

One easy analogy: imagine you're looking for a specific item on a long shelf. If you check each item one by one, the number of checks grows with how many items are there. Double the items, you'll probably do about twice as many checks. That's like O(n) — linear growth.

A few common ones:
- O(1): constant work. No matter how many items, you grab the item at a known spot. Quick jump.
- O(n): you scan all items once.
- O(log n): you cut the search space roughly in half each time (like a well-organized index). Grows slowly.
- O(n^2): you compare many pairs, which gets big fast.

Note: Big O cares about growth rate, not exact seconds, and it ignores constant factors. In AI, it helps us estimate how training or inference time or memory will scale as data or model size grows.`
    },
    improved: {
      description: "Friendly tone with clear structure and takeaway.",
      prompt: `Explain {concept} to a curious college student with no background. Speak as a knowledgeable friend: casual, friendly, and supportive. Use one simple real-life analogy. Avoid jargon; if you must use a technical term, define it in plain language immediately. Deliver as a short, scannable outline with four blocks (no extra sections):

- Definition: one concise, plain-language sentence.
- Real-life analogy: one simple, relatable image or scenario.
- Concrete example: brief, relatable instance that illustrates the idea in practice.
- Takeaway: why it matters, practical intuition, and a quick, memorable summary.

Word limit: under 200 words total.
Do not ask questions or request follow-up.
Do not reveal chain-of-thought or internal reasoning.
No heavy formatting beyond the four bullet blocks.
Keep {concept} exactly as given.`,
      result: `- Definition: Big O notation is a simple way to describe how the running time or memory use of a program grows as the input size increases.

- Real-life analogy: Imagine scanning a guest list: if the list doubles, the number of checks you make roughly doubles.

- Concrete example: If you search for a name by checking every entry until you find a match, the number of checks grows with n, so it's O(n), and for 10 items you might check up to 10, while for 1,000 items you might check up to 1,000 in the worst case.

- Takeaway: Big O helps you compare how solutions scale as data grows, giving a quick feel for whether something will stay fast.`
    }
  },
  "Academic": {
    original: {
      description: "High complexity; requires formal academic writing with precise definitions and structured reasoning.",
      prompt: `You are an academic expert writing for a graduate-level textbook. Explain the following concept using precise terminology, formal definitions, and logically structured reasoning: {concept}. Avoid informal language and analogies. Keep it under 200 words.`,
      result: `Definition and purpose
- Let f, g: N → R_+ denote resource usage (e.g., time, space) as a function of input size n.
- f(n) = O(g(n)) if ∃ constants C > 0 and n0 ∈ N such that ∀ n ≥ n0, f(n) ≤ C g(n).

Related notations
- f(n) = Ω(g(n)) if ∃ C > 0 and n0 with ∀ n ≥ n0, f(n) ≥ C g(n).
- f(n) ∈ Θ(g(n)) if f(n) = O(g(n)) and f(n) = Ω(g(n)).
- f(n) = o(g(n)) if lim_{n→∞} f(n)/g(n) = 0.

Interpretation
- These definitions capture asymptotic growth, suppressing constant factors and lower-order terms.
- They classify algorithmic complexity (time, space) by dominant terms for large n.

Common growth classes
- Polynomial: n^k
- Logarithmic: log n
- Exponential: a^n
- Sub-/super-polynomial distinctions derive from the above.

Example
- f(n) = 3n^2 + 2n, g(n) = n^2. Then f ∈ O(g) (e.g., C = 5, n0 = 1).

AI relevance
- Big O enables formal scalability comparisons for search, optimization, and learning procedures.`
    },
    improved: {
      description: "Balanced academic approach with formal and intuitive elements.",
      prompt: `You are an academic explainer writing for a college-level audience outside the major. Explain {concept} in clear, student-friendly language with minimal jargon. 
Structure the explanation with: 
1) a concise high-level idea; 
2) a precise definition; 
3) an intuitive explanation and a simple example; 
4) the formal definition(s) or rule(s) as needed; 
5) a brief step-by-step justification or mechanism (no chain-of-thought); 
6) common misconceptions and clarifications; 
7) a one-sentence takeaway. Use clearly labeled sections and bullet points to aid readability. 
Include 3–5 key terms with short definitions. Keep total length under 200 words. Do not request user input or follow-up questions. Do not output chain-of-thought.`,
      result: `1) High-level idea
- Big O describes how runtime or memory grows as input size n increases. It focuses on growth rate, not exact numbers.

2) Precise definition
- T(n) = O(f(n)) if ∃ c > 0 and n0 such that for all n ≥ n0, T(n) ≤ c·f(n). f(n) is a simple growth function (e.g., n, n^2, log n).

3) Intuition and simple example
- If a loop runs n times, time ≈ n → O(n). Binary search on sorted data runs ≈ log2 n steps → O(log n). Doubling n roughly doubles time; log n grows slowly.

4) Formal rules and common classes
- Drop constants and lower-order terms when comparing growth.
- Common classes: O(1), O(n), O(n log n), O(n^2), O(2^n).
- O is an upper bound; Theta denotes a tight bound (both upper and lower).

5) Step-by-step mechanism
- Identify the dominant factor in T(n), express it as a function of n, compare to f(n), and pick constants c and n0 to satisfy the definition.

6) Misconceptions and clarifications
- Not exact timing; it's about growth rate. O(n) does not guarantee a fixed linear time in every scenario.

7) Takeaway
- Big O tells you how the resource use grows with input size.

Key terms
- n: input size
- Time complexity: growth of runtime with n
- Big O notation: an upper bound on growth rate (up to constants)`
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
