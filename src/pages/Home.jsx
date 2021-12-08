import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import DataTable from "../core/DataTable";
import NotFoundMessage from "../core/NotFoundMessage";
import RepositoryForm from "./components/RepositoryForm";
import { selectIssues } from "../redux/issueListReducer";
import {
  margins,
  paddings,
  mediaWidth,
} from "../app/contants";
import logo from "../images/logo.png";
import request from "../services/request";
import { useDispatch } from "react-redux";
import { setIssues } from "../redux/issueListReducer";

const Home = () => {
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const issues = useSelector(selectIssues);
  const dispatch = useDispatch();

  const fetchData = async (requestData) => {
    setError(false);
    setLoading(true);
    const newState = { ...searchData, ...requestData };
    const { data, err } = await request(newState);
    if (!err) {
      dispatch(setIssues(data));
      setSearchData(newState);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const onSearch = async (owner, repo) => {
    fetchData({ ...searchData, page: 1, owner, repo });
  };

  const onPageChange = (page) => {
    fetchData({ ...searchData, page });
  };

  const onSort = (sort) => {
    fetchData({ ...searchData, sort });
  };

  const displayWarning = () => !loading && searchData && (!issues.length || error);

  const headers = [
    { title: "Title", sort: false },
    { title: "Updated", sort: true },
    { title: "Status", sort: false },
  ];

  return (
    <Main>
      <Head>
        <Logo src={logo} alt="logo" />
        <RepositoryForm onSearch={onSearch} />
      </Head>
      {displayWarning() && <NotFoundMessage />}
      <DataTable
        headers={headers}
        data={issues}
        onSort={onSort}
        onPageChange={onPageChange}
        page={searchData?.page || 1}
        loading={loading}
      />
    </Main>
  );
};

const Main = styled.div`
  padding: ${paddings.large};
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${mediaWidth.small}) {
    flex-direction: column;
  }
`;

const Logo = styled.img`
  width: 15%;
  height: 15%;
  min-width: 240px;
  display: inline-block;
  margin: ${margins.large};
`;

export default Home;
