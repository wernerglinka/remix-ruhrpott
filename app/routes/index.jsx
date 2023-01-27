import {json} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import groq from 'groq'


import {getClient} from '~/sanity/client'



export const meta = (data) => {
  const {title, description} = data.data;
  return {
    title: title,
    description: description
  }
}

export const loader = async props => {
  const query = groq`*[_type == "page" && title == "Home"]`;
  const page = await getClient().fetch(query);
 
  if (!page) {
    throw new Response('Nothin...', {status: 404})
  }

  return page[0]; 
}

export default function Index() {
  const page = useLoaderData();

  console.log(page);

  return (

      <div>
        This is the home page for now { page.title }

        {page.sections.map(section => {
          return (
            <div key={section._key}>
              <h2>{section.sectionType}</h2>
            </div>
          )
        })}
      </div>

  )
}