import "./globals.css";

export const metadata = {
  title: "Ethio Massage | Luxury House-to-House Massage in Addis Ababa",
  description:
    "Ethio Massage (ethiomassage) provides premium bet-le-bet and hotel massage therapy delivered directly to you in Addis Ababa, Ethiopia. Book your luxury wellness experience today.",
  keywords: ["ethiomassage", "ethio massage", "massage addis ababa", "massage ethiopia", "home massage addis ababa", "spa addis ababa", "luxury massage ethiopia", "bet le bet massage", "hotel massage addis"],
  openGraph: {
    title: "Ethio Massage | Luxury Massage in Addis Ababa",
    description: "Premium house-to-house massage therapy in Addis Ababa.",
    siteName: "Ethio Massage",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
