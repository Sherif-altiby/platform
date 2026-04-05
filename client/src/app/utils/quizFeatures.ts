export const getQuiz = async (quizId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}teacher/get-quiz-by-id/${quizId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch quiz");
    }

    const result = await res.json();
    return result
  } catch (error) {
    console.error("Error in getQuiz:", error);
    throw error;
  }
};
