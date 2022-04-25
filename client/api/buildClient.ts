import axios, { AxiosRequestHeaders } from "axios";
import { NextPageContext } from "next";

export const buildClient = (ctx: NextPageContext) => {
  const { req } = ctx;
  if (typeof window === "undefined") {
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers as AxiosRequestHeaders,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};
