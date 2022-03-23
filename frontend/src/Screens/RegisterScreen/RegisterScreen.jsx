import React, { useState, useEffect } from "react";
import MainScreen from "../../Components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMsg from "../../Components/ErrorMsg";
import axios from "axios";
import Loading from "../../Components/Loading";

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [picture, setPicture] = useState({
    picture: "",
  });
  //"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState(null);
  const [picMsg, setPicMsg] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInput = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // const merged = { ...form, ...picture };
    // if (form.password != confirmPass) {
    //   setMessage("Password doesnt match!");
    // }
    // if (form.password == confirmPass) {
    //   setLoading(true);
    //   setMessage(null);
    //   try {
    //     await axios.post("/api/user", merged, config);
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  };

  const postPicture = async (pics) => {
    if (!pics) {
      setPicMsg("Please select an image!");
    }
    setPicMsg(null);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "mern_noteszipper");
    data.append("cloud_name", "dmz19yaoz");

    // const res = await axios.post(
    //   "https://api.cloudinary.com/v1_1/dmz19yaoz/upload",
    //   data
    // );
    // const showres = res.data;
  };

  return (
    <MainScreen title="Register">
      {" "}
      <div className="control__container">
        {message && <ErrorMsg variant="danger">{message}</ErrorMsg>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="John doe"
              onChange={handleInput}
              value={form.name}
            />
          </Form.Group>
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
            <Form.Label>Profile picture</Form.Label>
            <Form.Control
              type="file"
              name="picture"
              onChange={handleSubmit}
              accept="image/*"
            />
          </Form.Group>
          <Button variant="primary" className="my-3" type="submit">
            Register
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
