import PropTypes from "prop-types";

const issueDataType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  updated_at: PropTypes.string,
  state: PropTypes.string,
  html_url: PropTypes.string,
});

export { issueDataType };
