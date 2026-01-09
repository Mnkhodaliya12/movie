function AdminDashboard() {
  return (
    <div className="admin-page">
      <h2 className="admin-page-title">Dashboard</h2>
      <div className="admin-grid">
        <section className="admin-card">
          <h3>Total Movies</h3>
          <p className="admin-metric">128</p>
          <p className="admin-muted">Static sample value</p>
        </section>
        <section className="admin-card">
          <h3>Active Users</h3>
          <p className="admin-metric">3,420</p>
          <p className="admin-muted">Static sample value</p>
        </section>
        <section className="admin-card">
          <h3>Favorites Added</h3>
          <p className="admin-metric">842</p>
          <p className="admin-muted">Static sample value</p>
        </section>
      </div>
      <div className="admin-grid admin-grid-wide">
        <section className="admin-card">
          <h3>Top Movies</h3>
          <ul className="admin-list">
            <li>Inception</li>
            <li>Interstellar</li>
            <li>The Dark Knight</li>
          </ul>
        </section>
        <section className="admin-card">
          <h3>Recent Activity</h3>
          <ul className="admin-list">
            <li>User John favorited "Inception"</li>
            <li>New user registered: "alice@example.com"</li>
            <li>Movie "Dune" added to catalog</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
