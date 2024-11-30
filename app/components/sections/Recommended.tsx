"use client";

import React, { useState } from "react";
import ListingCard from "../elements/ListingCard";
import { SafeListing, SafeUser } from "@/app/types";

interface RecommendedProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

const Recommended: React.FC<RecommendedProps> = ({ currentUser, listings }) => {
  const [isTab, setIsTab] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const handleTab = (i: number) => {
    setIsTab(i);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  };
  return (
    <>
      <section className="flat-section flat-recommended">
        <div className="container">
          <div
            className="text-center wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <div className="text-subtitle text-primary">
              Featured Properties
            </div>
            <h4 className="mt-4">Recommended For You</h4>
          </div>

          <div
            className="flat-tab-recommended wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <ul
              className="nav-tab-recommended justify-content-center"
              role="tablist"
            >
              <li className="nav-tab-item" onClick={() => handleTab(1)}>
                <a
                  className={
                    isTab == 1 ? "nav-link-item active" : "nav-link-item"
                  }
                  data-bs-toggle="tab"
                >
                  View All
                </a>
              </li>
              <li className="nav-tab-item" onClick={() => handleTab(2)}>
                <a
                  className={
                    isTab == 2 ? "nav-link-item active" : "nav-link-item"
                  }
                  data-bs-toggle="tab"
                >
                  Apartment
                </a>
              </li>
              <li className="nav-tab-item" onClick={() => handleTab(3)}>
                <a
                  className={
                    isTab == 3 ? "nav-link-item active" : "nav-link-item"
                  }
                  data-bs-toggle="tab"
                >
                  Villa
                </a>
              </li>
              <li className="nav-tab-item" onClick={() => handleTab(4)}>
                <a
                  className={
                    isTab == 4 ? "nav-link-item active" : "nav-link-item"
                  }
                  data-bs-toggle="tab"
                >
                  Studio
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                style={{ opacity: isVisible ? 1 : 0 }}
                className={
                  isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"
                }
                id="viewAll"
                role="tabpanel"
              >
                <div className="row">
                  {listings.map((listing: SafeListing) => {
                    return (
                      <ListingCard
                        key={listing.id}
                        currentUser={currentUser}
                        listing={listing}
                        isSearchList={false}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recommended;
