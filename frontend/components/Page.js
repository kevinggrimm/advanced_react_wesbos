import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

// Tag template literal (string with specific styled.button)
// NESTED SELECTORS 
// No need to give a class unless you have several spans 
// Specific classes arent necessary - just use a nested selector

// Dont want to hardcode values - stick them into a theme
// Can have a variables file or declare variables
// Good for any colors, styles, fonts to be reused throughout application
// Themes == object full of property values
// Unlike styled components, these are strings -- need to have quotes around each object
const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24p x 0 rgba(0, 0, 0, 0.9)',
};

// Styled Components can have props
// use logic, if-statements, etc.
// the backtips are just backticks - use ES6 interpolation
// Can also pass the value of the class to the styled component (e.g., huge=100 => pass 100 to class)
const StyledPage = styled.div`
  background: white; 
  color: ${props => props.theme.black};
`;

// Use interpolation
// Access theme via props.theme.THEME_NAME
// Can have a dark/light theme; based on user setting, you can pass in a different object
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto; 
  padding: 2rem;
`;

// Best practice for setting box-size: border box
// Set onn root document in HTML, inherit on everything else

// Base of 10 --> 1.5rem == 15px
// Font-families - (1) define (2) reference in 'font-family'
// When setting global styles, you dont have access to the theme
// **However, because it is in this file, its within scope

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2')
    format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0; 
    margin: 0;
    font-size: 1.5rem; 
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

// Theme Provider expects you to pass it a theme object
class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header/>
          <Inner>
          {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;