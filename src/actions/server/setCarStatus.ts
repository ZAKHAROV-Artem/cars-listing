import { Status } from "@/types/api/car";
import axios from "axios";

export default async function setCarStatus(id: number, status: Status) {
  return await axios.put(`${process.env.API_URL}/cars/${id}`, {
    data: {
      status,
    },
  });
}
