/**
 * AboutPage Component
 * 
 * A personal portfolio page for a Computer Information Systems student developer featuring:
 * - Hero section with personal introduction
 * - Developer profile section
 * - Project vision and goals
 * - Technical skills showcase
 * - Contact information
 * 
 * The component uses modern design patterns and animations for an engaging user experience.
 */

import './AboutPage.css';
import * as React from 'react';

/**
 * AboutPage component function
 * 
 * Returns the JSX for the AboutPage component
 */
const AboutPage: React.FC = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About LinkUP</h1>
                    <p>A passion project born from the desire to connect people seamlessly.</p>
                </div>
            </section>

            {/* Developer Section */}
            <section className="about-section developer-section">
                <div className="section-content">
                    <h2>The Developer</h2>
                    <div className="developer-profile">
                        <div className="developer-photo">
                            <img src="/images/developer-photo.jpg" alt="Developer" />
                        </div>
                        <div className="developer-info">
                            <h3>Computer Information Systems Student</h3>
                            <p>Hi! I'm a passionate developer currently pursuing my degree in Computer Information Systems. 
                            LinkUP represents my journey in web development and my commitment to creating meaningful 
                            social connections through technology.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Vision */}
            <section className="about-section vision-section">
                <div className="section-content">
                    <h2>Project Vision</h2>
                    <div className="vision-grid">
                        <div className="vision-card">
                            <i className="fas fa-graduation-cap"></i>
                            <h3>Academic Project</h3>
                            <p>Built as part of my journey in Computer Information Systems, applying classroom knowledge to real-world development.</p>
                        </div>
                        <div className="vision-card">
                            <i className="fas fa-code"></i>
                            <h3>Modern Tech Stack</h3>
                            <p>Developed using React, Spring Boot, and modern web technologies to create a robust messaging platform.</p>
                        </div>
                        <div className="vision-card">
                            <i className="fas fa-users"></i>
                            <h3>User-Focused</h3>
                            <p>Designed with user experience in mind, making communication simple and enjoyable.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="about-section skills-section">
                <div className="section-content">
                    <h2>Technical Skills</h2>
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React.js</li>
                                <li>TypeScript</li>
                                <li>HTML5 & CSS3</li>
                                <li>Responsive Design</li>
                            </ul>
                        </div>
                        <div className="skill-category">
                            <h3>Backend</h3>
                            <ul>
                                <li>Java</li>
                                <li>Spring Boot</li>
                                <li>RESTful APIs</li>
                                <li>MySQL</li>
                            </ul>
                        </div>
                        <div className="skill-category">
                            <h3>Tools & Methods</h3>
                            <ul>
                                <li>Git & GitHub</li>
                                <li>Agile Development</li>
                                <li>System Design</li>
                                <li>Problem Solving</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="about-section contact-section">
                <div className="section-content">
                    <h2>Let's Connect</h2>
                    <p>Interested in collaborating or learning more about LinkUP?</p>
                    <div className="social-links">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="mailto:your.email@example.com">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

/**
 * Export the AboutPage component
 */
export default AboutPage;