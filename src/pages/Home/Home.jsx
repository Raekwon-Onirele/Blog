// import CSS
import styles from "./Home.module.css";

// import hooks
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  // definindo query para pesquisa
  const [query, setQuery] = useState("");

  // definindo posts para exibição
  const { documents: posts, loading } = useFetchDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      {/* Local da query dos posts */}
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Ou busque por tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
        {/* Onde está renderizando os posts */}
        {posts && posts.length === 0 && (
          <div>
            <p>Não foi encontrado nenhum post</p>
            <Link to="/posts/create" className="btn">
              Crie seu primeito post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
