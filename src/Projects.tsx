import { useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./CSS Files/projects.css";

import forprint from "./Images/Forprint.png";
import codisa from "./Images/Codisa.png";
import OurMaids from "./Images/OurMaids.png";
import gmar from "./Images/GMAR.png";
import kun from "./Images/KUN.png";
import ecommerce from "./Images/Ecommerce.png";
import todo from "./Images/Todo.png";
import casa from "./Images/Casa.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const FILTER_KEYS = ["all", "vue", "react", "angular", "next", "nuxt", "liquid"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const PROJECTS_LIST: {
	id: string;
	image: string;
	siteLink?: string;
	githubLink?: string;
	tags: FilterKey[];
}[] = [
	{ id: "lacasagallery", image: casa, siteLink: "https://www.lacasagallery.com/", tags: ["liquid"] },
	{ id: "ourmaids", image: OurMaids, siteLink: "https://ourmaids.com/", tags: ["react", "next"] },
	{ id: "codisa", image: codisa, siteLink: "https://codisa-ecommerce-store-dev.on.ocstudios.mx/", tags: ["vue", "nuxt"] },
	{ id: "todo", image: todo, githubLink: "https://github.com/AlexisHS458/to-do-list", siteLink: "https://to-do-list-two-beryl-12.vercel.app/", tags: ["vue"] },
	{ id: "ecommerce", image: ecommerce, githubLink: "https://github.com/AlexisHS458/ecommerce-app", siteLink: "https://ecommerce-prueba-bambu-prod.web.app/", tags: ["angular"] },
	{ id: "forprint", image: forprint, tags: ["vue", "nuxt"] },
	{ id: "gmarLanding", image: gmar, siteLink: "https://www.gmar.app/", tags: ["vue", "nuxt"] },
	{ id: "gmarBackoffice", image: gmar, tags: ["vue", "nuxt"] },
	{ id: "pcppd", image: kun, githubLink: "https://github.com/AlexisHS458/Proyecto_PCPPD", tags: ["vue"] },
];

interface ProjectCardProps {
	title: string;
	imageSrc: string;
	githubLink?: string;
	siteLink?: string;
	technologies: string;
	description: string;
	tagKeys: FilterKey[];
}

function ProjectCard({
	title,
	imageSrc,
	githubLink,
	siteLink,
	technologies,
	description,
	tagKeys,
}: ProjectCardProps) {
	const { t } = useTranslation();
	const cardRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!cardRef.current) return;
			const rect = cardRef.current.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;
			setMousePosition({ x, y });
		},
		[]
	);

	const handleMouseLeave = useCallback(() => {
		setIsHovering(false);
		setMousePosition({ x: 50, y: 50 });
	}, []);

	const handleMouseEnter = useCallback(() => {
		setIsHovering(true);
	}, []);

	return (
		<div
			ref={cardRef}
			className="project-card-wrapper"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			style={
				{
					"--mouse-x": `${mousePosition.x}%`,
					"--mouse-y": `${mousePosition.y}%`,
				} as React.CSSProperties
			}
		>
			<div className={`project ${isHovering ? "project-hover" : ""}`}>
				<a
					href={siteLink ? siteLink : githubLink}
					target="_blank"
					rel="noopener noreferrer"
				>
					<img className="images" src={imageSrc} alt={title} />
				</a>
				<div className="project-info">
					<div className="project-title">
						<h2>{title}</h2>
						<div style={{ display: "flex", gap: "0.75rem" }}>
							{siteLink && (
								<a href={siteLink} target="_blank" rel="noopener noreferrer">
									<FontAwesomeIcon icon={faGlobe} />
								</a>
							)}

							{githubLink && (
								<a href={githubLink} target="_blank" rel="noopener noreferrer">
									<FontAwesomeIcon icon={faGithub} />
								</a>
							)}
						</div>
					</div>
					{tagKeys.length > 0 && (
						<div className="project-tags">
							{tagKeys.map((key) => (
								<span key={key} className="project-tag">
									{t(`projects.filters.${key}`)}
								</span>
							))}
						</div>
					)}
					<h3>{technologies}</h3>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
}

function Projects() {
	const { t } = useTranslation();
	const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

	const filteredProjects =
		activeFilter === "all"
			? PROJECTS_LIST
			: PROJECTS_LIST.filter((p) => p.tags.includes(activeFilter));

	return (
		<div id="Projects">
			<h1 className="title" data-aos="fade-up">
				{t("projects.title")}<span style={{ color: "var(--accent-color)" }}>.</span>
			</h1>
			<div className="projects-filters" data-aos="fade-up" data-aos-delay="50">
				{FILTER_KEYS.map((key) => (
					<button
						key={key}
						type="button"
						className={`projects-filter-btn ${activeFilter === key ? "active" : ""}`}
						onClick={() => setActiveFilter(key)}
					>
						{t(`projects.filters.${key}`)}
					</button>
				))}
			</div>
			<div className="projects-wrapper" data-aos="fade-up" data-aos-delay="100">
				{filteredProjects.map((proj) => (
					<ProjectCard
						key={proj.id}
						title={t(`projects.${proj.id}.title`)}
						imageSrc={proj.image}
						siteLink={proj.siteLink}
						githubLink={proj.githubLink}
						technologies={t(`projects.${proj.id}.technologies`)}
						description={t(`projects.${proj.id}.description`)}
						tagKeys={proj.tags}
					/>
				))}
			</div>
		</div>
	);
}

export default Projects;

