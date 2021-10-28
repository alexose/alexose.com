import React from 'react'
import { render } from 'react-dom'
window.React = React

import 'preact/debug';
import { h, render } from 'preact';
import Styled from 'styled-components';

import Jumbotron from './Components/Jumbotron';
import Main from './Components/Main';
import SideNav from './Components/SideNav';

const Container = Styled.div`
  display: flex;
`;

render((
  <div id="foo">
    <Jumbotron>Alexander Ose</Jumbotron>
    <Container>
      <SideNav />
      <Main />
    </Container>
  </div>
), document.body);
