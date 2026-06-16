const forgotPasswordTemplate = ({ name, code }) => {
    return `
    <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:30px;">
      
      <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background:linear-gradient(135deg,#4f46e5,#2563eb); padding:24px; text-align:center;">
          <h2 style="color:white; margin:0; font-size:20px;">
            منصة العبقري التعليمية
          </h2>
        </div>
  
        <!-- Body -->
        <div style="padding:30px; color:#111827;">
          
          <p style="font-size:16px; margin-bottom:10px;">
            مرحبًا <b>${name}</b> 👋
          </p>
  
          <p style="font-size:14px; color:#4b5563; line-height:1.6;">
            تم طلب إعادة تعيين كلمة المرور لحسابك. استخدم كود التحقق التالي لإكمال العملية.
          </p>
  
          <!-- OTP Box -->
          <div style="margin:30px 0; text-align:center;">
            <div style="
              display:inline-block;
              background:#f1f5f9;
              padding:16px 30px;
              font-size:28px;
              letter-spacing:6px;
              font-weight:bold;
              border-radius:12px;
              color:#111827;
              border:1px dashed #cbd5e1;
            ">
              ${code}
            </div>
          </div>
  
          <!-- Warning -->
          <div style="
            background:#fff7ed;
            border:1px solid #fed7aa;
            padding:12px 16px;
            border-radius:10px;
            font-size:13px;
            color:#9a3412;
          ">
            ⏳ هذا الكود صالح لمدة <b>ساعة واحدة فقط</b>. لا تشاركه مع أي شخص.
          </div>
  
  
          <p style="margin-top:30px; font-size:14px;">
            شكرًا لك،<br/>
            <b>فريق منصة العبقري</b>
          </p>
  
        </div>
  
        <!-- Footer -->
        <div style="text-align:center; padding:16px; font-size:12px; color:#9ca3af; background:#f9fafb;">
          © ${new Date().getFullYear()} Al3bkary. All rights reserved.
        </div>
  
      </div>
    </div>
    `;
  };
  
  export default forgotPasswordTemplate;