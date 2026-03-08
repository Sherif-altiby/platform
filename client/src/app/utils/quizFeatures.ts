export const getQuiz = async (quizId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}teacher/get-quiz-by-id/${quizId}`,
    {
      credentials: "include", // ✅ sends cookies automatically
    }
  );

  if (!res.ok) throw new Error("Failed to fetch quiz");
  return res.json();
};