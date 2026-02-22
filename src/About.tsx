import "./CSS Files/about.css";

const skillCategories: { title: string; items: string[] }[] = [
	{
		title: "Frontend",
		items: ["Vue 2/3", "Nuxt.js", "React", "Next.js", "Angular", "Shopify"],
	},
	{
		title: "Programming languages",
		items: ["Javascript", "Typescript", "Liquid"],
	},
	{
		title: "State Management",
		items: ["Pinia", "Vuex", "React Context API"],
	},
	{
		title: "API integration",
		items: ["REST API integration", "GraphQL", "Axios", "React Context API"],
	},
	{
		title: "Styling & UI",
		items: ["Tailwind CSS", "Chakra UI", "Mantine UI", "Vuetify", "Bootstrap", "Next UI"],
	},
	{
		title: "UX/UI",
		items: ["Figma"],
	},
	{
		title: "Tools & Workflow",
		items: ["Git", "GitHub", "Docker", "Agile"],
	},
	{
		title: "Soft Skills",
		items: ["Communication", "Team Collaboration", "Time Management", "Problem Solving", "Adaptability"],
	},
	{
		title: "Core Strengths",
		items: ["Reusable UI patterns", "Modular project structuring"],
	},
	{
		title: "Languages",
		items: ["English Pre-Intermediate", "Spanish Native"],
	},
];

function About() {
	return (
		<section className="about-section" id="About">
			<h1 className="about-title">
				About<span style={{ color: "#ffffff" }}>.</span>
			</h1>
			<div className="content-wrapper">
				<div className="about-text">
					<p>
						Frontend Developer with over 3 years of experience building responsive and 
						maintainable web applications using Vue, React, and Next.js. Experienced in 
						integrating REST and GraphQL APIs, managing application state with Pinia, 
						Vuex, and Context API, and developing reusable component-based interfaces.
					</p>
					<p>
						I have worked on ecommerce platforms, internal management systems, and 
						government websites, focusing on improving usability, optimizing workflows, 
						and maintaining scalable code structures. Comfortable collaborating with 
						backend teams to ensure reliable API integration and consistent data handling.
					</p>
					<p>
						Focused on clean code, performance optimization, and delivering practical 
						solutions that improve user experience and development efficiency.
					</p>
				</div>
				<div className="tools-section">
					{skillCategories.map((category, catIndex) => (
						<div className="tools" key={catIndex}>
							<h1>{category.title}</h1>
							<div>
								{category.items.map((item, index) => (
									<span key={index}>{item}</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default About;

