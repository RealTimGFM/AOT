import "./globals.css";

export const metadata = {
  title: "Activists Of Tomorrow",
  description: "A community-driven social platform for social and environmental justice."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
