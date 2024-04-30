import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './AppRoutes'
import AppLayout from './layout/AppLayout'
import TopBar from './components/TopBar'

function App() {
  // const [count, setCount] = useState(0)

  return (
		<div className="w-full h-full">
		{/* Possible global layout or providers */}

		<AppLayout
			header={<TopBar />}
			footer={<div>footer</div>}
		>
			<AppRoutes />
		</AppLayout>
	</div>
  )
}

export default App
