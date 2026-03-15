import api from "./axios"; // adjust path if needed

export const verifyLogin = async (
  email: string,
  password: string
): Promise<any> => {
  const res = await api.post("/admin/login", { email, password });
  return res.data;
};
