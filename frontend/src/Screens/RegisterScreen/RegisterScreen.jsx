import React, { useState } from "react";
import MainScreen from "../../Components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMsg from "../../Components/ErrorMsg";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { regist } from "../../actions/userAction";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [succes, setSucces] = useState(null);

  const dispatch = useDispatch();
  const register = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = register;
  const defaultPict =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPass) {
      setMessage("Password doesnt match!");
    }
    if (password === confirmPass) {
      dispatch(regist(name, email, password, file, defaultPict, setSucces));
    }
  };

  return (
    <MainScreen title="Register">
      {" "}
      <div className="control__container">
        {message && <ErrorMsg variant="danger">{message}</ErrorMsg>}
        {error && <ErrorMsg variant="warning">{error}</ErrorMsg>}
        {succes && (
          <ErrorMsg variant="success">
            {succes} Login <Link to="/login">here</Link>
          </ErrorMsg>
        )}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="John doe"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="user@user.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="*********"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicFile">
            <Form.Label>
              Profile picture <span className="text-muted"> *Optional</span>
            </Form.Label>
            <Form.Control
              type="file"
              name="picture"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
          </Form.Group>
          <Button variant="primary" className="my-3" type="submit">
            Register
          </Button>
          <Button
            variant="primary"
            className="my-3"
            type="button"
            onClick={() => console.log(error)}
          >
            check
          </Button>
          <Row className="py-3">
            <Col>
              Already have account? Login{" "}
              <Link to="/login" className="text-primary">
                Here
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
