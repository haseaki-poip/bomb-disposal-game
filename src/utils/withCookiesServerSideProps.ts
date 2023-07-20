import { CustomError } from "@/lib/error";
import { confirmRoom } from "@/lib/firebase/db/roomControl";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import nookies from "nookies";

type WithOuterContext = GetServerSidePropsContext;
type WithInnerContext = WithOuterContext & {};
type WithInnerPageProps = {};
export type WithOuterPageProps = WithInnerPageProps & {};

export const withCookiesServerSideProps =
  <P extends { [key: string]: any } = {}>(
    innerServerSidePropsFunc: () => ReturnType<
      GetServerSideProps<P & WithInnerPageProps>
    >
  ): ((
    context: WithOuterContext
  ) => ReturnType<GetServerSideProps<P & WithOuterPageProps>>) =>
  async (context) => {
    const cookies = nookies.get(context);
    const secretId = cookies.secretId;
    const userId = cookies.userId;

    const roomId = context.params?.roomId as string | undefined;

    if (!secretId || !userId || !roomId) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // cookiesをもとにroomに参加できる資格があるのか確認
    try {
      const roomStatus = await confirmRoom(roomId, secretId);
      if (roomStatus == "finish") {
        throw new CustomError("すでにルームは終了しています");
      }
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const additionalProps = {
      userId: userId,
    };

    const serverSideProps = await innerServerSidePropsFunc();

    if (!("props" in serverSideProps)) return serverSideProps;

    return {
      props: {
        ...serverSideProps.props,
        ...additionalProps,
      },
    };
  };
