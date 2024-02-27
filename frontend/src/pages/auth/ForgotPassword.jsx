import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Container, Content, Form, Button, FlexboxGrid, Panel } from "rsuite";
import { Input, InputGroup } from "rsuite";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import ChangePassword from "./ChangePassword";

import { useForgotPasswordMutation } from "../../slices/usersApiSlice";



import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function ForgotPassword() {
  const styles = {
    marginBottom: 20,
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
  
    const requestData = { email };
    try {
      const res = await forgotPassword(requestData).unwrap();
      if (res.success) {
        toast.success("OTP Sent");
        navigate("/reset-password"); // Redirect after successful registration
      }
    } catch (err) {
      if (err.originalStatus === 400) {
        toast.error("Email is Required");
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
                  <h3>Forgot Password?</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item style={styles}>
                  <p>Enter Your Email, We Will Send an OTP</p>
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                <EmailFillIcon />
                </InputGroup.Addon>
                <Input
                  required
                  name="email"
                  value={email}
                  onChange={(value) => setEmail(value)}
                  placeholder="Enter Email"
                />
              </InputGroup>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    appearance="primary"
                  >
                    Send Email
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
}

export default ForgotPassword;
