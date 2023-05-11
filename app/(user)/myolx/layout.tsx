import TabsPage from "./TabsPage"

export default function MyOlxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <TabsPage />  
      {children}     
    </section>
  )
}