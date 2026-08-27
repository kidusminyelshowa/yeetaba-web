import React from 'react';
import ServiceForm from '../ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Add New Service</h1>
          <p className="admin-page-desc">Create a new core service offering</p>
        </div>
      </div>

      <ServiceForm />
    </div>
  );
}
