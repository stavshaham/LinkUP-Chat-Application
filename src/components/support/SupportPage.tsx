/**
 * SupportPage Component
 * 
 * A comprehensive support page that includes:
 * - Quick help resources
 * - Frequently Asked Questions (FAQ)
 * - Contact form for user inquiries
 * 
 * Features:
 * - Accordion-style FAQ section
 * - Interactive contact form with validation
 * - Responsive design for all screen sizes
 */

import './SupportPage.css';
import React, { useState } from 'react';

// Interface for form data
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Interface for FAQ items
interface FAQItem {
    question: string;
    answer: string;
}

const SupportPage: React.FC = () => {
    // State for form data
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // State for FAQ accordion
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // FAQ data
    const faqs: FAQItem[] = [
        {
            question: "How do I get started with LinkUP?",
            answer: "Getting started is easy! Simply click the 'Sign Up' button, create your account with your email, and you'll be ready to connect with others instantly."
        },
        {
            question: "Is LinkUP free to use?",
            answer: "Yes, LinkUP is completely free to use for personal messaging and basic features. We may introduce premium features in the future."
        },
        {
            question: "How secure is my data on LinkUP?",
            answer: "We take security seriously. All messages are encrypted, and we never share your personal information with third parties."
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can delete your account at any time from your account settings. All your data will be permanently removed from our servers."
        },
        {
            question: "How do I report inappropriate behavior?",
            answer: "You can report inappropriate behavior by clicking the 'Report' button in any chat or by contacting our support team through this page."
        }
    ];

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        // Show success message (you can implement this)
    };

    // Toggle FAQ accordion
    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="support-page">
            {/* Hero Section */}
            <section className="support-hero">
                <div className="hero-content">
                    <h1>How Can We Help?</h1>
                    <p>Find answers to common questions or get in touch with our support team.</p>
                </div>
            </section>

            <div className="support-container">
                {/* Quick Help Section */}
                <section className="quick-help">
                    <div className="help-cards">
                        <div className="help-card">
                            <i className="fas fa-book"></i>
                            <h3>Documentation</h3>
                            <p>Browse our detailed guides and tutorials</p>
                            <a href="/docs" className="help-link">View Docs</a>
                        </div>
                        <div className="help-card">
                            <i className="fas fa-video"></i>
                            <h3>Video Tutorials</h3>
                            <p>Watch step-by-step video guides</p>
                            <a href="/tutorials" className="help-link">Watch Now</a>
                        </div>
                        <div className="help-card">
                            <i className="fas fa-comments"></i>
                            <h3>Community</h3>
                            <p>Join our community forum</p>
                            <a href="/community" className="help-link">Join Discussion</a>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-container">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            >
                                <div 
                                    className="faq-question"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3>{faq.question}</h3>
                                    <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="contact-section">
                    <h2>Still Need Help?</h2>
                    <p>Send us a message and we'll get back to you as soon as possible.</p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Subject"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Your Message"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Send Message</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default SupportPage;