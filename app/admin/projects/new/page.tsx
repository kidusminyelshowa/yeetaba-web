import React from 'react';
import ProjectForm from '../ProjectForm';

export default function NewProjectPage() {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Add New Project</h1>
          <p className="admin-page-desc">Create a new portfolio case study</p>
        </div>
      </div>

      <ProjectForm />
    </div>
  );
}
