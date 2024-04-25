import nodemailer from "nodemailer";
import { getCurrentTime } from "../utils";

type MailProps = {
  to: string;
  subject: string;
  body: string;
};

export async function sendMail({ to, subject, body }: MailProps) {
  const { SMTP_EMAIL, SMTP_NAME, SMTP_PASS } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });

  // try {
  //   const testResult = await transport.verify();
  //   // console.log("--Test result of transport", testResult);
  // } catch (error) {
  //   console.log({ error });
  // }

  var mailOptions = {
    from: `${SMTP_NAME} <${SMTP_EMAIL}>`,
    to,
    subject,
    html: body,
  };

  try {
    const sendResult = await transport.sendMail(mailOptions);
    // console.log("--send---", sendResult.accepted);
    return sendResult;
  } catch (error) {
    console.log({ error });
  }
}
