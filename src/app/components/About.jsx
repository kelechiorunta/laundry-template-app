'use client'
import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger }  from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

export default function About() {

  const triggerRef = useRef(null);
  const childRefs = useRef([]);

  const imageRef = useRef(null)

//   useEffect(() => {
//     const element = imageRef.current;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: element,
//         start: 'bottom 50%', // When the top of the trigger hits the bottom of the viewport
//         end: 'bottom top', // When the bottom of the trigger hits the top of the viewport
//         scrub: 3,
//          pin: true,
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
    const elements = childRefs.current;


    elements.forEach((element, index) => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top 650px',
        end: 'bottom',
        onEnter: () => {
          gsap.to(element, {
            x: 0, // Final position
            opacity: 1, // Final opacity
            duration: 2,
            delay: index * 0.2, // Stagger the animations
            stagger: 0.5
          });
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
    <div  ref={imageRef} className="box-border flex relative flex-col shrink-0 px-24 mt-20 w-full max-w-full bg-white max-md:px-12 max-sm:px-2.5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
          <div className="box-border flex relative flex-col shrink-0 p-5 mt-20 mb-24 bg-white rounded">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div ref={triggerRef} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <img 
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2F661e1fa212c74d1c94d19e320025bbf6%2F779dd3b0af1448c5a1fe7136e2ac699e"
                  className="box-border object-cover overflow-hidden shrink-0 mt-5 w-full aspect-[1.5] min-h-[400px] min-w-[20px]"
                />
              </div>
              <div ref={(el) => childRefs.current[0] = el} className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="box-border flex relative flex-col shrink-0 mt-5">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                      <div className="box-border relative shrink-0 mt-5 h-auto text-base leading-6 text-blue-600">
                        About Us
                      </div>
                      <div ref={(el) => childRefs.current[1] = el} className="box-border relative shrink-0 mt-5 h-auto text-4xl leading-10 text-slate-500">
                        Excellent quality is worth the price tag
                      </div>
                      <div className="box-border relative shrink-0 mt-5 h-auto text-base">
                        <p
                          ref={(el) => childRefs.current[2] = el}
                          // class="p1"
                          className="text-sm normal-nums  leading-[normal] text-start tracking-[normal]"
                        >
                          <span className="text-base leading-6 text-[#506b89]">
                            {/* <font face="Manrope, sans-serif" color="#506b89"> */}
                              Arcu eget malesuada imperdiet ornare pretium
                              fringilla elit nullam. Orci elementum nec netus
                              placerat convallis cursus class diam arcu
                              tincidunt sed. Dolor tristique parturient
                              consequat suscipit malesuada viverra proin
                              commodo.
                            {/* </font> */}
                          </span>
                        </p>
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