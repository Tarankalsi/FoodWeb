
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>

    </>
  )
}

export default App
