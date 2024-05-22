import styled from "styled-components";
import HomeNav from "../ui/HomeNav";

// import Heading from "../ui/Heading";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url("home-image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(3px);
  z-index: -1; /* Ensure it's behind other content */
`;

const Content = styled.div`
  position: relative;
  z-index: 1; /* Ensure it's above the background */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const HeadingContainer = styled.div`
  text-align: center;
`;

const Heading = styled.h1`
  color: hsl(0, 0%, 28%);
  font-size: 50px !important;
  font-weight: bold !important;
  font-family: monospace;
  letter-spacing: 7px !important;
  cursor: pointer;
  text-transform: uppercase;
  padding: 64px;
  background: linear-gradient(
    to right,
    rgb(165, 141, 237) 0,
    hsl(0, 0%, 100%) 10%,
    rgb(3, 3, 3) 20%
  );
  -webkit-background-clip: image;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  /* Added vendor prefixes for compatibility */
  -webkit-animation: shine 5s infinite linear;
  -moz-animation: shine 5s infinite linear;
  -o-animation: shine 5s infinite linear;
  @keyframes shine {
    0% {
      background-position: 0;
    }
    60% {
      background-position: 600px;
    }
    100% {
      background-position: 600px;
    }
  }
`;

const Home = () => {
  return (
    <Content>
      <Background />
      <HeadingContainer>
        <Heading>Welcome to Booking Bliss</Heading>
      </HeadingContainer>
      <HomeNav />
    </Content>
  );
};

export default Home;
