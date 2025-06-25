import "./globals.css";

export const metadata = {
  title: "Expense Tracker",
  description: "Manage Your Expenses here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
