import { useTranslation } from "react-i18next";
import { ProjectCard } from "./Projects";
import type { FilterKey } from "./Projects";
import "./CSS Files/projects.css";
import "./CSS Files/technicalTests.css";

import ecommerce from "./Images/Ecommerce.png";
import todo from "./Images/Todo.png";
import kun from "./Images/KUN.png";

const TECHNICAL_TESTS_LIST: {
	id: string;
	image: string;
	siteLink?: string;
	githubLink?: string;
	tags: FilterKey[];
}[] = [
	{
		id: "todo",
		image: todo,
		githubLink: "https://github.com/AlexisHS458/to-do-list",
		siteLink: "https://to-do-list-two-beryl-12.vercel.app/",
		tags: ["vue"],
	},
	{
		id: "ecommerce",
		image: ecommerce,
		githubLink: "https://github.com/AlexisHS458/ecommerce-app",
		siteLink: "https://ecommerce-prueba-bambu-prod.web.app/",
		tags: [],
	},
	{
		id: "pcppd",
		image: kun,
		githubLink: "https://github.com/AlexisHS458/Proyecto_PCPPD",
		tags: ["vue"],
	},
];

function TechnicalTests() {
	const { t } = useTranslation();

	return (
		<div id="TechnicalTests">
			<h1 className="title technical-tests-title" data-aos="fade-up">
				{t("technicalTests.title")}
				<span style={{ color: "var(--accent-color)" }}>.</span>
			</h1>
			<div className="projects-wrapper" data-aos="fade-up" data-aos-delay="100">
				{TECHNICAL_TESTS_LIST.map((proj) => (
					<ProjectCard
						key={proj.id}
						title={t(`projects.${proj.id}.title`)}
						imageSrc={proj.image}
						siteLink={proj.siteLink}
						githubLink={proj.githubLink}
						technologies={t(`projects.${proj.id}.technologies`)}
						description={t(`projects.${proj.id}.description`)}
					/>
				))}
			</div>
		</div>
	);
}

export default TechnicalTests;
