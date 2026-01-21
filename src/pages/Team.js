import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";

const HeadingRow = tw.div`flex flex-col items-center`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Subheading = tw(SubheadingBase)`text-primary-500 mb-4`;
const Description = tw.p`mt-4 text-gray-600 text-center max-w-2xl`;

const TeamGrid = tw.div`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12`;

const MemberCard = tw.div`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300`;
const MemberImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-full h-64 bg-cover bg-center bg-gray-200`}
`;
const MemberInfo = tw.div`p-6 text-center`;
const MemberName = tw.h3`text-xl font-bold text-gray-900`;
const MemberRole = tw.p`text-primary-500 font-medium mt-1`;
const MemberBio = tw.p`text-gray-600 mt-3 text-sm`;

const SocialLinks = tw.div`flex justify-center gap-4 mt-4`;
const SocialLink = tw.a`text-gray-400 hover:text-primary-500 transition duration-300`;

const AffiliationSection = tw.div`mt-16 text-center`;
const AffiliationTitle = tw.h3`text-xl font-bold text-gray-900 mb-6`;
const AffiliationLogos = tw.div`flex flex-wrap justify-center gap-8 items-center`;
const AffiliationLogo = tw.div`text-gray-600 font-semibold text-lg`;

// Sample team member data - replace with your real information
const teamMembers = [
  {
    name: "Team Member 1",
    role: "Project Lead",
    bio: "Research focus on LLM evaluation and AI safety.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Team Member 2",
    role: "Research Scientist",
    bio: "Specializes in natural language processing and machine learning.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Team Member 3",
    role: "Research Engineer",
    bio: "Expert in building scalable evaluation systems.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Team Member 4",
    role: "Data Scientist",
    bio: "Focus on statistical analysis and bias detection.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Team Member 5",
    role: "Research Assistant",
    bio: "Working on prompt engineering and evaluation metrics.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    twitter: "#",
    linkedin: "#",
    github: "#"
  },
  {
    name: "Team Member 6",
    role: "Advisor",
    bio: "Professor with expertise in AI alignment and evaluation.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    twitter: "#",
    linkedin: "#",
    github: "#"
  }
];

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Subheading>Our Team</Subheading>
            <Heading>Meet the Researchers</Heading>
            <Description>
              We are a team dedicated to AI evaluation research, from leading research institutions.
            </Description>
          </HeadingRow>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <MemberCard key={index}>
                <MemberImage imageSrc={member.image} />
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberBio>{member.bio}</MemberBio>
                  <SocialLinks>
                    <SocialLink href={member.twitter} target="_blank">
                      <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </SocialLink>
                    <SocialLink href={member.linkedin} target="_blank">
                      <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </SocialLink>
                    <SocialLink href={member.github} target="_blank">
                      <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </SocialLink>
                  </SocialLinks>
                </MemberInfo>
              </MemberCard>
            ))}
          </TeamGrid>

          <AffiliationSection>
            <AffiliationTitle>Affiliations</AffiliationTitle>
            <AffiliationLogos>
              <AffiliationLogo>University Name</AffiliationLogo>
              <AffiliationLogo>Research Lab</AffiliationLogo>
              <AffiliationLogo>AI Institute</AffiliationLogo>
            </AffiliationLogos>
          </AffiliationSection>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
