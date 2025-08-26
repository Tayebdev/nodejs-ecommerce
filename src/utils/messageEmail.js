exports.htmlMessageResetCode = (name, resetCode) => {
  return `
  <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="text-align: center; padding-bottom: 20px;">
      <h2 style="color: #4CAF50; margin-bottom: 10px;">🔐 Password Reset Request</h2>
      <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
    </div>

    <p style="font-size: 15px; line-height: 1.6;">
      We received a request to reset the password for your <strong>E-shop</strong> account.
      Please use the verification code below to reset your password. This code is valid for <strong>10 minutes</strong>.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; background-color: #4CAF50; color: white; padding: 14px 30px; font-size: 24px; letter-spacing: 4px; border-radius: 8px; font-weight: bold;">
        ${resetCode}
      </span>
    </div>

    <p style="font-size: 15px; line-height: 1.6;">
      If you didn't request this, please ignore this email. Your account is still secure.
    </p>

    <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; font-size: 14px; color: #888;">
      <p>Need help? Contact us at <a href="mailto:ttayeb769@gmail.com" style="color: #4CAF50;">ttayeb769@gmail.com</a></p>
      <p>Thanks for using <strong>E-shop</strong>!</p>
    </div>
  </div>
`;
};

exports.htmlMessageverifyEmail = (firstName, lastName, resetCode) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trendify Email Preview</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f0f4ff 0%, #e8f2ff 100%);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
        }
        .preview-container {
            max-width: 800px;
            margin: 0 auto;
        }
        .preview-header {
            text-align: center;
            margin-bottom: 30px;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .email-container {
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-radius: 16px;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="preview-container">   
        <div class="email-container">
            <div style="max-width: 600px; margin: auto; padding: 0; background: linear-gradient(135deg, #0857A0 0%, #0a6bc2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(8, 87, 160, 0.3);">
                
                <!-- Header Section with Logo -->
                <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                    <div style="display: inline-flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 15px 25px; margin-bottom: 20px;">
                        <svg width="40" height="40" viewBox="0 0 100 100" style="margin-right: 15px;">
                            <rect width="35" height="45" x="15" y="35" fill="white" rx="4"/>
                            <rect width="35" height="45" x="50" y="35" fill="white" rx="4"/>
                            <circle cx="25" cy="20" r="8" fill="none" stroke="white" stroke-width="3"/>
                            <circle cx="75" cy="20" r="8" fill="none" stroke="white" stroke-width="3"/>
                            <circle cx="27" cy="50" r="2" fill="#0857A0"/>
                            <circle cx="73" cy="50" r="2" fill="#0857A0"/>
                            <path d="M35 65 Q50 75 65 65" stroke="#0857A0" stroke-width="3" fill="none"/>
                        </svg>
                        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px;">Trendify</h1>
                    </div>
                    <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Welcome to Trendify!</h2>
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">Verify your email to get started</p>
                </div>

                <!-- Main Content -->
                <div style="background: white; padding: 40px 30px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h3 style="color: #0857A0; margin: 0 0 15px 0; font-size: 22px; font-weight: 600;">Hi ${firstName} ${lastName}!</h3>
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0;">
                            Thank you for signing up with <strong style="color: #0857A0;">Trendify</strong>. To complete your registration and start exploring the latest trends, please verify your email address using the code below.
                        </p>
                    </div>

                    <!-- Verification Code Section -->
                    <div style="background: linear-gradient(135deg, #f8fbff 0%, #e8f4ff 100%); border: 2px dashed #0857A0; border-radius: 16px; padding: 30px; text-align: center; margin: 30px 0; position: relative;">
                        <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: white; padding: 0 15px;">
                            <span style="color: #0857A0; font-size: 14px; font-weight: 600;">VERIFICATION CODE</span>
                        </div>
                        <p style="color: #0857A0; font-size: 14px; margin: 0 0 15px 0; font-weight: 500;">Enter this code in the app:</p>
                        <div style="display: inline-block; background: linear-gradient(135deg, #0857A0 0%, #0a6bc2 100%); color: white; padding: 20px 40px; font-size: 32px; letter-spacing: 8px; border-radius: 12px; font-weight: 700; font-family: 'Courier New', monospace; box-shadow: 0 8px 20px rgba(8, 87, 160, 0.3); transform: perspective(1000px) rotateX(5deg);">
                            ${resetCode}
                        </div>
                    </div>

                    <!-- Security Notice -->
                    <div style="background: #fff8f0; border: 1px solid #ffd43b; border-radius: 8px; padding: 15px; margin: 25px 0;">
                        <p style="color: #856404; font-size: 14px; margin: 0; line-height: 1.5;">
                            🔐 <strong>Security Note:</strong> If you didn't create a Trendify account, please ignore this email. Your information is safe with us.
                        </p>
                    </div>
                <!-- Footer -->
                <div style="background: #f8f9ff; padding: 25px 30px; text-align: center; border-top: 1px solid #e6ecf0;">
                    <p style="color: #888; font-size: 14px; margin: 0 0 10px 0;">
                        Need help? Contact our support team at 
                        <a href="mailto:support@trendify.com" style="color: #0857A0; text-decoration: none; font-weight: 600;">support@trendify.com</a>
                    </p>
                    <div style="margin: 15px 0;">
                        <a href="#" style="display: inline-block; margin: 0 10px; color: #0857A0; text-decoration: none; font-size: 12px;">Privacy Policy</a>
                        <span style="color: #ddd;">|</span>
                        <a href="#" style="display: inline-block; margin: 0 10px; color: #0857A0; text-decoration: none; font-size: 12px;">Terms of Service</a>
                        <span style="color: #ddd;">|</span>
                        <a href="#" style="display: inline-block; margin: 0 10px; color: #0857A0; text-decoration: none; font-size: 12px;">Help Center</a>
                    </div>
                    <p style="color: #aaa; font-size: 12px; margin: 15px 0 0 0;">
                        © 2024 Trendify. All rights reserved.<br>
                        Making trends accessible to everyone. 🌟
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};
