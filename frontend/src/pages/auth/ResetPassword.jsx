import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetPasswordMutation } from "../../slices/usersApiSlice";
import { Container, Content, Form, Button, FlexboxGrid, Panel } from "rsuite";
import { Input, InputGroup } from "rsuite";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";

import EyeIcon from "@rsuite/icons/legacy/Eye";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function ResetPassword() {
  const styles = {
    marginBottom: 20,
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate OTP length
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
  
    // Validate password length
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const requestData = { otp, newPassword };
    try {
      const res = await resetPassword(requestData).unwrap();
      if (res.success) {
        toast.success("Password Resetted Successfully");
        navigate("/"); // Redirect after successful registration
      }
    } catch (err) {
      if (err.originalStatus === 404) {
        toast.error("Invalid OTP");
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
                  <h3>Reset Password</h3>
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <InputGroup inside style={styles}>
                <Input
                  type={visible ? "text" : "password"}
                  name="otp"
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  placeholder="Enter OTP"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
              <InputGroup inside style={styles}>
                <Input
                  type={visible ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(value) => setNewPassword(value)}
                  placeholder="Enter New Password"
                />
                <InputGroup.Button onClick={handleChange}>
                  {visible ? <EyeIcon /> : <EyeSlashIcon />}
                </InputGroup.Button>
              </InputGroup>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    appearance="primary"
                  >
                    Reset Password
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

export default ResetPassword;
