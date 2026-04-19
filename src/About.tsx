import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./CSS Files/about.css";

type SkillCategory = { titleKey: string; items: string[] };

function buildSkillsByTab(languageItems: string[]): { tabKey: string; categories: SkillCategory[] }[] {
	return [
		{
			tabKey: "technologies",
			categories: [
				{
					titleKey: "frontend",
					items: ["Vue 2/3", "Nuxt.js", "React", "Next.js (SSR/SSG)", "Shopify Liquid"],
				},
				{ titleKey: "programmingLanguages", items: ["JavaScript", "TypeScript"] },
				{ titleKey: "stateManagement", items: ["Pinia", "Vuex", "React Context API"] },
				{ titleKey: "apiIntegration", items: ["REST", "GraphQL", "Axios", "Strapi CMS"] },
				{
					titleKey: "stylingUi",
					items: ["Tailwind CSS", "Chakra UI", "Mantine UI", "Vuetify", "Bootstrap", "Next UI"],
				},
				{
					titleKey: "performanceSeo",
					items: ["SSR/SSG", "Structured metadata", "Lazy loading"],
				},
			],
		},
		{
			tabKey: "tools",
			categories: [
				{ titleKey: "uxUi", items: ["Figma"] },
				{ titleKey: "toolsWorkflow", items: ["Git", "GitHub", "Docker", "Agile/Scrum"] },
				{ titleKey: "coreStrengths", items: ["Reusable components", "Clean state management", "Consistent API integration"] },
			],
		},
		{
			tabKey: "skills",
			categories: [
				{
					titleKey: "softSkills",
					items: ["Communication", "Team collaboration", "Time management", "Problem solving", "Adaptability"],
				},
				{ titleKey: "languages", items: languageItems },
			],
		},
	];
}

function About() {
	const { t, i18n } = useTranslation();
	const [activeTab, setActiveTab] = useState(0);
	const skillsByTab = useMemo(() => {
		const languageItems = t("about.languageItems", { returnObjects: true }) as string[];
		return buildSkillsByTab(languageItems);
	}, [t, i18n.language]);
	const current = skillsByTab[activeTab];

	return (
		<section className="about-section" id="About">
			<h1 className="about-title" data-aos="fade-up">
				{t("about.title")}<span style={{ color: "var(--accent-color)" }}>.</span>
			</h1>
			<div className="content-wrapper">
				<div className="about-text" data-aos="fade-up" data-aos-delay="100">
					<p>{t("about.paragraph1")}</p>
					<p>{t("about.paragraph2")}</p>
					<p>{t("about.paragraph3")}</p>
					<p>{t("about.paragraph4")}</p>
				</div>
				<div className="skills-panel" data-aos="fade-up" data-aos-delay="200">
					<div className="skills-tabs" role="tablist">
						{skillsByTab.map(({ tabKey }, i) => (
							<button
								key={tabKey}
								role="tab"
								aria-selected={activeTab === i}
								className={`skills-tab ${activeTab === i ? "active" : ""}`}
								onClick={() => setActiveTab(i)}
							>
								{t(`about.tabs.${tabKey}`)}
							</button>
						))}
					</div>
					<div className="skills-content" role="tabpanel">
						{current.categories.map((category, catIndex) => (
							<div className="skills-block" key={catIndex}>
								<h3>{t(`about.categories.${category.titleKey}`)}</h3>
								<div className="skills-tags">
									{category.items.map((item, index) => (
										<span key={index}>{item}</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;

