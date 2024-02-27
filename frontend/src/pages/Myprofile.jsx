import React, { useState } from "react";
import { Button, Input, InputGroup } from "rsuite";
import CloseOutlineIcon from "@rsuite/icons/CloseOutline";
import CheckOutlineIcon from "@rsuite/icons/CheckOutline";
import OthersIcon from "@rsuite/icons/Others";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import PhoneFillIcon from "@rsuite/icons/PhoneFill";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import { FlexboxGrid, Form } from "rsuite";
import { IconButton } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
const TextArea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

import { useSelector, useDispatch } from "react-redux";

function Myprofile() {
  const { userInfo } = useSelector((state) => state.auth);
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
        {/* <FlexboxGrid justify="center">
          <FlexboxGridItem colspan={4} style={{ margin: "20px 10px" }}>
            <IconButton icon={<CheckOutlineIcon />} style={{ width: "100%" }}>
              Update
            </IconButton>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={4} style={{ margin: "20px 10px" }}>
            <IconButton icon={<CloseOutlineIcon />} style={{ width: "100%" }}>
              Clear
            </IconButton>
          </FlexboxGridItem>
        </FlexboxGrid> */}
      </div>
    </>
  );
}

export default Myprofile;
