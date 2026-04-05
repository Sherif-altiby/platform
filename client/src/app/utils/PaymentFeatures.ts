import { toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const PayWithVodafone = async (courseId: string, avatar: File) => {
  const formData = new FormData();
  formData.append("courseId", courseId);
  formData.append("avatar", avatar);  

  if(!courseId || !avatar){
    toast.error("Complete all data")
    return;
  }

  try {
    const response = await fetch(`${API}user/request-access-course`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "حدث خطأ أثناء إرسال الطلب");
    }
    toast.success("تم ارسال الطلب")
    return data.data;
  } catch (error: any) {
    console.error("Fetch Error:", error);

    throw error;
  }
};
