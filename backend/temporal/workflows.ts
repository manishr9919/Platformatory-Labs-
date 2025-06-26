import { saveProfileActivity } from "./activities";

export async function workflowSaveProfile(profileData: any): Promise<void> {
  console.log("Workflow started:", profileData);
  // Simulate 10-second delay
  await new Promise((resolve) => setTimeout(resolve, 10_000));
  console.log("Delay finished, calling activity...");
  await saveProfileActivity(profileData);
  console.log("Workflow complete");
}
