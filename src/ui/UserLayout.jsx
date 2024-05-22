import styled from "styled-components";
import UserHeader from "./UserHeader";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";

const StyledUserLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  position: relative;
  overflow-y: auto;
`;

const BlurBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1; /* Push the background behind other content */
  background-image: url("/hotel.jpeg");
  background-size: cover;
  filter: blur(10px); /* Adjust the blur intensity as needed */
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 4.8rem 6.4rem;
`;

export default function UserLayout() {
  return (
    <StyledUserLayout>
      <UserHeader />
      <UserSidebar />
      <Main>
        <BlurBackground />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledUserLayout>
  );
}
