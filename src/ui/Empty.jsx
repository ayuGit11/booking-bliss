import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Button from "./Button";
const Container = styled.div`
  margin-top: 200px;
  text-align: center;
`;
const Buttont = styled(Button)`
  color: #09a183;
  font-weight: bolder;
`;

const Text = styled.p`
  font-weight: bolder;
  padding-bottom: 30px;
  font-size: 30px;
`;
function Empty({ resourceName }) {
  const moveBack = useMoveBack();
  return (
    <Container>
      <Text>No {resourceName} could be found ☹️</Text>
      <Buttont onClick={moveBack}>&larr; Go back</Buttont>
    </Container>
  );
}

export default Empty;
