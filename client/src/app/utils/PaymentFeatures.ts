import { toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_SERVER_URL;

export const PayWithVodafone = async (courseId: string, teacherId: string,  avatar: File, method: "instaPay" | "vCash") => {
  const formData = new FormData();
  formData.append("courseId", courseId);
  formData.append("avatar", avatar);
  formData.append("method", method);
  formData.append("teacherId", teacherId);

  if (!courseId || !avatar) {
    toast.error("Complete all data");
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
    toast.success("تم ارسال الطلب");
    return data.data;
  } catch (error: any) {
    console.error("Fetch Error:", error);

    throw error;
  }
};

export const handlePayment = async (amount: number) => {
  try {
    const response = await fetch(`${API}payment/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ amount: amount }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Payment failed to initialize", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getPaymentInfo = async (courseId: string) => {
  try {
    const response = await fetch(`${API}payment/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
