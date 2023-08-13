import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black mt-10">
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center">
          <h2 className="mb-2 text-xl text-white">Stay Connected</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/j-alejandro-araujo"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/jesus-alejandro-araujo/"
              target="_blank"
              rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="w-6 h-6 text-white"
              />
            </a>
          </div>
          <div className="mt-4"></div>
          <p className="mt-2 text-xs text-white">
            Copyright &copy; 2023 Jesus Alejandro Araujo
          </p>
          <p className="text-xs text-white">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
