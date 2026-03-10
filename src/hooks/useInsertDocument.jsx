import { useState, useEffect, useReducer, act } from "react";

import { db } from "../firebase/config";

// importando funções de add documentos na tabela do firebase, marcando o tempo
import { collection, addDoc, Timestamp } from "firebase/firestore";

// state inicial de loading e error
const initialState = {
  loading: null,
  error: null,
};

// definindo o que o sistema vai fazer dependendo da action que estiver
const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    // caso não tenha nenhuma action retorna o state
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  // // variável para limpar as funções posteriormente
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // função para inserir o documento no banco
  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
      payload: insertDocument,
    });
    try {
      const newDocument = { ...document, created: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument,
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
