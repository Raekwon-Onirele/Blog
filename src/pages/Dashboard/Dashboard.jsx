// import CSS
import styles from "./Dashboard.module.css";

// import react router
import { Link } from "react-router";

// import context
import { useAuthValue } from "../../context/authContext";

// import hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Dashboard = () => {
  // definindo user do useAuth para validação
  const { user } = useAuthValue();
  const uid = user.id;

  // definindo posts do user
  const { documents: posts, loading } = useFetchDocument("posts", null, uid);

  // função para deletar documento
  const deleteDocument = (id) => {};

  // função loading 
  if(loading) {
    return <p> Carregando... </p>
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus Posts</p>
      
      {posts && posts.length === 0 ? (
        // Caso não chegue nenhum post
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Crie seu primeiro post
          </Link>
        </div>
      ) : (
        // Se chegar algum post
        <>
          <div className={styles.postHeader}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.postRow}> 
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
