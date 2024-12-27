"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";
import Avatar from "../elements/Avatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../buttons/Button";

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

  const router = useRouter();
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
        {currentUser ? (
          <Button title="Submit Property" link href="/dashboard/add-property" />
        ) : (
          <Button title="Submit Property" handleSubmit={loginModal.onOpen} />
        )}
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
        <div className={`dropdown-menu  ${isToggled ? "show" : ""}`}>
          <Link className="dropdown-item" href="/my-favorites">
            My Properties
          </Link>
          <Link className="dropdown-item" href="/favorites">
            My Favorites
          </Link>
          <Link className="dropdown-item" href="/my-profile">
            My Profile
          </Link>
          <Link
            className="dropdown-item"
            href="#"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Logout
          </Link>
        </div>

        <div className="flat-bt-top">
          {currentUser ? (
            <Button
              title="Submit Property"
              link
              href="/dashboard/add-property"
            />
          ) : (
            <Button title="Submit Property" handleSubmit={loginModal.onOpen} />
          )}
        </div>
      </div>
    );
  }

  let mobileLoginInfo = (
    <div className="login-box flex align-items-center">
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
  );

  if (currentUser) {
    mobileLoginInfo = (
      <>
        <a
          onClick={handleToggle}
          className={`box-avatar d-flex align-items-center`}
        >
          <div className="avatar avt-40 round">
            <Avatar src={currentUser?.image} />
          </div>
          <p className="name mx-2 text-bold">{currentUser.name}</p>
        </a>
      </>
    );
  }
  console.log("Scroll from heade", scroll);
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
                  {scroll && !isMobileMenu ? (
                    // Small Search Bar (Visible on Scroll)
                    <div className="outer-search">
                      <div className="form-box box-1">
                        <input type="text" placeholder="Enter Keyword" />
                      </div>
                      <div className="form-box box-2">
                        <input type="text" placeholder="Search Location" />
                      </div>
                      <div className="form-box box-3">
                        <input type="text" placeholder="Choose Type" />
                      </div>
                      <a className="btn-search filter-search-canvas">
                        <span className="icon icon-search" />
                      </a>
                    </div>
                  ) : (
                    // Main Menu (Visible by Default)
                    <nav className="main-menu show navbar-expand-md">
                      <div
                        className="navbar-collapse collapse clearfix"
                        id="navbarSupportedContent"
                      >
                        <Menu />
                      </div>
                    </nav>
                  )}
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
              {mobileLoginInfo}
              <MobileMenu handleMobileMenu={handleMobileMenu} />
              <div className="button-mobi-sell">
                {currentUser ? (
                  <Button
                    title="Submit Property"
                    link
                    href="/dashboard/add-property"
                  />
                ) : (
                  <Button
                    title="Submit Property"
                    handleSubmit={loginModal.onOpen}
                  />
                )}
              </div>
              <div className="mobi-icon-box">
                <div className="box d-flex align-items-center">
                  <span className="icon icon-phone2" />
                  <div>00-968-7705-0604</div>
                </div>
                <div className="box d-flex align-items-center">
                  <span className="icon icon-mail" />
                  <div>Ghdiri.nidhal@gmail.com</div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
        {/* <div
          className={`wd-find-select ${scroll ? "hidden" : "visible"}`}
          style={{ marginTop: "20px" }}
        >
          <div className="inner-group">
            <div className="form-group-1 search-form form-style">
              <label>Keyword</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search Keyword."
              />
            </div>
            <div className="form-group-2 form-style">
              <label>Location</label>
              <div className="group-ip">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Location"
                />
                <a href="#" className="icon icon-location" />
              </div>
            </div>
            <div className="form-group-3 form-style">
              <label>Type</label>
              <div className="group-select">
                <select className="nice-select">
                  <option value="all">All</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                  <option value="office">Office</option>
                </select>
              </div>
            </div>
            <button type="submit" className="tf-btn primary">
              Find Properties
            </button>
          </div>
        </div> */}
      </header>
    </>
  );
};

export default Header;
