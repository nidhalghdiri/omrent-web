"use client";

import React, { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import AdvancedFilter from "../elements/AdvancedFilter";

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
                <div className="heading text-center">
                  <h1 className="text-white animationtext slide">
                    Find Your Perfect Home
                    {/* <span className="tf-text s1 cd-words-wrapper ms-3">
                      <TextTransition springConfig={presets.wobbly}>
                        {index && TEXTS[index]}
                      </TextTransition>
                    </span> */}
                  </h1>
                </div>

                <div className="flat-tab flat-tab-form">
                  <div className="tab-content">
                    <div className="tab-pane fade active show" role="tabpanel">
                      <div className="form-sl">
                        <form method="post">
                          <AdvancedFilter sidecls="shadow-st" />
                        </form>
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
