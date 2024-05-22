import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-200);
`;

const LoginContainer = styled.div`
  background-color: #9acce2;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(204, 251, 74, 0.1);
`;

const Container = styled.div`
  background-color: #386b85;
  padding: 6rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(204, 251, 74, 0.1);
`;

const Btn = styled.ul`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.8rem;
`;
function Login() {
  const navigate = useNavigate();
  return (
    <LoginLayout>
      <Btn>
        <Button onClick={() => navigate(`/`)}>&larr; Home</Button>
      </Btn>
      <Container>
        <Logo />
        <LoginContainer>
          <Heading as="h4">Log in to your account</Heading>
          <LoginForm />
        </LoginContainer>
      </Container>
    </LoginLayout>
  );
}

export default Login;
