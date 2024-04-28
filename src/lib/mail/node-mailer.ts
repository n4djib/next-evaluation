import nodemailer from "nodemailer";

type MailProps = {
  to: string;
  subject: string;
  body: string;
};

export async function sendMail({ to, subject, body }: MailProps) {
  const { SMTP_EMAIL, APP_NAME, SMTP_PASS } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASS,
    },
  });

  // try {
  //   const testResult = await transport.verify();
  // } catch (error) {
  //   console.log({ error });
  // }

  var mailOptions = {
    from: `${APP_NAME} <${SMTP_EMAIL}>`,
    to,
    subject,
    html: body,
  };

  try {
    const sendResult = await transport.sendMail(mailOptions);
    return sendResult;
  } catch (error) {
    console.log({ error });
  }
}
