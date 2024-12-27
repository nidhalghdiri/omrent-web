import { useRouter } from "next/navigation";
import React from "react";

const BottomNavigation = () => {
  const router = useRouter();

  const navItems = [
    { name: "Home", icon: "icon-home", path: "/" },
    { name: "Explore", icon: "icon-search", path: "/listings" },
    { name: "Account", icon: "icon-profile", path: "/account" },
  ];
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <button
          key={item.name}
          className={`nav-item`}
          onClick={() => handleNavigation(item.path)}
        >
          <span className={`icon ${item.icon}`} />
          <span>{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
