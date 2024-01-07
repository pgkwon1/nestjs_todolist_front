import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  const queryClient = new QueryClient();
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
