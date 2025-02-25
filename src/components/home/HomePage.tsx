/**
 * HomePage Component
 * 
 * The main landing page of the LinkUP application featuring:
 * - Hero section with call-to-action
 * - Features showcase
 * - How it works guide
 * - Call-to-action section
 * 
 * The component uses modern design patterns and is fully responsive.
 */

import './HomePage.css';
import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage functional component
 * 
 * Returns the JSX for the HomePage component
 */
const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            {/* Hero Section */}
            /**
             * Hero section of the HomePage component
             * 
             * Features a heading, paragraph, and call-to-action buttons
             */
            <section className="hero">
                <div className="hero-content">
                    <h1>Connect & Chat in Real-Time</h1>
                    <p>Experience seamless communication with LinkUP's modern messaging platform</p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                        <Link to="/about" className="btn btn-secondary">Learn More</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/images/hero-chat.svg" alt="Chat Illustration" />
                </div>
            </section>

            {/* Features Section */}
            {/* /**
             * Features section of the HomePage component
             * 
             * Showcases the key features of the LinkUP application
             */}
            <section className="features">
                <h2>Why Choose LinkUP?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="fas fa-lock"></i>
                        <h3>Secure Messaging</h3>
                        <p>End-to-end encryption for your privacy</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-bolt"></i>
                        <h3>Real-Time Chat</h3>
                        <p>Instant message delivery and updates</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-users"></i>
                        <h3>Group Chats</h3>
                        <p>Create and manage group conversations</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-mobile-alt"></i>
                        <h3>Mobile Friendly</h3>
                        <p>Chat from any device, anywhere</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            {/* /**
             * How it works section of the HomePage component
             * 
             * Provides a step-by-step guide on how to use the LinkUP application
             */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Sign Up</h3>
                        <p>Create your account in seconds</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Connect</h3>
                        <p>Find friends and start conversations</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Chat</h3>
                        <p>Enjoy real-time messaging</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* /**
             * Call-to-action section of the HomePage component
             * 
             * Encourages users to sign up for the LinkUP application
              */}
            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of users already connecting on LinkUP</p>
                    <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
