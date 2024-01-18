import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import {
  Container,
  Content,
  Form,
  Button,
} from "rsuite";

import { Link, useNavigate } from "react-router-dom";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function Login() {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { enrollmentNo, password };
    try {
      const res = await login(requestData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <Content>
        <Form fluid >
          <Form.Group>
            <Form.ControlLabel>Enrollment No</Form.ControlLabel>
            <Form.Control
              name="enrollmentNo"
              value={enrollmentNo}
              onChange={(value) => setEnrollmentNo(value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" onClick={handleSubmit} appearance="primary">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Content>
    </Container>
  );
}

export default Login;
