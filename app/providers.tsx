"use client";
import store from "@/redux/store";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { Provider } from "react-redux";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  // session: Session;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    // <SessionProvider session={session} refetchOnWindowFocus>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NextUIProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
      </Provider>
    </QueryClientProvider>
    // </SessionProvider>
  );
}
