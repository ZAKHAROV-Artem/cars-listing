import axios from "axios";

export default async function incrementVisits(id: number, visits: number) {
  return await axios.put(`${process.env.API_URL}/cars/${id}`, {
    data: {
      visits: Number(visits) + 1,
    },
  });
}
