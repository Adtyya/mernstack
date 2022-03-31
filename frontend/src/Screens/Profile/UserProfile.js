import React, { useEffect, useState } from "react";
import MainScreen from "../../Components/MainScreen";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction";
import ErrorMsg from "../../Components/ErrorMsg";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [idPicture, setIdPict] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      if (password !== confirmPassword) {
        setError("Password doesnt match");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
    dispatch(updateUser(name, email, password, file, idPicture));
  };

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPicture(userInfo.picture);
    setIdPict(userInfo.idPicture);
  }, [file, userInfo]);

  return (
    <MainScreen title="EDIT PROFILE">
      <Row className="profileContainer">
        <Col md={6}>
          {error && <ErrorMsg variant="warning">{error}</ErrorMsg>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group controlId="pic">
              <Form.Label>Change Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={picture} alt={name} width="200" height="200" />
        </Col>
      </Row>
    </MainScreen>
  );
};

export default UserProfile;
