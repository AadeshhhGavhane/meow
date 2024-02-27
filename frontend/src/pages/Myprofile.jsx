import React, { useState } from "react";
import { Button, Input, InputGroup, Uploader, FlexboxGrid, Form } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import PhoneFillIcon from "@rsuite/icons/PhoneFill";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import OthersIcon from "@rsuite/icons/Others";
import { IconButton } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateAvatarMutation } from "../slices/usersApiSlice";

function Myprofile() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [avatarFile, setAvatarFile] = useState(null); // State to hold the uploaded avatar file
  const [updateAvatarMutation] = useUpdateAvatarMutation();

  const handleUploadChange = (file) => {
    setAvatarFile(file[0]); // Set the uploaded file
  };

  const handleUpload = async () => {
    try {
      console.log("Uploading avatar...");
      
      if (!avatarFile) {
        console.error("No avatar file selected.");
        return;
      }
  
      // Create FormData object and append the avatar file
      const formData = new FormData();
      formData.append("avatar", avatarFile);
  
      // Send avatar image using the mutation with FormData
      await updateAvatarMutation(formData); 
  
      console.log("Avatar uploaded successfully!");
      setAvatarFile(null);
      // Optionally, you can dispatch actions or handle success message here
    } catch (error) {
      console.error("Error updating avatar:", error);
      // Handle error appropriately
    }
  };
  


  return (
    <>
      <div>
        <h3 style={{ margin: "20px 10px" }}>Edit Your Profile :</h3>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Name :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.fullName} disabled/>
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Email :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.email} disabled />
              <InputGroup.Addon>
                <EmailFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Phone/Telegram No:</h6>
            <InputGroup>
              <Input value={userInfo.data.user.phoneNo} disabled/>
              <InputGroup.Addon>
                <PhoneFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Roll No:</h6>
            <InputGroup>
              <Input value={userInfo.data.user.rollNo} disabled/>
              <InputGroup.Addon>
                <PhoneFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Birth Date :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.birthDate} disabled/>
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Gender :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.gender} disabled/>
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Blood Group :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.blood} disabled/>
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Enrollment No:</h6>
            <InputGroup>
              <Input value={userInfo.data.user.enrollmentNo} disabled />
              <InputGroup.Addon>
                <OthersIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>PRN No:</h6>
            <InputGroup>
              <Input value={userInfo.data.user.prnNo} disabled />
              <InputGroup.Addon>
                <OthersIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Aadhaar No:</h6>
            <InputGroup>
              <Input value={userInfo.data.user.aadhaarNo} disabled />
              <InputGroup.Addon>
                <OthersIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <FlexboxGridItem colspan={4} style={{ margin: "20px 10px" }}>
            <Uploader
              action="http://localhost:8000/api/v1/users/avatar"
              listType="picture-text"
              autoUpload={false}
              onChange={handleUploadChange}
              style={{ width: "100%" }}
            >
              <Button>
                Upload Avatar
              </Button>
            </Uploader>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={4} style={{ margin: "20px 10px" }}>
            <Button onClick={handleUpload} style={{ width: "100%" }}>
              Submit
            </Button>
          </FlexboxGridItem>
        </FlexboxGrid>
      </div>
    </>
  );
}

export default Myprofile;
