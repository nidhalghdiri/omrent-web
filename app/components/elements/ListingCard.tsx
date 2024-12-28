"use client";
import useFavorite from "@/app/hooks/useFavorite";
import { SafeListing, SafeUser } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeartButton from "./HeartButton";

interface ListingCardProps {
  currentUser?: SafeUser | null;
  listing: SafeListing;
  isSearchList: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  currentUser,
  listing,
  isSearchList,
}) => {
  return (
    <div className={`${!isSearchList ? "col-xl-3 col-md-6" : "col-md-6"}`}>
      <div className={`homeya-box ${!isSearchList && "md"}`}>
        <div className="archive-top">
          <div className="images-group">
            <div className="images-style">
              <Image
                alt="listing"
                src={listing.thumbnailSrc}
                width={600}
                height={400}
              />
              {/* <img src={listing.thumbnailSrc} alt="img" /> */}
            </div>
            <div className="top">
              <ul className="d-flex gap-8 flex-column">
                <li className="flag-tag success">Featured</li>
                <li className="flag-tag style-1">{listing.type}</li>
              </ul>
              <ul className="d-flex gap-4">
                <li className="box-icon w-32">
                  <span className="icon icon-arrLeftRight" />
                </li>
                <HeartButton listingId={listing.id} currentUser={currentUser} />
                <li className="box-icon w-32">
                  <span className="icon icon-eye" />
                </li>
              </ul>
            </div>
            <div className="bottom">
              <span className="flag-tag style-2">{listing.category}</span>
            </div>
          </div>
          <div className="content">
            <div className="text-1 text-capitalize">
              <Link href={`/listings/${listing.id}`} className="link">
                {listing.title}
              </Link>
            </div>
            <div className="desc">
              <i className="fs-16 icon icon-mapPin" />
              <p>{`${listing.address}, ${listing.state}, ${listing.country}`}</p>
            </div>
            <ul className="meta-list">
              <li className="item">
                <i className="icon icon-bed" />
                <span>{listing.roomCount}</span>
              </li>
              <li className="item">
                <i className="icon icon-bathtub" />
                <span>{listing.bathroomCount}</span>
              </li>
              <li className="item">
                <i className="icon icon-ruler" />
                <span>{listing.size} SqFT</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="archive-bottom d-flex justify-content-between align-items-center">
          {isSearchList ? (
            <div className="d-flex gap-8 align-items-center">
              <div className="avatar avt-40 round">
                <img src="/images/avatar/avt-6.jpg" alt="avt" />
              </div>
              <span>{currentUser?.name}</span>
            </div>
          ) : (
            <p>{currentUser?.name}</p>
          )}

          <div className="d-flex align-items-center">
            <div className="h7 fw-7">${listing.price}</div>
            <p className="text-variant-1">/{listing.rentCycle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
