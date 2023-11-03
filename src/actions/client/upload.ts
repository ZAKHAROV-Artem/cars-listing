import { fetcher } from "@/lib/api-client";
import { MediaPlain } from "@/types/api/media";

export default async function upload({ formData }: { formData: FormData }) {
  return await fetcher.post<MediaPlain[]>(`/upload`, formData, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UPLOAD_API_TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
