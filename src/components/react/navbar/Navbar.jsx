
import { useState, useEffect, useContext } from 'react';
import './Navbar.scss';
//import Dropdown from './Dropdown';
import {LinkContainer} from 'react-router-bootstrap';
//import { FaBars } from 'react-icons/fa'
import { Container, NavDropdown, Nav} from 'react-bootstrap';
import { Store } from '@/context/store';
import { check_login, logout } from '@/context/utils';
import { Routes, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {Navbar as Bar} from 'react-bootstrap';
import { Route } from 'react-router-dom';

/*const NavbarServizi = () => {
  return (
    <>
      <Dropdown
        title={{
          href: "/comunita/home",
          id: "home-comunita",
          name: "Servizi della comunita",
        }}
        elements={[
          { title: "Leaderboard giochi", href: "/comunita/leaderboard-giochi", disabled: true },
          { title: "Bacheca eccolo qua", href: "/comunita/eccolo-qua" },
          { title: "Bacheca cerco partner", href: "/comunita/cerco-partner" },
          { title: "Bacheca aiutatemi", href: "/comunita/aiutatemi" },
        ]}
      />
      <Dropdown
        title={{
          href: "/presenza/home",
          id: "servizi-presenza-home",
          name: "Servizi in presenza",
        }}
        elements={[
          { title: "Veterinario", href: "/presenza/veterinario", disabled: true },
          { title: "Dogsitter", href: "/presenza/dogsitter", disabled: true },
          { title: "Toelettatura", href: "/presenza/toelettatura", disabled: true },
          { title: "Visite animali soli", href: "/presenza/visite-animali-soli", disabled: true },
        ]}
      />
      <Dropdown
        title={{
          href: "/online/home",
          id: "servizi-online-home",
          name: "Servizi online",
        }}
        elements={[
          { title: "Videoconferenza con l'esperto", href: "/online/esperto", disabled: true },
          { title: "Videoconferenza con il veterinario", href: "/online/veterinario", disabled: true },
          { title: "Videoconferenza con il tuo animale", href: "/online/tuo-animale", disabled: true },
        ]}
      />
    </>
  );
}

const NavbarGiochi = () => {
  return (
    <Dropdown
      title={{
        href: "/games/home",
        id: "home-giochi",
        name: "Giochi",
      }}
      elements={[
        {
          title: "Hangman",
          href: "/games/hangman"
        },
        {
          title: "Wordle",
          href: "/games/wordle"
        },
        {
          title: "Memory",
          href: "/games/memory"
        },
        {
          title: "Slider",
          href: "/games/slider"
        },
      ]}
    />
  );
}

const NavbarShop = () => {
  return (
    <Dropdown
      title={{
        href: "shop/home",
        id: "home-shop",
        name: "E-commerce",
      }}
      elements={[
        { title: "Cibo", href: "shop/cibo", disabled: true },
        { title: "Prodotti sanitari", href: "shop/sanitari", disabled: true },
        { title: "Accessoristica", href: "shop/accessori", disabled: true },
      ]}
    />
  );

}
*/


export default function Navbar() {
  const [loggedin, setLoggedin] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {userInfo}= state;
  const navigate = useNavigate();
  async function verify_login() {
    setLoggedin(await check_login());
  }

  useEffect(() => {
    verify_login();
  }, [])

  const signoutHandler = () => {
    logout(ctxDispatch)
    navigate('/backoffice/login');
  }

  return (
    <Bar expand='lg' className='text-black  our-nav'>
      <Container>
        <LinkContainer to='/'>
          <Bar.Brand >
            AnimalHouse
          </Bar.Brand> 
        </LinkContainer>
        <Routes>
          <Route path='/shop' element={<Bar.Text>Sei nello shop!</Bar.Text>} />
        </Routes>
        <Bar.Toggle aria-controls='basic-navbar-nav'/>
        <Bar.Collapse id='basic-navbar-nav' className='text-black'>
          <Nav className='me-auto w-100 justify-content-end '>
            <NavDropdown title='Services'>
              <LinkContainer to="/comunita">
                <NavDropdown.Item>Community</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/services/facetoface">
                <NavDropdown.Item>Offline (?)</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/services/online">
                <NavDropdown.Item>Online</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <Link to='/shop' className='nav-link'>
              Shop
            </Link>
            <Nav.Link href='/games'>
              Games
            </Nav.Link>
              {
                userInfo ?
                  (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Your Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/shop/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link className='dropdown-item' to='#signout' onClick={signoutHandler}>
                        Logout
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className='nav-link' to='/backoffice/login'>
                      Login 
                    </Link>
                  )
              }
          </Nav>
        </Bar.Collapse>
      </Container>  
    </Bar>
  );
}
