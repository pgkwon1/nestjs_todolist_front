import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import axios, { AxiosError } from "axios";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  const router = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 120,
        cacheTime: 1000 * 120,
      },
    },
  });

  useEffect(() => {
    const isCheck = sessionStorage.getItem("check");
    //토큰 만료여부 최초 접속 1회만 체크
    if (isCheck === "1") {
      axios.get("/check").catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          sessionStorage.setItem("check", "1");
          //호출 위치가 redux provider 이전이라 redux를 사용할 수 없어 따로 페이지 이동.
          router.push("/member/logout");
        }
      });
    }
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
