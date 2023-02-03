import Templates from '../index';

/**
 * This function takes an array of sections and renders each section using 
 * the associated template.The component maps through the sections array, assigning 
 * each section type to a template, then renders each section using that template
 * and passing it any props associated with that section.
 * 
 * All sectiuons share a common set of props, which are: 
 * Margin, Padding, Background, Container Class, Container ID, Section Type, and Disabled.
 */
export default ({ sections }) => {
  
  return (
  <>
    {sections.map((section, index) => {
      const { disabled } = section;
      if (disabled) return null;

      // build the wrapper classes string for the section wrapper
      let sectionWrapperClasses = `${section.containerClass ? section.containerClass : '' }`;

      if (section.margin?.top) { 
        sectionWrapperClasses = `${sectionWrapperClasses} margin-top`;
      }
      if (section.margin?.bottom) {
        sectionWrapperClasses = `${sectionWrapperClasses} margin-bottom`;
      }
      if (section.padding?.top) {
        sectionWrapperClasses = `${sectionWrapperClasses} padding-top`;
      }
      if (section.padding?.bottom) {
        sectionWrapperClasses = `${sectionWrapperClasses} padding-bottom`;
      }
      if (section.isDark) {
        sectionWrapperClasses = `${sectionWrapperClasses} is-dark`;
      }
      if (section.background?.cssBg) {
        sectionWrapperClasses = `${sectionWrapperClasses} ${section.background.cssBg}`;
      }
      sectionWrapperClasses = sectionWrapperClasses.trim();

      // build the styles class for the section wrapper
      const sectionWrapperStyles = {
        backgroundColor: section.background?.color ? section.background.color : 'none',
        backgroundImage: section.background?.image ? `url(${section.background.image})` : 'none',
      };

      const SectionTemplate = Templates[section.sectionType];
      return (
        <section.htmlTag
          key={`${section}${index}`}
          id={section.containerId} 
          className={sectionWrapperClasses} 
          style={sectionWrapperStyles}
        >
          <SectionTemplate {...section} />
        </section.htmlTag>
      )
    })}
  </>
)};


