import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  Form,
  ButtonToolbar,
  Button,
  Navbar,
  Panel,
  FlexboxGrid,
} from "rsuite";

import { Link } from "react-router-dom";
import Login from "./Login";
const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function Register() {
  const [email, setEmail] = useState();
  const [enrollmentNo, setEnrollmentNo] = useState();
  const [prnNo, setPrnNo] = useState();
  const [aadhaarNo, setAadhaarNo] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
  }

  return (
    <>
      <Container>
        <Content style={{ marginTop: "60px" }}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Register</h3>} bordered>
                <Form fluid>
                  <Form.Group>
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Enrollment No</Form.ControlLabel>
                    <Form.Control
                      name="enrollmentNo"
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>PRN No</Form.ControlLabel>
                    <Form.Control
                      name="prnNo"
                      value={prnNo}
                      onChange={(e) => setPrnNo(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Aadhaar No</Form.ControlLabel>
                    <Form.Control
                      name="aadhaarNo"
                      value={aadhaarNo}
                      onChange={(e) => setAadhaarNo(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="off"
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={handleSubmit}>Sign Up</Button>

                      <Button
                        appearance="link"
                        as={NavLink}
                        children={<Login />}
                        href="/login"
                      >
                        Login Page
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
}

export default Register;
