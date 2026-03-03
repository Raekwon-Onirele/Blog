// import CSS
import styles from "./Register.module.css";

// import hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {

  // definindo as variáveis utilizadas na validação
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  // pegando as variáveis do useAuthentication
  const {createUser, error: authError, loading} = useAuthentication()

  // definindo variável para envio do form
  const handleSubmit = async (e) => {
    e.preventDefault()

    // para resetar os erros
    setError("")

    const user = {
      displayName,
      email,
      password
    }

    // validando o password e o confirmPassword
    if(password != confirmPassword) {
      setError("As senhas precisam ser iguais")
      return
    }

    const res = await createUser(user)

    console.log(res)
  }

  // para mapear a função authError e alterar setError para exibir setError
  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário:"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirme sua senha: </span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha:"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="btn">Cadastrar</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
