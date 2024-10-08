/* eslint-disable import/order */
"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./user.provider";
import { Provider } from "react-redux";

import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <NextUIProvider navigate={router.push}>
              <Toaster />
              <NextThemesProvider {...themeProps}>
                {children}
              </NextThemesProvider>
            </NextUIProvider>
          </UserProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
