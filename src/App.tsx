import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import "./CSS Files/App.css";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const OG_IMAGE = "/src/Images/BetterSymb.png";

function App() {
	const { i18n } = useTranslation();

	// AOS + reduced motion
	useEffect(() => {
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		document.documentElement.setAttribute("data-reduced-motion", prefersReduced ? "reduce" : "no-preference");
		if (!prefersReduced) {
			AOS.init({ duration: 700, offset: 60, once: true });
		}
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handler = () => {
			const reduce = mq.matches;
			document.documentElement.setAttribute("data-reduced-motion", reduce ? "reduce" : "no-preference");
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	// SEO: title, meta description, Open Graph por idioma
	useEffect(() => {
		const lang = i18n.language || "en";
		const title = i18n.t("meta.title");
		const description = i18n.t("meta.description");
		document.title = title;
		document.documentElement.lang = lang === "en" ? "en" : lang === "es" ? "es" : "pt";

		let metaDesc = document.querySelector('meta[name="description"]');
		if (!metaDesc) {
			metaDesc = document.createElement("meta");
			metaDesc.setAttribute("name", "description");
			document.head.appendChild(metaDesc);
		}
		metaDesc.setAttribute("content", description);

		const setOg = (property: string, content: string) => {
			let el = document.querySelector(`meta[property="${property}"]`);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute("property", property);
				document.head.appendChild(el);
			}
			el.setAttribute("content", content);
		};
		setOg("og:title", title);
		setOg("og:description", description);
		setOg("og:image", `${typeof window !== "undefined" ? window.location.origin : ""}${OG_IMAGE}`);
	}, [i18n.language]);

	return (
		<div>
			<Navbar />
			<About />
			<Projects />
			<Contact />
			<Footer />
			<ScrollToTop />
		</div>
	);
}

export default App

