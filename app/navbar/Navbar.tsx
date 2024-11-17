import React, { useState, useEffect } from 'react';
import NavBarButton from './NavbarButton';
import NavbarLogo from './NavbarLogo';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';

const buttons = [
	{ href: 'overview', label: 'Overview' },
	{ href: 'projects', label: 'Projects' },
];

function Navbar() {
	const [showNavBar, setShowNavbar] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isNavBarLoaded, setIsNavBarLoaded] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const controlNavbar = () => {
		if (window.scrollY > lastScrollY) {
			setShowNavbar(false);
		} else {
			setShowNavbar(true);
		}
		setLastScrollY(window.scrollY);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	useEffect(() => {
		const navbarElement = document.querySelector('.navbar');
		if (navbarElement instanceof HTMLElement) {
			setIsNavBarLoaded(true);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);

	useEffect(() => {
		if (isDropdownOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}, [isDropdownOpen]);

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		href: string
	) => {
		e.preventDefault();
		const targetElement = document.getElementById(href);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
		setIsDropdownOpen(false);
	};

	return (
		<nav
			className={`navbar items-center justify-center ${
				showNavBar ? 'show' : 'hide'
			} ${isNavBarLoaded ? 'loaded' : ''}`}>
			<NavbarLogo />
			<div className='dropdown'>
				<button
					className='dropdown-toggle'
					onClick={toggleDropdown}>
					<MenuIcon fontSize='large' />
				</button>
				{isDropdownOpen && (
					<div className='dropdown-menu'>
						{buttons.map((button) => (
							<a
								key={button.href}
								href={`#${button.href}`}
								onClick={(e) => handleNavClick(e, button.href)}>
								<NavBarButton>{button.label}</NavBarButton>
							</a>
						))}
					</div>
				)}
			</div>
			<div className='desktop-links'>
				{buttons.map((button) => (
					<a
						key={button.href}
						href={`#${button.href}`}
						onClick={(e) => handleNavClick(e, button.href)}>
						<NavBarButton>{button.label}</NavBarButton>
					</a>
				))}
			</div>
		</nav>
	);
}

export default Navbar;
