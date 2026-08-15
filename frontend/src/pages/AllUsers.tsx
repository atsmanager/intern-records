import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  try {
    useEffect(() => {
      const func = async (): Promise<void> => {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${VITE_API_URL}/admin/get-users`, {
          method: "GET",
          credentials: "include",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) throw new Error("Error while fetching users");
        const data = await response.json();
        setUsers(data);
      };
      func();
    }, []);
  } catch (e) {
    console.log(`Error : ${e}`);
  }

  const handleChangePassword = (email: string) => {
    navigate('/update-password', { state: { email } });
  };

  const handleRemoveUser = async (email: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${VITE_API_URL}/admin/remove-user/${email}`, {
        method: "DELETE",
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      setUsers(users.filter((user) => user.email !== email));
      toast.success(data.message);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Failed to remove user");
    }
  };

  return (
    <div className="users-page">
      <div className="users-page-header">
        <h1 className="users-page-title">All Users</h1>
        <button
          className="btn-nav-primary"
          onClick={() => navigate('/create-user')}
        >
          + Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "#ffffff" }}>
          <p style={{ fontSize: "18px", marginBottom: "16px" }}>No users found</p>
        </div>
      ) : (
        <div className="panel">
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>
                      <span style={{
                        background: user.company ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                        border: user.company ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontSize: "12px",
                        color: user.company ? "#a5b4fc" : "#888",
                        fontWeight: 600,
                      }}>
                        {user.company || "—"}
                      </span>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <div className="tbl-actions">
                        <button
                          className="btn-tbl-save btn-user-action change-pw"
                          onClick={() => handleChangePassword(user.email)}
                          title="Change Password"
                        >
                          <span className="user-btn-text">Change Password</span>
                          <svg className="user-btn-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                        </button>
                        <button
                          className="btn-tbl-delete btn-user-action remove-user"
                          onClick={() => handleRemoveUser(user.email)}
                          title="Remove User"
                        >
                          <span className="user-btn-text">Remove</span>
                          <svg className="user-btn-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;