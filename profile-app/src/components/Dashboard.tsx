
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

export const Dashboard = () => {
  const location = useLocation();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 User Dashboard</h2>
      {user ? (
        <div style={{ border: "1px solid #ccc", padding: "20px", maxWidth: "400px" }}>
          <img src={user.picture} alt="Profile" style={{ width: "100px", borderRadius: "50%" }} />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};
