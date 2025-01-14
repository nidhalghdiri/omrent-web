"use client";
import React, { useCallback, useState } from "react";
import { SafeListing, SafeUser } from "../types";
import FilterSidebar from "../components/layout/FilterSidebar";
import Link from "next/link";
import ListingCard from "../components/elements/ListingCard";

interface ListingsClientProps {
  currentUser?: SafeUser | null;
  listings?: SafeListing[];
}

const ListingsClient: React.FC<ListingsClientProps> = ({
  currentUser,
  listings,
}) => {
  const [isTab, setIsTab] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const handleTab = useCallback((i: number) => {
    setIsTab(i);
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  return (
    <>
      <section className="flat-section-v6 flat-recommended flat-sidebar">
        <div className="container">
          <div className="box-title-listing">
            <h5>Property listing</h5>
            <div className="box-filter-tab">
              <ul className="nav-tab-filter" role="tablist">
                <li className="nav-tab-item" onClick={() => handleTab(1)}>
                  <a
                    className={
                      isTab == 1 ? "nav-link-item active" : "nav-link-item"
                    }
                    data-bs-toggle="tab"
                  >
                    <i className="icon icon-grid" />
                  </a>
                </li>
                <li className="nav-tab-item" onClick={() => handleTab(2)}>
                  <a
                    className={
                      isTab == 2 ? "nav-link-item active" : "nav-link-item"
                    }
                    data-bs-toggle="tab"
                  >
                    <i className="icon icon-list" />
                  </a>
                </li>
              </ul>
              <select className="nice-select">
                <option data-value={1} className="option">
                  10 Per Page
                </option>
                <option data-value={2} className="option">
                  11 Per Page
                </option>
                <option data-value={3} className="option selected">
                  12 Per Page
                </option>
              </select>
              <select className="nice-select">
                <option data-value="default" className="option selected">
                  Sort by (Default)
                </option>
                <option data-value="new" className="option">
                  Newest
                </option>
                <option data-value="old" className="option">
                  Oldest
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-5 filter-sidebar">
              <FilterSidebar />
            </div>
            <div className="col-xl-8 col-lg-7 properties-list">
              <div className="tab-content">
                <div
                  style={{ opacity: isVisible ? 1 : 0 }}
                  className={
                    isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"
                  }
                  id="gridLayout"
                  role="tabpanel"
                >
                  <div className="row">
                    {listings &&
                      listings.map((listing: SafeListing) => {
                        return (
                          <ListingCard
                            key={listing.id}
                            currentUser={currentUser}
                            listing={listing}
                            isSearchList
                          />
                        );
                      })}
                  </div>
                  <ul className="wd-navigation">
                    <li>
                      <Link href="#" className="nav-item active">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="nav-item">
                        2
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="nav-item">
                        3
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="nav-item">
                        <i className="icon icon-arr-r" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <style jsx>{`
              .filter-sidebar {
                order: 1; /* Default order */
              }
              .properties-list {
                order: 2; /* Default order */
              }

              @media (max-width: 991px) {
                .filter-sidebar {
                  order: 2; /* Sidebar after list */
                }
                .properties-list {
                  order: 1; /* List comes first */
                }
              }
            `}</style>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingsClient;
