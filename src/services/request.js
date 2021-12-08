import axios from "axios";

const request = (requestData) => {
  const { owner, repo, page, sort } = requestData;
  console.warn(process.env.GIT_HUB_KEY)
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
        Authorization: `token ${process.env.REACT_APP_GIT_HUB_KEY}`,
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