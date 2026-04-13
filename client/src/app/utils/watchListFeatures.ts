const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const updateWatchHistoryApi = async ({
  userId,
  teacherId,
  courseId,
  lessonId,
}: {
  userId: string;
  teacherId: string;
  courseId: string;
  lessonId: string;
}) => {
  const response = await fetch(`${API}user/watch-list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userId, teacherId, courseId, lessonId }),
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update watch history");
  }

  return data.data;
};

export const getWatchHistoryApi = async () => {
  const response = await fetch(`${API}user/watch-list`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update watch history");
  }

  return data.data;
};

export const getWatchQuizzesHistoryApi = async () => {
  const response = await fetch(`${API}user/watch-quiz`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update watch history");
  }

  return data.data;
};

export const updateNoteWatchHistoryApi = async ({
  noteId,
  teacherId,
  courseId,
}: {
  noteId: string;
  teacherId: string;
  courseId: string;
}) => {
  const response = await fetch(`${API}user/watch-note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ noteId, teacherId, courseId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update watch history");
  }

  return data.data;
};

export const getNoteWatchHistoryApi = async () => {
  const response = await fetch(`${API}user/watch-note`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update watch history");
  }

  return data.data;
};
