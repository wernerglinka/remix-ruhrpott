import {ScrollTo} from '../ScrollTo';
import Text from '../Text';
import {ResponsiveImage} from '../ResponsiveImage';

export default function ImageSlider(props) {

  return (
    <div className="slides-container">
      <ul className="slides">
        {props.sectionBlocks[0].slides.map((slide, index) => {
          return (
            <li 
              key={slide.slideImage.alt}
              id={`slide${index}`}
              className={`slide jsSlide ${index === 0 ? 'initial' : ''}`}
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
    </div>
  )
} 



