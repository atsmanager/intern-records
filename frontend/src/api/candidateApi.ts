import api from "./axios.ts";
import type {
  CandidateListResponse,
  CandidatePayload,
  UpdateCandidateResponse,
} from "../types/candidate";
import type { MessageResponse } from "../types/candidate";

export const candidateAddApi = async (
  data: CandidatePayload
): Promise<MessageResponse> => {
  const res = await api.post(`/candidate/add`, data);
  return res.data;
};

export const candidateGetApi = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  jobPostedFrom?: string,
  jobPostedTo?: string
): Promise<CandidateListResponse> => {
  const res = await api.get(`/candidate`, {
    params: { page, limit, search, jobPostedFrom, jobPostedTo },
  });
  return res.data;
};

export const candidateGetRejectedApi = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  jobPostedFrom?: string,
  jobPostedTo?: string
): Promise<CandidateListResponse> => {
  const res = await api.get(`/candidate/rejected`, {
    params: { page, limit, search, jobPostedFrom, jobPostedTo },
  });
  return res.data;
};

export const candidateDeleteApi = async (
  id: string
): Promise<MessageResponse> => {
  const res = await api.delete(`/candidate/${id}`);
  return res.data;
};

export const candidateEditApi = async (
  id: string,
  data: CandidatePayload
): Promise<UpdateCandidateResponse> => {
  const res = await api.put(`/candidate/${id}`, data);
  return res.data;
};

export const uploadExcelApi = async (data: FormData) => {
  const res = await api.post(`/candidate/upload-excel`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
