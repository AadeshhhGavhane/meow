import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Container, Content, Form, Button, FlexboxGrid, Panel } from "rsuite";
import { Input, InputGroup } from "rsuite";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import EyeIcon from "@rsuite/icons/legacy/Eye";


import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function ChangePassword() {
  const styles = {
    marginBottom: 20,
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add your password validation here (e.g., minimum length, special characters, etc.)
    // Example: Old and new password must be at least 8 characters long
    if (oldPassword.length < 8 || newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
  
    // Continue with your logic if password validation passes
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
                  <h3>Change Password</h3>
                </FlexboxGrid.Item>
              </FlexboxGrid>
              <InputGroup inside style={styles}>
                <Input
                  type={visible ? "text" : "password"}
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(value) => setOldPassword(value)}
                  placeholder="Enter Old Password"
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
                    Change Password
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

export default ChangePassword;
