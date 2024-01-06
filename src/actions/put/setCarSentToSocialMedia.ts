import { fetcherAuth } from "@/lib/fetcher";

export default async function setCarSentToSocialMedia({
  id,
  sentToSocialMedia,
}: {
  id: number;
  sentToSocialMedia: boolean;
}) {
  return await fetcherAuth.put(`/cars/${id}`, {
    data: {
      sentToSocialMedia,
    },
  });
}
