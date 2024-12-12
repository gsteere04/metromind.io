import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './styling/HomePage.css';

const HomePage: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="homepage-container">
            <section className="hero-section" data-aos="fade-up">
                <div className="hero-content">
                    <h1>MetroMind</h1>
                    <p className="tagline">Shape Tomorrow's Cities Today</p>
                    <p className="hero-description">
                        An intuitive 3D city planning simulator that brings your urban visions to life.
                    </p>
                    <Link to="/simulation" className="cta-button">
                        Start Building
                        <span className="button-arrow">→</span>
                    </Link>
                </div>
                <div className="feature-cards">
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                        <div className="card-icon">🏗️</div>
                        <h3>Build</h3>
                        <p>Create residential, commercial, and governmental zones</p>
                    </div>
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                        <div className="card-icon">🛣️</div>
                        <h3>Connect</h3>
                        <p>Design efficient road networks and infrastructure</p>
                    </div>
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                        <div className="card-icon">🌆</div>
                        <h3>Grow</h3>
                        <p>Watch your city evolve in real-time 3D</p>
                    </div>
                </div>
            </section>

            <section className="showcase-section" data-aos="fade-up">
                <h2>Powerful Tools at Your Fingertips</h2>
                <div className="showcase-grid">
                    <div className="showcase-item" data-aos="fade-right">
                        <div className="showcase-icon">🏘️</div>
                        <h3>Residential Zones</h3>
                        <p>Create thriving neighborhoods for your citizens</p>
                    </div>
                    <div className="showcase-item" data-aos="fade-left">
                        <div className="showcase-icon">🏢</div>
                        <h3>Commercial Districts</h3>
                        <p>Build bustling business centers</p>
                    </div>
                    <div className="showcase-item" data-aos="fade-right">
                        <div className="showcase-icon">🏛️</div>
                        <h3>Government Facilities</h3>
                        <p>Establish essential public services</p>
                    </div>
                    <div className="showcase-item" data-aos="fade-left">
                        <div className="showcase-icon">🚗</div>
                        <h3>Road Networks</h3>
                        <p>Design efficient transportation systems</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works-section" data-aos="fade-up">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step" data-aos="fade-up" data-aos-delay="100">
                        <div className="step-number">1</div>
                        <h3>Choose Your Tools</h3>
                        <p>Select from various building types and infrastructure options</p>
                    </div>
                    <div className="step" data-aos="fade-up" data-aos-delay="200">
                        <div className="step-number">2</div>
                        <h3>Place and Build</h3>
                        <p>Click to place buildings and roads in your desired locations</p>
                    </div>
                    <div className="step" data-aos="fade-up" data-aos-delay="300">
                        <div className="step-number">3</div>
                        <h3>Watch It Grow</h3>
                        <p>See your city come to life in real-time 3D visualization</p>
                    </div>
                </div>
            </section>

            <section className="cta-section" data-aos="fade-up">
                <h2>Ready to Build Your City?</h2>
                <p>Start creating your urban masterpiece today</p>
                <Link to="/simulation" className="cta-button">
                    Launch Simulator
                    <span className="button-arrow">→</span>
                </Link>
            </section>

            <footer className="homepage-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>MetroMind</h3>
                        <p>Building better cities, one click at a time</p>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>info@metromind.io</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a href="#" className="social-link">Twitter</a>
                            <a href="#" className="social-link">GitHub</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 MetroMind. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;