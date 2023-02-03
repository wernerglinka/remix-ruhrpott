import MainMenu from '../MainMenu'

export default function Header() {
  return (
    <div className="header-wrapper js-header">
      <header className="page-header">
        <div className="container">
          <div className="brand">
            <a className="js-home-link home-link" href="/"><img src="/assets/images/ruhrpott-logo.svg" alt="Ruhrpott POC website"/></a>
          </div>

          <button id="hamburger" className="js-hamburger"><span></span></button>

          <div id="main-menu" className="js-main-menu">
            <p>Main Menu here</p>
          </div>

        </div>
      </header>
    </div>
  )
}