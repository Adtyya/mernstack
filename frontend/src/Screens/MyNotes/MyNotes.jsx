import React, { useEffect } from "react";
import MainScreen from "../../Components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listNotes, deleteNotes } from "../../actions/noteAction";
import Loading from "../../Components/Loading";
import ErrorMsg from "../../Components/ErrorMsg";
import {
  NOTES_CREATE_REQUEST,
  NOTES_DELETE_REQUEST,
} from "../../Constant/notesConstant";

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const noteInfo = useSelector((state) => state.createNote);
  const { success } = noteInfo;

  const userLogedIn = useSelector((state) => state.userLogin);
  const { userInfo } = userLogedIn;

  const isNoteDeleted = useSelector((state) => state.deleteNote);
  const { isSuccess } = isNoteDeleted;

  const successMsg = () => {
    setTimeout(() => {
      dispatch({ type: NOTES_CREATE_REQUEST });
    }, 3000);
    return (
      <ErrorMsg variant="success" className="my-5">
        Created successfully
      </ErrorMsg>
    );
  };

  useEffect(() => {
    const getNotes = () => dispatch(listNotes());
    getNotes();
  }, [dispatch, isSuccess]);

  const handleRemove = (id) => {
    dispatch(deleteNotes(id));
    if (isSuccess) {
      window.location.reload();
    }
    dispatch({ type: NOTES_DELETE_REQUEST });
  };

  return (
    <MainScreen title={`Welcome back ${userInfo.name} ....`}>
      <Link to="/createnote">
        <Button>Create New Note</Button>
      </Link>
      {error && (
        <ErrorMsg variant="danger" className="my-5">
          {error}
        </ErrorMsg>
      )}
      {loading && <Loading />}
      {isSuccess && <ErrorMsg variant="success">Successfully deleted</ErrorMsg>}
      {success && successMsg()}
      {notes?.map((note) => (
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
                  onClick={handleRemove.bind(this, note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                <footer className="text-muted">
                  {note.createdAt?.substring(0, 10)}
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
