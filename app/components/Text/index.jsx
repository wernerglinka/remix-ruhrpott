import CTA from '../CTA'

export default function Text({params}) {

  return (
    <>
      {params?.titlePrefix && <p className="prefix">{params?.titlePrefix}</p>}
      
      {params?.title && params?.headerType === 'h1' && <h1>{params?.title}</h1>}
      {params?.title && params?.headerType === 'h2' && <h2>{params?.title}</h2>}
      {params?.title && params?.headerType !== 'h1' && params?.headerType !== 'h2' && <h3>{params?.title}</h3>}
        
      {params?.subTitle && <p className="sub-title">{params?.subTitle}</p>}

      {params?.portableTextBody && <div className="prose"><p>{params?.portableTextBody}</p></div>}

      {params?.cta?.url && <CTA params={params?.cta} />}

    </>
  )
}