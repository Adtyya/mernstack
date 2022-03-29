import React, { useState } from "react";
import MainScreen from "../../Components/MainScreen";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postNotes } from "../../actions/noteAction";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    dispatch(postNotes(title, content));
    setTitle("");
    setContent("");
    navigate("/mynotes");
  };

  return (
    <MainScreen title="Create new notes">
      <Form onSubmit={handleSubmit}>
        <Form.Label>Title</Form.Label>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            name="title"
            placeholder="Today is best day in my life"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            name="content"
            placeholder="I went to park with my friend"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </Form.Group>
        <Button variant="primary" className="my-3" type="submit">
          Create new note
        </Button>
      </Form>
    </MainScreen>
  );
};

export default CreateNote;
