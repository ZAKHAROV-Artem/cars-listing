import axios from "axios";

export default async function setCarFatuted(id: number, featured: boolean) {
  return await axios.put(`${process.env.API_URL}/cars/${id}`, {
    data: {
      featured,
    },
  });
}
