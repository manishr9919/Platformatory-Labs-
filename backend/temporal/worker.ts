import { workflowSaveProfile } from "./workflows";

async function runWorker() {
  console.log("Manual worker started; ready to process workflows");
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Export function to use in backend
export { workflowSaveProfile };
