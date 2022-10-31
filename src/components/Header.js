import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';   //this is used instead of Link(react-router-dom) when the children is a react bootstrap element
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant= 'dark' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart"><Nav.Link><ShoppingCartIcon/> Cart</Nav.Link></LinkContainer>
              <LinkContainer to="/login"><Nav.Link><PersonOutlineIcon/> Sign In</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
