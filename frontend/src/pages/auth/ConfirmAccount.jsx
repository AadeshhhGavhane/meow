import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useConfirmAccountMutation } from "../../slices/usersApiSlice";
import { Container, Content, Form, Button, FlexboxGrid, Panel } from "rsuite";
import { Input, InputGroup } from "rsuite";
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

function ConfirmAccount() {
  const styles = {
    marginBottom: 20,
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmAccount, { isLoading }] = useConfirmAccountMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate enrollmentNo length
    const enrollmentNoRegex = /^\d{10}$/;
    if (!enrollmentNoRegex.test(enrollmentNo)) {
      toast.error("Please enter a valid enrollment number (e.g., 2300070181)");
      return;
    }
  
    // Validate OTP length
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    const requestData = { enrollmentNo, otp };
    try {
      const res = await confirmAccount(requestData).unwrap();
      if (res.success) {
        toast.success("User Verified Successfully");
        navigate("/"); // Redirect after successful registration
      }
    } catch (err) {
      if (err.originalStatus === 401) {
        toast.error("Invalid OTP");
      }
      if (err.originalStatus === 404) {
        toast.error("User Does Not Exist, Sign Up Instead!");
      }
    }
  
    // Continue with your logic if enrollmentNo and OTP are valid
    // Add your logic here...
  };
  

  return (
    <Container>
      <Content>
        <FlexboxGrid justify="center" style={{ marginTop: 70 }}>
          <FlexboxGrid.Item colspan={6}>
            <Panel bordered>
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item style={styles}>
                  <h3>Confirm Account</h3>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item style={styles}>
                  <p>Enter the OTP we sent on your email</p>
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
                  name="otp"
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  placeholder="Enter OTP"
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
                    Confirm Account
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

export default ConfirmAccount;
