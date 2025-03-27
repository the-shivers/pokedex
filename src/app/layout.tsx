import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  variable: '--font-VT323',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "FrameSet Pokémon API Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
