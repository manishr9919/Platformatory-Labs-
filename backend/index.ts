import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import { workflowSaveProfile } from "./temporal/workflows";

app.use(cors());
app.use(express.json());

app.post(
  "/verify-token",
  async (req: Request, res: Response): Promise<void> => {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ success: false, message: "Token is required" });
      return;
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      res.status(200).json({
        success: true,
        user: {
          name: payload?.name,
          email: payload?.email,
          picture: payload?.picture,
        },
      });
    } catch (error) {
      res.status(401).json({ success: false, message: "Invalid token", error });
    }
  }
);

app.post("/edit-profile", async (req, res) => {
  const profileData = req.body;
  console.log(req.body);
  workflowSaveProfile(profileData); // async; don't await
  res.json({
    message: "Workflow started. Profile will be saved in ~10 seconds.",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
