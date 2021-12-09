import React from "react";
import styled from "styled-components";
import { theme, margins } from "../app/contants";

const Loader = () => <Spinner />;

const Spinner = styled.div`
  border: 16px solid ${theme.primary};
  border-radius: 50%;
  border-top: 16px solid ${theme.backgroundColor};
  width: 60px;
  height: 60px;
  margin: ${margins.large} auto;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
