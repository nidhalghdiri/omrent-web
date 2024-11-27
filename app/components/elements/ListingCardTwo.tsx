import { SafeListing, SafeUser } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ListingCardTwoProps {
  currentUser?: SafeUser | null;
  listing: SafeListing;
}

const ListingCardTwo: React.FC<ListingCardTwoProps> = ({
  currentUser,
  listing,
}) => {
  return (
    <div className="col-md-6">
      <div className="homeya-box">
        <div className="archive-top">
          <Link href="/property-details-v1" className="images-group">
            <div className="images-style">
              <Image
                alt="listing"
                src={listing.imageSrc}
                width={600}
                height={400}
              />
              {/* <img src={listing.imageSrc} alt="img" /> */}
            </div>
            <div className="top">
              <ul className="d-flex gap-8 flex-column">
                <li className="flag-tag success">Featured</li>
                <li className="flag-tag style-1">For Sale</li>
              </ul>
              <ul className="d-flex gap-4">
                <li className="box-icon w-32">
                  <span className="icon icon-arrLeftRight" />
                </li>
                <li className="box-icon w-32">
                  <span className="icon icon-heart" />
                </li>
                <li className="box-icon w-32">
                  <span className="icon icon-eye" />
                </li>
              </ul>
            </div>
            <div className="bottom">
              <span className="flag-tag style-2">{listing.category}</span>
            </div>
          </Link>
          <div className="content">
            <div className="text-1 text-capitalize">
              <Link href="/property-details-v1" className="link">
                {listing.title}
              </Link>
            </div>
            <div className="desc">
              <i className="fs-16 icon icon-mapPin" />
              <p>15 Willow Street, Seattle, WA</p>
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
                <span>600 SqFT</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="archive-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex gap-8 align-items-center">
            <div className="avatar avt-40 round">
              <img src="/images/avatar/avt-6.jpg" alt="avt" />
            </div>
            <span>Arlene McCoy</span>
          </div>
          <div className="d-flex align-items-center">
            <h6>${listing.price}</h6>
            <span className="text-variant-1">/SqFT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCardTwo;
