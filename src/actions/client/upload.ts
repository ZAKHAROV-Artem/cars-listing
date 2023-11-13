import { fetcher } from "@/lib/api-client";
import { MediaPlain } from "@/types/api/media";

export default async function upload({ formData,setProgress }: { formData: FormData;setProgress?:(progress:number)=>void }) {
  return await fetcher.post<MediaPlain[]>(`/upload`, formData, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_UPLOAD_API_TOKEN}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const progress =
        (progressEvent.loaded / (progressEvent?.total || 1)) * 50;
        setProgress&& setProgress(progress);
    },
    onDownloadProgress: (progressEvent) => {
      const progress =
        50 + (progressEvent.loaded / (progressEvent?.total || 1)) * 50;
      console.log(progress);
      setProgress&&setProgress(progress);
    },
  });
}
