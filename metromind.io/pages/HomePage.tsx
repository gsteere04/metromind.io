import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';


const HomePage: React.FC = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, [])
    return (
        <div className="homepage-container">
            <section className="hero-section" data-aos="fade-up">
                <h1>Urban Planning Simulator</h1>
                <p>Design your city with ease and creativity!</p>
                <Link to="/simulation" className="cta-button">Start Simulator</Link>
            </section>

            <section className="showcase-section" data-aos="fade-up">
                <h2>Showcase</h2>
                <div className="showcase-content">
                    <div className="showcase-description">
                        <h3>Explore the Future of Urban Planning</h3>
                        <p>Our simulator allows you to visualize and design urban spaces with real-time feedback.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works-section" data-aos="fade-up">
                <h2>How It Works</h2>
                <ol>
                    <li>Choose your building types.</li>
                    <li>Design your layout.</li>
                    <li>Visualize in 3D.</li>
                </ol>
            </section>

            <section className="features-section" data-aos="fade-up">
                <h2>Key Features</h2>
                <ul>
                    <li>Real-time 3D visualization</li>
                    <li>User-friendly interface</li>
                    <li>Customizable building options</li>
                    <li>Interactive design tools</li>
                </ul>
            </section>

            <section className="testimonials-section" data-aos="fade-up">
                <h2>User Feedback</h2>
                <blockquote>
                    <p>"This simulator has transformed the way I approach urban design!"</p>
                    <footer>- Happy User</footer>
                </blockquote>
            </section>

            <footer className="homepage-footer" data-aos="fade-up">
                <p>Follow us on social media!</p>
                <p>Contact: info@urbanplanning.com</p>
            </footer>
        </div>
    );
};

export default HomePage;