// import CSS
import "./App.css";

// import React Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import firebase
import { onAuthStateChanged } from "firebase/auth";

// import hooks
import { useAuthentication } from "./hooks/useAuthentication";
import { useState, useEffect } from "react";

// import Context
import { AuthProvider } from "./context/authContext";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  // > autenticação para verificar e iniciar o user em todo o projeto
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  // definindo o loading para quando o user for undefined
  const loadingUser = user === undefined;

  // mapeando o auth vindo do useAuthentication
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  // quando o user for igual a undefined, traz um texto de carregamento
  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  // < autenticação para verificar e iniciar o user em todo o projeto

  return (
    <>
      {/* Colocando o user para ser acessado em todo o projeto */}
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                // verificação para caso o usuário não esteja ativo para acessar a page Login e ser direcionado para a Home
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/create"
                // verificação para caso o usuário esteja ativo para acessar a page createPost, caso não esteja direcionar para a page de login
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
