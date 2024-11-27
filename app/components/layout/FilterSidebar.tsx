import Link from "next/link";
import React from "react";
import RangeSlider from "../elements/RangeSlider";
import SidebarFilter from "../elements/SidebarFilter";

const FilterSidebar = () => {
  return (
    <>
      <div className="widget-sidebar fixed-sidebar">
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
                          <Link href="#" className="icon-right icon-location" />
                        </div>
                      </div>
                      <div className="form-style">
                        <label className="title-select">Type</label>
                        <div className="group-select">
                          <select className="nice-select">
                            <option data-value className="option selected">
                              All
                            </option>
                            <option data-value="villa" className="option">
                              Villa
                            </option>
                            <option data-value="studio" className="option">
                              Studio
                            </option>
                            <option data-value="office" className="option">
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
                          <option data-value={2} className="option selected">
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
                        <label className="title-select">Bathrooms</label>
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
                          <option data-value={4} className="option selected">
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
                          <option data-value={4} className="option selected">
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
                        <button type="submit" className="tf-btn primary">
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
        <div className="widget-box bg-surface box-latest-property">
          <div className="h7 fw-7 title">Latest Propeties</div>
          <ul>
            <li className="latest-property-item">
              <Link href="/property-details-v1" className="images-style">
                <img src="/images/home/house-sm-3.jpg" alt="img" />
              </Link>
              <div className="content">
                <div className="h7 text-capitalize fw-7">
                  <Link href="/property-details-v1" className="link">
                    Casa Lomas de Mach...
                  </Link>
                </div>
                <ul className="meta-list">
                  <li className="item">
                    <span>Bed:</span>
                    <span className="fw-7">4</span>
                  </li>
                  <li className="item">
                    <span>Bath:</span>
                    <span className="fw-7">2</span>
                  </li>
                  <li className="item">
                    <span className="fw-7">600 SqFT</span>
                  </li>
                </ul>
                <div className="d-flex align-items-center">
                  <div className="h7 fw-7">$5050,00</div>
                  <span className="text-variant-1">/SqFT</span>
                </div>
              </div>
            </li>
            <li className="latest-property-item">
              <Link href="/property-details-v1" className="images-style">
                <img src="/images/home/house-sm-9.jpg" alt="img" />
              </Link>
              <div className="content">
                <div className="h7 text-capitalize fw-7">
                  <Link href="/property-details-v1" className="link">
                    Lakeview Haven...
                  </Link>
                </div>
                <ul className="meta-list">
                  <li className="item">
                    <span>Bed:</span>
                    <span className="fw-7">4</span>
                  </li>
                  <li className="item">
                    <span>Bath:</span>
                    <span className="fw-7">2</span>
                  </li>
                  <li className="item">
                    <span className="fw-7">600 SqFT</span>
                  </li>
                </ul>
                <div className="d-flex align-items-center">
                  <div className="h7 fw-7">$5050,00</div>
                  <span className="text-variant-1">/SqFT</span>
                </div>
              </div>
            </li>
            <li className="latest-property-item">
              <Link href="/property-details-v1" className="images-style">
                <img src="/images/home/house-sm-1.jpg" alt="img" />
              </Link>
              <div className="content">
                <div className="h7 text-capitalize fw-7">
                  <Link href="/property-details-v1" className="link">
                    Sunset Heights Estate
                  </Link>
                </div>
                <ul className="meta-list">
                  <li className="item">
                    <span>Bed:</span>
                    <span className="fw-7">4</span>
                  </li>
                  <li className="item">
                    <span>Bath:</span>
                    <span className="fw-7">2</span>
                  </li>
                  <li className="item">
                    <span className="fw-7">600 SqFT</span>
                  </li>
                </ul>
                <div className="d-flex align-items-center">
                  <div className="h7 fw-7">$5050,00</div>
                  <span className="text-variant-1">/SqFT</span>
                </div>
              </div>
            </li>
            <li className="latest-property-item">
              <Link href="/property-details-v1" className="images-style">
                <img src="/images/home/house-sm-4.jpg" alt="img" />
              </Link>
              <div className="content">
                <div className="h7 text-capitalize fw-7">
                  <Link href="/property-details-v1" className="link">
                    de Machalí Machas...
                  </Link>
                </div>
                <ul className="meta-list">
                  <li className="item">
                    <span>Bed:</span>
                    <span className="fw-7">4</span>
                  </li>
                  <li className="item">
                    <span>Bath:</span>
                    <span className="fw-7">2</span>
                  </li>
                  <li className="item">
                    <span className="fw-7">600 SqFT</span>
                  </li>
                </ul>
                <div className="d-flex align-items-center">
                  <div className="h7 fw-7">$5050,00</div>
                  <span className="text-variant-1">/SqFT</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
