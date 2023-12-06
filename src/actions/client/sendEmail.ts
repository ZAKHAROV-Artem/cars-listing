import axios from "axios";

type CustomEmailBody = {
  templateReferenceId: string;
  to: string;
  data: any;
};

export default async function sendEmail(body: CustomEmailBody) {
  return await axios.post<string>(
    `${process.env.NEXT_PUBLIC_API_URL}/custom-email`,
    body,
  );
}
