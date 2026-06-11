package com.secure.notes.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String resetUrl) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("🛡️ Action Required: Secure Notes Account Recovery");

            // Note: The 100% in the header linear-gradient is now safely escaped as 100%%
            String htmlContent = """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 0; color: #1e293b; }
                        .wrapper { background-color: #f8fafc; padding: 40px 20px; }
                        .email-container { max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05); overflow: hidden; border: 1px solid #e2e8f0; }
                        .header { background-image: linear-gradient(135deg, #0f172a 0, #1e293b 100%%); padding: 35px; text-align: center; border-bottom: 4px solid #3b82f6; }
                        .logo { font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; margin: 0; display: inline-flex; align-items: center; }
                        .logo span { color: #3b82f6; margin-right: 6px; }
                        .quote-box { margin: 25px 35px 5px 35px; padding: 18px 24px; background-color: #f1f5f9; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; font-style: italic; color: #475569; font-size: 14px; line-height: 1.5; }
                        .quote-author { display: block; font-size: 12px; font-weight: 600; color: #64748b; margin-top: 6px; font-style: normal; text-transform: uppercase; letter-spacing: 0.5px; }
                        .content { padding: 30px 35px; line-height: 1.6; }
                        .content h1 { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px; }
                        .content p { font-size: 15px; margin-bottom: 24px; color: #334155; }
                        .btn-container { text-align: center; margin: 35px 0; }
                        .btn { background-color: #3b82f6; color: #ffffff !important; padding: 14px 36px; text-decoration: none; font-weight: 600; border-radius: 8px; display: inline-block; font-size: 15px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25); transition: background-color 0.2s; }
                        .notice-banner { font-size: 13px; color: #64748b; background-color: #fffbeb; padding: 14px; border: 1px solid #fef3c7; border-left: 4px solid #d97706; border-radius: 6px; margin-top: 30px; line-height: 1.5; }
                        .footer { background-color: #fafafa; padding: 25px 35px; border-top: 1px solid #f1f5f9; font-size: 13px; color: #64748b; }
                        .signature { margin-top: 12px; font-weight: 600; color: #0f172a; font-size: 14px; }
                        .footer-text { margin-top: 15px; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <div class="email-container">
                            <div class="header">
                                <div class="logo">🔑 Secure Notes</div>
                            </div>
                            
                            <div class="quote-box">
                                "Security is a process, not a product."
                                <span class="quote-author">— Bruce Schneier, Cryptographer</span>
                            </div>
                            
                            <div class="content">
                                <h1>Account Recovery Requested</h1>
                                <p>We received an authorization request to reset the password linked to your profile. Your active dashboard credentials and notes remain fully secure and unchanged.</p>
                                <p>To proceed and configure a new cryptographic password for your vault, click the token link below:</p>
                                
                                <div class="btn-container">
                                    <a href="%s" class="btn">Reset Vault Password</a>
                                </div>
                                
                                <div class="notice-banner">
                                    <strong>Important Security Notice:</strong> This link is temporary and unique to this system process. If you did not execute this request, no action is required—your encrypted records cannot be accessed without explicit confirmation.
                                </div>
                            </div>
                            
                            <div class="footer">
                                Best regards,
                                <div class="signature">Secure Notes Developer M S Nawin</div>
                                <div class="footer-text">
                                    This is an automated operational transmission from your local deployment database ecosystem.
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(resetUrl);

            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            throw new RuntimeException("Fatal Error: Failed to build and transmit HTML reset email to " + to, e);
        }
    }
}