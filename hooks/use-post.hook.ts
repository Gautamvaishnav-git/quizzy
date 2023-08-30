"use client";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export interface UsePostProps<ResT, Payload> {
  config?: AxiosRequestConfig;
  endPoint: string;
  options?: UseMutationOptions<AxiosResponse<ResT>, unknown, Payload, unknown>;
}

export const usePost = <ResT = unknown, Payload = unknown, TError = unknown>(props: UsePostProps<ResT, Payload>) => {
  const { config, endPoint, options } = props;
  const response = useMutation<AxiosResponse<ResT>, TError, Payload, unknown>({
    mutationFn: async (payload) => {
      const response = await axios.post<ResT>(endPoint, payload, {
        ...config,
      });
      return response;
    },
    ...options,
  });
  return response;
};
