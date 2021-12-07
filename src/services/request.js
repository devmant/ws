import axios from "axios";

const request = (requestData) => {
  const { owner, repo, page, sort } = requestData;
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.github.com/repos/${owner}/${repo}/issues`,
      crossdomain: true,
      params: {
        per_page: 100,
        page: page || 1,
        sort,
      },
      headers: {
        Authorization: `token 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`,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => resolve({err}));
  });
};

export default request;