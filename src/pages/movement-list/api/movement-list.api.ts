import Axios from "axios";
import { Movement } from "./movement-list.api-model";

const url = `${import.meta.env.VITE_BASE_API_URL}/movements`;
export const getMovementList = (accountId: string): Promise<Movement[]> =>
Axios.get<Movement[]>(url, {params: {accountId}}).then(({ data }) => data);

