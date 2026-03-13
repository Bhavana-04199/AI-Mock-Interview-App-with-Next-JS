export const metadata = {
  title: "AI Interview",
  description: "Virtual AI Interview Practice",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
