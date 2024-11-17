import React, { useState, useEffect } from 'react';
import NavBarButton from './NavbarButton';
import NavbarLogo from './NavbarLogo';
import './Navbar.css';
import MenuIcon from '@mui/icons-material/Menu';

const buttons = [
	{ href: 'overview', label: 'Overview' },
	//{ href: 'history', label: 'History' },
	{ href: 'projects', label: 'Projects' },
	//{ href: 'contact', label: 'Contact' },
];

function Navbar() {
	const [showNavBar, setShowNavbar] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isNavBarLoaded, setIsNavBarLiaded] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileView, setIsMobileView] = useState(false);

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

	const updateView = () => {
		setIsMobileView(window.innerWidth <= 768);
		if (window.innerWidth > 768) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		const navbarElement = document.querySelector('.navbar');

		if (navbarElement instanceof HTMLElement) {
			setIsNavBarLiaded(true);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);
		window.addEventListener('resize', updateView);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
			window.removeEventListener('resize', updateView);
		};
	}, [lastScrollY]);
	useEffect(() => {
		if (isDropdownOpen) {
			document.body.classList.add('no-scroll');
			document.documentElement.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
			document.documentElement.classList.remove('no-scroll');
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
			{isMobileView ? (
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
									onClick={(e) =>
										handleNavClick(e, button.href)
									}>
									<NavBarButton>{button.label}</NavBarButton>
								</a>
							))}
						</div>
					)}
				</div>
			) : (
				<div className='space-x-4'>
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
		</nav>
	);
}

export default Navbar;
