import SanityClient from "@sanity/client";

import projectDetails from "~/sanity/projectDetails";

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: true,
});

export const getClient = () => client;
