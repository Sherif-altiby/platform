export const generateRegistrationEmail = (userName, verificationLink) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Platform</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            text-align: center;
          }
          .email-container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
          }
          .button {
            display: inline-block;
            background: #007bff;
            color: #ffffff !important;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h2>Welcome, ${userName}!</h2>
          <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
          <a href="${verificationLink}" class="button">Verify Email</a>
          <p>If you did not sign up, please ignore this email.</p>
          <div class="footer">© ${new Date().getFullYear()} BASIRA. All rights reserved.</div>
        </div>
      </body>
      </html>
    `;
  };
  