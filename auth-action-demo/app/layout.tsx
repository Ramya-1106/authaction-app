import "./globals.css";
import SessionWrapper from "./sessionwrapper";

export const metadata = {
  title: "AuthAction App",
  description: "Demo for custom Auth provider with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
