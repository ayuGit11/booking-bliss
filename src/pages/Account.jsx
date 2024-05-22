import styled from "styled-components";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { useMoveBack } from "../hooks/useMoveBack";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Container = styled.div`
  position: relative;
`;

const Buttont = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function Account() {
  const moveBack = useMoveBack();
  return (
    <Container>
      <Heading as="h1">Update your account</Heading>
      <Buttont onClick={moveBack}>&larr; Back</Buttont>
      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </Container>
  );
}

export default Account;
