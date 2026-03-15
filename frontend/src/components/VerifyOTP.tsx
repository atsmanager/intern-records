import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VITE_URL = import.meta.env.VITE_API_URL
const VerifyPopUp = ({email}: {email:string}) => {
    
    const [otp,setOtp] = useState<string>();
    const navigate = useNavigate();
    const handleVerifyOtp = async () => {
        try{
            const response = await fetch(`${VITE_URL}/admin/verify-otp`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email,otp})

            });
            
            if(!response.ok){
                alert("Invalid OTP")
            }
            const res  = await response.json();

            if(res.verified){
                navigate('/reset-password',{state:({email})})
            }
        }catch(e){
            console.log(`Error while working at verifyPopUp componenet ${e}`)
        }
    }

    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded">
                <h2 className="text-lg font-semibold mb-2">Verify OTP</h2>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mb-2"
                />
                <button
                onClick={handleVerifyOtp}
                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Verify
                </button>
            </div>
        </div>
    );
}

export default VerifyPopUp