import React from "react";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <h1 onClick={navigateToHome}>ClimaXplorer</h1>
    </header>
  );
};

export default Header;
