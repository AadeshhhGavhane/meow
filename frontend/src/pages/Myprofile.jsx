import React from "react";
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

const UserDetails = [
  {
    name: "Aadesh Dhiraj Gavhane",
    email: "aadesh.connect@gmail.com",
    phone: "8097920998",
    enroll: "2100070151",
    prn: "2021510036",
    sims: "24412",
  },
];
function Myprofile() {
  return (
    <>
      <div>
        <h3 style={{ margin: "20px 10px" }}>Edit Your Profile :</h3>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <h6>Name :</h6>
            <InputGroup>
              <Input />
              <InputGroup.Addon>
                <AvatarIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <h6>Email :</h6>
            <InputGroup>
              <Input disabled />
              <InputGroup.Addon>
                <EmailFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <h6>Phone No:</h6>
            <InputGroup>
              <Input />
              <InputGroup.Addon>
                <PhoneFillIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <h6>Enrollment No:</h6>
            <InputGroup>
              <Input disabled />
              <InputGroup.Addon>
                <OthersIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <h6>SIMS #:</h6>
            <InputGroup>
              <Input disabled />
              <InputGroup.Addon>
                <OthersIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <h6>PRN No:</h6>
            <InputGroup>
              <Input disabled />
              <InputGroup.Addon>
                <OthersIcon />
              </InputGroup.Addon>
            </InputGroup>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <FlexboxGridItem colspan={6} style={{ margin: "20px 10px" }}>
            <IconButton icon={<CheckOutlineIcon />} style={{ width: "100%" }}>
              Update
            </IconButton>
          </FlexboxGridItem>
          <FlexboxGridItem colspan={6} style={{ margin: "20px 10px" }}>
            <IconButton icon={<CloseOutlineIcon />} style={{ width: "100%" }}>
              Clear
            </IconButton>
          </FlexboxGridItem>
        </FlexboxGrid>
      </div>
    </>
  );
}

export default Myprofile;
