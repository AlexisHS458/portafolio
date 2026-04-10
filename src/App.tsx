import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import "./CSS Files/App.css";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import TechnicalTests from "./TechnicalTests";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const OG_IMAGE = "/src/Images/BetterSymb.png";

const HTML_LANG: Record<string, string> = { en: "en", es: "es", pt: "pt", de: "de" };

function setNamedMeta(name: string, content: string) {
	let el = document.querySelector(`meta[name="${name}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute("name", name);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

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

	// SEO: title, description, keywords, Open Graph, Twitter, canonical, JSON-LD
	useEffect(() => {
		const lang = (i18n.language || "en").split("-")[0];
		const title = i18n.t("meta.title");
		const description = i18n.t("meta.description");
		const keywords = i18n.t("meta.keywords");
		const origin = typeof window !== "undefined" ? window.location.origin : "";
		const pageUrl =
			typeof window !== "undefined" ? window.location.href.replace(/#.*$/, "") : origin ? `${origin}/` : "";

		document.title = title;
		document.documentElement.lang = HTML_LANG[lang] ?? "en";

		setNamedMeta("description", description);
		setNamedMeta("keywords", keywords);
		setNamedMeta("author", "Alexis Herrera Saucedo");
		setNamedMeta("robots", "index, follow");

		let canonical = document.querySelector('link[rel="canonical"]');
		if (!canonical) {
			canonical = document.createElement("link");
			canonical.setAttribute("rel", "canonical");
			document.head.appendChild(canonical);
		}
		canonical.setAttribute("href", pageUrl || `${origin}/`);

		const setOg = (property: string, content: string) => {
			let el = document.querySelector(`meta[property="${property}"]`);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute("property", property);
				document.head.appendChild(el);
			}
			el.setAttribute("content", content);
		};
		const ogLocale =
			lang === "es" ? "es_MX" : lang === "pt" ? "pt_BR" : lang === "de" ? "de_DE" : "en_US";
		const imageUrl = `${origin}${OG_IMAGE}`;

		setOg("og:type", "website");
		setOg("og:url", pageUrl || `${origin}/`);
		setOg("og:locale", ogLocale);
		setOg("og:site_name", "Alexis Herrera Saucedo");
		setOg("og:title", title);
		setOg("og:description", description);
		setOg("og:image", imageUrl);

		setNamedMeta("twitter:card", "summary_large_image");
		setNamedMeta("twitter:title", title);
		setNamedMeta("twitter:description", description);
		setNamedMeta("twitter:image", imageUrl);

		const personSchema = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "Alexis Herrera Saucedo",
			jobTitle: "Frontend Developer",
			url: pageUrl || `${origin}/`,
			email: "alexishs451@gmail.com",
			telephone: "+52-458-102-3799",
			image: imageUrl,
			sameAs: [
				"https://www.linkedin.com/in/alexishs/",
				"https://github.com/AlexisHS458",
			],
			address: {
				"@type": "PostalAddress",
				addressCountry: "MX",
			},
			knowsAbout: [
				"Vue.js",
				"React",
				"Next.js",
				"Nuxt.js",
				"TypeScript",
				"Frontend development",
				"Core Web Vitals",
				"Technical SEO",
			],
		};

		const existingLd = document.getElementById("schema-person");
		if (existingLd) existingLd.remove();
		const ldScript = document.createElement("script");
		ldScript.id = "schema-person";
		ldScript.type = "application/ld+json";
		ldScript.textContent = JSON.stringify(personSchema);
		document.head.appendChild(ldScript);
	}, [i18n.language]);

	return (
		<div>
			<Navbar />
			<About />
			<Experience />
			<Projects />
			<TechnicalTests />
			<Contact />
			<Footer />
			<ScrollToTop />
		</div>
	);
}

export default App

