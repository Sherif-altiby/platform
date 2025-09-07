export const getSubjects = async () => {
  const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}user/get-subjects`)

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}