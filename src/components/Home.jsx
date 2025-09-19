import { Link } from "react-router-dom";

function Home(){
    // Read any thank-you message stored by the Contact form
    const message = localStorage.getItem("contactMessage");
    if (message) {
        setTimeout(() => {
            // Clear after showing once
            localStorage.removeItem("contactMessage");
        }, 0);
    }

    return(
        <div>
            <h2>Welcome!</h2>
            <p>Hi, I’m <strong>Ba Thinh Vuong</strong> — a developer focused on clean, accessible, and performant web experiences.</p>
            <p><em>Mission:</em> Build simple, reliable software that solves real problems.</p>

            {message && <div className="notice">{message}</div>}

            <div style={{ marginTop: 24 }}>
                <Link className="btn" to="/about">About Me</Link>
                <span style={{ margin: "0 8px" }} />
                <Link className="btn" to="/projects">View Projects</Link>
            </div>
        </div>
    )
}

export default Home;
