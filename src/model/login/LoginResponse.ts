import { BaseResponse } from "../BaseResponse";

export interface LoginResponse extends BaseResponse<AuthResponse> {}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
