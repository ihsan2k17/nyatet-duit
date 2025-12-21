import type { Metadata } from "next";
import { Dancing_Script, Geist, Geist_Mono, Pacifico, Ubuntu } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu ({
  weight: "400",
  variable: "--font-ubuntu",
  subsets:["latin"],
});

const pacifico= Pacifico ({
  weight:"400",
  variable: "--font-pacifico",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script ({
  variable:"--font-dancing-script",
  subsets:["latin"],
});


export const metadata: Metadata = {
  title: "Nyatet-Duit",
  description: "Generated Nyatet Duit",
  icons:{
    icon:"/paper-plane-freepik.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable}
          ${ubuntu.variable}
          ${pacifico.variable}
          ${dancingScript.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
