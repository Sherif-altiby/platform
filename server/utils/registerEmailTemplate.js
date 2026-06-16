export const generateRegistrationEmail = (userName, verificationLink) => {
  return `
  <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08); direction:rtl; text-align:right; font-family:Arial, sans-serif;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4f46e5,#2563eb); padding:30px; text-align:center;">
      <h1 style="color:#fff; margin:0; font-size:22px;">
        مرحبًا بك في منصة العبقري 🎓
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:30px; color:#111827;">

      <h2 style="margin-bottom:10px; font-size:20px;">
        أهلاً، <span style="color:#2563eb;">${userName}</span> 👋
      </h2>

      <p style="color:#6b7280; font-size:14px; line-height:1.8;">
        شكرًا لانضمامك إلى منصتنا. نحن سعداء بوجودك معنا ❤️
        
      </p>

      <!-- Info Box -->
      <div style="
        background:#f1f5f9;
        padding:14px;
        border-radius:10px;
        font-size:13px;
        color:#475569;
        line-height:1.8;
        margin-top:20px;
      ">
        ⚠️ إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذا البريد بأمان.
      </div>

   

    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; text-align:center; padding:16px; font-size:12px; color:#9ca3af;">
      © ${new Date().getFullYear()} منصة العبقري. جميع الحقوق محفوظة.
    </div>

  </div>
  `;
};