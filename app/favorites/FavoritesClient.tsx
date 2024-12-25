"use client";
import React from "react";
import { SafeListing, SafeUser } from "../types";
import Link from "next/link";

interface FavoritesClientProps {
  currentUser?: SafeUser | null;
  listings?: SafeListing[];
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <>
      <div className={`layout-wrap`}>
        <div className="main-content">
          <div className="main-content-inner">
            <div className="widget-box-2 wd-listing">
              <h6 className="title">My Favorites</h6>
              <div className="wrap-table">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>LISTING TITLE</th>
                        <th>Date Published</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listings?.map((listing) => (
                        <tr key={listing.id} className="file-delete">
                          <td>
                            <div className="listing-box">
                              <div className="images">
                                <img src={listing.thumbnailSrc} alt="images" />
                              </div>
                              <div className="content">
                                <div className="title">
                                  <Link
                                    href={`/listings/${listing.id}`}
                                    className="link"
                                  >
                                    {listing.title}
                                  </Link>{" "}
                                </div>
                                <div className="text-date">
                                  12 Lowell Road, Port Washington
                                </div>
                                <div className="text-1 fw-7">
                                  ${listing.price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>April 9, 2024</span>
                          </td>
                          <td>
                            <ul className="list-action">
                              <li>
                                <Link href="#" className="item">
                                  <i className="icon icon-edit" />
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link href="#" className="item">
                                  <i className="icon icon-sold" />
                                  Sold
                                </Link>
                              </li>
                              <li>
                                <a className="remove-file item">
                                  <i className="icon icon-trash" />
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        </div>
      </div>
    </>
  );
};

export default FavoritesClient;
