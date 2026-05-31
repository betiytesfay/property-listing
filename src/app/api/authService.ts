import apiClient from "./apiClient"
import { LoginPayload } from "../../types/authTypes"
import { Property } from "../../types/propertyTypes"
export const loginUser = async (data: LoginPayload) => {
  const response = await apiClient.post("/login", data)
  return response.data
}
