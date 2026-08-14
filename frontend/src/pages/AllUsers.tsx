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
                          className="btn-tbl-save"
                          onClick={() => handleChangePassword(user.email)}
                        >
                          Change Password
                        </button>
                        <button
                          className="btn-tbl-delete"
                          onClick={() => handleRemoveUser(user.email)}
                        >
                          Remove
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