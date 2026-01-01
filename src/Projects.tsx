import "./CSS Files/projects.css";

import forprint from "./Images/Forprint.png";
import codisa from "./Images/Codisa.png";
import OurMaids from "./Images/OurMaids.png";
import gmar from "./Images/GMAR.png";
import kun from "./Images/KUN.png";
import ecommerce from "./Images/Ecommerce.png";
import todo from "./Images/Todo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

interface ProjectCardProps {
	title: string;
	imageSrc: string;
	githubLink?: string;
	siteLink?: string;
	technologies: string;
	description: string;
}

function ProjectCard({
	title,
	imageSrc,
	githubLink,
	siteLink,
	technologies,
	description,
}: ProjectCardProps) {
	return (
		<div className="project">
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
				<h3>{technologies}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

function Projects() {
	return (
		<div id="Projects">
			<h1 className="title">
				Projects<span style={{ color: "#ffffff" }}>.</span>
			</h1>
			<div className="projects-wrapper">
				<ProjectCard
					title="CODISA E-Commerce"
					imageSrc={codisa}
					siteLink="https://codisa-ecommerce-store-dev.on.ocstudios.mx/"
					technologies="Vue · Nuxt.js · Vuetify · Pinia · GraphQL Apollo"
					description="Led the redesign of Codisa's e-commerce platform, improving user experience with enhanced features. Integrated backend for easy banner and product management with automated stock display. Includes shopping cart, secure authentication, multiple shipping addresses, order history, and wishlist functionality."
				/>

				<ProjectCard
					title="OurMaids"
					imageSrc={OurMaids}
					siteLink="https://ourmaids.com/"
					technologies="React · Next.js · Tailwind · SquareUp · TypeScript"
					description="Redesigned OurMaids' website improving SEO and restructuring information architecture. Modern landing page and web platform for a cleaning service business with integrated payment solutions."
				/>

				<ProjectCard
					title="Forprint Backoffice"
					imageSrc={forprint}
					technologies="Vue · Nuxt.js · Vuetify · Pinia"
					description="Created an efficient internal payment visualization interface for Forprint. Admin dashboard for managing bank transfer payments, accepting or declining transactions, and generating purchase invoices with streamlined workflows."
				/>

				<ProjectCard
					title="Give Me A Ride Landing Page"
					imageSrc={gmar}
					siteLink="https://www.gmar.app/"
					technologies="Vue · Nuxt.js · Vuetify · Vuex · GraphQL"
					description="Designed and developed a user-centric marketing landing page with optimized SEO, achieving 5-10 daily visits with fast load times. Features terms and conditions, privacy policy, pricing plans, and FAQ sections."
				/>

				<ProjectCard
					title="Give Me A Ride Backoffice"
					imageSrc={gmar}
					technologies="Vue · Nuxt.js · Vuetify · Vuex · GraphQL"
					description="Developed a user-focused internal verification page streamlining control and report reviews. Implemented GraphQL notifications for instant real-time updates, significantly improving admin efficiency and workflow."
				/>

				<ProjectCard
					title="PCPPD"
					imageSrc={kun}
					githubLink="https://github.com/AlexisHS458/Proyecto_PCPPD"
					technologies="Vue · Vuetify · Vuex · Firebase"
					description="Collaborative programming platform with GitHub integration for code editing, pull requests, and team communication."
				/>

				<ProjectCard
					title="Todo List"
					imageSrc={todo}
					githubLink="https://github.com/AlexisHS458/to-do-list"
					siteLink="https://to-do-list-two-beryl-12.vercel.app/"
					technologies="Vue · Vuetify · TypeScript · Vite · Pinia"
					description="A simple todo list application built with Vue 3, Vite, and Pinia. It allows you to add, edit, and delete tasks."
				/>

				<ProjectCard
					title="Ecommerce"
					imageSrc={ecommerce}
					githubLink="https://github.com/AlexisHS458/ecommerce-app"
					siteLink="https://ecommerce-prueba-bambu-prod.web.app/"
					technologies="Angular · Tailwind · PrimeNG · Firebase · TypeScript"
					description="Ecommerce application built with Angular, Tailwind, PrimeNG, Firebase, and TypeScript. It allows you to add, edit, and delete products."
				/>
			</div>
		</div>
	);
}

export default Projects;

