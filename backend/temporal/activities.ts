export async function saveProfileActivity(profileData: any): Promise<void> {
  console.log("👉 Sending to CrudCrud:", profileData);

  const url =
    "https://crudcrud.com/api/576b0737298a4e538dc7c0327ef74df4/profile";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  console.log("Saved to CrudCrud:", data);
}
