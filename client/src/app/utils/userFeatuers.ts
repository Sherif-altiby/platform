export const checkUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}user/check`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch user");
  localStorage.setItem("user-exist", JSON.stringify(true))
  return res.json();
};

export const getPlatformStatics = async () => {
  const res = await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}user/get-statics-num`)

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}