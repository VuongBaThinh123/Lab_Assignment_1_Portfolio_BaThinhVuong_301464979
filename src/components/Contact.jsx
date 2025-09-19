import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact(){
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Capture the info (here, store to localStorage for demo purposes)
        const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
        submissions.push({ ...form, submittedAt: new Date().toISOString() });
        localStorage.setItem("contactSubmissions", JSON.stringify(submissions));
        localStorage.setItem("contactMessage", "Thanks for your message! I’ll get back to you soon.");
        // Redirect back to Home
        navigate("/");
    };

    return (
        <div>
            <h3>Contact Me</h3>
            <div className="contact-panel">
                <p><strong>Email:</strong> <a href="mailto:bathinh1211@gmail.com">bathinh1211@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+16477846642">647&nbsp;784&nbsp;6642</a></p>
                <p><strong>Name:</strong> Ba Thinh Vuong</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row2">
                    <label>First Name
                        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
                    </label>
                    <label>Last Name
                        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
                    </label>
                </div>
                <div className="row2">
                    <label>Contact Number
                        <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
                    </label>
                    <label>Email Address
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </label>
                </div>
                <label>Message
                    <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
                </label>
                <button type="submit" className="btn">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;
