import { Link } from 'react-router-dom'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer(){
    return(
    <footer className="footer d-flex align-items-center">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <div className="created-by">
            <div className="d-flex align-items-center">
              <span>Created by:</span>
              <a
                href="https://github.com/andy-ag"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <span className="github-name">Andy Ageenkov</span>
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
          <div className="footer-links">
            <Link className="footer-link" to="/faq">
              FAQ
            </Link>
            <Link className="footer-link" to="/privacy">
              Privacy Policy
            </Link>
            <Link className="footer-link" to="/ToS">
              Terms of Service
            </Link>
            <Link className="footer-link" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
    )
}