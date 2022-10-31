import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant= 'dark' expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart"><ShoppingCartIcon/> Cart</Nav.Link>
              <Nav.Link href="/login"><PersonOutlineIcon/> Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
