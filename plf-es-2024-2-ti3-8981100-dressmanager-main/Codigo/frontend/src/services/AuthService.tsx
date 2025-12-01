import { handleError } from "@/Helpers/ErrorHandler";
import { UserProfileToken } from "@/Models/User";
import axios from "axios";
import urlApi from "../../urlService";

const api =  `${urlApi}/login`

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api, {
        email: email,
        password: password
    });

    return data;
  } catch (error) {
    handleError(error)
  }
};