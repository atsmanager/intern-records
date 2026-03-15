import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}
const VITE_API_URL = import.meta.env.VITE_API_URL

const UserTable: React.FC = () => {
    const navigate = useNavigate();
    const [users,setUsers] = useState<User[]>([])
    

    try{
        useEffect(() => {
            const func =  async ():Promise<void> => {
                const response = await fetch(`${VITE_API_URL}/admin/get-users`,{
                    "method":"GET",
                    credentials: "include",
                })

                if(!response.ok){
                    throw new Error("Error while fetching users")
                }
                const data = await response.json();
                setUsers(data);
            }
            func();
        },[])
    }catch(e){
        console.log(`Error : ${e}`);
    }

  
  const handleChangePassword = (email:string) => {
    navigate('/update-password',{state:{email}});
  };

  const handleRemoveUser = async (email:string) => {
    try{
      const response = await fetch(`${VITE_API_URL}/admin/remove-user/${email}`,{
        method:"DELETE",
        credentials: "include"
      })

      const data = await response.json();

      setUsers(users.filter((user) => user.email !== email));
      alert(data.message);


    }catch(e){
      console.log(`${e}`);
    }
  } 


  const addUsersBtn = <button 

        className='p-2 hover:bg-blue-400 bg-blue-600 rounded-2xl text-white shadow-2xl' 
        onClick={() => navigate('/create-user')}
      >
        Add users
      </button>


  if(users.length===0){
    return (
    <div> 
      <h1 className='m-40 font-semibold'>No users found</h1>
      {addUsersBtn}
    </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      <h2 style={{ color: '#2c3e50' }}>All users</h2>
      {addUsersBtn}
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '', textAlign: 'left' }}>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>
                <button 
                  onClick={() => handleChangePassword(user.email)}
                  style={buttonStyle}
                >
                  Change Password 
                </button>

                <button 
                  onClick={() => handleRemoveUser(user.email)}
                  className='p-2 hover:bg-red-400 bg-red-600 rounded-sm text-white shadow-2xl m-2'
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const cellStyle: React.CSSProperties = {
  padding: '12px',
  textAlign:'center',
  border: '1px solid #ddd'
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default UserTable;