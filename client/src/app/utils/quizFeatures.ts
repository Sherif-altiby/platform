export const getQuiz = async (quizId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}teacher/get-quiz-by-id/${quizId}`);

  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};