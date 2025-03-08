"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import store from "@/store";
import ProviderComponent from "./providerComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <Provider store={store}>
          <ProviderComponent>
            <Header />
            {children}
          </ProviderComponent>
        </Provider>
      </body>
    </html>
  );
}
