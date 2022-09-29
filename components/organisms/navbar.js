import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavbarLight() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand href="#home">Penjualan</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref>
              <Nav.Link>Data</Nav.Link>
            </Link>
            <Link href="/transaksi" passHref>
              <Nav.Link>Transaksi</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLight;
