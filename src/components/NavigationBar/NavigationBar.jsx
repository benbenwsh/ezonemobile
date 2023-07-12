import React from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import {Nav, Navbar, NavDropdown, Menu} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons"
import './NavigationBar.css'

export default function NavigationBar(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <Image 
          src="https://fotama.com/storage/images/logo.png?v=e41ce8ee65494ea841e86412513e9035"
          alt="icon"
          style={{ maxHeight: '50px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Item>
              <Link className="nav-link" to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/shop">Shop</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/help">Help</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/about">About Us</Link>
            </Nav.Item>
          </Nav>
          <Nav>
            { props.isSignedIn 
            ?
            <Link className="nav-link" to="/signin">
              <NavDropdown 
              title={<PersonCircle size={36} />} 
              id="basic-nav-dropdown" 
              className="no-arrow">
                  <NavDropdown.Item href="#" >Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Link> 
            :
            <>
              <Link className="nav-link" to="/signin">
                <Button variant="warning" className="text-light">Sign In</Button>
              </Link>
              <Link className="nav-link" to="/register">
                <Button variant="outline-secondary">Register</Button>
              </Link>
            </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
