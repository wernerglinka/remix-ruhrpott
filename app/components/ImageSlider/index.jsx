import { useEffect, useState, useRef } from "react";
import ScrollTo from '../ScrollTo';
import Text from '../Text';
import ResponsiveImage from '../ResponsiveImage';

export default function ImageSlider(props) {
  /**
   Function to manages the slides on this slider. It first removes the active class from elements with the class 'js-slide-trigger'. It then adds the active class to the element that was clicked (the 'e' argument). It then gets the data-slide-id attribute from the clicked element and selects all elements with the class 'js-slide'. It removes both the initial and active classes from each of these elements. Finally, it selects the element with an id matching the data-slide-id attribute of the clicked element and adds an active class to it. 
  */
  function manageSlides(e) {
    // Remove active class from all slide nav items
    navRefs.current.forEach(thisNavItem => {  
      thisNavItem.classList.remove('active');
    });
    // add active class to this nav item
    e.target.classList.add('active');
    
    // Hide all slides
    slideRefs.current.forEach(slide => {
      slide.classList.remove('initial', 'active');
    });
    // Get the slide id from the clicked nav item
    const slideId = e.target.dataset.slideId;
    // Show this slide
    document.querySelector(slideId).classList.add("active");
  }

  const numberOfSlides = props.sectionBlocks[0].slides.length - 1;

  const navRefs = useRef([]);
  const slideRefs = useRef([]);

  return (
    /**
     This code creates a slideshow with navigation buttons. It takes the slides from the props.sectionBlocks[0].slides array and maps them to create a list of slides. It also creates a list of navigation buttons that correspond to each slide. The manageSlides function is called when one of the navigation buttons is clicked, which allows the user to switch between slides.
    */
    <div className="slides-container">
      <ul className="slides">
        {props.sectionBlocks[0].slides.slice(0).map((slide, index) => {
          return (
            <li 
              key={slide.slideImage.alt}
              id={`slide${index}`}
              className={`slide js-slide ${index === numberOfSlides ? 'initial' : ''}`.trim()}
              ref={e => slideRefs.current[index] = e}
            >
              <ResponsiveImage params={slide} />
              <div className="slide-content">
                <Text params={slide.slideText} />
                <ScrollTo targetID={slide.scrollTarget} />
              </div>
            </li>
          )
        })}
      </ul>
      <ul className="slides-nav">
        {props.sectionBlocks[0].slides.map((slide, index) => {
          return (
            <li key={`imageNavElement${index}`}>
              <a 
                className={`js-slide-trigger ${index === 0 ? 'active' : ''}`.trim()} 
                data-slide-id={`#slide${numberOfSlides - index}`}
                ref={e => navRefs.current[index] = e}
                onClick={(e) => manageSlides(e)}
              >
                <span></span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}