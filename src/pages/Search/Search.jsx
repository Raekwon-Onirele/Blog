// import css
import styles from "./Search.module.css";

// import hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useQuery } from "../../hooks/useQuery";

// import components
import PostDetail from "../../components/PostDetail";

// import react router
import { Link } from "react-router";

const Search = () => {
  // pegando o parametro da query
  const query = useQuery();
  const search = query.get("q");

  // definido documents através dos posts
  const { documents: posts } = useFetchDocument("posts", search);

  return (
    <div className={styles.searchContainer}>
      <h2>Resultado da Pesquisa: <span>"{search}"</span></h2>
      <div>
        {/* Caso não venha nenhum post a partir da query */}
        {posts && posts.length === 0 && (
          <div className={styles.notposts}>
            <p>Não foram encontrados nenhum post através de sua busca</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )} 
        {/* Quando vier o post, para retornar o PostDetail */}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        <p></p>
      </div>
    </div>
  );
};

export default Search;
