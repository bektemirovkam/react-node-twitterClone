import mailer from "../core/mailer";
import SendmailTransport from "nodemailer/lib/sendmail-transport";

interface SendMailConfig {
  emailParams: {
    emailFrom: string;
    emailTo: string;
    subject: string;
    html: string;
  };
  callback?: (error: Error | null, info: SendmailTransport) => void;
}

export const sendEmail = (sendEmailConfig: SendMailConfig) =>
  mailer.sendMail(
    {
      from: sendEmailConfig.emailParams.emailFrom,
      to: sendEmailConfig.emailParams.emailTo,
      subject: sendEmailConfig.emailParams.subject,
      html: sendEmailConfig.emailParams.html,
    },
    sendEmailConfig.callback ||
      function (error: Error | null, info: SendmailTransport) {
        if (error) {
          console.error(error);
        } else {
          console.log(info);
        }
      }
  );
