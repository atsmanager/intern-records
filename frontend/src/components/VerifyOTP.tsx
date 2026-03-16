import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const VITE_URL = import.meta.env.VITE_API_URL;

const VerifyPopUp = ({ email }: { email: string }) => {

    const [otp, setOtp] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        if (!otp) return alert("Annaya, enter the OTP first! 🤦‍♂️");

        setIsLoading(true); // Disable button to prevent spamming
        try {
            const response = await fetch(`${VITE_URL}/admin/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, otp })
            });

            // 2. Immediate exit if the response is bad
            if (!response.ok) {
                alert("Invalid OTP! Try again. ❌");
                setIsLoading(false);
                return;
            }

            const res = await response.json();

            // 3. Navigate only if verification is confirmed
            if (res.verified) {
                navigate('/reset-password', { state: { email } });
            } else {
                alert("OTP verification failed. 🤔");
            }
        } catch (e) {
            console.error(`Error at VerifyPopUp: ${e}`);
            alert("Something went wrong with the server! 🌐🔥");
        } finally {
            setIsLoading(false); // Re-enable button
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-800">Verify OTP 🛡️</h2>
                <p className="text-sm text-gray-600">Sent to: {email}</p>

                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleVerifyOtp}
                    disabled={isLoading}
                    className={`${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-medium px-4 py-2 rounded transition-colors`}
                >
                    {isLoading ? "Verifying..." : "Verify Now ✅"}
                </button>
            </div>
        </div>
    );
};

export default VerifyPopUp;