import axios from "axios";

const request = (requestData) => {
  const { owner, repo, page, sort } = requestData;
  return axios({
    method: "get",
    url: `https://api.github.com/repos/${owner}/${repo}/issues`,
    params: {
      per_page: 10,
      page: page || 1,
      sort,
    },
    headers: {
      Authorization: `token ${process.env.REACT_APP_GIT_HUB_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => err);
};

export default request;
