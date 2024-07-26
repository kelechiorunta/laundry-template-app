"use client";
import * as React from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { FaCalendarAlt, FaArrowRight} from "react-icons/fa";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger)

export default function LandingServices() {
  const triggerServiceRef = useRef(null);
  const childRefs = useRef([]);

  const router = useRouter()

//   const imageRef = useRef(null)

  useEffect(() => {
    const element = triggerServiceRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top', // When the top of the trigger hits the bottom of the viewport
        end: 'bottom top', // When the bottom of the trigger hits the top of the viewport
        scrub: 3,
         pin: true,
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

  useEffect(() => {
    const elements = childRefs.current;


    elements.forEach((element, index) => {
      ScrollTrigger.create({
        trigger: triggerServiceRef.current,
        start: 'top 150px',
        end: 'bottom',
        onEnter: () => {
         gsap.fromTo(element, {
            x: -200, // Final position
            opacity: 0, // Final opacity
            duration: 2,
            delay: index * 0.2, // Stagger the animations
            stagger: 2
          }, {
            x: 0, // Final position
            opacity: 1, // Final opacity
            duration: 2,
            delay: index * 0.2, // Stagger the animations
            stagger: 2
          }, );
        },
        onLeaveBack: () => {
          gsap.to(element, {
            x: -200, // Initial position
            opacity: 0, // Initial opacity
            duration: 1,
            delay: index * 0.5,
            stagger:0.5,
          });
        },
        scrub: true,
      });
    });

  }, []);

  return (
    <div ref={triggerServiceRef} className="landing w-full overflow-hidden box-border flex relative flex-col shrink-0 px-10 pt-10 pb-80 h-full bg-black bg-center bg-no-repeat bg-cover bg-[url('../../public/imgs/laundry_about.jpg')]">
         {/* bg-[url(https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F15aeefa5519d4479a5fe32be42580f8a)]"> */}
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="z-20 flex flex-col w-full max-md:ml-0 max-md:w-full">
          <div className="box-border flex relative flex-col shrink-0 mt-48 mb-0">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-full -mt-36 max-md:ml-0 max-md:w-full">
                <div ref={(el) => childRefs.current[0] = el} className="box-border relative shrink-0 mt-5 h-auto">
                  <font color="#ffffff">Our Services</font>
                </div>
                <div className="box-border relative shrink-0 mt-5 h-auto">
                  <h1
                    // class="elementor-heading-title elementor-size-default"
                    className="p-0 font-[var(_--e-global-typography-583e54c-font-weight_)] leading-[var(_--e-global-typography-583e54c-line-height_)] text-[var(_--e-global-typography-583e54c-font-size_)] tracking-[var(_--e-global-typography-583e54c-letter-spacing_)]"
                  >
                    <font face="Manrope, sans-serif">
                      <font color="#ffffff">
                        <span ref={(el) => childRefs.current[1] = el} className="text-5xl font-black leading-10">
                          Get Our Services
                        </span>
                      </font>
                    </font>
                  </h1>
                </div>
                <div ref={(el) => childRefs.current[2] = el} className="box-border relative shrink-0 mt-5 mr-auto h-auto text-base leading-6">
                  <p
                    class="p1"
                    className="text-sm normal-nums  leading-[normal] text-start tracking-[normal]"
                  >
                    <span className="text-base leading-6">
                      <font face="Manrope, sans-serif">
                        <font color="#ffffff"></font>
                        <span className="text-base">
                          <span className="text-base">
                            <span className="text-base">
                              <span className="text-lg">
                                <span className="text-lg">
                                  <span className="text-lg">
                                    <span className="text-base">
                                      <span className="text-base">
                                        <span className="text-base">
                                          <span className="text-base">
                                            <span className="text-sm">
                                              <span className="text-sm">
                                                <span className="text-base">
                                                  <span className="text-base">
                                                    <span className="text-base">
                                                      <span className="text-base">
                                                        <span className="text-lg">
                                                          <span className="text-lg">
                                                            <span className="text-lg">
                                                              <span className="text-xl">
                                                                <span className="text-xl">
                                                                  <span className="text-xl">
                                                                    <span className="text-xl">
                                                                      <span className="text-xl">
                                                                        <span className="text-xl">
                                                                          <span className="text-xl">
                                                                            <span className="text-lg">
                                                                              <span className="text-lg">
                                                                                <span className="text-lg">
                                                                                  <span className="text-lg">
                                                                                    <span className="text-base">
                                                                                      <span className="text-lg">
                                                                                        <span className="text-lg">
                                                                                          <span className="text-white">
                                                                                            L
                                                                                          </span>
                                                                                          <span className="text-white">
                                                                                            orem
                                                                                            ipsum
                                                                                            dolor
                                                                                            sit
                                                                                            amet,
                                                                                            consectetur
                                                                                            adipiscing
                                                                                            elit.
                                                                                            Ut
                                                                                            elit
                                                                                            tellus,
                                                                                            luctus
                                                                                            nec
                                                                                            ullamcorper
                                                                                            mattis,
                                                                                            pulvinar
                                                                                            dapibus
                                                                                            leo
                                                                                          </span>
                                                                                        </span>
                                                                                      </span>
                                                                                    </span>
                                                                                  </span>
                                                                                </span>
                                                                              </span>
                                                                            </span>
                                                                          </span>
                                                                        </span>
                                                                      </span>
                                                                    </span>
                                                                  </span>
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </span>
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                                            </span>
                                          </span>
                                        </span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                        <span className="text-lg">
                          <font color="#ffffff"></font>
                        </span>
                      </font>
                    </span>
                  </p>
                </div>
                <div ref={(el) => childRefs.current[3] = el} className="box-border flex relative flex-col shrink-0 my-auto mr-auto">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                      <button
                        className="box-border relative shrink-0 p-5 mx-auto mt-5 leading-6 text-center
                         bg-blue-600 rounded appearance-none cursor-pointer text-[white] w-[212.4px]  hover:bg-white hover:text-blue-600 transition-all"
                        onClick={(event) => {
                          /**
                           * Global objects available in custom action code:
                           *
                           * state - builder state object - learn about state https://www.builder.io/c/docs/guides/state-and-actions
                           * context - builder context object - learn about context https://github.com/BuilderIO/builder/tree/main/packages/react#passing-data-and-functions-down
                           * event - HTML Event - https://developer.mozilla.org/en-US/docs/Web/API/Event
                           *
                           * Learn more: https://www.builder.io/c/docs/guides/custom-code
                           *
                           */
                          
                          window.location.href='/dashboard'
                          //router.push('/dashboard')
                          // alert("hello");
                        }}
                        // openLinkInNewTab={false}
                      >
                        <div className="flex items-center justify-center gap-x-4"><FaCalendarAlt/> Pickup Now</div>
                      </button>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                      <button
                        className="box-border relative shrink-0 p-5 mx-auto mt-5 leading-6 text-center text-blue-600 bg-white rounded border
                         border-blue-600 border-solid appearance-none cursor-pointer w-[212.4px] hover:bg-blue-600 hover:text-white transition-all"
                        // openLinkInNewTab={false}
                        onClick={()=>alert("Discover More")}
                      >
                        <div className="flex items-center justify-center gap-x-4">Discover More <FaArrowRight/></div>
                        
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}