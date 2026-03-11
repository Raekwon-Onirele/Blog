// import CSS
import styles from "./CreatePost.module.css";

// import hooks
import { useState } from "react";
import { useInsertDocument } from "../../hooks/useInsertDocument";

// import react router
import { useNavigate } from "react-router";

// import context
import { useAuthValue } from "../../context/authContext";

import { db } from "../../firebase/config";


const CreatePost = () => {
  // variáveis que serão usadas para criar o Post
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // definindo o user
  const { user } = useAuthValue()

  // definindo o useInsertDocument
  const { insertDocument, response } = useInsertDocument("posts")

  const navigate = useNavigate()

  // para envio do form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    // validar imagem URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }

    // criando o arrays de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // checando se todos os valores chegaram
    if(!title || !image || !tags || !body) {
      setFormError("Preencha todos os campos")
    }

    if (formError) return;

    // para inserir todas as informações do doc
    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirecionar para home
    navigate("/")
  };

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Escreva o título do seu post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da Imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira a URL da sua imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label className={styles.textArea}>
          <span>Conteúdo do Post:</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo do corpo do seu Post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as Tags separadas por ',' "
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
