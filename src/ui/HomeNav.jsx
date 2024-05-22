import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const NavList = styled.ul`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.8rem;
`;
const Icon = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
`;

const IconText = styled.span`
  margin-top: 10px; /* Adjust as needed */
`;

function HomeNav() {
  const navigate = useNavigate();
  return (
    <nav>
      <NavList>
        <Button onClick={() => navigate(`/admin`)}>
          <Icon>
            <RiAdminFill />
            <IconText>Admin</IconText>
          </Icon>
        </Button>
        <Button onClick={() => navigate(`/users`)}>
          <Icon>
            <FaUsers />
            <IconText>Users</IconText>
          </Icon>
        </Button>
      </NavList>
    </nav>
  );
}

export default HomeNav;
