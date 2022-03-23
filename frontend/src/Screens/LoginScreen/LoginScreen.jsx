import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import MainScreen from "../../Components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading";
import ErrorMsg from "../../Components/ErrorMsg";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.post("/api/user/login", form, config);
      console.log(res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setForm({ email: "", password: "" });
      navigate("/mynotes");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainScreen title="Login">
      <div className="control__container">
        {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
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
