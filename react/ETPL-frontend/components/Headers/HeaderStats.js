import styles from "../../styles/header.module.css";
import { useRouter } from 'next/router'
import React, { useRef, useState, useEffect } from 'react';
// import Login from "../../pages/ETPL/login"
import Login from "../../pages/home/login"
export default function HeaderStats() {
  const history = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  useOutsideAlerter(ref);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setTimeout(() => {
            setModalOpen(false)
          }, 0);

        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useEffect(() => {
    setUser({ 'name': localStorage.getItem('name'), 'mob': localStorage.getItem('mob') })
  }, [])
  function tempLogin() {
    setUser({ 'name': localStorage.getItem('name'), 'mob': localStorage.getItem('mob') })
  }
  const handleClickOpen = (n) => {
    if (n == 'in') setOpen(true);
    if (n == 'out') {
      history.push('/');
      localStorage.clear();
      setOpen(false);
      setUser({})
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {(open) ? <Login open={open} handleClose={handleClose} tempLogin={tempLogin} /> : null}
      <header className="header">
        <div className="container-fluid navSec">
          <div className="flex flex-wrap">
            <div className="w-full md:w-2/12 sm:w-2/12 ">
              <img className="logo" src="/images/logo.png" />
            </div>
            <div className="w-full md:w-10/12 sm:w-10/12 px-4">
              <nav className="navbar navbar-expand-md bg-dark navbar-dark pull-right">

                <div>
                  {/* <!-- Toggler/collapsibe Button --> */}
                  <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button"><i className="text-white fas fa-bars"></i></button>
                  <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav flex" style={{ cursor: "pointer" }}>
                      <li className="nav-item">
                        <a className="nav-link" onClick={() => history.push('/')}>Home</a></li>
                      <li className="nav-item">
                        <a className="nav-link" >Banking & Payment <span className="textBlock">Services</span> <img src="/images/downArrow.png" /></a>
                        <div className="gw-sidebar subMenu">
                          <div id="gw-sidebar" className="gw-sidebar ">
                            <div className="nano-content">
                              <ul className="gw-nav gw-nav-list">
                                <li className="init-arrow-down"> <a > Menu 1</a></li>
                                <li className="init-arrow-down"> <a > Menu 2</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" >Bill Payments <span className="textBlock"> & Recharges</span> <img src="/images/downArrow.png" /></a>
                        <div className="gw-sidebar subMenu">
                          <div id="gw-sidebar" className="gw-sidebar ">
                            <div className="nano-content">
                              <ul className="gw-nav gw-nav-list">
                                <li className="init-arrow-down"> <a > Menu 3</a></li>
                                <li className="init-arrow-down"> <a > Menu 4</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" >About Us</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" >Become <span className="textBlock"> A Partner</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" >Help & Support</a>
                      </li>
                      {(!user.mob) ? <li className="nav-item loginBtn" onClick={() => handleClickOpen('in')}>
                        <a className="nav-link" >Login / Sign Up</a>
                      </li> :
                        <> <li className="nav-item loginBtn" onClick={() => setModalOpen(!isModalOpen)}>
                          <a className="nav-link">{user.name} {user.mob}</a>
                        </li>
                          {isModalOpen ? (
                            <div id="sec" className="userDropdown" name="sec" ref={ref}>
                              {/* <div className="grid grid-cols-2 gap-10 ">
                                <div className="init-arrow-down"><div className="iconBox">
                                  
                                </div>
                                  <div>$1200</div>
                                  <div>AePS Wallet</div></div>
                                <div className="init-arrow-down"><div className="iconBox"></div>
                                  <div>$70000</div>
                                  <div>Main Wallet</div></div>
                              </div> */}
                              <ul><li onClick={() => { history.push('/myProfile')}} >View Profile</li>
                              <li onClick={() => { history.push('/KYC/aadharkyc'); setModalOpen(false) }} >Update KYC</li>
                              <li onClick={() => { setModalOpen(false); handleClickOpen('out'); }} >Sign Out</li></ul>
                            </div>
                          ) : (
                            null
                          )}

                        </>}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

      </header>
    </>
  );
}
