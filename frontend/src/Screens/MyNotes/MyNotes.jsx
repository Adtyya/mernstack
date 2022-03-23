import React, { useEffect, useState } from "react";
import MainScreen from "../../Components/MainScreen";
import { Link } from "react-router-dom";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import axios from "axios";

const MyNotes = () => {
  const removeHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
    }
  };

  const [notes, setNotes] = useState([]);

  const data = async () => {
    try {
      const res = await axios.get("/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    data();
  }, []);
  return (
    <MainScreen title="Welcome back Mamang ....">
      <Link to="/createnote">
        <Button>Create New Note</Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                {note.title}
              </span>
              <div>
                <Link to={`/note/${note._id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => removeHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <h4>
                <Badge variant="success">Category - {note.category}</Badge>
              </h4>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                <footer className="blockquote-footer">Created on</footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
