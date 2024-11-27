"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Menu = () => {
  const router = useRouter();
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li
              className={`dropdown2 ${checkParentActive([
                "/dashboard",
                "/my-favorites",
                "/my-invoices",
                "/my-favorites",
                "/reviews",
                "/my-profile",
                "/add-property",
              ])}`}
            >
              <Link href="#">Dashboard</Link>
              <ul>
                <li className={`${checkCurrentMenuItem("/dashboard")}`}>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/my-favorites")}`}>
                  <Link href="/my-favorites">My Properties</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/my-invoices")}`}>
                  <Link href="/my-invoices">My Invoices</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/my-favorites")}`}>
                  <Link href="/my-favorites">My Favorites</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/reviews")}`}>
                  <Link href="/reviews">Reviews</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/my-profile")}`}>
                  <Link href="/my-profile">My Profile</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/add-property")}`}>
                  <Link href="/add-property">Add Property</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="#"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
