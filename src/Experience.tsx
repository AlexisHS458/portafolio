import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "./CSS Files/experience.css";

const EXPERIENCE_IDS = ["job1", "job2", "job3", "job4"] as const;
type ExperienceId = (typeof EXPERIENCE_IDS)[number];

interface Job {
	id: ExperienceId;
	company: string;
	role: string;
	period: string;
	description: string;
}

const HIGHLIGHT_KEYWORDS = [
	// Tecnologías
	"React",
	"Vue",
	"Vue 2",
	"Vue 3",
	"Next.js",
	"Nuxt",
	"Nuxt.js",
	"Nuxt.js 2",
	"TypeScript",
	"JavaScript",
	"Firebase",
	"Stripe",
	"Square",
	"SquareUp",
	"Strapi",
	"GraphQL",
	"REST",
	"APIs",
	"API",
	"SSR",
	"POS",
	// Estado
	"Context API",
	"Pinia",
	"Vuex",
	// Métricas y resultados
	"SEO",
	"performance",
	"rendimiento",
	"usabilidad",
	"usability",
	"5–10",
	"5-10",
	"30%",
	"40%",
] as const;

function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const HIGHLIGHT_PATTERNS = HIGHLIGHT_KEYWORDS.map((keyword) => ({
	keyword,
	regex: new RegExp(`\\b(${escapeRegExp(keyword)})\\b`, "gi"),
}));

function highlightKeywords(text: string): ReactNode[] {
	let parts: (string | ReactNode)[] = [text];
	let keyIndex = 0;

	HIGHLIGHT_PATTERNS.forEach(({ regex }) => {
		const newParts: (string | ReactNode)[] = [];

		parts.forEach((part) => {
			if (typeof part !== "string") {
				newParts.push(part);
				return;
			}

			let lastIndex = 0;
			let match: RegExpExecArray | null;

			while ((match = regex.exec(part)) !== null) {
				if (match.index > lastIndex) {
					newParts.push(part.slice(lastIndex, match.index));
				}
				newParts.push(
					<span className="experience-highlight" key={`hl-${keyIndex++}`}>
						{match[0]}
					</span>
				);
				lastIndex = match.index + match[0].length;
			}

			if (lastIndex < part.length) {
				newParts.push(part.slice(lastIndex));
			}
		});

		parts = newParts;
	});

	return parts;
}

interface ExperienceDescriptionProps {
	description: string;
	achievementsTitle: string;
}

function ExperienceDescription({
	description,
	achievementsTitle,
}: ExperienceDescriptionProps) {
	const lines = description
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);

	if (lines.length <= 1) {
		return <p className="experience-description">{lines[0] ?? ""}</p>;
	}

	const achievementsIndex = lines.findIndex((line) =>
		/^(logros|achievements|erfolge)[:：]?$/i.test(line)
	);

	const responsibilities =
		achievementsIndex === -1 ? lines : lines.slice(0, achievementsIndex);
	const achievements =
		achievementsIndex === -1 ? [] : lines.slice(achievementsIndex + 1);

	const cleanText = (text: string) => text.replace(/^•\s*/u, "");

	return (
		<div className="experience-description">
			{responsibilities.length > 0 && (
				<ul className="experience-list">
					{responsibilities.map((item, index) => {
						const clean = cleanText(item);
						return <li key={`resp-${index}`}>{highlightKeywords(clean)}</li>;
					})}
				</ul>
			)}
			{achievements.length > 0 && (
				<div className="experience-achievements">
					<p className="experience-achievements-title">{achievementsTitle}</p>
					<ul className="experience-list">
						{achievements.map((item, index) => {
							const clean = cleanText(item);
							return <li key={`ach-${index}`}>{highlightKeywords(clean)}</li>;
						})}
					</ul>
				</div>
			)}
		</div>
	);
}

function Experience() {
	const { t } = useTranslation();

	const jobs: Job[] = EXPERIENCE_IDS.map((id) => ({
		id,
		company: t(`experience.${id}.company`),
		role: t(`experience.${id}.role`),
		period: t(`experience.${id}.period`),
		description: t(`experience.${id}.description`),
	})).filter((job) => job.company.trim() !== "");

	const achievementsTitle = t("experience.achievementsTitle");

	return (
		<section id="Experience" className="experience-section">
			<h1 className="experience-title" data-aos="fade-up">
				{t("experience.title")}
				<span style={{ color: "var(--accent-color)" }}>.</span>
			</h1>
			<div className="experience-timeline" data-aos="fade-up" data-aos-delay="100">
				<div className="timeline-line" aria-hidden="true" />
				{jobs.map((job) => (
					<article key={job.id} className="experience-card">
						<div className="timeline-dot" aria-hidden="true" />
						<div className="experience-period">{job.period}</div>
						<div className="experience-content">
							<h2 className="experience-role">{job.role}</h2>
							<p className="experience-company">{job.company}</p>
							<ExperienceDescription
								description={job.description}
								achievementsTitle={achievementsTitle}
							/>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

export default Experience;
