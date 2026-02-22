import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import "./CSS Files/Contact.css";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const MIN_MESSAGE_LENGTH = 20;

type SubmitStatus = "idle" | "sending" | "success" | "error";

function Contact() {
	const { t } = useTranslation();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<SubmitStatus>("idle");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!FORMSPREE_ID) {
			setStatus("error");
			return;
		}
		setStatus("sending");
		try {
			const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, message }),
			});
			if (res.ok) {
				setStatus("success");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	return (
		<section className="contact-wrap" id="Contact">
			<div className="content" data-aos="fade-up">
				<h1>
					{t("contact.title")}
					<span style={{ color: "var(--accent-color)" }}>.</span>
				</h1>
				<p>
					{t("contact.text")}{" "}
					<a
						className="linked-in"
						href="https://www.linkedin.com/in/alexishs/"
						target="_blank"
						rel="noopener noreferrer"
					>
						{t("contact.linkedIn")}
					</a>
					{t("contact.textEnd")}
				</p>

				<form className="contact-form" onSubmit={handleSubmit}>
					<div className="form-row">
						<label htmlFor="contact-name">{t("contact.formName")} <span className="required">*</span></label>
						<input
							id="contact-name"
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={t("contact.formPlaceholderName")}
							required
							disabled={status === "sending"}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="contact-email">{t("contact.formEmail")} <span className="required">*</span></label>
						<input
							id="contact-email"
							type="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder={t("contact.formPlaceholderEmail")}
							required
							disabled={status === "sending"}
						/>
					</div>
					<div className="form-row">
						<label htmlFor="contact-message">{t("contact.formMessage")} <span className="required">*</span></label>
						<textarea
							id="contact-message"
							name="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder={t("contact.formPlaceholderMessage")}
							rows={4}
							required
							minLength={MIN_MESSAGE_LENGTH}
							title={t("contact.messageMinHint", { count: MIN_MESSAGE_LENGTH })}
							disabled={status === "sending"}
						/>
						<span className={`form-char-count ${message.length > 0 && message.length < MIN_MESSAGE_LENGTH ? "form-char-count--short" : ""}`}>
							{message.length} / {MIN_MESSAGE_LENGTH} {t("contact.charCountMin")}
						</span>
					</div>
					{status === "success" && (
						<p className="form-feedback form-feedback-success">{t("contact.formSuccess")}</p>
					)}
					{status === "error" && (
						<p className="form-feedback form-feedback-error">{t("contact.formError")}</p>
					)}
					<button
						type="submit"
						className="form-submit"
						disabled={status === "sending"}
					>
						{status === "sending" ? t("contact.formSending") : t("contact.formSubmit")}
					</button>
				</form>

				<p className="contact-or">{t("contact.or")}</p>
				<a className="email" href="mailto:alexishs451@gmail.com">
					<FontAwesomeIcon icon={faEnvelope} />
					alexishs451@gmail.com
				</a>
			</div>
		</section>
	);
}

export default Contact;
