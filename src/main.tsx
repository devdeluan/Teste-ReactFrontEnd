import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'


// import App from './App'
import './index.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ListaEmpresas from './pages/ListaEmpresas'
import CadastroEmpresa from './pages/CadastroEmpresa'
import Empresa from './pages/ListaEmpresas'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

    <Header/>

    <Routes>
      <Route  path='/' element={ <Home/>}/>
      <Route path='ListaEmpresas' element= {<Empresa/>}/>
      <Route path='CadastroEmpresa' element= {<CadastroEmpresa/>}/>
    </Routes>

    </BrowserRouter>
  </React.StrictMode>,
)
