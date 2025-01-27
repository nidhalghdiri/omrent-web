"use client";

import PropertyMap from "@/app/components/elements/PropertyMap";
import RangeSlider from "@/app/components/elements/RangeSlider";
import SidebarFilter from "@/app/components/elements/SidebarFilter";
import VideoPopup from "@/app/components/elements/VideoPopup";
import {
  SafeAmenity,
  SafeAmenityCategory,
  SafeListing,
  SafePropertyAmenity,
  SafeUser,
} from "@/app/types";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  speed: 2000,
  navigation: {
    clickable: true,
    nextEl: ".nav-prev-location",
    prevEl: ".nav-next-location",
  },
  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
  },
  slidesPerView: 1,
  loop: true,
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    991: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },

    1520: {
      slidesPerView: 2.03,
      spaceBetween: 20,
    },
  },
};
const swiperOptions2 = {
  modules: [Autoplay, Pagination, Navigation],
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
    reverseDirection: false,
  },

  speed: 3000,
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false,
    },
    991: {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: false,
    },

    1550: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};
const swiperOptions3 = (galleryLength: number) => ({
  modules: [Autoplay, Pagination, Navigation],
  autoplay:
    galleryLength > 1
      ? {
          delay: 2000,
          disableOnInteraction: false,
        }
      : false, // Disable autoplay for single-image galleries
  speed: 1200, // Slightly reduced speed for a smoother experience
  navigation:
    galleryLength > 1
      ? {
          clickable: true,
          nextEl: ".nav-prev-location",
          prevEl: ".nav-next-location",
        }
      : false, // Disable navigation for single-image galleries
  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
    dynamicBullets: galleryLength > 1, // Enable dynamic bullets for multi-image galleries
  },
  slidesPerView: galleryLength > 1 ? 1 : "auto", // Center a single image
  loop: galleryLength > 1, // Disable looping for single-image galleries
  spaceBetween: galleryLength > 1 ? 20 : 0, // No spacing needed for single-image galleries
  centeredSlides: galleryLength > 1, // Center slides only for multiple images
  breakpoints: {
    600: {
      slidesPerView: galleryLength > 1 ? 2 : 1,
      spaceBetween: galleryLength > 1 ? 20 : 0,
      centeredSlides: galleryLength > 1 ? false : true,
    },
    991: {
      slidesPerView: galleryLength > 1 ? 2 : 1,
      spaceBetween: galleryLength > 1 ? 20 : 0,
      centeredSlides: galleryLength > 1 ? false : true,
    },
    1520: {
      slidesPerView: galleryLength > 1 ? 2.03 : 1,
      spaceBetween: galleryLength > 1 ? 20 : 0,
      centeredSlides: galleryLength > 1 ? false : true,
    },
  },
});

interface ListingClientProps {
  currentUser: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
    propertyAmenities: {
      id: string;
      createdAt: string;
      amenity: {
        id: string;
        name: string;
        icon: string | null;
        category: {
          id: string;
          name: string;
        };
      };
    }[];
  };
}

