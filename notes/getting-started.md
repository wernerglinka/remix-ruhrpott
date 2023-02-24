# Site Building Notes for Remix-Ruhrpott

This site is build with Remix, a quote "full stack web framework that lets you focus on the user interface and work back through web fundamentals to deliver a fast, slick, and resilient user experience that deploys to any Node. js server and even non-Node. js environments at the edge like Cloudflare Workers."

The goal is to use the Sanity content for the Metalsmith Ruhrpott site and host it on Netlify.

## Getting Started

There is a Studio v3 Remix project already at https://github.com/SimeonGriggs/remix-sanity-studio-v3 which has one interesting feature: Sanity Studio is embedded in the Remix app, it is accessible at `/studio` rouite.

### Installing Sanity Studio v3 + Remix

```javascript
npx create-remix@latest --template SimeonGriggs/remix-sanity-studio-v3
```

This will create a new Remix project with Sanity Studio v3 embedded in it.

```javascript
npm run dev
```

This shows the app running on http://localhost:3000.

### Replacing the Sanity Studio with the Ruhrpott Studio

1. Delete the `studio` folder.
2. Copy the `studio` folder from the Ruhrpott project into the Remix project `routes` folder.
3. Copy the `schema` folder from the Ruhrpott project into the Remix project `sanity` folder.
4. Copy `deskStructure.js` from the Ruhrpott project into the Remix project `sanity` folder.
5. Replace the content of `app/routes/index.jsx` with

```javascript
export default function IndexRoute() {
  return <div>Hello Remix Ruhrpott</div>;
}
```

6. Reduce the content of `app/sanity/projectDetails.js` to

```javascript
export const projectDetails = () => {
  const {
    SANITY_PUBLIC_PROJECT_ID,
    SANITY_PUBLIC_DATASET,
    SANITY_PUBLIC_API_VERSION,
  } = typeof document === "undefined" ? process.env : window.ENV;

  return {
    projectId: SANITY_PUBLIC_PROJECT_ID,
    dataset: SANITY_PUBLIC_DATASET,
    apiVersion: SANITY_PUBLIC_API_VERSION,
  };
};
```

7. and the content of `app/sanity/client.js` to

```javascript
import SanityClient from "@sanity/client";

import { projectDetails } from "~/sanity/projectDetails";

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: true,
});

export const getClient = () => client;

```

8. Reduce the content of `app/root.jsx` to

```javascript
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

export const meta = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async () => {
  return json({
    ENV: {
      SANITY_PUBLIC_PROJECT_ID: process.env.SANITY_PUBLIC_PROJECT_ID,
      SANITY_PUBLIC_DATASET: process.env.SANITY_PUBLIC_DATASET,
      SANITY_PUBLIC_API_VERSION: process.env.SANITY_PUBLIC_API_VERSION,
    },
  });
};

export default function App() {
  const { ENV } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```
__NOTE: Nore sure if I need to add the `window.ENV` script.__

9. Add a `.env` file to the Remix project root folder with the following content:

```javascript
# These will be added to the window so the Studio can read them
SANITY_PUBLIC_PROJECT_ID=349a1vg2
SANITY_PUBLIC_DATASET=production
SANITY_PUBLIC_API_VERSION=2022-09-19

# Generated in sanity.io/manage
# Token with "Viewer" permissions
SANITY_READ_TOKEN=sk3PlsKtIDnFHCYn6U9kcgEvEQQTbHS6pAtX5havlY9ajEyv6v1Jx5iOSxKmH50HWqCu1J4VN42DhPFn1YfkySomlawB97thj1WFX6V75GFOIn2g6eyOMCw7nu9cEjbWoTOaz7odQ74d94cH8ijJ39l35pfxyNKlyiLKvXa2JvYTav2zf4M5

# Generated in sanity.io/manage
# Token with "Editor" permissions
SANITY_WRITE_TOKEN=
```
10. Delete all front-end files of the original remix project. The app folder should now look like this:

```javascript
/app
  /routes
    /studio
    index.jsx
  /sanity
    /schema
    client.js
    deskStructure.js
    projectDetails.js
    sanity.config.js
  entry.client.jsx
  entry.server.jsx
  root.jsx
```

At this point run `npm run dev` and the app should run on http://localhost:3000. The Sanity Studio should be accessible at http://localhost:3000/studio.

## Building Remix Ruhropott for Netlify

At this point the app runs locally, but it is not yet ready to be deployed to Netlify. For that we'll create a new Remix project for deployment at Netlify. 

### Creating a new Remix project for deployment on Netlify

Open a new terminal window and create a new Remix project for deployment on Netlify.

```bash
npx create-remix@latest
? Where would you like to create your app? remix-puhrpott
? What type of app do you want to create? Just the basics
? Where do you want to deploy? Choose Remix App Server if you're unsure; it's easy to change deployment targets. Netlify
? TypeScript or JavaScript? JavaScript
? Do you want me to run `npm install`? (Y/n) 
```

Hit Y to install the dependencies.

Open the new `remix-puhrpott` project in VSCode and 
1. Replace the app folder with the app folder from the Remix Ruhrpott project.
2. Copy the `.env` file in the project root
3. Commit the changes to git and publish the project to GitHub.
4. Create a new Netlify site and connect it to the GitHub repository.
5. Add the envorinment variables from the `.env` file to the Netlify site.
6. Change the site name to `remix-ruhrpott` and add the resulting URL to the CORS origins section in the Sanity Manage backend.

At this point I got a build error on Netlify:

```bash
The function "SERVER" is larger than the 50MB limit. Please consider reducing it.
```

Under the hood Netlify functions are an abstraction build on top of AWS Lambda functions. Currently AWS restricts zipped Lambda files to 50 MB. During the build process Netlify bundles any Netlify functions, by default with the `zip-it-and-ship-it` bundler and attempts to upload the zipped version. It fails if the zipped function is greater than 50 MB.


I found a solution [at this blog post](https://aboutmonica.com/blog/how-to-check-bundled-netlify-function-size-locally/).

```toml
[functions]
  node_bundler = "esbuild"
``` 

**Now I have a starting point to implement the Remix Ruhrpott app on Netlify.**