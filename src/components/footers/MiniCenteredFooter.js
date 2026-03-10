import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {Container as ContainerBase } from "components/misc/Layouts.js"
import logo from "../../images/logo.png";
import { ReactComponent as GithubIcon } from "../../images/github-icon.svg";
import { ReactComponent as FileTextIcon } from "feather-icons/dist/icons/file-text.svg";
import { ReactComponent as ImageIcon } from "feather-icons/dist/icons/image.svg";

const Container = tw(ContainerBase)`bg-gray-900 text-gray-100 -mx-8 -mb-8`
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`
const Link = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10 flex flex-wrap justify-center gap-6`;
const SocialLinkLabel = styled.span`
  position: absolute;
  top: 100%;
  margin-top: 0.25rem;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #f3f4f6;
  background: #1f2937;
  border-radius: 0.25rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  left: 50%;
  transform: translateX(-50%);
`;
const SocialLink = styled.a`
  ${tw`relative inline-flex flex-col items-center cursor-pointer text-primary-500 hover:text-primary-400 transition duration-300`}
  svg {
    ${tw`w-5 h-5`}
  }
  &:hover ${SocialLinkLabel} {
    opacity: 1;
  }
`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`

export default () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
            <LogoText>JTJ</LogoText>
          </LogoContainer>
          <LinksContainer>
            <Link href="#/">Home</Link>
            <Link href="#/overview">Overview</Link>
            <Link href="#/leaderboard">Leaderboard</Link>
            <Link href="#/prompts">Prompts</Link>
            <Link href="#/results">Results</Link>
            <Link href="#/team">Team</Link>
            <Link href="https://medium.com/p/775ab4952ccd">Blog</Link>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLink href="https://github.com/Vica1106/Judging-the-Judges" target="_blank" rel="noreferrer" title="GitHub">
              <GithubIcon />
              <SocialLinkLabel>GitHub</SocialLinkLabel>
            </SocialLink>
            <SocialLink href="https://drive.google.com/file/d/1V9wAhNhalQYpOePFSHbFGyKpFF0Dh6or/view?usp=sharing" target="_blank" rel="noreferrer" title="Report">
              <FileTextIcon />
              <SocialLinkLabel>Report</SocialLinkLabel>
            </SocialLink>
            <SocialLink href="https://drive.google.com/file/d/1Q8SKwZxC-1No3ipur4rxB35PUMcflKGA/view?usp=sharing" target="_blank" rel="noreferrer" title="Poster">
              <ImageIcon />
              <SocialLinkLabel>Poster</SocialLinkLabel>
            </SocialLink>
          </SocialLinksContainer>
          <CopyrightText>
            &copy; {new Date().getFullYear()} Judging the Judges. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};
