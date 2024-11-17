import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function Projects() {
	const fadeIn = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const projects = [
		{
			title: 'Flight Computer',
			description:
				'An SRAD flight computer system delivering real-time telemetry, reliable data logging, and advanced flight control to optimize rocket performance.',
			image: '/images/no-image.jpg',
			link: 'https://github.com/PSP-Spaceport-Avionics/Flight-Computer',
		},
		{
			title: 'Airbrake System',
			description:
				'An airbrake system designed to provide controlled ascent to accurately slow the rocket down to 10,000 feet.',
			image: '/images/no-image.jpg',
			link: 'https://github.com/PSP-Spaceport-Avionics/Dragster',
		},
		{
			title: 'Ground Station',
			description:
				'A ground station with a user-friendly interface for real-time telemetry monitoring, data visualization, and seamless flight analysis.',
			image: '/images/no-image.jpg',
			link: 'https://github.com/PSP-Spaceport-Avionics/Ground-Station',
		},
	];

	return (
		<motion.section
			id='projects'
			className='bg-white text-gray-800 py-16 px-6 md:px-12 lg:px-16'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
			variants={fadeIn}
			transition={{ duration: 0.8 }}>
			<div className='max-w-6xl mx-auto'>
				{/* Heading Section */}
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					variants={fadeIn}
					transition={{ duration: 0.8 }}>
					<div className='text-left mb-12'>
						<h2
							className='text-6xl font-extrabold mb-6'
							style={{ color: '#18141c' }}>
							Projects
						</h2>
						<p
							className='text-xl leading-relaxed max-w-full'
							style={{ color: '#4c4c4c' }}>
							Explore our current projects, ranging from our SRAD
							flight computer to our custom ground station.
						</p>
					</div>
				</motion.div>

				{/* Projects Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
					{projects.map((project, index) => (
						<motion.a
							key={index}
							href={project.link}
							target='_blank'
							rel='noopener noreferrer'
							className='block rounded-lg overflow-hidden shadow-md bg-white border-l-4 border-[#fbc02d] transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg'
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
							variants={fadeIn}
							transition={{
								duration: 0.6,
								delay: index * 0.2, // Stagger the animation
							}}>
							{/* Project Image */}
							<div className='relative w-full h-60'>
								<Image
									src={project.image}
									alt={project.title}
									className='object-cover w-full h-full'
									fill
								/>
							</div>
							{/* Project Info */}
							<div
								className='p-6 flex flex-col'
								style={{
									minHeight: '200px',
									overflow: 'hidden',
								}}>
								<h3
									className='text-2xl font-bold mb-4'
									style={{
										color: '#18141c',
									}}>
									{project.title}
								</h3>
								<p
									className='text-lg leading-relaxed mb-4 flex-grow'
									style={{
										color: '#4c4c4c',
									}}>
									{project.description}
								</p>
							</div>
						</motion.a>
					))}
				</div>
			</div>
		</motion.section>
	);
}

export default Projects;
