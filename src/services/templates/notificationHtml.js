export default function (email, message) {
return `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Notification</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333; margin: 0; padding: 0; }
      .container { width: 100%; max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 20px; }
      h2 { color: #2c7a7b; margin-bottom: 20px; }
      p { font-size: 16px; line-height: 1.5; }
      .highlight { font-weight: bold; color: #d53f8c; }
      .footer { margin-top: 30px; font-size: 12px; color: #888; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Notification</h2>
      <p>Dear <span class="highlight">${email}</span>,</p>
      <p>${message}</p>
      <div class="footer">
        You are receiving this email because you have subscribed to notifications.
      </div>
    </div>
  </body>
  </html>
`;
}
