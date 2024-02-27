import React from "react";

import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Sidenav, Nav } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import ReviewIcon from "@rsuite/icons/Review";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import CalendarIcon from "@rsuite/icons/Calendar";
import SpeakerIcon from "@rsuite/icons/Speaker";
import BarChartIcon from "@rsuite/icons/BarChart";
import PageIcon from "@rsuite/icons/Page";
import TrendIcon from "@rsuite/icons/Trend";
import MediaIcon from "@rsuite/icons/Media";
import { useSelector, useDispatch } from "react-redux";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const styles = {
  width: 240,
  display: "inline-table",
  marginRight: 10,
};

const CustomSidenav = ({
  appearance,
  openKeys,
  expanded,
  onOpenChange,
  onExpand,
  ...navProps
}) => {
  const { userInfo } = useSelector((state) => state.auth);
  let className = userInfo.data.user.className[0];
  let role = userInfo.data.user.role;
  console.log(className);
  return (
    <div style={styles}>
      <Sidenav
        appearance={appearance}
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      >
        <Sidenav.Body>
          <Nav {...navProps}>
            <Nav.Item
              as={NavLink}
              href="/"
              eventKey="1"
              active
              icon={<DashboardIcon />}
            >
              Home
            </Nav.Item>
            {userInfo.data.user.role === "teacher" && (
              <Nav.Menu eventKey="9" title="Quiz" icon={<ReviewIcon />}>
                <Nav.Item
                  as={NavLink}
                  href="/quiz/add-questions"
                  eventKey="9-1"
                >
                  Add Questions
                </Nav.Item>

                <Nav.Item as={NavLink} href="/quiz/see-stats" eventKey="9-2">
                  See Stats
                </Nav.Item>
              </Nav.Menu>
            )}
            <Nav.Item
              as={NavLink}
              href="/calender"
              eventKey="2"
              icon={<CalendarIcon />}
            >
              Calender
            </Nav.Item>
            <Nav.Item
              as={NavLink}
              href="/announcements"
              eventKey="3"
              icon={<SpeakerIcon />}
            >
              Announcements
            </Nav.Item>
            {userInfo.data.user.role === "student" && (
              <Nav.Item
                as={NavLink}
                href="/leaderboard"
                eventKey="4"
                icon={<BarChartIcon />}
              >
                Leaderboard
              </Nav.Item>
            )}
            <Nav.Menu eventKey="5" title="Curriculum" icon={<PageIcon />}>
              <Nav.Item as={NavLink} href="/curriculum/pyqma" eventKey="5-1">
                PYQ | MA
              </Nav.Item>
              <Nav.Item as={NavLink} href="/curriculum/syllabus" eventKey="5-2">
                Syllabus
              </Nav.Item>
              <Nav.Item as={NavLink} href="/curriculum/notes" eventKey="5-3">
                Notes
              </Nav.Item>
              <Nav.Item as={NavLink} href="/curriculum/ppt" eventKey="5-4">
                PPT
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu eventKey="6" title="Academics" icon={<TrendIcon />}>
              <Nav.Item as={NavLink} href="/academics/marks" eventKey="6-1">
                Marks
              </Nav.Item>
              <Nav.Item
                as={NavLink}
                href="/academics/submissions"
                eventKey="6-2"
              >
                Submission
              </Nav.Item>
            </Nav.Menu>
            {className === "TYCO" || role === "teacher" ? (
              <Nav.Menu eventKey="7" title="Projects" icon={<MediaIcon />}>
                <Nav.Item as={NavLink} href="/projects/micro" eventKey="7-1">
                  Micro
                </Nav.Item>

                <Nav.Item as={NavLink} href="/projects/major" eventKey="7-2">
                  Major
                </Nav.Item>
              </Nav.Menu>
            ) : (
              <Nav.Menu eventKey="7" title="Projects" icon={<MediaIcon />}>
                <Nav.Item as={NavLink} href="/projects/micro" eventKey="7-1">
                  Micro
                </Nav.Item>
              </Nav.Menu>
            )}

            {/* <Nav.Item as={NavLink} href="/attendance" eventKey="8" icon={<CalendarIcon />}>
              Attendance
            </Nav.Item> */}
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={onExpand} />
      </Sidenav>
    </div>
  );
};

function Leftbar() {
  const [activeKey, setActiveKey] = React.useState("1");
  const [openKeys, setOpenKeys] = React.useState(["3", "4"]);
  const [expanded, setExpand] = React.useState(true);

  return (
    <>
      <CustomSidenav
        activeKey={activeKey}
        openKeys={openKeys}
        onSelect={setActiveKey}
        onOpenChange={setOpenKeys}
        expanded={expanded}
        onExpand={setExpand}
      />
    </>
  );
}

export default Leftbar;
