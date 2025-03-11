import * as SibApiV3Sdk from '@getbrevo/brevo';
import { NextResponse } from 'next/server';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

// CSS styles for email
const styles = `
  :root {
    --background: #ffffff;
    --text: #333333;
    --border: #eaeaea;
    --accent: #2d81ff;
    --card-bg: #f7f7f7;
    --highlight: #f1f5f9;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text);
    background-color: var(--background);
    margin: 0;
    padding: 0;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    background-color: var(--card-bg);
  }
  
  .header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 8px;
  }
  
  .creator-card {
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .creator-name {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .creator-detail {
    color: var(--text);
    opacity: 0.8;
  }
`;

export async function POST(request: Request) {
  try {
    const { brandName, brandEmail, selectedCreators } = await request.json();

    const creatorsListHtml = selectedCreators.map((creator: any) => `
      <div class="creator-card">
        <div class="creator-name">${creator.name}</div>
        <div class="creator-detail">
          <strong>Price Range:</strong> ${creator.price_range}
        </div>
        ${creator.niches ? `
        <div class="creator-detail">
          <strong>Niches:</strong> ${creator.niches.map((n: any) => n.name).join(', ')}
        </div>
        ` : ''}
      </div>
    `).join('');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${styles}</style>
        </head>
        <body>
          <div class="container">
              <h2>Welcome aboard, ${brandName}! 🎉</h2>
            </div>
            
            ${creatorsListHtml}
            
          
            
            <hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;">
            
            
          </div>
        </body>
      </html>
    `;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `Welcome to FlowFluence, ${brandName}!`;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { name: "FlowFluence", email: "yashpawar0161@gmail.com" };
    sendSmtpEmail.to = [{ email: "Alex@stride-social.com" }, { email:"yashpawar0161@gmail.com"}];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}