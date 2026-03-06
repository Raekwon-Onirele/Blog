// import CSS
import styles from "./About.module.css";

// import react-router
import { Link } from "react-router";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog feito em React no front-end com consumo
        de API do Firebase para back-end
      </p>
      <Link to="/posts/create" className="btn">Criar Post</Link>
    </div>
  );
};

export default About;
