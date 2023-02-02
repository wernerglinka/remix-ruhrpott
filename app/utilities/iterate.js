import blocksToMarkdown from '@sanity/block-content-to-markdown';
import imageUrl from '@sanity/image-url';
import serializers from './serializers';
import {client} from '../sanity/client';
import projectDetails from '../sanity/projectDetails';

/**
 * iterate
 * Transform Sanity portable text blocks to markdown and resolve image references
 * 
 * @param {*} obj 
 */
export default iterate = (obj) => {
  Object.keys(obj).forEach(key => {

    // transform Portable Text to Markdown
    if(key === "portableTextBody" || key === "blogContent") {
      obj[key] = blocksToMarkdown(obj[key], {
        serializers: serializers(client),
        projectId: "349a1vg2",
        dataset: "production",
      });
    }

    // get image url from Sanity image object
    // and add it to the object
    if(key == "asset" && obj[key]._ref.startsWith("image-")){
      const imageBuilder = imageUrl(client);
      const image = imageBuilder.image(obj[key]);
      obj["imageURL"] = image.url();
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      iterate(obj[key])
    }
  })
};