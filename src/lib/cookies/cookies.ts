import { parseCookies, setCookie, destroyCookie } from "nookies";
import { GetServerSidePropsContext, NextPageContext } from "next";

export const saveCookie = (cookieName: string, cookieValue: string) => {
  const cookies = parseCookies();

  setCookie(null, cookieName, cookieValue, {
    maxAge: 1 * 24 * 60 * 60,
    path: "/",
  });
};

export const removeCookiesInRoom = () => {
  destroyCookie(null, "secretId", { path: "/" });
  destroyCookie(null, "userId", { path: "/" });
};

export const receiveCookies = (
  ctx?: NextPageContext | GetServerSidePropsContext
) => {
  const cookies = parseCookies(ctx);
  return cookies;
};

export const saveCookiesInRoom = (secretId: string, userId: number) => {
  saveCookie("secretId", secretId);
  saveCookie("userId", String(userId));
};
