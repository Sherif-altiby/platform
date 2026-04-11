const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const getSubjects = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}user/get-subjects`,
  );

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const getSubjectDetails = async (subId: string) => {
  try {
    const res = await fetch(`${API}user/get-subject-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subId }),
      credentials: "include",
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getTeacherSubjects = async (teacherId: string) => {
  try {
    const res = await fetch(`${API}user/get-teacher-subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId }),
      credentials: "include",
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getSubjectCourses = async (
  teacherId: string,
  subjectId: string,
) => {
  try {
    const res = await fetch(`${API}user/teacher-subject-courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId, subjectId }),
      credentials: "include",
    });

    const data = await res.json();

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseLessons = async (courseId: string) => {
  try {
    const response = await fetch(`${API}user/course-lessons/${courseId}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    return result.data;
  } catch (error) {
    throw error;
  }
};
