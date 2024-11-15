/**
 * This code was generated by Builder.io.
 */
'use client'
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default function DiscoverService() {

  const my_container = useRef()

    // const motionUpDown = () => {
    //     gsap.fromTo('.main_container > *', {x: '-100%', opacity: 1}, {
    //         x: '0%', opacity: 1, yoyo: true, repeat: -1, stagger: 3, duration: 5, reversed:true
    //     })
    // }

    // useEffect(() => {
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: '.main_container',
    //       pin: true,
    //       start: 'top 500px',
    //       end: '+=1',
    //       scrub: 1,
    //       snap: {
    //         snapTo: 'labels',
    //         duration: { min: 5, max: 30 },
    //         delay: 5,
    //         ease: 'power1.inOut',
    //       },
    //     },
    //   });
  
    //   tl.addLabel('start')
    //     .fromTo(
    //       '.main_container',
    //       { opacity: 0, background: 'transparent', duration: 3 },
    //       {
    //         scrollTrigger: { trigger: '.main_container', delay: 3 },
    //         opacity: 1,
    //         background: 'rgba(0, 0, 0, 0.9)',
    //         transition: 'opacity 1s ease',
    //         duration: 2,
    //       },
    //       'start'
    //     )
    //     .addLabel('user')
    //     .fromTo(
    //       '.my_title_container',
    //       { opacity: 0, height: '0%' },
    //       {
    //         scrollTrigger: { trigger: '.my_title_container', delay: 5 },
    //         opacity: 1,
    //         height: '100%',
    //         duration: 5,
    //         transition: 'opacity 3s height 5s ease',
    //       },
    //       'start+=10'
    //     )
    //     .addLabel('dashboardTitle')
    //     .fromTo(
    //       '.dashboard_container > *', // Targeting children of .dashboard_container
    //       { opacity: 0, x: '-100%' },
    //       {
    //         scrollTrigger: { trigger: '.dashboard_container', delay: 7 },
    //         opacity: 1,
    //         x: 0,
    //         duration: 7,
    //         stagger: 0.5, // Adjust the stagger value as needed
    //         transition: 'opacity 3s x 5s ease',
    //       },
    //       'start+=20'
    //     )
    //     .addLabel('dashboardTitle')
    //     .fromTo(
    //       '.content_container',
    //       { opacity: 0, scale: 0 },
    //       {
    //         scrollTrigger: { trigger: '.content_container', delay: 13 },
    //         opacity: 1,
    //         scale: 1,
    //         ease: 'bounce.inOut',
    //         duration: 13,
    //         transition: 'opacity 9s scale 10s ease',
    //       },
    //       'start+=30'
    //     )
    //     .fromTo(
    //       '.screenshot_container',
    //       { opacity: 0, x: '100%' },
    //       {
    //         scrollTrigger: { trigger: '.screenshot_container', x: 
    //         '-100%', delay: 15 },
    //         opacity: 1,
    //         x: 0,
    //         ease: 'bounce.inOut',
    //         duration: 15,
    //         transition: 'opacity 11s x 13s ease',
    //       },
    //       'start+=35'
    //     )
    //     .addLabel('end');
  
    //   return () => {
    //     tl.kill();
    //   };
    // }, []);

  //   //const triggerRef = useRef(null);
  // const child_Refs = useRef([]);

  //   useEffect(() => {
  //     const element = my_container.current;
  
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: element,
  //         start: 'top', // When the top of the trigger hits the bottom of the viewport
  //         end: 'bottom top', // When the bottom of the trigger hits the top of the viewport
  //         scrub: 3,
  //         pin: true,
  //       },
  //     });
  
  //     tl.fromTo(
  //       element,
  //       { backgroundPositionY: '0%', },
  //       { backgroundPositionY: '100%', transition:'backgroundPositionY 2s ease', duration: 3 }
  //     );
  
  //     return () => {
  //       // Cleanup ScrollTrigger instance on component unmount
  //       ScrollTrigger.getAll().forEach(instance => instance.kill());
  //       tl.kill();
  //     };
  //   }, []);


  
    useEffect(() => {
      // const elements = child_Refs.current;
  
  
      // elements.forEach((element, index) => {
        ScrollTrigger.create({
          trigger: my_container.current,
          start: 'top',
          end: 'middle',
          onEnter: () => {
            gsap.to('.main_container', {
              x: 0, // Final position
              opacity: 1, // Final opacity
              duration: 2,
              // delay: index * 0.2, // Stagger the animations
              stagger: 0.5
            });
          },
          onLeaveBack: () => {
            gsap.to('.main_container', {
              x: 0, // Initial position
              opacity: 1, // Initial opacity
              duration: 2,
              // delay: index * 0.5,
              stagger:0.5,
            });
          },
          scrub: true,
        });
      // });
  
    }, []);


  return (
    <div ref={my_container}
    className="main_container box-border flex relative flex-col shrink-0 px-16 pb-16 mt-5 bg-[rgba(0,0,0,0.8)] bg-[url('../../public/imgs/bg_memphis.png')] bg-center bg-no-repeat bg-cover rounded border-solid shadow-lg border-[black] max-sm:pr-7 max-sm:pl-8">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
          <div className="box-border flex relative flex-col shrink-0 mt-5">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="box-border relative shrink-0 mt-5 h-auto">
                  <span className="text-base leading-6">
                    <font face="Manrope, sans-serif" color="#ffffff">
                      About Service
                    </font>
                  </span>
                </div>
                <div className="box-border relative shrink-0 mt-6 h-auto text-4xl leading-10">
                  <font color="#ffffff" face="Manrope, sans-serif">
                    <span className="text-5xl leading-10">
                      Clean, fast, and free pickup.
                    </span>
                  </font>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="box-border relative shrink-0 mt-5 h-auto text-base text-white">
                  <p
                    // class="p1"
                    // style='font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-variant-position: normal; font-weight: 400; font-stretch: normal; font-size: 13px; line-height: normal; font-family: "Helvetica Neue"; letter-spacing: normal; text-align: start;'
                  >
                    <span className="text-base leading-6">
                      Vestibulum pede vivamus natoque egestas risus integer mi
                      euismod sodales amet. Conubia natoque dis rutrum cras
                      ultricies facilisi sodales justo molestie scelerisque
                      ligula.
                    </span>
                  </p>
                </div>
                <button
                  className="box-border relative shrink-0 px-6 py-4 mt-5 mr-auto text-base leading-6 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                  // openLinkInNewTab={false}
                >
                  Discover Service
                </button>
              </div>
            </div>
          </div>
          <div className="box-border flex relative flex-col shrink-0 mt-5">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 ">
              <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                <div className="box-border flex relative flex-col shrink-0 px-10 pb-10 mt-6 bg-white shadow-sm max-sm:px-5">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-lg:flex-wrap">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full max-lg:w-[100%]">
                      <div className="box-border flex relative flex-col shrink-0 px-5 pb-8 mt-5 rounded-xl shadow-2xl border-[black]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fcbf142d11a6b4502bd0d5493678358bd"
                              className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full aspect-square max-w-[64px] min-h-[20px] min-w-[20px]"
                            />
                            <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl leading-6">
                              Washing
                            </div>
                            <div className="box-border relative shrink-0 px-2.5 mx-auto mt-5 h-auto text-base leading-6">
                              <span>
                                {/* //style='font-family: "Helvetica Neue"; font-size: 13px;'> */}
                                Montes dictum faucibus rutrum morbi sagittis
                                blandit iaculis posuere neque nunc ac tortor
                              </span>
                              <font face="Manrope, sans-serif">
                                <span className="mx-auto">...</span>
                              </font>
                            </div>
                            <button
                              className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                              // openLinkInNewTab={false}
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="box-border flex relative flex-col shrink-0 px-5 pb-8 mt-5 rounded-xl shadow-2xl border-[black]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F408cd4a7c9d8462a88a1ac43e8031809"
                              className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full aspect-square max-w-[64px] min-h-[20px] min-w-[20px]"
                            />
                            <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl leading-6">
                              Folding
                            </div>
                            <div className="box-border relative shrink-0 px-2.5 mx-auto mt-5 h-auto text-base leading-6">
                              <span>
                              {/* // style='font-family: "Helvetica Neue"; font-size: 13px;'> */}
                                Montes dictum faucibus rutrum morbi sagittis
                                blandit iaculis posuere neque nunc ac tortor
                              </span>
                              <font face="Manrope, sans-serif">
                                <span className="mx-auto">...</span>
                              </font>
                            </div>
                            <button
                              className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                              // openLinkInNewTab={false}
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="box-border flex relative flex-col shrink-0 px-5 pb-8 mt-5 rounded-xl shadow-2xl border-[black]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5129e5bc74a9473e80ef1dbfa45932fc"
                              className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full aspect-square max-w-[64px] min-h-[20px] min-w-[20px]"
                            />
                            <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl leading-6">
                              Ironing
                            </div>
                            <div className="box-border relative shrink-0 px-2.5 mx-auto mt-5 h-auto text-base leading-6">
                              <span> 
                              {/* // style='font-family: "Helvetica Neue"; font-size: 13px;'> */}
                                Montes dictum faucibus rutrum morbi sagittis
                                blandit iaculis posuere neque nunc ac tortor
                              </span>
                              <font face="Manrope, sans-serif">
                                <span className="mx-auto">...</span>
                              </font>
                            </div>
                            <button
                              className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                              // openLinkInNewTab={false}
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-border flex relative flex-col shrink-0 px-10 pb-10 mt-6 bg-white shadow-sm max-sm:px-5">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-lg:flex-wrap w-[100%]">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full max-lg:w-[100%]">
                      <div className="box-border flex relative flex-col shrink-0 px-5 pb-8 mt-5 rounded-xl shadow-2xl border-[black]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F8dae455d96ea492d944643411bec24e5"
                              className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full aspect-square max-w-[64px] min-h-[20px] min-w-[20px]"
                            />
                            <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl leading-6">
                              DryCleaning
                            </div>
                            <div className="box-border relative shrink-0 px-2.5 mx-auto mt-5 h-auto text-base leading-6">
                              <span> 
                              {/* // style='font-family: "Helvetica Neue"; font-size: 13px;'> */}
                                Montes dictum faucibus rutrum morbi sagittis
                                blandit iaculis posuere neque nunc ac tortor
                              </span>
                              <font face="Manrope, sans-serif">
                                <span className="mx-auto">...</span>
                              </font>
                            </div>
                            <button
                              className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                              // openLinkInNewTab={false}
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="box-border flex relative flex-col shrink-0 px-5 pb-8 mt-5 rounded-xl shadow-2xl border-[black]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F5a86dc22aae8407ba17350a7bc7f800b"
                              className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full aspect-square max-w-[64px] min-h-[20px] min-w-[20px]"
                            />
                            <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl leading-6">
                              Express
                            </div>
                            <div className="box-border relative shrink-0 px-2.5 mx-auto mt-5 h-auto text-base leading-6">
                              <span>
                                 {/* style='font-family: "Helvetica Neue"; font-size: 13px;'> */}
                                Montes dictum faucibus rutrum morbi sagittis
                                blandit iaculis posuere neque nunc ac tortor
                              </span>
                              <font face="Manrope, sans-serif">
                                <span className="mx-auto">...</span>
                              </font>
                            </div>
                            <button
                              className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                              // openLinkInNewTab={false}
                            >
                              Learn More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="box-border flex relative flex-col shrink-0 px-5 pb-8 mt-5 rounded-xl shadow-2xl border-[black]">
                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                            <img
                              loading="lazy"
                              srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F21497f4a2b564617a8eba6a6778175bf"
                              className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full aspect-square max-w-[64px] min-h-[20px] min-w-[20px]"
                            />
                            <div className="box-border relative shrink-0 mx-auto mt-5 h-auto text-3xl leading-6">
                              Delivery
                            </div>
                            <div className="box-border relative shrink-0 px-2.5 mx-auto mt-5 h-auto text-base leading-6">
                              <span>
                                 {/* style='font-family: "Helvetica Neue"; font-size: 13px;'> */}
                                Montes dictum faucibus rutrum morbi sagittis
                                blandit iaculis posuere neque nunc ac tortor
                              </span>
                              <font face="Manrope, sans-serif">
                                <span className="mx-auto">...</span>
                              </font>
                            </div>
                            <button
                              className="box-border relative shrink-0 px-6 py-4 mx-auto mt-5 text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                              // openLinkInNewTab={false}
                            >
                              Learn More
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
        </div>
      </div>
    </div>
  );
}
