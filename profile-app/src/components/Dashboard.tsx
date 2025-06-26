import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

interface ExtraProfile {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  pincode: string;
}

export const Dashboard = () => {
  const location = useLocation();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ExtraProfile>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 User Dashboard</h2>

      {user ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            maxWidth: "400px",
          }}
        >
          <img
            src={user.picture || "https://i.pravatar.cc/100"}
            alt="Profile"
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{ marginTop: "10px", padding: "8px 12px" }}
          >
            {showForm ? "Cancel" : "Edit Profile"}
          </button>

          {showForm && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Submitted Data:", formData);

                axios.post("http://localhost:8080/edit-profile", formData);
                alert("Form Submitted!");
              }}
              style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
              />

              <button
                type="submit"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "10px",
                }}
              >
                Save
              </button>
            </form>
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};
