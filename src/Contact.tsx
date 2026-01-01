import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import './CSS Files/Contact.css';

function Contact() {
  return (
    <section className='contact-wrap' id='Contact'>
      <div className='content'>
        <h1>Contact<span style={{ color: '#ffffff' }}>.</span></h1>
        <p>
          Open to new opportunities and collaborations. Feel free to reach out via email 
          or connect on{' '}
          <a className='linked-in' href="https://www.linkedin.com/in/alexishs/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
        <a className="email" href="mailto:alexishs451@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} />
          alexishs451@gmail.com
        </a>
      </div>
    </section>
  );
}

export default Contact;

