import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import EmailIcon from "@mui/icons-material/Email";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import "../css/Header.css";
import SheepLogo from "../assets/sheep.jpg";

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      dark
      sticky="top"
      expand="md"
      className="d-flex"
      style={{ overflow: "visible", display: "inline-block" }}
    >
      <div className="ms-5">
        <NavbarBrand className="brand ms-5 align-items-center" href="/">
          <img
            src={SheepLogo}
            alt="Farmstand Finder Logo"
            className="float-start brand mt-2 me-2"
          />
          {/* <NavItem> */}
          <h3 className="brandname-1">
            Farmstand <span className="brandname-2">Finder</span>
          </h3>
          {/* </NavItem> */}
        </NavbarBrand>
      </div>
      <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} />
      <Collapse isOpen={menuOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink className="nav-link navfont" to="/">
              <HomeRoundedIcon className="navicons" />
              Home
            </NavLink>
          </NavItem>
          <NavItem onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink className="nav-link navfont" to="/Farmstands">
              <AgricultureIcon className="navicons" />
              Farmstands
            </NavLink>
          </NavItem>
          <NavItem onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink className="nav-link navfont" to="/Map">
              <MyLocationIcon className="navicons" />
              Map
            </NavLink>
          </NavItem>
          <NavItem onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink className="nav-link navfont" to="/About">
              <NaturePeopleIcon className="navicons" />
              About Us
            </NavLink>
          </NavItem>
          <NavItem onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink className="nav-link navfont" to="/Contact">
              <EmailIcon className="navicons" />
              Contact
            </NavLink>
          </NavItem>
          <NavItem onClick={() => setMenuOpen(!menuOpen)}>
            <NavLink className="nav-link navfont" to="/Donate">
              <LocalAtmIcon className="navicons" />
              Donate
            </NavLink>
          </NavItem>

          {/* { user &&
          <NavItem>
              <NavLink className='nav-link' to='/profile' active='false' >
                  <i className='fa fa-user fa-lg' /> Profile
              </NavLink>
          </NavItem>
          } 
          { !user &&
            <NavItem>
              <NavLink className='nav-link' to='/sign-in' active='false' >
                  <i className='fa fa-user fa-lg' /> Sign In
              </NavLink>
          </NavItem>
          } */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header2;
