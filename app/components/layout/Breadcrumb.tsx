import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  breadcrumbTitle: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbTitle }) => {
  return (
    <section className="flat-title-page style-2">
      <div className="container">
        <ul className="breadcrumb">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/ Pages</li>
          <li>/ {breadcrumbTitle}</li>
        </ul>
        <h2 className="text-center">{breadcrumbTitle}</h2>
      </div>
    </section>
  );
};

export default Breadcrumb;
