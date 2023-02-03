import React, { useEffect, useState, useRef } from "react";
import { Info } from 'lucide-react';
import useWindowResize from "../../hooks/useWindowResize";
import useInView from "../../hooks/useInView";

export default function ResponsiveImage({params}) {
  const wrapperRef = useRef();
  const imgRef = useRef();

  // create low res image source
  const lowResImagesrc = `${params.slideImage.imageURL}?w=200&blur=50`;

  // monitor window size
  const size = useWindowResize();
  // monitor if component is in viewport
  const isVisible = useInView(wrapperRef);

  // get image properties
  const getImageSrc = () => {
    const imageWidth = wrapperRef.current.clientWidth;
    const pixelRatio = window.devicePixelRatio || 1.0;
    const imageParams = `?w=${100 * Math.round((imageWidth * pixelRatio) / 100)}&auto=format`;
    imgRef.current.src = `${params.slideImage.imageURL}${imageParams}`;
  };

  // add class to high res image when image has been loaded
  const imgFadeIn = () => {
    console.log("fadin...");
    wrapperRef.current.classList.add("done");
  };

  // update image after resize
  useEffect(() => {
    // get img source if image is in viewport
    isVisible && getImageSrc();
  }, [size]);

  // load high res image when in viewport
  useEffect(() => {
    isVisible && getImageSrc();
  }, [isVisible]);

  return (
    <figure className="sanity-image-wrapper js-sanity-image-wrapper" ref={wrapperRef}>
      <img className="low-res" src={lowResImagesrc} alt={params.slideImage.alt}/>
      <img className="high-res" src="" alt={params.slideImage.alt} data-source={params.slideImage.imageURL} ref={imgRef} onLoad={imgFadeIn} loading="lazy" />
      {(params.slideImage.caption || params.slideImage.credits) && (
        <div className="image-info-icon">
          <Info />
          <div className="image-info">
            { params.slideImage.caption && <figcaption>{params.slideImage.caption}</figcaption> }
            { params.slideImage.credits && <div className="image-credit">{params.slideImage.credits}</div> }
          </div>
        </div>
      )}
    </figure>
  );
}