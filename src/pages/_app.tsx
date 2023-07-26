import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white w-full">
      <div className="w-full h-screen max-w-md mx-auto overflow-x-hidden relative">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </div>
  );
}
