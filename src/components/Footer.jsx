import React from 'react'
import '../css/Footer.css'

const Footer = () => {
	return (
		<footer>
			<div className="authors">
				<a
					href="https://www.linkedin.com/in/romulo-henri/"
					target="_blank"
					rel="noopener noreferrer"
					className="authors font-light text-white opacity-70 hover:opacity-100 hover:text-white transition-all hover:underline"
				>
					Desenvolvido por Rômulo Henri (2023)
				</a>
			</div>
		</footer>
	)
}

export default Footer
