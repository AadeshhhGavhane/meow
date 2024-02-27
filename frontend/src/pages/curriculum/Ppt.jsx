import React from "react";

import { useState } from "react";
import "../../styles.css";
import { FlexboxGrid, Panel } from "rsuite";
import { SelectPicker } from "rsuite";
import { Link } from "react-router-dom";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton } from "rsuite";
import { Tooltip, Whisper, Button, ButtonToolbar } from 'rsuite';


const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i> .
  </Tooltip>
);
const subjects = ["PWP","MAD","WBP"].map((item) => ({
  label: item,
  value: item,
}));

function Ppt() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const createPdfRoute = () => {
    if (selectedSubject) {
      // Construct the PDF route based on selected values
      return `/pdfs/ppt/${selectedSubject}.pdf`;
    }
    return ""; // Return an empty string if values are not selected
  };
  return (
    <>
      <div>
        <h3 style={{ margin: "20px 10px" }}>
          Choose Your Subject For PPT
        </h3>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
            <SelectPicker
              placeholder="Subject"
              data={subjects}
              value={selectedSubject}
              onChange={(value) => setSelectedSubject(value)}
              style={{ width: "100%" }}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6} style={{ margin: "20px 10px" }}>
          <ButtonToolbar>
              {selectedSubject ? (
                <IconButton
                  icon={<LinkIcon />}
                  style={{ width: "100%" }}
                  disabled={!createPdfRoute()}
                >
                  Link
                </IconButton>
              ) : (
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
                  <IconButton
                    icon={<LinkIcon />}
                    style={{ width: "100%" }}
                    disabled={!createPdfRoute()}
                  >
                    Link
                  </IconButton>
                </Whisper>
              )}
            </ButtonToolbar>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </>
  )
}

export default Ppt
