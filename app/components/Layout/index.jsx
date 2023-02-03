import Footer from '../Footer'
import Header from '../Header'

export default function Layout({ children }) {
  
  return (
    <>
      <Header />
      <div className="page">{ children }</div>
      <Footer />
    </>
  )
}