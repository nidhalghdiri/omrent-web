"use client";

import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  handleMobileMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ handleMobileMenu }) => {
  const pathname = usePathname();
  const [currentMenuItem, setCurrentMenuItem] = useState("");
  useEffect(() => {
    setCurrentMenuItem(pathname as string);
  }, [pathname]);

  const checkCurrentMenuItem = useCallback(
    (path: string) => {
      if (currentMenuItem === path) {
        return "current";
      } else {
        return "";
      }
    },
    [currentMenuItem]
  );
  var test = [];

  const checkParentActive = useCallback(
    (paths: string[]) => {
      if (paths.some((path) => currentMenuItem.startsWith(path))) {
        return "current";
      } else {
        return "";
      }
    },
    [currentMenuItem]
  );
  const [isAccordion, setIsAccordion] = useState(1);
  const handleAccordion = useCallback((key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  }, []);
  return (
    <>
      <div className="menu-outer">
        <div
          className="navbar-collapse collapse clearfix"
          id="navbarSupportedContent"
        >
          <ul className="navigation clearfix">
            <li className={`home`}>
              <Link href="/" onClick={handleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/listings" onClick={handleMobileMenu}>
                Properties
              </Link>
            </li>
            <li
              className={`dropdown2 ${
                isAccordion == 6 ? "open" : ""
              } ${checkParentActive([
                "/who-we-are",
                "/how-it-works",
                "/blog",
                "/help-faq",
              ])}`}
            >
              <Link href="#">About Us</Link>
              <ul style={{ display: `${isAccordion == 6 ? "block" : "none"}` }}>
                <li className={`${checkCurrentMenuItem("/how-it-works")}`}>
                  <Link href="/who-we-are">Who we are?</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/how-it-works")}`}>
                  <Link href="/how-it-works">How It Works</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/blog")}`}>
                  <Link href="/blog">Blog</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/help-faq")}`}>
                  <Link href="/help-faq">Help/FAQ</Link>
                </li>
              </ul>
              <div
                className="dropdown2-btn"
                onClick={() => handleAccordion(6)}
              />
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
