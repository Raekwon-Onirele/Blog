// import das funções do firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // // variável para limpar as funções posteriormente
  const [cancelled, setCancelled] = useState(false);

  

  // função para fazer a limpeza, para esvaziar a memória
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // função para criar o user
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    // aqui vai tentar criar o user, caso não consiga vai cair no catch
    try {
      // colocando as informações que o user vai receber
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // após informar o que ele vai receber, o firebase obriga a fazer esse update
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      // caso ocorra algum erro, para exibir essas mensagens
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  // logout
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  // função para entrar com o usuário já cadastrado
  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Seu Login ou Senha estão incorretos";
      }

      console.log(systemErrorMessage);

      setError(systemErrorMessage);
    }

    console.log(error);

    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    createUser,
    error,
    loading,
    auth,
    logout,
    login,
  };
};
