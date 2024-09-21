
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LandingPage from './LandingPage'
import ProductPage from './ProductPage'


export default function HomePage() {
  return (
    <div>
      <div className="w-full fixed top-0 z-50">
        <Navbar />
      </div>
      {/* Add top padding here to prevent content from being hidden */}
      <div className="pt-24"> {/* Adjust padding based on your Navbar height */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    </div>
  )
}
