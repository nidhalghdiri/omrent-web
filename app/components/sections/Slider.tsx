"use client";

import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import AdvancedFilter from "../elements/AdvancedFilter";
import { TypeAnimation } from "react-type-animation";

const Slider = () => {
  const [index, setIndex] = useState(1);
  const TEXTS = ["Dream Home", "Perfect Home", "Real Estate"];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length); // Cycle through texts
    }, 3000); // Update every 3 seconds

    return () => clearInterval(intervalId); // Clean up interval
  }, []);
  return (
    <>
      <section className="flat-slider home-1">
        <div className="container relative">
          <div className="row">
            <div className="col-lg-12">
              <div className="slider-content">
                <div className="heading">
                  <h2
                    className="text-white title wow fadeIn animationtext clip"
                    data-wow-delay=".2s"
                    data-wow-duration="2000ms"
                  >
                    Find A{/* <br /> */}
                    <span className="tf-text s1 cd-words-wrapper">
                      <TypeAnimation
                        sequence={[
                          // Same substring at the start will only be typed out once, initially
                          " Great Home",
                          1000, // wait 1s before replacing "Mice" with "Hamsters"
                          " Dream Home",
                          1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: "inline-block", marginLeft: "15px" }}
                        repeat={Infinity}
                        className="cd-words-wrapper ms-3"
                      ></TypeAnimation>
                    </span>
                  </h2>
                </div>

                <div className="flat-tab flat-tab-form">
                  <div className="tab-content">
                    <div className="tab-pane fade active show" role="tabpanel">
                      <div className="form-sl">
                        <AdvancedFilter sidecls="style-2 shadow-st" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay" />
      </section>
    </>
  );
};

export default Slider;
