import { NavLink, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">Movies Hub Admin</div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className="admin-nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/movies" className="admin-nav-link">
            Movies
          </NavLink>
          <NavLink to="/admin/users" className="admin-nav-link">
            Users
          </NavLink>
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <h1 className="admin-title">Admin Panel</h1>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
