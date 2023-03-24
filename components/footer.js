import LoginButton from "../components/login";

const Footer = () => {
  return (
    <footer
      className="text-center text-lg-start  pt-4"
      style={{ background: "#aa1e2d" }}
    >
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 footer-title">UNDERGRADUATE</h5>

            <ul className="list-unstyled mb-4">
              <li>
                <a href="http://www.arch.au.edu/" className="text-white">
                  ARCHITECTURE AND DESIGN
                </a>
              </li>
              <li>
                <a href="http://www.arts.au.edu/" className="text-white">
                  ARTS
                </a>
              </li>
              <li>
                <a href="http://www.biotech.au.edu/" className="text-white">
                  BIOTECHNOLOGY
                </a>
              </li>
              <li>
                <a href="http://www.ca.au.edu/" className="text-white">
                  COMMUNICATION ARTS
                </a>
              </li>
              <li>
                <a href="http://www.eng.au.edu/" className="text-white">
                  ENGINEERING
                </a>
              </li>
              <li>
                <a href="http://www.law.au.edu/" className="text-white">
                  LAW
                </a>
              </li>
              <li>
                <a href="http://www.msme.au.edu/" className="text-white">
                  MANAGEMENT AND ECONOMICS
                </a>
              </li>
              <li>
                <a href="http://www.music.au.edu/" className="text-white">
                  MUSIC
                </a>
              </li>
              <li>
                <a href="http://www.nurse.au.edu/" className="text-white">
                  NURSING SCIENCE
                </a>
              </li>
              <li>
                <a href="http://www.scitech.au.edu/" className="text-white">
                  SCIENCE &amp; TECHNOLOGY
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 footer-title">ABOUT US</h5>

            <ul className="list-unstyled">
              <li>
                <a href="/about-au/general-information.html" className="text-white">
                  HISTORY
                </a>
              </li>
              <li>
                <a href="/about-au/Accreditation.html" className="text-white">
                  ACCREDITATION
                </a>
              </li>
              <li>
                <a
                  href="http://www.assumptionjournal.au.edu/index.php/au"
                  className="text-white"
                >
                  AU PUBLICATIONS
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/drive/folders/1ptJSFfk367Td2Bgj8VWC-rGpERQyjEeR"
                  className="text-white"
                >
                  IDENTITY GUIDELINES
                </a>
              </li>
              <li>
                <a href="/about-au/useful-links.html" className="text-white">
                  USEFUL LINKS
                </a>
              </li>
              <li>
                <a
                  href="https://ohrm.au.edu/job-au/job-vacancy.html"
                  className="text-white"
                >
                  JOB VACANCY
                </a>
              </li>
              <li>
                <a
                  href="https://ohrm.au.edu/interested-links/interested-links-en/emergency-call-en.html"
                  className="text-white"
                >
                  EMERGENCY CALL
                </a>
              </li>
              <li>
                <a href="https://pubhtml5.com/qkvt/qlhp/" className="text-white">
                  THE UNIQUENESS &amp; IDENTITY
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 footer-title">ADMISSIONS</h5>

            <ul className="list-unstyled">
              <li>
                <a href="https://admissions.au.edu/" className="text-white">
                  UNDERGRADUATE (Admissions for Undergraduate)
                </a>
              </li>
              <li>
                <a
                  href="https://www.grad.au.edu/master-degree-programs"
                  className="text-white"
                >
                  GRADUATE (Admission for Graduate)
                </a>
              </li>
              <li>
                <a
                  href="http://www.sa.au.edu/index.php/offices/financial-assistance-division-fd"
                  className="text-white"
                >
                  FINANCIAL AID
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 footer-title">ONLINE LEARNING</h5>

            <ul className="list-unstyled">
              <li>
                <a href="https://aulms.au.edu/" className="text-white">
                  AU LMS
                </a>
              </li>
              <li>
                <a href="https://lms.msme.au.edu/" className="text-white">
                  LMS MSME
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 footer-title">GRADUATE</h5>

            <ul className="list-unstyled">
              <li>
                <a href="https://www.gsb.au.edu//" className="text-white">
                  BUSINESS AND ADVANCED TECHNOLOGY MANAGEMENT
                </a>
              </li>
              <li>
                <a href="http://www.humansciences.au.edu/" className="text-white">
                  HUMAN SCIENCES
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4 footer-title">RESEARCH</h5>

            <ul className="list-unstyled">
              <li>
                <a href="https://repository.au.edu/" className="text-white">
                  AU-IR
                </a>
              </li>
              <li>
                <a href="http://www.iras.au.edu/" className="text-white">
                  IRAS
                </a>
              </li>
              <li>
                <a href="http://www.library.au.edu/" className="text-white">
                  LIBRARY
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0"></div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <LoginButton />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-3 border-top border-white text-white">
        Link to our website:
        <a className="text-white" href="https://auvr.vercel.app/">
          {" "}
          auvr.vercel.app
        </a>
      </div>
    </footer>
  );
};

export default Footer;
