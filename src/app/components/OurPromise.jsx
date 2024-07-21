'use client'
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
// import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function OurPromise() {
  const [msg, setMsg] = useState('hello')
  const handleClick = () => {
    alert(msg)
  }

  const refContainer = useRef()

  useEffect(() => {
    // const elements = child_Refs.current;


    // elements.forEach((element, index) => {
      ScrollTrigger.create({
        trigger: refContainer.current,
        start: 'top 550px',
        end: 'bottom',
        onEnter: () => {
          gsap.to('.my_main_container', {
            // x: 0, // Final position
            opacity: 1, // Final opacity
            duration: 2,
            // delay: index * 0.2, // Stagger the animations
            stagger: 0.5
          });
        },
        onLeaveBack: () => {
          gsap.to('.my_main_container', {
            // x: -200, // Initial position
            opacity: 0, // Initial opacity
            duration: 2,
            // delay: index * 0.5,
            stagger:0.5,
          });
        },
        scrub: true,
      });
    // });

  }, []);


//     const motionUpDown = () => {
//         gsap.fromTo('.user_container > *', {y: 0, opacity: 1}, {
//             y: '5%', opacity: 1, yoyo: true, repeat: -1, stagger: 3, duration: 5, reversed:true
//         })
//     }

//     useEffect(() => {
//         const tl = gsap.timeline({
//             scrollTrigger:{
//                 trigger: '.my_main_container',
//                 pin: true,
//                 start: 'top 500px',
//                 end: '+=1',
//                 scrub: 1,
//                 snap: {
//                     snapTo: 'labels',
//                     duration: {min: 5, max: 30},
//                     delay:5,
//                     ease: 'power1.inOut'
//                 },
//                 onScrubComplete: motionUpDown
//                 // onLeaveBack: ()=>alert('Hello')
//             }
//         })
//         tl.addLabel('start')
//         .fromTo('.my_main_container', {opacity: 0, background: 'transparent', duration:3}, {
//             scrollTrigger:{trigger:'.my_main_container', delay: 3}, opacity: 1, background: 'rgba(0, 0, 0, 0.9)', transition: 'opacity 1s ease',
//             duration: 2
//         }, 'start').addLabel('user')
//         // .fromTo('.my_title_container', {opacity: 0, height: '0%'}, {
//         //     scrollTrigger:{trigger:'.my_title_container', delay: 5}, opacity: 1, height: '100%', duration: 5, transition: 'opacity 3s height 5s ease'
//         // }, 'start+=10').addLabel('dashboardTitle')
//         // .fromTo('.dashboard_container', {opacity: 0, x: '-100%'}, {
//         //     scrollTrigger:{trigger:'.dashboard_container', delay: 7}, opacity: 1, x: 0, duration: 7, transition: 'opacity 3s height 5s ease'
//         // }, 'start+=15').addLabel('dashboardTitle')
//         // .fromTo('.user_container', {opacity: 0, x: '-100%'}, {
//         //     scrollTrigger:{trigger:'.user_container', delay: 9}, opacity: 1, x: 0, duration: 9, ease:'bounce', transition: 'opacity 5s x 5s ease'
//         // }, 'start+=20').addLabel('userChildren')
//         // .fromTo('.user_container > *', {opacity: 0, x: '-100%'}, {
//         //     scrollTrigger:{trigger:'.user_container > *', delay: 11}, opacity: 1, x: 0, duration: 11, stagger: 10,  ease:'bounce', transition: 'opacity 7s x 5s ease'
//         // }, 'start+=25').addLabel('content')
//         // .fromTo('.content_container', {opacity: 0, scale: 0}, {
//         //     scrollTrigger:{trigger:'.content_container', delay: 13}, opacity: 1, scale: 1, ease:'bounce.inOut', duration: 13, transition: 'opacity 9s scale 10s ease'
//         // }, 'start+=30')
//         // .fromTo('.screenshot_container', {opacity: 0, x: '100%'}, {
//         //     scrollTrigger:{trigger:'.screenshot_container', delay: 15}, opacity: 1, x: 0, ease:'bounce.inOut', duration: 15, transition: 'opacity 11s x 13s ease'
//         // }, 'start+=35')
//         // .addLabel('end')

//         return () => {
//             tl.kill()
//         }
//     }, [])

  return (
    <div ref={refContainer}
    className="my_main_container box-border flex relative flex-col shrink-0 gap-0 justify-between px-7 py-5 pl-5 mt-0 mr-0 mb-24 bg-white rounded max-md:ml-0">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <div className="box-border flex relative flex-col shrink-0 pt-8 pr-8 pb-16 pl-16 mt-5 w-auto max-w-full text-white bg-sky-950">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                <div className="box-border relative shrink-0 mt-5 h-auto text-base leading-6 text-white">
                  Our Promise
                </div>
                <div className="box-border relative shrink-0 mt-5 w-full h-auto text-4xl leading-10 text-white max-w-[94%]">
                  24 hours to a day, clean clothes follow the same time schedule
                </div>
                <div className="box-border relative shrink-0 mt-5 h-auto text-base text-white">
                  <p
                    // class="p1"
                    className="text-sm normal-nums  leading-[normal] text-start tracking-[normal]"
                  >
                    <span className="text-base leading-6">
                      <font face="Manrope, sans-serif">
                        Arcu eget malesuada imperdiet ornare pretium fringilla
                        elit
                      </font>
                      <font face="Manrope, sans-serif"> </font>
                      <font face="Manrope, sans-serif">
                        nullam. Orci elementum nec netus placerat convallis
                        cursus class diam arcu tincidunt sed. Dolor tristique
                        parturient consequat suscipit malesuada viverra proin
                        commodo.
                      </font>
                    </span>
                  </p>
                </div>
                <button
                  className="box-border relative shrink-0 px-6 py-4 mt-5 mr-auto text-center bg-blue-600 rounded appearance-none cursor-pointer text-[white]"
                  // openLinkInNewTab={false}
                  onClick={handleClick}
                >
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2Fc67754f30a5a4342ad3f8b634af28f84"
            className="box-border object-cover overflow-hidden shrink-0 mx-auto mt-5 w-full max-w-full aspect-[2.67] h-[96.5%] min-h-[400px] min-w-[20px]"
          />
        </div>
      </div>
    </div>
  );
}