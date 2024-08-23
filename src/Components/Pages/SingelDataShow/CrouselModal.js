import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { AllState } from '../../Context/Context';

export const CrouselModal = ({ data, }) => {
    const {crouselZoom, setCrouselZoom} = AllState();

    const outSideClick = function(e){
        if (e.target.classList[0] === "crouselZoomMain") {
            setCrouselZoom(false);
        }
    }

    useEffect(() => {
        if (crouselZoom) {
            document.addEventListener('click', outSideClick);
        } else {
            document.removeEventListener('click', outSideClick);
        }
        return () => {
            document.removeEventListener('click', outSideClick);
        };
    }, [crouselZoom]);

    

    return (
        <div className='crouselZoomMain' onClick={(e)=>{outSideClick(e)}}>
           
            <div className="singleCrouselItemZoom">
            <button onClick={()=>{setCrouselZoom(false)}}>Close</button>
            <Carousel
                autoPlay={true}
                showThumbs={false}
                swipeable={true}
                showArrows={false}
                className="crouselStyle"
                infiniteLoop={true}
                interval={5000}
            >
                <div>
                    <img alt="image" src={data.plot_image} />
                </div>
                <div>
                    <img alt="image" src={data.original_image} />
                </div>
                <div>
                    <img alt="image" src={data.vehicle_image ? data.vehicle_image : data.vehicle.image} />
                </div>
                <div>
                    <img alt="image" src={data.gif ? data.gif : data.gif} />
                </div>
            </Carousel>
            </div>
        </div>
    )
}
