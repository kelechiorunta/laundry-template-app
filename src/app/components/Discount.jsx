/**
 * This code was generated by Builder.io.
 */
'use client'
import * as React from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger)

export default function Discount() {

  const discountRef = useRef(null)

  useEffect(() => {
        const element = discountRef.current;
    
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top 300px', // When the top of the trigger hits the bottom of the viewport
            end: '+=200px', // When the bottom of the trigger hits the top of the viewport
            scrub: 3,
            // pin: true,
          },
        });
    
        tl.fromTo(
          element,
          { backgroundPositionY: '0%', },
          { backgroundPositionY: '100%', transition:'backgroundPositionY 2s ease', duration: 3 }
        );
    
        return () => {
          // Cleanup ScrollTrigger instance on component unmount
          ScrollTrigger.getAll().forEach(instance => instance.kill());
          tl.kill();
        };
      }, []);


  return (
    <div 
    className=" overflow-hidden box-border flex relative flex-col shrink-0 mt-32 bg-black bg-center bg-no-repeat bg-cover rounded border-solid shadow-sm border-[black]">
        <div className="absolute flex items-start justify-center w-full h-full">
          <div className="text-white text-center text-6xl py-4 px-4 discount w-full h-full bg-center bg-cover"></div>
          
        </div>
        
      <div 
      className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
          <div ref={discountRef} className="discount_image box-border flex object-cover relative flex-col shrink-0 px-10 py-16 bg-no-repeat bg-cover bg-[top_center] bg-[url(https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449)]">
            <div className="z-20 flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="box-border relative shrink-0 mt-6 h-auto">
                  <span className="text-base leading-6 text-[#ffffff]">
                    {/* <font face="Manrope, sans-serif" color="#ffffff"> */}
                      About&nbsp; Promo
                    {/* </font> */}
                  </span>
                </div>
                <div className="box-border relative shrink-0 mt-6 h-auto text-4xl leading-10 text-white">
                  Discount up to 50% only this month
                </div>
                <div className="box-border relative shrink-0 mt-5 h-auto text-white">
                  <p
                    class="p1"
                    className="text-sm normal-nums  leading-[normal] text-start tracking-[normal]"
                  >
                    <span className="text-base leading-6">
                      {/* <font face="Manrope, sans-serif"> */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo
                      {/* </font> */}
                    </span>
                  </p>
                </div>
                <button
                  className="box-border relative shrink-0 px-6 py-4 mt-5 mr-auto text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                  // openLinkInNewTab={false}
                >
                  Discover Promo
                </button>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <img 
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5ea1089a8cd44b328caf928701bab449"
                  className="box-border object-cover overflow-hidden shrink-0 mt-5 w-full rounded-3xl aspect-[1.5] min-h-[20px] min-w-[20px] opacity-[0.44]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
