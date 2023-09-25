import React from 'react'
import { Navbar, Nav } from 'rsuite';
import GlobalIcon from '@rsuite/icons/Global';
import AdminIcon from '@rsuite/icons/Admin';
import CreativeIcon from '@rsuite/icons/Creative';
import PhoneIcon from '@rsuite/icons/Phone';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { AvatarGroup, Avatar } from 'rsuite';
import "../styles.css"
import { Link } from "react-router-dom";

function Appbar() {

  return (
    <>
      <Navbar>
        <Navbar.Brand href="#">MeowMeowDashboard</Navbar.Brand>
        <Nav style={{ align: "center", marginTop: 7 }} pullRight>

          <AvatarGroup spacing={6} >
          <Link to={`/myprofile`}>
            <Avatar circle size="md" src="https://i.redd.it/gear-5-luffy-vs-s-class-which-ones-does-luffy-lose-to-v0-fgzmnioro3m91.jpg?width=1280&format=pjpg&auto=webp&s=edfa7c8bea82e576ec5e7e304d09560257c8e3fd" alt="@superman66" />
            </Link>

          </AvatarGroup>
        </Nav>
      </Navbar>
    </>
  )
}

export default Appbar