// src/MainRouter.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";

// Admin components
import UsersList from "./components/admin/UsersList";
import UserForm from "./components/admin/UserForm";
import ProjectsAdminList from "./components/admin/ProjectsAdminList";
import ProjectForm from "./components/admin/ProjectForm";
import ServicesAdminList from "./components/admin/ServicesAdminList";
import ServiceForm from "./components/admin/ServiceForm";
import ContactsAdminList from "./components/admin/ContactsAdminList";
import ContactForm from "./components/admin/ContactForm";
import Login from "./components/admin/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function MainRouter() {
  return (
    <div>
      <Layout />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/users/new" element={<UserForm />} />
          <Route path="/admin/users/:id" element={<UserForm />} />

          <Route path="/admin/projects" element={<ProjectsAdminList />} />
          <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route path="/admin/projects/:id" element={<ProjectForm />} />

          <Route path="/admin/services" element={<ServicesAdminList />} />
          <Route path="/admin/services/new" element={<ServiceForm />} />
          <Route path="/admin/services/:id" element={<ServiceForm />} />

          <Route path="/admin/contacts" element={<ContactsAdminList />} />
          <Route path="/admin/contacts/new" element={<ContactForm />} />
          <Route path="/admin/contacts/:id" element={<ContactForm />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
