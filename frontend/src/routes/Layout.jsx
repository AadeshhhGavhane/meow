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

function Layout() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
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
                  <Route exact path="/" element={<Homepage />} />
                  <Route exact path="/myprofile" element={<Myprofile />} />
                  <Route exact path="/calender" element={<Kalandar />} />
                  <Route
                    exact
                    path="/announcements"
                    element={<Announcements />}
                  />
                  <Route exact path="/leaderboard" element={<Leaderboard />} />
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
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default Layout;
