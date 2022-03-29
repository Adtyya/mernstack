import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <h1 className="title">Welcome</h1>
            <p className="subtitle">One safe place to write your notes</p>
            {userInfo ? (
              <Link to="/mynotes">
                <Button size="lg">My Notes</Button>
              </Link>
            ) : (
              <div className="button_container">
                <Link to="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    className="landingbutton"
                    variant="outline-primary"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
