// import CSS
import styles from "./Post.module.css";

// import react router
import { useParams } from "react-router";

// import hooks
import { useFetchDocumentIndividual } from "../../hooks/UseFetchDocumentIndividual";

const Post = () => {
  // definindo o id que vem do useParams, id da Url
  const { id } = useParams();

  // definindo o post do useFetch
  const { document: post, loading } = useFetchDocumentIndividual("posts", id);

  return (
    <div>
        {loading && <p>Carregando Post</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
        </>
      )}
    </div>
  );
};

export default Post;
