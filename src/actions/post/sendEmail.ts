import { fetcher } from "@/lib/fetcher";

type CustomEmailBody = {
  templateReferenceId: string;
  to: string;
  data: any;
};

export default async function sendEmail(body: CustomEmailBody) {
  return await fetcher.post<string>(`/custom-email`, body);
}
