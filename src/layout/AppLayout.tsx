export default function AppLayout({ header, footer, children }) {
	return (
		<div>
    <header>{header}</header>
    <main>{children}</main>
    <footer>{footer}</footer>
  </div>
	)
}