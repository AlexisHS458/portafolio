import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "./CSS Files/Footer.css";

const CURRENT_YEAR = new Date().getFullYear();
const EMAIL = "alexishs451@gmail.com";

function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="site-footer">
			<div className="footer-inner">
				<p className="footer-name">
					Alexis Herrera Saucedo <span className="footer-year">© {CURRENT_YEAR}</span>
				</p>
				<nav className="footer-links" aria-label="Enlaces del footer">
					<a
						href="https://www.linkedin.com/in/alexishs/"
						target="_blank"
						rel="noopener noreferrer"
						className="footer-link"
						aria-label="LinkedIn"
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
					<a
						href="https://github.com/AlexisHS458"
						target="_blank"
						rel="noopener noreferrer"
						className="footer-link"
						aria-label="GitHub"
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a href={`mailto:${EMAIL}`} className="footer-link" aria-label="Email">
						<FontAwesomeIcon icon={faEnvelope} />
					</a>
				</nav>
				<p className="footer-made">
					{t("footer.madeWith")} <span className="footer-tech">{t("footer.tech")}</span>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
