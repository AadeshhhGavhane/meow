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
import { setCredentials, updateAvatarUrl } from "../slices/authSlice";
import { toast, ToastContainer } from "react-toastify";

function Myprofile() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null); // State to store uploaded avatar
  const [updateAvatarMutation] = useUpdateAvatarMutation();
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      console.log("Uploading avatar...");

      if (!avatar) {
        console.error("No avatar file selected.");
        return;
      }

      // Create FormData object and append the avatar file
      const formData = new FormData();
      formData.append("avatar", avatar);

      // Log formData to check if the avatar file is correctly appended
      console.log("FormData:", formData);

      // Make the mutation request to update the avatar URL
      const avatarUrl = await updateAvatarMutation(formData);

      // Log the obtained avatar URL
      console.log("Avatar URL:", avatarUrl.data.data);

      // Dispatch action to update avatar URL in Redux state
      dispatch(updateAvatarUrl(avatarUrl.data.data));

      console.log("Avatar uploaded successfully!");
      setAvatar(null);
      toast.success("Avatar uploaded successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Error updating avatar. Please try again.");
    } finally {
      // Set loading state back to false whether upload succeeded or failed
      setLoading(false);
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
              <Input value={userInfo.data.user.fullName} disabled />
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
              <Input value={userInfo.data.user.phoneNo} disabled />
              <InputGroup.Addon>
                <PhoneFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Roll No:</h6>
            <InputGroup>
              <Input value={userInfo.data.user.rollNo} disabled />
              <InputGroup.Addon>
                <PhoneFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Birth Date :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.birthDate} disabled />
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Gender :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.gender} disabled />
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <h6>Blood Group :</h6>
            <InputGroup>
              <Input value={userInfo.data.user.blood} disabled />
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
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
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
              <Button>Upload Avatar</Button>
            </Uploader>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={4} style={{ margin: "20px 10px" }}>
            <Button disabled={loading} onClick={handleUpload}>
              {loading ? "Uploading..." : "Submit"}
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </>
  );
}

export default Myprofile;
