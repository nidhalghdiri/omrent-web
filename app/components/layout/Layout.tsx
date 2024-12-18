"use client";
import React, { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import AddClassBody from "../elements/AddClassBody";
import LoginModal from "../elements/LoginModal";
import { SafeUser } from "@/app/types";
import RegisterModal from "../elements/RegisterModal";
import Footer from "./Footer";

interface LayoutProps {
  currentUser?: SafeUser | null;
  headerStyle: number;
  footerStyle: number;
  breadcrumbTitle?: string;
  children: React.ReactNode; // Add this line
}

const Layout: React.FC<LayoutProps> = ({
  currentUser,
  headerStyle,
  footerStyle,
  breadcrumbTitle,
  children,
}) => {
  const [scroll, setScroll] = useState(false);
  // Mobile Menu
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = useCallback(() => {
    setMobileMenu(!isMobileMenu);
    if (!isMobileMenu) {
      document.body.classList.add("mobile-menu-visible");
    } else {
      document.body.classList.remove("mobile-menu-visible");
    }
  }, [isMobileMenu]);
  // Login

  // const [isLogin, setLogin] = useState(false);
  // const handleLogin = useCallback(() => {
  //   setLogin(!isLogin);
  //   if (!isLogin) {
  //     document.body.classList.add("modal-open");
  //   } else {
  //     document.body.classList.remove("modal-open");
  //   }
  // }, [isLogin]);
  // Register
  const [isRegister, setRegister] = useState(false);
  const handleRegister = useCallback(() => {
    setRegister(!isRegister);
    if (!isRegister) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isRegister]);
  return (
    <>
      <div id="top" />
      <AddClassBody />
      <div id="wrapper">
        <div id="pagee" className="clearfix">
          {headerStyle === 1 ? (
            <Header
              currentUser={currentUser}
              scroll={scroll}
              isMobileMenu={isMobileMenu}
              handleMobileMenu={handleMobileMenu}
              isRegister={isRegister}
              handleRegister={handleRegister}
            />
          ) : null}
          <main className="main">
            {breadcrumbTitle && (
              <Breadcrumb breadcrumbTitle={breadcrumbTitle} />
            )}

            {children}
          </main>
          {footerStyle === 1 ? <Footer /> : null}
        </div>
      </div>
      <LoginModal />
      <RegisterModal />
    </>
  );
};

export default Layout;
