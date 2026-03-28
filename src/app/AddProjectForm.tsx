"use client";

import { useRef, useState } from "react";
import { addProject } from "./actions";

export default function AddProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addProject(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>Add New Project</h2>
      <form ref={formRef} action={handleSubmit} className="form-grid">
        <div className="form-group grid-span-all">
          <label htmlFor="name">Project Name</label>
          <input type="text" id="name" name="name" placeholder="e.g. Website Redesign" required />
          {error && <span style={{ color: "var(--danger)", fontSize: "0.8rem" }}>{error}</span>}
        </div>
        <div className="form-group grid-span-all">
          <label htmlFor="description">Description (Optional)</label>
          <input type="text" id="description" name="description" placeholder="Short summary of the project" />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue="PLANNED">
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority (1-5)</label>
          <input type="number" id="priority" name="priority" min="1" max="5" defaultValue="1" required />
        </div>
        <button type="submit" disabled={loading} className="grid-span-all">
          {loading ? "Adding..." : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Project
            </>
          )}
        </button>
      </form>
    </section>
  );
}
