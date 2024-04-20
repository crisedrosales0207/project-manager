import "./globals.css";

export const metadata = {
  title: "Project Manager",
  description: "a project manager app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
