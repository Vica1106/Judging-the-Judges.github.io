import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as GithubIcon } from "feather-icons/dist/icons/github.svg";
import { ReactComponent as FileTextIcon } from "feather-icons/dist/icons/file-text.svg";
import { ReactComponent as ImageIcon } from "feather-icons/dist/icons/image.svg";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const IconLinks = tw.div`flex items-center gap-4 lg:ml-4`;
const IconLabel = styled.span`
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
export const IconLink = styled.a`
  ${tw`relative inline-flex flex-col items-center text-primary-500 hover:text-primary-700 transition duration-300`}
  svg {
    ${tw`w-5 h-5`}
  }
  &:hover ${IconLabel} {
    opacity: 1;
  }
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export const HeaderRight = tw.div`flex flex-col lg:flex-row flex-1 lg:flex-initial items-center lg:justify-end gap-4 lg:gap-6`;

export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
  const defaultLinks = [
    <HeaderRight key="right">
      <NavLinks key="nav">
        <NavLink href="#/">Home</NavLink>
        <NavLink href="#/introduction">Introduction</NavLink>
        <NavLink href="#/leaderboard">Leaderboard</NavLink>
        <NavLink href="#/prompts">Prompts</NavLink>
        <NavLink href="#/results">Results</NavLink>
        <NavLink href="#/team">Team</NavLink>
        <NavLink href="#/blog">Blog</NavLink>
      </NavLinks>
      <IconLinks key="icons">
        <IconLink href="https://github.com/Vica1106/Judging-the-Judges" target="_blank" rel="noreferrer" title="GitHub">
          <GithubIcon />
          <IconLabel>GitHub</IconLabel>
        </IconLink>
        <IconLink href="https://drive.google.com/" target="_blank" rel="noreferrer" title="Report">
          <FileTextIcon />
          <IconLabel>Report</IconLabel>
        </IconLink>
        <IconLink href="https://drive.google.com/" target="_blank" rel="noreferrer" title="Poster">
          <ImageIcon />
          <IconLabel>Poster</IconLabel>
        </IconLink>
      </IconLinks>
    </HeaderRight>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="#/">
      <img src={logo} alt="logo" />
      JTJ
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
