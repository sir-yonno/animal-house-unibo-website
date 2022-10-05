
import { useState, useEffect, useContext } from 'react';
import './Navbar.scss';
import Dropdown from './Dropdown';
import { FaBars } from 'react-icons/fa'
import { Button } from 'react-bootstrap';
import { Store } from '@/context/store';
import { check_login, logout } from '@/context/utils';
import { useNavigate } from 'react-router-dom';

const NavbarServizi = () => {
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

export default function Navbar() {
  const [loggedin, setLoggedin] = useState(false);
  const { dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  async function verify_login() {
    setLoggedin(await check_login());
  }
  useEffect(() => {
    verify_login();
  }, [])
  return (
    <>
      <nav className="navbar bg-light p-3 border-bottom border-5">
        <div className="container-fluid">
          <h1><a className="navbar-brand fs-1 text-dark" href="/">AnimalHouse</a></h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon text-dark"><FaBars /></span>
          </button>
          <div className="collapse navbar-collapse mx-lg-5 px-lg-5 p-2" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavbarShop />
              <NavbarGiochi />
              <NavbarServizi />
              <a className="text-dark nav-link disabled text-muted" href="back/home">Back office</a>
              {
                (loggedin ?
                  <>
                    <Button
                      variant="danger"
                      className="text-light m-2"
                      onClick={() => { logout(ctxDispatch) }}
                    >Logout</Button>
                    <Button
                      variant="primary"
                      className="text-light m-2"
                      onClick={() => { navigate("/profile") }}
                    >Profile</Button>
                  </> :
                  <>
                    <Button
                      variant="success"
                      className="text-light m-2"
                      onClick={() => { navigate(`/backoffice/login`) }}
                    >Login</Button>
                    <Button
                      variant="primary"
                      className="text-light m-2"
                      onClick={() => { navigate(`/backoffice/register`) }}
                    >Register</Button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
