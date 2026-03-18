// import CSS
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <h3>Escreva sobre o que você tem interesse!</h3>
        <p>Mini Blog &copy; 2026</p>
        <div className={styles.github}>
          <p>
            Criador: <span>Raekwon</span>
          </p>
          <span>Github: <a href="https://github.com/Raekwon-Onirele">https://github.com/Raekwon-Onirele</a></span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
