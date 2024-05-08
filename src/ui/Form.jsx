import styled, { css } from "styled-components";

const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;

  ${(props) =>
    props.type === "modal" &&
    css`
      overflow: scroll;
      width: 80rem;
    `}

  /* Apply overflow property only when type is not "regular" */
  ${(props) =>
    props.type !== "regular" &&
    css`
      overflow: scroll; /* Use auto or scroll to add scrollbars when content overflows */
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
