import ListComponent from "./ListComponent";
import photo10 from '../assets/photo10.jpg';
import photo11 from '../assets/photo11.jpg';
import photo12gif from '../assets/photo12.gif';

const projects = [
    {
        title: "Trust Buy - Marketplace for Secondhand Goods",
        text: "A marketplace website where users can buy and sell secondhand items, similar to Facebook Marketplace. Built with React, this site offers product listings, search filters, and user authentication features.",
        imagePath: photo10,
        link: "http://studentweb.cencol.ca/bvuong8/TrustBuy/index.html#"
    },
    {
        title: "My Assignment Portfolio",
        text: "A collection of all the assignments I have completed throughout my studies. This site serves as a portfolio showcasing my work in various subjects and includes detailed descriptions and links to each project.",
        imagePath: photo11,
        link: "http://studentweb.cencol.ca/bvuong8/Assignment/Homepage/Index.html"
    },
    {
        title: "Real Estate Website - Property Listings",
        text: "A real estate website showcasing property listings for buying and selling homes. It features interactive maps, search filters, and detailed property pages, helping users find and explore real estate options.",
        imagePath: photo12gif,
        link: "http://studentweb.cencol.ca/bvuong8/Assignment/Term_Project/pages/home.html"
    }
];

function Projects() {
    return (
        <div className="projects-container">
            <h3>My Projects</h3>
            <div className="projects-list">
                {projects.map((project, index) => (
                    <div key={index} className="project-card">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <img src={project.imagePath} alt={project.title} className="project-image" />
                            <div className="project-info">
                                <h4>{project.title}</h4>
                                <p>{project.text}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;
