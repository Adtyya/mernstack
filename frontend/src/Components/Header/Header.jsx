import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userLogin);
  const { userInfo } = state;
  const [auth, setAuth] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const checkUser = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!userInfo || !checkUser) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [userInfo, checkUser]);
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-light">
            Awikwok
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {auth ? (
            <Nav style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link>
                <Link to="/mynotes" className="text-light">
                  Notes
                </Link>
              </Nav.Link>
              <NavDropdown
                title={userInfo && `${userInfo.name}`}
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#action3">
                  <Link to="/profile">My profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <></>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
