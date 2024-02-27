import React, { useState } from "react";
import { FlexboxGrid, SelectPicker } from "rsuite";
import LinkIcon from "@rsuite/icons/legacy/Link";
import { IconButton, Tooltip, Whisper, ButtonToolbar } from 'rsuite';

const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i>.
  </Tooltip>
);

const subjects = ["PWP", "MAD", "WBP"].map((item) => ({
  label: item,
  value: item,
}));

function Notes() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const createPdfRoute = () => {
    if (selectedSubject) {
      return `/public/data/notes/${selectedSubject.toLowerCase()}/notes.pdf`;
    }
    return "";
  };

  const handleLinkClick = () => {
    const pdfRoute = createPdfRoute();
    if (pdfRoute) {
      const newWindow = window.open(pdfRoute, '_blank');
      if (newWindow) {
        newWindow.opener = null;
      }
    }
  };

  return (
    <div>
      <h3 style={{ margin: "20px 10px" }}>
        Choose Your Subject For Notes
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
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={tooltip}>
              <IconButton
                icon={<LinkIcon />}
                style={{ width: "100%" }}
                onClick={handleLinkClick}
                disabled={!createPdfRoute()}
              >
                Link
              </IconButton>
            </Whisper>
          </ButtonToolbar>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}

export default Notes;