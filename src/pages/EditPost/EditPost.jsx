// import CSS
import styles from "./EditPost.module.css";

// import hooks
import { useEffect, useState } from "react";
import { useFetchDocumentIndividual } from "../../hooks/UseFetchDocumentIndividual";
import { useUpdateDocument } from "../../hooks/useUptadeDocument";

// import react router
import { useNavigate, useParams } from "react-router";

// import context
import { useAuthValue } from "../../context/authContext";

import { db } from "../../firebase/config";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocumentIndividual("posts", id);

  // variáveis que serão usadas para criar o Post
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    }
  }, [post]);

  // definindo o user
  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument("posts");

  // para envio do form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validar imagem URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    // criando o arrays de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checando se todos os valores chegaram
    if (!title || !image || !tags || !body) {
      setFormError("Preencha todos os campos");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data)

    // redirecionar para home
    navigate("/posts/dashboard");
  };

  return (
    <div className={styles.editPost}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
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
            <p className={styles.previewImg}>Preview da imagem atual:</p>
            <img
              className={styles.imgPreview}
              src={post.image}
              alt={post.title}
            />
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
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
