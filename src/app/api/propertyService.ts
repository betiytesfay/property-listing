import apiClient from "./apiClient"
import { Property } from "../../types/propertyTypes"
export const getProperties = async (): Promise<Property[]> => {
  const response = await apiClient.get<Property[]>("properties")
  return response.data
}
export const getPropertyById = async (id: number) => {
  const response = await apiClient.get(`properties/${id}`)
  return response.data
}