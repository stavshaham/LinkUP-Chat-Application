/**
 * Footer Component
 * 
 * A modern, responsive footer component that includes:
 * - Company information and branding
 * - Quick links for navigation
 * - Social media links
 * - Contact information
 * 
 * The footer is divided into multiple sections for better organization
 * and uses Font Awesome icons for social media links.
 */

import './Footer.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component function
 * 
 * Returns the JSX for the footer component
 */
const Footer: React.FC = () => {
    // Get the current year for the copyright notice
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Company Information Section */}
            <div className="footer-content">
                <div className="footer-section">
                    <h3>LinkUP</h3>
                    <p>Connect, Share, and Engage with your community in real-time.</p>
                    <div className="social-links">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/support">Support</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Information Section */}
                <div className="footer-section">
                    <h3>Contact</h3>
                    <ul>
                        <li><i className="fas fa-envelope"></i> support@linkup.com</li>
                        <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                        <li><i className="fas fa-map-marker-alt"></i> San Francisco, CA</li>
                    </ul>
                </div>
            </div>

            {/* Copyright Notice */}
            <div className="footer-bottom">
                <p>&copy; {currentYear} LinkUP. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
