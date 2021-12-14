import React, { useState } from "react";
import Input from "../../core/Input";
import { theme, borderRadius, paddings, mediaWidth } from "../../app/contants";
import styled from "styled-components";
import PropTypes from 'prop-types';

const RepositoryForm = ({onSearch}) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    onSearch(owner, repo)
  }
  return (
    <Form onSubmit={onSubmit} data-testid="form">
      <Input
        label="Repository owner"
        type="text"
        value={owner}
        onChange={setOwner}
        placeholder="microsoft"
      />
      <Input
        label="Repository name"
        type="text"
        value={repo}
        onChange={setRepo}
        placeholder="typescript"
      />
      <Input primary type="submit" value="Submit" />
    </Form>
  );
};

RepositoryForm.propTypes = {
  onSearch: PropTypes.func,
};

const Form = styled.form`
  background-color: ${theme.backgroundColor};
  border-radius: ${borderRadius.medium};
  padding: ${paddings.large};
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  @media (max-width: ${mediaWidth.large}) {
    flex-direction: column;
  }
`;

export default RepositoryForm;
