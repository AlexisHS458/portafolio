import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./CSS Files/ScrollToTop.css";

const SCROLL_THRESHOLD = 400;

function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!visible) return null;

	return (
		<button
			type="button"
			className="scroll-to-top"
			onClick={scrollToTop}
			aria-label="Volver arriba"
		>
			<FontAwesomeIcon icon={faArrowUp} />
		</button>
	);
}

export default ScrollToTop;
