import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Services(){
    return(
        <div>
            <h3>Services</h3>
            <div className="grid">
                <div className="card">
                    <img src={reactLogo} alt="Web development" />
                    <h4>Web Development</h4>
                    <p>Modern, responsive sites and apps using React and best practices.</p>
                </div>
                <div className="card">
                    <img src={viteLogo} alt="Frontend engineering" />
                    <h4>Frontend Engineering</h4>
                    <p>Clean components, state management, routing, and accessibility.</p>
                </div>
                <div className="card">
                    <img src={reactLogo} alt="General programming" />
                    <h4>General Programming</h4>
                    <p>Problem solving, automation scripts, and pragmatic tooling.</p>
                </div>
            </div>
        </div>
    )
}

export default Services;
