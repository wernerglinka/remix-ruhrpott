import {useLoaderData} from '@remix-run/react';
import groq from 'groq';
import {getClient} from '~/sanity/client';

import Layout from '../components/Layout';
import Templates from '../templates';

export const meta = (data) => {
  const {title, description} = data.data;

  // TODO: Added social image and other meta tags
  return {
    title: title,
    description: description
  }
}

export const loader = async props => {
  const query = groq`*[_type == "page" && title == "Home"]`;
  const page = await getClient().fetch(query);
 
  if (!page) {
    throw new Response('Nothin...', {status: 404});
  }

  return page[0]; 
}

export default function Index() {
  const page = useLoaderData();
  // since we are repurposing a dataset meant for Metalsmith/Nunjucks we don't need the layout file extension. 
  const templateName = page.layout.split(".")[0];
  // the default template is "sections". Used for structured content.
  const PageTemplate = Templates[templateName];

  return (
    <Layout>
      <PageTemplate {...page} />  
    </Layout>
  )
}