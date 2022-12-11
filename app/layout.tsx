import "./globals.css"

export default function RootLayout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <html>
      <head title={title} />
      <body>{children}</body>
    </html>
  )
}
