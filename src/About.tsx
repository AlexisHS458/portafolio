import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./CSS Files/about.css";

type SkillCategory = { titleKey: string; items: string[] };

const skillsByTab: { tabKey: string; categories: SkillCategory[] }[] = [
	{
		tabKey: "technologies",
		categories: [
			{ titleKey: "frontend", items: ["Vue 2/3", "Nuxt.js", "React", "Next.js", "Angular", "Shopify"] },
			{ titleKey: "programmingLanguages", items: ["Javascript", "Typescript", "Liquid"] },
			{ titleKey: "stateManagement", items: ["Pinia", "Vuex", "React Context API"] },
			{ titleKey: "apiIntegration", items: ["REST API integration", "GraphQL", "Axios", "React Context API"] },
			{ titleKey: "stylingUi", items: ["Tailwind CSS", "Chakra UI", "Mantine UI", "Vuetify", "Bootstrap", "Next UI"] },
		],
	},
	{
		tabKey: "tools",
		categories: [
			{ titleKey: "uxUi", items: ["Figma"] },
			{ titleKey: "toolsWorkflow", items: ["Git", "GitHub", "Docker", "Agile"] },
			{ titleKey: "coreStrengths", items: ["Reusable UI patterns", "Modular project structuring"] },
		],
	},
	{
		tabKey: "skills",
		categories: [
			{ titleKey: "softSkills", items: ["Communication", "Team Collaboration", "Time Management", "Problem Solving", "Adaptability"] },
			{ titleKey: "languages", items: ["English Pre-Intermediate", "Spanish Native"] },
		],
	},
];

function About() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(0);
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

