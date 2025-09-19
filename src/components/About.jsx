import headshot from '../assets/photo08.jpg';

function About(){
    return(
        <div>
            <h3>About Me</h3>
            <img src={headshot} alt="Ba Thinh Vuong headshot" style={{ width: 200, height: 200, objectFit: "cover", borderRadius: "50%", margin: "12px auto" }} />
            <p><strong>Name:</strong> Ba Thinh Vuong</p>
            <p>I’m a Toronto-based developer who enjoys building modern, responsive web apps and learning new technologies. I value clear communication, thoughtful UX, and code that’s easy to maintain.</p>
            <p>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download my resume (PDF)</a>
            </p>
        </div>
    )
}

export default About;
