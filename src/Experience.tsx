import { useTranslation } from "react-i18next";
import "./CSS Files/experience.css";

const EXPERIENCE_IDS = ["job1", "job2", "job3", "job4"] as const;

function Experience() {
	const { t } = useTranslation();

	const jobs = EXPERIENCE_IDS.map((id) => ({
		id,
		company: t(`experience.${id}.company`),
		role: t(`experience.${id}.role`),
		period: t(`experience.${id}.period`),
		description: t(`experience.${id}.description`),
	})).filter((job) => job.company.trim() !== "");

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
							<p className="experience-description">{job.description}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}

export default Experience;
