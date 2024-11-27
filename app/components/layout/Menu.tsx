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
            <li
              className={`dropdown2 home ${checkParentActive([
                "/home-02",
                "/home-03",
                "/home-04",
                "/home-05",
                "/home-06",
              ])}`}
            >
              <Link href="#">Home</Link>
              <ul>
                <li className={`${checkCurrentMenuItem("/")}`}>
                  <Link href="/">Homepage 01</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/home-02")}`}>
                  <Link href="/home-02">Homepage 02</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/home-03")}`}>
                  <Link href="/home-03">Homepage 03</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/home-04")}`}>
                  <Link href="/home-04">Homepage 04</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/home-05")}`}>
                  <Link href="/home-05">Homepage 05</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/home-06")}`}>
                  <Link href="/home-06">Homepage 06</Link>
                </li>
              </ul>
            </li>
            <li
              className={`dropdown2 ${checkParentActive([
                "/property-halfmap-grid",
                "/property-halfmap-list",
                "/topmap-grid",
                "/topmap-list",
                "/sidebar-grid",
                "/sidebar-list",
              ])}`}
            >
              <Link href="#">Listing</Link>

              <ul>
                <li
                  className={`${checkCurrentMenuItem(
                    "/property-halfmap-grid"
                  )}`}
                >
                  <Link href="/property-halfmap-grid">
                    Property Half Map Grid
                  </Link>
                </li>
                <li
                  className={`${checkCurrentMenuItem(
                    "/property-halfmap-list"
                  )}`}
                >
                  <Link href="/property-halfmap-list">
                    Property Half Map List
                  </Link>
                </li>
                <li className={`${checkCurrentMenuItem("/topmap-grid")}`}>
                  <Link href="/topmap-grid">Find Topmap Grid</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/topmap-list")}`}>
                  <Link href="/topmap-list">Find Topmap List</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/sidebar-grid")}`}>
                  <Link href="/sidebar-grid">Find Sidebar Grid</Link>
                </li>
                <li className={`${checkCurrentMenuItem("/sidebar-list")}`}>
                  <Link href="/sidebar-list">Find Sidebar List</Link>
                </li>
              </ul>
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
