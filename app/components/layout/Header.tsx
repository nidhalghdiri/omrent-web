"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import Avatar from "../elements/Avatar";
interface HeaderProps {
  currentUser?: SafeUser | null;
  scroll: boolean;
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
  isRegister: boolean;
  handleRegister: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentUser,
  scroll,
  isMobileMenu,
  isRegister,
  handleMobileMenu,
  handleRegister,
}) => {
  console.log({ currentUser });
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isToggled, setToggled] = useState(false);
  const handleToggle = useCallback(() => {
    console.log("isToggled", isToggled);
    setToggled(!isToggled);
  }, [isToggled]);

  let loginInfo = (
    <div className="header-account">
      <div className="register">
        <ul className="d-flex">
          <li>
            <a onClick={loginModal.onOpen}>Login</a>
          </li>
          <li>/</li>
          <li>
            <a onClick={registerModal.onOpen}>Register</a>
          </li>
        </ul>
      </div>
      <div className="flat-bt-top">
        <Link className="tf-btn primary" href="/add-property">
          Submit Property
        </Link>
      </div>
    </div>
  );
  if (currentUser) {
    loginInfo = (
      <div className="header-account">
        <a
          onClick={handleToggle}
          className={`box-avatar dropdown-toggle ${isToggled ? "show" : ""}`}
        >
          <div className="avatar avt-40 round">
            <Avatar src={currentUser?.image} />
          </div>
          <p className="name">
            {currentUser.name}
            <span className="icon icon-arr-down" />
          </p>
        </a>
        <div
          className={`dropdown-menu  ${isToggled ? "show" : ""}`}
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: 0,
            transform: "translate(1494px, 62px)",
          }}
        >
          <Link className="dropdown-item" href="/my-favorites">
            My Properties
          </Link>
          <Link className="dropdown-item" href="/my-invoices">
            My Invoices
          </Link>
          <Link className="dropdown-item" href="/my-favorites">
            My Favorites
          </Link>
          <Link className="dropdown-item" href="/reviews">
            Reviews
          </Link>
          <Link className="dropdown-item" href="/my-profile">
            My Profile
          </Link>
          <Link className="dropdown-item" href="/add-property">
            Add Property
          </Link>
          <Link className="dropdown-item" href="/">
            Logout
          </Link>
        </div>

        <div className="flat-bt-top">
          <Link className="tf-btn primary" href="/add-property">
            Submit Property
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <header
        className={`main-header fixed-header ${
          scroll ? "fixed-header is-fixed" : ""
        }`}
      >
        {/* Header Lower */}
        <div className="header-lower">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-container d-flex justify-content-between align-items-center">
                {/* Logo Box */}
                <div className="logo-box">
                  <div className="logo">
                    <Link href="/">
                      <img
                        src="/images/logo/logo@2x.png"
                        alt="logo"
                        width={174}
                        height={44}
                      />
                    </Link>
                  </div>
                </div>
                <div className="nav-outer">
                  {/* Main Menu */}
                  <nav className="main-menu show navbar-expand-md">
                    <div
                      className="navbar-collapse collapse clearfix"
                      id="navbarSupportedContent"
                    >
                      <Menu />
                    </div>
                  </nav>
                  {/* Main Menu End*/}
                </div>
                {loginInfo}
                <div
                  className="mobile-nav-toggler mobile-button"
                  onClick={handleMobileMenu}
                >
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Lower */}
        {/* Mobile Menu  */}
        <div className="close-btn" onClick={handleMobileMenu}>
          <span className="icon flaticon-cancel-1" />
        </div>
        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={handleMobileMenu} />
          <nav className="menu-box">
            <div className="nav-logo">
              <Link href="/">
                <img
                  src="/images/logo/logo@2x.png"
                  alt="nav-logo"
                  width={174}
                  height={44}
                />
              </Link>
            </div>
            <div className="bottom-canvas">
              <div className="login-box flex align-items-center">
                <Link href="#modalLogin" data-bs-toggle="modal">
                  Login
                </Link>
                <span>/</span>
                <Link href="#modalRegister" data-bs-toggle="modal">
                  Register
                </Link>
              </div>
              <MobileMenu handleMobileMenu={handleMobileMenu} />
              <div className="button-mobi-sell">
                <Link className="tf-btn primary" href="/add-property">
                  Submit Property
                </Link>
              </div>
              <div className="mobi-icon-box">
                <div className="box d-flex align-items-center">
                  <span className="icon icon-phone2" />
                  <div>1-333-345-6868</div>
                </div>
                <div className="box d-flex align-items-center">
                  <span className="icon icon-mail" />
                  <div>themesflat@gmail.com</div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
      </header>
    </>
  );
};

export default Header;
