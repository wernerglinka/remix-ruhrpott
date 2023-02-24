# Styles setup
Remix is using a somewhat unique approach. IT doesn't use CSS-in-Javascxript, rather it requires 'good ol' CSS' to be used. 

Remix requires adding a simple <link rel="stylesheet"> tag to the webpage for styling. If a route is active then the stylesheet is added to the page. When a route is inactive then the stylesheet is removed.

This looks like this for the home page:

```javascript
import homeStyles from '../styles/home-styles.css';

export const links = () =>{
  return [
    {
      rel: "stylesheet",
      href: homeStyles
    }
  ]
}
```

This approach is simple but in our case we are using section components to compose a page. We want to keep all flies related to a section together. So we have a styles folder in each section folder. To make this work, we add a style.css file into each components folder and then import the style.css file into the page style.css file. 

```
- components
  - Layout
    - index.js
    - styles.css
  - ImageSlider
    - index.js
    - styles.css
  - ...
```

All page styles are located in the styles folder in the root of the project. 

**app/styles/**

```css
- app
  - components
  - routes
  - styles
    - home-styles.css
    - about-styles.css
    - ...
```

**app/styles/home-styles.css**
```css
@import '~/components/Layout/styles.css';
@import '~/components/ImageSlider/styles.css';
...
```