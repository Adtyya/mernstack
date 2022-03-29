import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../Components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import ErrorMsg from "../../Components/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";

const LoginScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const isUserLogin = useSelector((state) => state.userLogin);
  const { loadingLogin, error, userInfo } = isUserLogin;
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(form.email, form.password));
  };

  return (
    <MainScreen title="Login">
      <div className="control__container">
        {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
        {loadingLogin && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Label>Email</Form.Label>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              name="email"
              placeholder="user@user.com"
              onChange={handleInput}
              value={form.email}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="*********"
              onChange={handleInput}
              value={form.password}
            />
          </Form.Group>
          <Button variant="primary" className="my-3" type="submit">
            Login
          </Button>
          <Button onClick={() => console.log(loadingLogin)}>Check</Button>
          <Row className="py-3">
            <Col>
              New here? Register{" "}
              <Link to="/register" className="text-primary">
                Here
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default LoginScreen;
