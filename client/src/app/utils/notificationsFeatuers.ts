const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchNotifications = async () => {
  const res = await fetch(`${API}notifications`, {
    credentials: "include",
  });

  return res.json();
};

export const deleteNotification = async (id: string) => {
  const res = await fetch(`${API}notifications/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return res.json();
};