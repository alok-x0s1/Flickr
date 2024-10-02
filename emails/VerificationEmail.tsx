export const verificationTemplate = ({ username, otp }: { username: string, otp: string }) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                background-color: #f6f9fc;
                font-family: Arial, sans-serif;
                padding: 20px;
                margin: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .heading {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 20px;
                text-align: center;
            }
            .text {
                font-size: 16px;
                color: #333333;
                margin: 10px 0;
            }
            .otp {
                font-size: 18px;
                color: #FF6347;
            }
            .footer {
                font-size: 12px;
                color: #777777;
                margin-top: 30px;
                border-top: 1px solid #dddddd;
                padding-top: 10px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="heading">Email Verification</h1>
            <p class="text">Hello, ${username}!</p>
            <p class="text">
                Your OTP code for verification is: <strong class="otp">${otp}</strong>
            </p>
            <p class="text">
                Please enter this code in the application to complete your registration.
            </p>
            <p class="text">Thank you for joining us!</p>
            <p class="footer">
                If you did not request this email, please ignore it.
            </p>
        </div>
    </body>
    </html>`;
};
