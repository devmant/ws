import issuesReducer, { setIssues } from "../../redux/issueListReducer";

describe("issues reducer", () => {
  const initialState = {
    issues: [],
  };
  it("should handle initial state", () => {
    expect(issuesReducer(undefined, { type: "unknown" })).toEqual({
      issues: [],
    });
  });

  it("should handle setIssues action", () => {
    const testValue = ["test"];
    const actual = issuesReducer(initialState, setIssues(testValue));
    expect(actual.issues).toEqual(testValue);
  });
});
