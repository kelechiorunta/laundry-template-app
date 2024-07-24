import Image from 'next/image';
import React from 'react'
import overlay_pict from '../../../public/imgs/laundry-attendant.jpg'
import { gsap, ScrollTrigger } from 'gsap/all'
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger)

const VideoBackground = () => {

    const overlayContainer = useRef()
    const [repeatNo, setRepeatNo] = useState(-1)

    const animate = () => {
        gsap.fromTo('.overlayPic', { opacity: 1, y: '0',  backgroundSize:'cover'}, 
            {scrollTrigger:{trigger:'.overlayPic'}, opacity: 0, y: '-500px', yoyo: true, repeat:repeatNo, backgroundSize: 'contain', duration: 15} //repeat: 1
        )
    }

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: overlayContainer.current,
                pin: true,
                start: 'top 100px',
                end: '+=1',
                scrub: 4,
                // pinnedContainer: overlayContainer,
                onEnter: ()=>{ setRepeatNo(null); animate();},
                //onLeaveBack: () => {setRepeatNo(0)}

            }
        })
        return () => {
            tl.revert()
        }
    }, {dependencies:[], scope: overlayContainer})
    return (
      <div ref={overlayContainer}
      className="absolute top-0 left-0 w-screen h-full overflow-hidden -z-50 pinnedOverlayParent">
        <div ref={overlayContainer} 
        className='overlay w-full h-full'>
            {/* <h1 className='text-5xl text-black'>{repeatNo}</h1> */}
            <Image ref={overlayContainer} className='overlayPic w-screen object-fill bg-cover xsm:max-sm:h-[150vw] bg-center sm:max-2xl:min-h-[50%] ' src={overlay_pict} alt={'image'} />
        </div>
      </div>
    );
  };
  
  export default VideoBackground;