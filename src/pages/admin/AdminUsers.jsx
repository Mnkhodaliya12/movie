const STATIC_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Alice Smith', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Lee', email: 'bob@example.com', role: 'Viewer', status: 'Suspended' },
];

function AdminUsers() {
  return (
    <div className="admin-page">
      <h2 className="admin-page-title">Users</h2>
      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {STATIC_USERS.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`admin-badge admin-badge-${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="admin-link-button">View</button>
                  <button className="admin-link-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
