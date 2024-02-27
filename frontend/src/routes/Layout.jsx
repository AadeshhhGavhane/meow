import "../styles.css";
import { Container, Header, Content, Sidebar } from "rsuite";
import Appbar from "../components/Appbar";
import Leftbar from "../components/Leftbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Kalandar from "../pages/Kalandar";
import Announcements from "../pages/Announcements";
import Leaderboard from "../pages/Leaderboard";
import Pyqma from "../pages/curriculum/Pyqma";
import Syllabus from "../pages/curriculum/Syllabus";
import Ppt from "../pages/curriculum/Ppt";
import Notes from "../pages/curriculum/Notes";
import Marks from "../pages/academics/Marks";
import Submission from "../pages/academics/Submission";
import Micro from "../pages/projects/Micro";
import Major from "../pages/projects/Major";
import Attendance from "../pages/Attendance";
import Myprofile from "../pages/Myprofile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { useSelector } from "react-redux";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ConfirmAccount from "../pages/auth/ConfirmAccount";
import AddQuestions from "../pages/quiz/Addquestions";
import SeeStats from "../pages/quiz/SeeStats";

import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";

function Layout() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <CustomProvider theme="dark">
        <Router>
          {userInfo ? (
            <Container>
              <Header>
                <Appbar />
              </Header>
              <Container>
                <Sidebar>
                  <Leftbar />
                </Sidebar>
                <Content>
                  <Routes>
                    {userInfo.data.user.role === "teacher" && (
                      <Route
                        exact
                        path="/quiz/add-questions"
                        element={<AddQuestions />}
                      />
                    )}
                    {userInfo.data.user.role === "teacher" && (
                      <Route
                        exact
                        path="/quiz/see-stats"
                        element={<SeeStats />}
                      />
                    )}
                    <Route
                      exact
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route
                      exact
                      path="/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      exact
                      path="/reset-password"
                      element={<ResetPassword />}
                    />
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path="/myprofile" element={<Myprofile />} />
                    <Route exact path="/calender" element={<Kalandar />} />
                    <Route
                      exact
                      path="/announcements"
                      element={<Announcements />}
                    />
                    <Route
                      exact
                      path="/leaderboard"
                      element={<Leaderboard />}
                    />
                    <Route exact path="/curriculum/pyqma" element={<Pyqma />} />
                    <Route
                      exact
                      path="/curriculum/syllabus"
                      element={<Syllabus />}
                    />
                    <Route exact path="/curriculum/notes" element={<Notes />} />
                    <Route exact path="/curriculum/ppt" element={<Ppt />} />
                    <Route exact path="/academics/marks" element={<Marks />} />
                    <Route
                      exact
                      path="/academics/submissions"
                      element={<Submission />}
                    />
                    <Route exact path="/projects/micro" element={<Micro />} />
                    <Route exact path="/projects/major" element={<Major />} />
                    <Route exact path="/attendance" element={<Attendance />} />
                  </Routes>
                </Content>
              </Container>
            </Container>
          ) : (
            <Container>
              <Header>
                <Appbar />
              </Header>
              <Content>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/register" element={<Register />} />
                  <Route
                    exact
                    path="/forgot-password"
                    element={<ForgotPassword />}
                  />
                  <Route
                    exact
                    path="/change-password"
                    element={<ChangePassword />}
                  />
                  <Route
                    exact
                    path="/reset-password"
                    element={<ResetPassword />}
                  />
                  <Route
                    exact
                    path="/confirm-account"
                    element={<ConfirmAccount />}
                  />
                </Routes>
              </Content>
            </Container>
          )}
        </Router>
      </CustomProvider>
    </>
  );
}

export default Layout;
