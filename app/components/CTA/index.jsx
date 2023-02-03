export default CTA = function({params}) {

  let classString = "";
  if (params.kind === "button") {
    classString = `${classSting} button`;
  } else {
    classString = `${classString} text-link`;
  }
  params.linkType && (classString = `${classString} ${params.linkType}`);

  return (
    <div className="cta">
      { params.isExternal ? 
          <a href={params.externalLink} className={classString} target="_blank" rel="noopener noreferrer">{params.linkText}</a>
        :
          <a href={params.internalLink} className={classString} >{params.linkText}</a>
      }
    </div>
  )
}