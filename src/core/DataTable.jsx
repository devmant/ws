import React from "react";
import styled from "styled-components";
import { openInNewTab } from "../services/helpers";
import { theme, borderRadius, paddings, margins } from "../app/contants";
import Input from "./Input";
import Loader from "./Loader";

const DataTable = ({ headers, data, onSort, onPageChange, page, loading }) => {
  const renderHeader = () => {
    return (
      <Tr>
        {headers.map((header) => {
          const { title, sort } = header;
          return (
            <Th
              sort={sort}
              key={title}
              onClick={() => {
                if (sort) {
                  onSort(title.toLowerCase());
                }
              }}
            >
              {title}
            </Th>
          );
        })}
      </Tr>
    );
  };
  const renderData = () => {
    return data.map((item) => (
      <Tr key={item.id} onClick={() => openInNewTab(item.html_url)}>
        <Td>{item.title}</Td>
        <Td>{renderDate(item.updated_at)}</Td>
        <Td>{item.state.toUpperCase()}</Td>
      </Tr>
    ));
  };
  const renderDate = (date) => {
    return new Date(date).toISOString().slice(0, 10);
  };
  const renderPagination = () => {
    return (
      <>
        {page > 1 && (
          <Input
            primary
            type="button"
            value="&larr;"
            onClick={() => onPageChange(page - 1)}
          />
        )}
        <Input
          primary
          type="button"
          value="&rarr;"
          onClick={() => onPageChange(page + 1)}
        />
      </>
    );
  };

  const hasData = !!data.length;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        hasData && (
          <>
            <Main>
              <Table>
                <thead>{renderHeader()}</thead>
                <tbody>{renderData()}</tbody>
              </Table>
              <Pagination>{renderPagination()}</Pagination>
            </Main>
          </>
        )
      )}
    </>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.backgroundColor};
  border-radius: ${borderRadius.medium};
  padding: ${paddings.medium};
  margin-top: ${margins.large};
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${theme.text};
  text-align: left;
`;

const Th = styled.th`
  font-size: 18px;
  font-weight: 700;
  opacity: 0.65;
  padding: ${paddings.small};
  cursor: ${(props) => (props.sort ? "pointer" : "auto")};
`;

const Td = styled.td`
  padding: ${paddings.medium};
  :nth-of-type(1) {
    width: 70%;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${theme.primary};
  cursor: pointer;
  :hover {
    background-color: ${theme.hover};
  }
`;

const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
`;
export default DataTable;
