import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Container, Content, Form, Button, FlexboxGrid, Panel } from "rsuite";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function Login() {
  const styles = {
    marginBottom: 20,
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate enrollmentNo length
    const enrollmentNoRegex = /^\d{10}$/;
    if (!enrollmentNoRegex.test(enrollmentNo)) {
      toast.error("Please enter a valid enrollment number (e.g., 2300070181)");
      return;
    }

    // Add your password validation here (e.g., minimum length, special characters, etc.)
    // Example: Password should be at least 8 characters long
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const requestData = { enrollmentNo, password };
    try {
      const res = await login(requestData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      if (err.originalStatus === 401) {
        toast.error("Invalid EnrollmentNo or Password");
      }
      if (err.originalStatus === 403) {
        toast.error("User Not Verified");
        navigate("/confirm-account");
      }
      if (err.originalStatus === 404) {
        toast.error("User Does Not Exist, Sign Up Instead!");
      }
    }
  };

  return (
    <Container>
      <Content>
        <FlexboxGrid justify="center" style={{ marginTop: 70 }}>
          <FlexboxGrid.Item colspan={6}>
            <Panel bordered>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item style={styles}>
                  <h3>Login</h3>
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <AvatarIcon />
                </InputGroup.Addon>
                <Input
                  name="enrollmentNo"
                  value={enrollmentNo}
                  onChange={(value) => setEnrollmentNo(value)}
                  placeholder="Enter Enrollment No"
                />
              </InputGroup>
              <InputGroup inside style={styles}>
                <Input
                  type={visible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(value) => setPassword(value)}
                  placeholder="Enter Password"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
              <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item>
                  {isLoading ? (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      appearance="primary"
                      loading
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      appearance="primary"
                    >
                      Login
                    </Button>
                  )}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  {isLoading ? (
                    <Button
                      type="submit"
                      appearance="ghost"
                      as={NavLink}
                      href="/forgot-password"
                      disabled
                    >
                      Forgot Passowrd?
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      appearance="ghost"
                      as={NavLink}
                      href="/forgot-password"
                    >
                      Forgot Passowrd?
                    </Button>
                  )}
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}

export default Login;
