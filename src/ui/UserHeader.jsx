import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle";
import Button from "./Button";
import { useMoveBack } from "../hooks/useMoveBack";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function UserHeader() {
  const moveBack = useMoveBack();
  return (
    <StyledHeader>
      <DarkModeToggle />
      <Button type="small" onClick={moveBack}>
        &larr; Back
      </Button>
    </StyledHeader>
  );
}

export default UserHeader;
