import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Form,
  Button,
  FlexboxGrid,
  Panel,
  Uploader,
} from "rsuite";
import { Input, InputGroup } from "rsuite";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { MdLabelImportant } from "react-icons/md";
import { TbBrandPushbullet } from "react-icons/tb";

import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function Register() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const styles = {
    marginBottom: 20,
  };
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  const [email, setEmail] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [prnNo, setPrnNo] = useState("");
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null); // State to store uploaded avatar

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate enrollmentNo length
    const enrollmentNoRegex = /^\d{10}$/;
    if (!enrollmentNoRegex.test(enrollmentNo)) {
      toast.error("Please enter a valid enrollment number (e.g., 2300070181)");
      return;
    }

    // Validate prnNo format
    const prnNoRegex = /^\d{10}$/;
    if (!prnNoRegex.test(prnNo)) {
      toast.error("Please enter a valid PRN number (e.g., 2021510098)");
      return;
    }

    // Validate aadhaarNo format
    const aadhaarNoRegex = /^\d{12}$/;
    if (!aadhaarNoRegex.test(aadhaarNo)) {
      toast.error("Please enter a valid Aadhaar number (e.g., 574129680357)");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Example: Password must be at least 8 characters long
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("enrollmentNo", enrollmentNo);
      formData.append("prnNo", prnNo);
      formData.append("aadhaarNo", aadhaarNo);
      formData.append("password", password);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await register(formData).unwrap();
      if (res.success) {
        toast.success("User Registered Successfully");
        navigate("/confirm-account"); // Redirect after successful registration
      }
    } catch (err) {
      if (err.originalStatus === 400) {
        toast.error("Invalid Credentials entered by user");
      }
      if (err.originalStatus === 409) {
        toast.error("User Already Exists");
      }
      if (err.originalStatus === 500) {
        toast.error("Something went wrong while registering the user");
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
                  <h3>Register</h3>
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
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <MdLabelImportant />
                </InputGroup.Addon>
                <Input
                  name="prnNo"
                  value={prnNo}
                  onChange={(value) => setPrnNo(value)}
                  placeholder="Enter PRN No"
                />
              </InputGroup>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <TbBrandPushbullet />
                </InputGroup.Addon>
                <Input
                  name="aadhaarNo"
                  value={aadhaarNo}
                  onChange={(value) => setAadhaarNo(value)}
                  placeholder="Enter Aadhaar No"
                />
              </InputGroup>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <EmailFillIcon />
                </InputGroup.Addon>
                <Input
                  name="email"
                  value={email}
                  type="email"
                  onChange={(value) => setEmail(value)}
                  placeholder="Enter Email"
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
              <Uploader
                autoUpload={false}
                fileListVisible={false}
                onChange={(file) => {
                  if (file && file.length > 0) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setAvatar(file[0].blobFile);
                    };
                    reader.readAsDataURL(file[0].blobFile);
                  }
                }}
              >
                <Button style={styles}>Choose Avatar</Button>
              </Uploader>
              <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item>
                  {isLoading ? (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      appearance="primary"
                      loading
                    >
                      Register
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      appearance="primary"
                    >
                      Register
                    </Button>
                  )}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Button
                    as={NavLink}
                    href="/"
                    type="submit"
                    appearance="ghost"
                  >
                    Already Have Account? Login Instead
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

export default Register;
