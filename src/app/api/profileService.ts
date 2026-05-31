import apiClient from "./apiClient"
export const getProfile = async () => {
  const response = await apiClient.get("/profile")
  return response.data
}