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

export const confirmCookiesInRoom = () => {
  const cookies = parseCookies();
  const userId = cookies.userId ?? null;
  const secretId = cookies.secretId ?? null;

  return {
    userId: userId as string | null,
    secretId: secretId as string | null,
  };
};
