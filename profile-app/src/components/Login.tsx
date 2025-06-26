import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;

    try {
      const res = await axios.post("http://localhost:8080/verify-token", {
        token,
      });

      console.log("✅ Verified user:", res.data.user);
      alert("Login successful!");
      navigate("/dashboard", { state: { user: res.data.user } });
    } catch (error) {
      console.error("❌ Verification failed", error);
      alert("Token verification failed");
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => alert("Login failed")}
      />
    </div>
  );
};
