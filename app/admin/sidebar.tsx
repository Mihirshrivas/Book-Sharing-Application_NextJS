"use client"

import { Link } from "react-router-dom"
// ... existing imports ...

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/books">Books</Link>
        </li>
        {/* Communities Section Removed */}
        {/* <li>
          <Link to="/admin/communities">Communities</Link>
        </li> */}
        {/* Analytics Section Removed */}
        {/* <li>
          <Link to="/admin/analytics">Analytics</Link>
        </li> */}
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  )
} 