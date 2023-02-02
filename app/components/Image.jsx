import { Info } from 'lucide-react';

export default Image = function({params}) {
  const lowResImagesrc = `${params.slideImage.imageURL}?w=200&blur=50`;

  return (
    <figure className="sanity-image-wrapper js-sanity-image-wrapper" >
      <img className="low-res" src={lowResImagesrc} alt={params.slideImage.alt}/>
      <img className="high-res" src="" alt={params.slideImage.alt} data-source={params.slideImage.imageURL}/>
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