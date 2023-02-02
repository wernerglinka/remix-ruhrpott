import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { codeInput } from '@sanity/code-input';
import { visionTool }  from '@sanity/vision';  

import projectDetails from "~/sanity/projectDetails";
import schema from "~/sanity/schema";
import ruhrpottStructure from '~/sanity/deskStructure';

export const config = defineConfig({
  ...projectDetails(),
  name: "remix-ruhrpott",
  title: "Remix Ruhrpott",
  plugins: [
    deskTool({ structure: ruhrpottStructure }),
    codeInput(),
    visionTool(),
  ],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
});
