import ScrollTo from '../ScrollTo';
import Text from '../Text';
import ResponsiveImage from '../ResponsiveImage';

export default function ImageSlider(props) {
  /**
   Function to manages the slides on this slider. It first removes the active class from elements with the class 'js-slide-trigger'. It then adds the active class to the element that was clicked (the 'e' argument). It then gets the data-slide-id attribute from the clicked element and selects all elements with the class 'js-slide'. It removes both the initial and active classes from each of these elements. Finally, it selects the element with an id matching the data-slide-id attribute of the clicked element and adds an active class to it. 
  */
  function manageSlides(e) {
    const slideTriggers = document.querySelectorAll('.js-slide-trigger');
    // Remove active class from all slide triggers
    slideTriggers.forEach(trigger => {  
      trigger.classList.remove('active');
    });
    // add active class to this slide trigger
    e.target.classList.add('active');
    
    const slideId = e.target.dataset.slideId;
    const slides = document.querySelectorAll('.js-slide');
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('initial', 'active');
    });
    // Show this slide
    const thisSlide = document.querySelector(slideId);
    thisSlide.classList.add("active");
  }

  return (
    /**
     This code creates a slideshow with navigation buttons. It takes the slides from the props.sectionBlocks[0].slides array and maps them to create a list of slides. It also creates a list of navigation buttons that correspond to each slide. The manageSlides function is called when one of the navigation buttons is clicked, which allows the user to switch between slides.
    */
    <div className="slides-container">
      <ul className="slides">
        {props.sectionBlocks[0].slides.map((slide, index) => {
          const lastSlideIndex = props.sectionBlocks[0].slides.length - 1;
          return (
            <li 
              key={slide.slideImage.alt}
              id={`slide${index}`}
              className={`slide js-slide ${index === lastSlideIndex ? 'initial' : ''}`}
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
                className={`js-slide-trigger ${index === 0 && 'active'}`} 
                data-slide-id={`#slide${index}`}
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