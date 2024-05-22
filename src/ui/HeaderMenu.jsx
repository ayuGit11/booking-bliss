import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();
  const [userIconActive, setUserIconActive] = useState(false);

  const handleUserIconClick = () => {
    if (userIconActive) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/account");
    }
    setUserIconActive(!userIconActive);
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={handleUserIconClick}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
