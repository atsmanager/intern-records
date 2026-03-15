import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
const VITE_API_URL = import.meta.env.VITE_API_URL
const UpdatePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [email,setEmail] = useState<string>(location.state? location.state.email:"");
    const [password,setPassword] = useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');

    const HandleUpdatePassword  = async (e:React.FormEvent) => {
        e.preventDefault();

        if(password.length===0){
            alert('Enter a valid password');
            return;
        }
        if(confirmPassword !== password){
            alert('Password does not match');
            return;
        }
        const response = await fetch(`${VITE_API_URL}/admin/update-password`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                },
                credentials: "include",
                body: JSON.stringify({email,password})
            }
        );

        if(response.ok){
            alert("updated passwords successfully")
            navigate('/')
        }

        


    }
    return (
        <div style={styles.container}>
      
      <div style={styles.card}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update password</h2>
        <form >
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              
              required
            />
          </div>
            <button 
            type="submit" 
            style={{
              ...styles.button,
              backgroundColor:  '#007bff',
              cursor:  'pointer'
            }}

            onClick={HandleUpdatePassword}
            
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width:'50vw',
    backgroundColor: '#f0f2f5',
    borderRadius: '10px',
  },
  card: {
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    width: '100%',
    maxWidth: '400px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '10px',
  },
  errorBox: {
    color: '#d9534f',
    backgroundColor: '#fdeded',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  }
};


export default UpdatePassword