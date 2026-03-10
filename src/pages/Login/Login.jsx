// import CSS
import styles from "./Login.module.css";

// import hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  // definindo as variáveis utilizadas na validação
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // pegando as variáveis do useAuthentication
  const { login, error: authError, loading } = useAuthentication();

  // definindo variável para envio do login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // para resetar os erros
    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  // para mapear a função authError e alterar setError para exibir authError
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o Login para entrar</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            name="displayEmail"
            placeholder="Digite seu email:"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha:"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
