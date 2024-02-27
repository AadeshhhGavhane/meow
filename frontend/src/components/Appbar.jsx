import React from "react";
import { Navbar, Nav, Button } from "rsuite";
import GlobalIcon from "@rsuite/icons/Global";
import AdminIcon from "@rsuite/icons/Admin";
import CreativeIcon from "@rsuite/icons/Creative";
import PhoneIcon from "@rsuite/icons/Phone";
import HomeIcon from "@rsuite/icons/legacy/Home";
import { AvatarGroup, Avatar } from "rsuite";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Appbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  const avatarSrc = userInfo?.data?.user?.avatar || "";

  const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
    <Link ref={ref} to={href} {...rest}>
      {children}
    </Link>
  ));

  return (
    <>
      <Navbar>
        <Navbar.Brand as={NavLink} href="/">
          MeowMeowDashboard
        </Navbar.Brand>
        {userInfo && <Nav>
          <Nav.Item href="http://localhost:3002">Compiler</Nav.Item>
          <Nav.Item href="http://localhost:3003">Quiz</Nav.Item>
        </Nav>}
        {userInfo ? (
          <>
            <Nav pullRight>
              {isLoading ? (
                <Button
                  style={{ align: "center", marginTop: 10, marginRight: 10 }}
                  appearance="subtle"
                  onClick={handleLogout}
                  loading
                >
                  Logout
                </Button>
              ) : (
                <Button
                  style={{ align: "center", marginTop: 10, marginRight: 10 }}
                  appearance="subtle"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Nav>
            <Nav
              style={{ align: "center", marginTop: 10, marginRight: 10 }}
              pullRight
            >
              <AvatarGroup spacing={6}>
                <Link to={`/myprofile`}>
                  <Avatar circle size="md" src={avatarSrc} alt="@superman66" />
                </Link>
              </AvatarGroup>
            </Nav>
          </>
        ) : (
          <>
            <Nav as={NavLink} href="/" pullRight>
              <Button
                style={{ align: "center", marginTop: 10, marginRight: 10 }}
                appearance="subtle"
              >
                Login
              </Button>
            </Nav>
            <Nav as={NavLink} href="/register" pullRight>
              <Button
                style={{ align: "center", marginTop: 10, marginRight: 10 }}
                appearance="subtle"
              >
                Register
              </Button>
            </Nav>
          </>
        )}
      </Navbar>
    </>
  );
}

export default Appbar;
