import React, { Component } from "react";
import Header from "./Header";
import Meta from "./Meta";
import styled from "styled-components";

const MyButton = styled.button`
  background: red;
  font-size: 50px;
  .poop {
    font-size: ${props => props.huge ? '200px' : '30px' };
  }
`;


class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        <MyButton huge>
          <span className="poop">💩</span>
        </MyButton>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
