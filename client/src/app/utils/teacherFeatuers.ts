export const getTeachers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}user/get-teachers`);

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const getTeacherById = async (teacherId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}teacher/get-teacher/${teacherId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  });


  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

