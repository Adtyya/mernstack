import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import MyNotes from "./Screens/MyNotes/MyNotes";
import CreateNote from "./Screens/MyNotes/CreateNote";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import { useSelector } from "react-redux";
import DetailNote from "./Screens/detail/DetailNote";
import UserProfile from "./Screens/Profile/UserProfile";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          {!userInfo && (
            <>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
            </>
          )}
          {userInfo && (
            <>
              <Route path="/mynotes" element={<MyNotes />} />
              <Route path="/createnote" element={<CreateNote />} />
              <Route path="/note/:id" element={<DetailNote />} />
              <Route path="/profile" element={<UserProfile />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
