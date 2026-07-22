import { Cairo } from "next/font/google";
import { Red_Hat_Display } from "next/font/google";

export const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

export const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-red-hat-display",
  display: "swap",
});

