import "./CSS Files/about.css";

function About() {
	const frontend: string[] = [
		"Vue",
		"React",
		"Angular",
		"Next.js",
		"Nuxt.js",
		"JavaScript",
		"TypeScript",
		"Pinia",
		"Vuex",
		"GraphQL",
		"Tailwind",
		"Vuetify",
		"Mantine UI",
		"Next UI",
		"Chakra UI",
		"React Hooks",
		"HTML/CSS",
		"Bootstrap",
		"Shopify",
		"Liquid",
	];

	const tools: string[] = [
		"GitHub/Git",
		"Docker",
		"Figma",
		"Stripe",
		"SquareUp",
		"Strapi",
		"Axios",
	];

	return (
		<section className="about-section" id="About">
			<h1 className="about-title">
				About<span style={{ color: "#ffffff" }}>.</span>
			</h1>
			<div className="content-wrapper">
				<div className="about-text">
					<p>
						Frontend Developer with over 3 years of experience building responsive, 
						performant, and visually engaging web applications. Skilled in modern 
						JavaScript frameworks such as Vue, Angular, and React, with a strong 
						emphasis on user experience and seamless backend integration.
					</p>
					<p>
						Passionate about optimizing frontends for usability, performance, and 
						maintainability in cross-functional agile environments. Experienced in 
						leading development teams and implementing code reuse strategies that 
						reduce development time while improving user experience.
					</p>
				</div>
				<div className="tools-section">
					<div className="tools">
						<h1>Frontend Technologies</h1>
						<div>
							{frontend.map((tech, index) => (
								<span key={index}>{tech}</span>
							))}
						</div>
					</div>
					<div className="tools">
						<h1>Tools & Services</h1>
						<div>
							{tools.map((tool, index) => (
								<span key={index}>{tool}</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;

