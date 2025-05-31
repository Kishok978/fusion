import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import {Button, Layout} from "antd";
import Header from "./components/Header.jsx";
import ContentSection from "./components/ContentSection.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout className="layout">
        <Header />
        <ContentSection />
    </Layout>
  )
}

export default App
