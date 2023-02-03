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

import globalStyles from './styles/global-styles.css';

export const links = () =>{
  return [
    {
      rel: "stylesheet",
      href: globalStyles
    }
  ]
}
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
