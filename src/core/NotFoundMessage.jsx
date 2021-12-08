import React from "react";
import styled from "styled-components";
import { margins, paddings, borderRadius } from "../app/contants";
import notFound from "../images/notFound.png";

const NotFoundMessage = () => {
  return (
    <Message>
      <img src={notFound} alt="Not found" />
    </Message>
  );
};

const Message = styled.div`
  border-radius: ${borderRadius.medium};
  padding: ${paddings.large};
  margin: ${margins.large};
  text-align: center;
`;

export default NotFoundMessage;
