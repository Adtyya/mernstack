import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainScreen from "../../Components/MainScreen";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Loading from "../../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { updateNotes } from "../../actions/noteAction";
import ErrorMsg from "../../Components/ErrorMsg";

const DetailNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.updateNote);
  const { error, success } = notes;

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateNotes(id, title, content));
  };

  useEffect(() => {
    const getDetailNote = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailNote();
  }, [id, navigate]);
  return (
    <MainScreen title="Edit note">
      {error && <ErrorMsg variant="danger">{error}</ErrorMsg>}
      {success && <ErrorMsg variant="success">Note updated</ErrorMsg>}
      {isLoading ? (
        <Loading />
      ) : (
        <Form>
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
          <Button
            variant="primary"
            className="my-3"
            type="submit"
            onClick={handleUpdate}
          >
            update note
          </Button>
        </Form>
      )}
    </MainScreen>
  );
};

export default DetailNote;