const ListingClient: React.FC<ListingClientProps> = ({
  currentUser,
  listing,
}) => {
  const [isAccordion, setIsAccordion] = useState(1);

  const handleAccordion = useCallback((key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  }, []);
  const groupedAmenities = listing.propertyAmenities.reduce(
    (acc, propertyAmenity) => {
      const category = propertyAmenity.amenity.category.name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(propertyAmenity.amenity);
      return acc;
    },
    {} as Record<string, { name: string; icon: string | null }[]>
  );
  return (
    <>
      <section className="flat-location flat-slider-detail-v1">
        <div className="swiper tf-sw-location">
          <Swiper
            {...(swiperOptions3(listing.galleryImages?.length || 0) as object)}
            className="swiper-wrapper"
          >
            {/* Display the thumbnail image */}
            <SwiperSlide>
              <Link
                href={listing.thumbnailSrc}
                data-fancybox="gallery"
                className="box-imgage-detail d-block"
              >
                <img src={listing.thumbnailSrc} alt="Thumbnail of property" />
              </Link>
            </SwiperSlide>
            {/* Map through gallery images */}
            {listing.galleryImages?.map((imageSrc, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={imageSrc}
                  data-fancybox="gallery"
                  className="box-imgage-detail d-block"
                >
                  <img src={imageSrc} alt={`Gallery image ${index + 1}`} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="box-navigation">
            <div className="navigation swiper-nav-next nav-next-location">
              <span className="icon icon-arr-l" />
            </div>
            <div className="navigation swiper-nav-prev nav-prev-location">
              <span className="icon icon-arr-r" />
            </div>
          </div>
        </div>
      </section>
      <section className="flat-section pt-0 flat-property-detail">
        <div className="container">
          <div className="header-property-detail">
            <div className="content-top d-flex justify-content-between align-items-center">
              <div className="box-name">
                <Link href="#" className="flag-tag primary">
                  For Rent
                </Link>
                <h4 className="title link">{listing.title}</h4>
              </div>
              <div className="box-price d-flex align-items-center">
                <h4>${listing.price}</h4>
                <span className="body-1 text-variant-1">
                  /{listing.rentCycle}
                </span>
              </div>
            </div>
            <div className="content-bottom">
              <div className="info-box">
                <div className="label">FEATUREs:</div>
                <ul className="meta">
                  <li className="meta-item">
                    <span className="icon icon-bed" /> {listing.roomCount}{" "}
                    Bedroom
                  </li>
                  <li className="meta-item">
                    <span className="icon icon-bathtub" />{" "}
                    {listing.bathroomCount} Bathroom
                  </li>
                  <li className="meta-item">
                    <span className="icon icon-ruler" /> {listing.size} SqFT
                  </li>
                </ul>
              </div>
              <div className="info-box">
                <div className="label">LOCATION:</div>
                <p className="meta-item">
                  <span className="icon icon-mapPin" /> {listing.address},
                  {listing.state}
                </p>
              </div>
              <ul className="icon-box">
                <li>
                  <Link href="#" className="item">
                    <span className="icon icon-arrLeftRight" />{" "}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="item">
                    <span className="icon icon-share" />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="item">
                    <span className="icon icon-heart" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="single-property-element single-property-desc">
                <div className="h7 title fw-7">Description</div>
                <p className="body-2 text-variant-1">{listing.description}</p>
                <p className="mt-8 body-2 text-variant-1"></p>
                <Link href="#" className="btn-view">
                  <span className="text">View More</span>{" "}
                </Link>
              </div>
              <div className="single-property-element single-property-overview">
                <div className="h7 title fw-7">Overview</div>
                <ul className="info-box">
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-house-line" />
                    </Link>
                    <div className="content">
                      <span className="label">ID:</span>
                      <span>{listing.propertyId}</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-arrLeftRight" />
                    </Link>
                    <div className="content">
                      <span className="label">Type:</span>
                      <span>{listing.type}</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-bed" />
                    </Link>
                    <div className="content">
                      <span className="label">Bedrooms:</span>
                      <span>{listing.roomCount} Rooms</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-bathtub" />
                    </Link>
                    <div className="content">
                      <span className="label">Bathrooms:</span>
                      <span>{listing.bathroomCount} Rooms</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-garage" />
                    </Link>
                    <div className="content">
                      <span className="label">Garages:</span>
                      <span>0 Rooms</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-ruler" />
                    </Link>
                    <div className="content">
                      <span className="label">Size:</span>
                      <span>{listing.size} SqFt</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-crop" />
                    </Link>
                    <div className="content">
                      <span className="label">Land Size:</span>
                      <span>2,000 SqFt</span>
                    </div>
                  </li>
                  <li className="item">
                    <Link href="#" className="box-icon w-52">
                      <i className="icon icon-hammer" />
                    </Link>
                    <div className="content">
                      <span className="label">Year Built:</span>
                      <span>2024</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="single-property-element single-property-video">
                <div className="h7 title fw-7">Video</div>
                <div className="img-video">
                  <img src="/images/banner/img-video.jpg" alt="img-video" />
                  <VideoPopup />
                </div>
              </div>
              <div className="single-property-element single-property-info">
                <div className="h7 title fw-7">Property Details</div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property ID:</span>
                      <div className="content fw-7">{listing.propertyId}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Bedrooms:</span>
                      <div className="content fw-7">{listing.roomCount}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Price:</span>
                      <div className="content fw-7">
                        ${listing.price}
                        <span className="caption-1 fw-4 text-variant-1">
                          /{listing.rentCycle}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Bedrooms:</span>
                      <div className="content fw-7">{listing.roomCount}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property Size:</span>
                      <div className="content fw-7">{listing.size} SqFt</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Bathsrooms:</span>
                      <div className="content fw-7">
                        {listing.bathroomCount}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Year built:</span>
                      <div className="content fw-7">2023 - 12 - 11</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Bathsrooms:</span>
                      <div className="content fw-7">
                        {listing.bathroomCount}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property Type:</span>
                      <div className="content fw-7">{listing.type}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Garage:</span>
                      <div className="content fw-7">0</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property Status:</span>
                      <div className="content fw-7">For Rent</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Garage Size:</span>
                      <div className="content fw-7">0 SqFt</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="single-property-element single-property-feature">
                <div className="h7 title fw-7">Amenities and features</div>
                <div className="wrap-feature">
                  {Object.entries(groupedAmenities).map(
                    ([categoryName, amenities]) => (
                      <div key={categoryName} className="box-feature">
                        <div className="fw-7">{categoryName}:</div>
                        <ul>
                          {amenities.map((amenity) => (
                            <li key={amenity.name} className="feature-item">
                              {amenity.icon && (
                                <span className={`icon ${amenity.icon}`} />
                              )}
                              {amenity.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
                {/* <div className="wrap-feature">
                  <div className="box-feature">
                    <div className="fw-7">Home safety:</div>
                    <ul>
                      <li className="feature-item">
                        <span className="icon icon-smoke-alarm" />
                        Smoke alarm
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-carbon" />
                        Carbon monoxide alarm
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-kit" />
                        First aid kit
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-lockbox" />
                        Self check-in with lockbox
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-security" />
                        Security cameras
                      </li>
                    </ul>
                  </div>
                  <div className="box-feature">
                    <div className="fw-7">Bedroom:</div>
                    <ul>
                      <li className="feature-item">
                        <span className="icon icon-hanger" />
                        Hangers
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-bed-line" />
                        Bed linens
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-pillows" />
                        Extra pillows &amp; blankets
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-iron" />
                        Iron
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-tv" />
                        TV with standard cable
                      </li>
                    </ul>
                  </div>
                  <div className="box-feature">
                    <div className="fw-7">Kitchen:</div>
                    <ul>
                      <li className="feature-item">
                        <span className="icon icon-refrigerator" />
                        Refrigerator
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-microwave" />
                        Microwave
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-microwave" />
                        Dishwasher
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-coffee" />
                        Coffee maker
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
              <div className="single-property-element single-property-map">
                <div className="h7 title fw-7">Map</div>
                <PropertyMap singleMap />
                <ul className="info-map">
                  <li>
                    <div className="fw-7">Address</div>
                    <span className="mt-4 text-variant-1">
                      {listing.address}, {listing.state}
                    </span>
                  </li>
                  <li>
                    <div className="fw-7">Downtown</div>
                    <span className="mt-4 text-variant-1">5 min</span>
                  </li>
                  <li>
                    <div className="fw-7">FLL</div>
                    <span className="mt-4 text-variant-1">15 min</span>
                  </li>
                </ul>
              </div>
              <div className="single-property-element single-wrapper-review">
                <div className="box-title-review d-flex justify-content-between align-items-center flex-wrap gap-20">
                  <div className="h7 fw-7">Guest Reviews</div>
                  <Link href="#" className="tf-btn">
                    View All Reviews
                  </Link>
                </div>
                <div className="wrap-review">
                  <ul className="box-review">
                    <li className="list-review-item">
                      <div className="avatar avt-60 round">
                        <img src="/images/avatar/avt-2.jpg" alt="avatar" />
                      </div>
                      <div className="content">
                        <div className="name h7 fw-7 text-black">
                          Viola Lucas
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0C3.5888 0 0 3.5888 0 8ZM12.1657 6.56569C12.4781 6.25327 12.4781 5.74673 12.1657 5.43431C11.8533 5.1219 11.3467 5.1219 11.0343 5.43431L7.2 9.26863L5.36569 7.43431C5.05327 7.12189 4.54673 7.12189 4.23431 7.43431C3.9219 7.74673 3.9219 8.25327 4.23431 8.56569L6.63432 10.9657C6.94673 11.2781 7.45327 11.2781 7.76569 10.9657L12.1657 6.56569Z"
                              fill="#198754"
                            />
                          </svg>
                        </div>
                        <span className="mt-4 d-inline-block  date body-3 text-variant-2">
                          August 13, 2023
                        </span>
                        <ul className="mt-8 list-star">
                          <li className="icon-star" />
                          <li className="icon-star" />
                          <li className="icon-star" />
                          <li className="icon-star" />
                          <li className="icon-star" />
                        </ul>
                        <p className="mt-12 body-2 text-black">
                          It's really easy to use and it is exactly what I am
                          looking for. A lot of good looking templates &amp;
                          it's highly customizable. Live support is helpful,
                          solved my issue in no time.
                        </p>
                        <ul className="box-img-review">
                          <li>
                            <Link href="#" className="img-review">
                              <img
                                src="/images/blog/review1.jpg"
                                alt="img-review"
                              />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="img-review">
                              <img
                                src="/images/blog/review2.jpg"
                                alt="img-review"
                              />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="img-review">
                              <img
                                src="/images/blog/review3.jpg"
                                alt="img-review"
                              />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="img-review">
                              <img
                                src="/images/blog/review4.jpg"
                                alt="img-review"
                              />
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="img-review">
                              <span className="fw-7">+12</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="wrap-form-comment">
                  <div className="h7">Leave A Reply</div>
                  <div id="comments" className="comments">
                    <div className="respond-comment">
                      <form
                        method="post"
                        id="contactform"
                        className="comment-form form-submit"
                        action="./contact/contact-process.php"
                        acceptCharset="utf-8"
                        noValidate
                      >
                        <div className="form-wg group-ip">
                          <fieldset>
                            <label className="sub-ip">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="text"
                              placeholder="Your name"
                              required
                            />
                          </fieldset>
                          <fieldset>
                            <label className="sub-ip">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Your email"
                              required
                            />
                          </fieldset>
                        </div>
                        <fieldset className="form-wg d-flex align-items-center gap-8">
                          <input
                            type="checkbox"
                            className="tf-checkbox"
                            id="cb-ip"
                          />
                          <label
                            htmlFor="cb-ip"
                            className="text-black text-checkbox"
                          >
                            Save your name, email for the next time review{" "}
                          </label>
                        </fieldset>
                        <fieldset className="form-wg">
                          <label className="sub-ip">Review</label>
                          <textarea
                            id="comment-message"
                            name="message"
                            rows={4}
                            tabIndex={4}
                            placeholder="Write comment "
                            aria-required="true"
                            defaultValue={""}
                          />
                        </fieldset>
                        <button
                          className="form-wg tf-btn primary"
                          name="submit"
                          type="submit"
                        >
                          <span>Post Comment</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget-sidebar fixed-sidebar wrapper-sidebar-right">
                <div className="widget-box single-property-contact bg-surface">
                  <div className="h7 title fw-7">Contact Sellers</div>
                  <div className="box-avatar">
                    <div className="avatar avt-100 round">
                      <img src="/images/avatar/avt-12.jpg" alt="avatar" />
                    </div>
                    <div className="info">
                      <div className="text-1 name">Shara Conner</div>
                      <span>1-333-345-6868 themesflat@gmail.com</span>
                    </div>
                  </div>
                  <form action="#" className="contact-form">
                    <div className="ip-group">
                      <label htmlFor="fullname">Full Name:</label>
                      <input
                        type="text"
                        placeholder="Jony Dane"
                        className="form-control"
                      />
                    </div>
                    <div className="ip-group">
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="text"
                        placeholder="ex 0123456789"
                        className="form-control"
                      />
                    </div>
                    <div className="ip-group">
                      <label htmlFor="email">Email Address:</label>
                      <input
                        type="text"
                        placeholder="themesflat@gmail.com"
                        className="form-control"
                      />
                    </div>
                    <div className="ip-group">
                      <label htmlFor="message">Your Message:</label>
                      <textarea
                        id="comment-message"
                        name="message"
                        rows={4}
                        tabIndex={4}
                        placeholder="Message"
                        aria-required="true"
                        defaultValue={""}
                      />
                    </div>
                    <button className="tf-btn primary w-100">
                      Send Message
                    </button>
                  </form>
                </div>
                <div className="flat-tab flat-tab-form widget-filter-search widget-box bg-surface">
                  <div className="h7 title fw-7">Search</div>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" role="tabpanel">
                      <div className="form-sl">
                        <form method="post">
                          <div className="wd-filter-select">
                            <div className="inner-group inner-filter">
                              <div className="form-style">
                                <label className="title-select">Keyword</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search Keyword."
                                  name="s"
                                  title="Search for"
                                  required
                                />
                              </div>
                              <div className="form-style">
                                <label className="title-select">Location</label>
                                <div className="group-ip ip-icon">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Location"
                                    name="s"
                                    title="Search for"
                                    required
                                  />
                                  <Link
                                    href="#"
                                    className="icon-right icon-location"
                                  />
                                </div>
                              </div>
                              <div className="form-style">
                                <label className="title-select">Type</label>
                                <div className="group-select">
                                  <select className="nice-select">
                                    <option
                                      data-value
                                      className="option selected"
                                    >
                                      All
                                    </option>
                                    <option
                                      data-value="villa"
                                      className="option"
                                    >
                                      Villa
                                    </option>
                                    <option
                                      data-value="studio"
                                      className="option"
                                    >
                                      Studio
                                    </option>
                                    <option
                                      data-value="office"
                                      className="option"
                                    >
                                      Office
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div className="form-style box-select">
                                <label className="title-select">Rooms</label>
                                <select className="nice-select">
                                  <option data-value={2} className="option">
                                    1
                                  </option>
                                  <option
                                    data-value={2}
                                    className="option selected"
                                  >
                                    2
                                  </option>
                                  <option data-value={3} className="option">
                                    3
                                  </option>
                                  <option data-value={4} className="option">
                                    4
                                  </option>
                                  <option data-value={5} className="option">
                                    5
                                  </option>
                                  <option data-value={6} className="option">
                                    6
                                  </option>
                                  <option data-value={7} className="option">
                                    7
                                  </option>
                                  <option data-value={8} className="option">
                                    8
                                  </option>
                                  <option data-value={9} className="option">
                                    9
                                  </option>
                                  <option data-value={10} className="option">
                                    10
                                  </option>
                                </select>
                              </div>
                              <div className="form-style box-select">
                                <label className="title-select">
                                  Bathrooms
                                </label>
                                <select className="nice-select">
                                  <option data-value="all" className="option">
                                    All
                                  </option>
                                  <option data-value={1} className="option">
                                    1
                                  </option>
                                  <option data-value={2} className="option">
                                    2
                                  </option>
                                  <option data-value={3} className="option">
                                    3
                                  </option>
                                  <option
                                    data-value={4}
                                    className="option selected"
                                  >
                                    4
                                  </option>
                                  <option data-value={5} className="option">
                                    5
                                  </option>
                                  <option data-value={6} className="option">
                                    6
                                  </option>
                                  <option data-value={7} className="option">
                                    7
                                  </option>
                                  <option data-value={8} className="option">
                                    8
                                  </option>
                                  <option data-value={9} className="option">
                                    9
                                  </option>
                                  <option data-value={10} className="option">
                                    10
                                  </option>
                                </select>
                              </div>
                              <div className="form-style box-select">
                                <label className="title-select">Bedrooms</label>
                                <select className="nice-select">
                                  <option data-value={1} className="option">
                                    All
                                  </option>
                                  <option data-value={1} className="option">
                                    1
                                  </option>
                                  <option data-value={2} className="option">
                                    2
                                  </option>
                                  <option data-value={3} className="option">
                                    3
                                  </option>
                                  <option
                                    data-value={4}
                                    className="option selected"
                                  >
                                    4
                                  </option>
                                  <option data-value={5} className="option">
                                    5
                                  </option>
                                  <option data-value={6} className="option">
                                    6
                                  </option>
                                  <option data-value={7} className="option">
                                    7
                                  </option>
                                  <option data-value={8} className="option">
                                    8
                                  </option>
                                  <option data-value={9} className="option">
                                    9
                                  </option>
                                  <option data-value={10} className="option">
                                    10
                                  </option>
                                </select>
                              </div>
                              <div className="form-style widget-price">
                                <RangeSlider />
                              </div>
                              <div className="form-style widget-price wd-price-2">
                                <RangeSlider />
                              </div>
                              <SidebarFilter />
                              <div className="form-style">
                                <button
                                  type="submit"
                                  className="tf-btn primary"
                                >
                                  Find Properties
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-box single-property-whychoose bg-surface">
                  <div className="h7 title fw-7">Why Choose Us?</div>
                  <ul className="box-whychoose">
                    <li className="item-why">
                      <i className="icon icon-secure" />
                      Secure Booking
                    </li>
                    <li className="item-why">
                      <i className="icon icon-guarantee" />
                      Best Price Guarantee
                    </li>
                    <li className="item-why">
                      <i className="icon icon-booking" />
                      Easy Booking Process
                    </li>
                    <li className="item-why">
                      <i className="icon icon-support" />
                      Available Support 24/7
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-section pt-0 flat-latest-property">
        <div className="container">
          <div className="box-title">
            <div className="text-subtitle text-primary">
              Featured properties
            </div>
            <h4 className="mt-4">The Most Recent Estate</h4>
          </div>
          <div
            className="swiper tf-latest-property"
            data-preview-lg={3}
            data-preview-md={2}
            data-preview-sm={2}
            data-space={30}
            data-loop="true"
          >
            <Swiper {...swiperOptions2} className="swiper-wrapper">
              <SwiperSlide>
                <div className="homeya-box style-2">
                  <div className="archive-top">
                    <Link href="#" className="images-group">
                      <div className="images-style">
                        <img src="/images/home/house-4.jpg" alt="img" />
                      </div>
                      <div className="top">
                        <ul className="d-flex gap-8">
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
                        <span className="flag-tag style-2">House</span>
                      </div>
                    </Link>
                    <div className="content">
                      <div className="h7 text-capitalize fw-7">
                        <Link href="#" className="link">
                          {" "}
                          Sunset Heights Estate, Beverly Hills
                        </Link>
                      </div>
                      <div className="desc">
                        <i className="fs-16 icon icon-mapPin" />
                        <p>1040 Ocean, Santa Monica, California</p>{" "}
                      </div>
                      <ul className="meta-list">
                        <li className="item">
                          <i className="icon icon-bed" />
                          <span>3</span>
                        </li>
                        <li className="item">
                          <i className="icon icon-bathtub" />
                          <span>2</span>
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
                        <img src="/images/avatar/avt-8.jpg" alt="avt" />
                      </div>
                      <span>Jacob Jones</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <h6>$250,00</h6>
                      <span className="text-variant-1">/month</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="homeya-box style-2">
                  <div className="archive-top">
                    <Link href="#" className="images-group">
                      <div className="images-style">
                        <img src="/images/home/house-5.jpg" alt="img" />
                      </div>
                      <div className="top">
                        <ul className="d-flex gap-8">
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
                        <span className="flag-tag style-2">Office</span>
                      </div>
                    </Link>
                    <div className="content">
                      <div className="h7 text-capitalize fw-7">
                        <Link href="#" className="link">
                          Coastal Serenity Cottage
                        </Link>
                      </div>
                      <div className="desc">
                        <i className="fs-16 icon icon-mapPin" />
                        <p>21 Hillside Drive, Beverly Hills, California</p>{" "}
                      </div>
                      <ul className="meta-list">
                        <li className="item">
                          <i className="icon icon-bed" />
                          <span>4</span>
                        </li>
                        <li className="item">
                          <i className="icon icon-bathtub" />
                          <span>2</span>
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
                      <span>Kathryn Murphy</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <h6>$2050,00</h6>
                      <span className="text-variant-1">/SqFT</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="homeya-box style-2">
                  <div className="archive-top">
                    <Link href="#" className="images-group">
                      <div className="images-style">
                        <img src="/images/home/house-6.jpg" alt="img" />
                      </div>
                      <div className="top">
                        <ul className="d-flex gap-8">
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
                        <span className="flag-tag style-2">Studio</span>
                      </div>
                    </Link>
                    <div className="content">
                      <div className="h7 text-capitalize fw-7">
                        <Link href="#" className="link">
                          Lakeview Haven, Lake Tahoe
                        </Link>
                      </div>
                      <div className="desc">
                        <i className="fs-16 icon icon-mapPin" />
                        <p>8 Broadway, Brooklyn, New York</p>{" "}
                      </div>
                      <ul className="meta-list">
                        <li className="item">
                          <i className="icon icon-bed" />
                          <span>2</span>
                        </li>
                        <li className="item">
                          <i className="icon icon-bathtub" />
                          <span>2</span>
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
                        <img src="/images/avatar/avt-10.jpg" alt="avt" />
                      </div>
                      <span>Floyd Miles</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <h6>$250,00</h6>
                      <span className="text-variant-1">/month</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="homeya-box style-2">
                  <div className="archive-top">
                    <Link href="#" className="images-group">
                      <div className="images-style">
                        <img src="/images/home/house-1.jpg" alt="img" />
                      </div>
                      <div className="top">
                        <ul className="d-flex gap-8">
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
                        <span className="flag-tag style-2">Studio</span>
                      </div>
                    </Link>
                    <div className="content">
                      <div className="h7 text-capitalize fw-7">
                        <Link href="#" className="link">
                          {" "}
                          Casa Lomas de Machalí Machas
                        </Link>
                      </div>
                      <div className="desc">
                        <i className="fs-16 icon icon-mapPin" />
                        <p>33 Maple Street, San Francisco, California</p>{" "}
                      </div>
                      <ul className="meta-list">
                        <li className="item">
                          <i className="icon icon-bed" />
                          <span>3</span>
                        </li>
                        <li className="item">
                          <i className="icon icon-bathtub" />
                          <span>2</span>
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
                      <h6>$7250,00</h6>
                      <span className="text-variant-1">/SqFT</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingClient;
