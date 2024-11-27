import type { Metadata } from "next";
import "@/public/css/bootstrap.min.css";
import "@/public/fonts/font-icons.css";
import "@/public/fonts/fonts.css";
import "@/public/css/swiper-bundle.min.css";
import "@/public/css/animate.css";
import "@/public/css/styles.css";
import { DM_Sans, Josefin_Sans } from "next/font/google";

const dm = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--dm",
  display: "swap",
});
const josefin = Josefin_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OmRent - Booking & Rent Website",
  description:
    "OmRent is a Marketplace where you can find the perfect house for you and make Reservation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm.variable} ${josefin.variable} body`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
