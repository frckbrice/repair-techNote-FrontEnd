import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Avom Brice Repairs!</span>
        </h1>
      </header>
      <main className="public_main">
        <p>
          Locate in the most beatifull capital iin this earth, Avom &quote;s
          Repairs provides a trained staff ready to meet your tech repair needs.
        </p>
        <address className="public_addr">
          Avom Brice repairs
          <br />
            1147 avenue des banques 
          <br />
          <a href="tel:+237674852304">(+237)674852304</a>
        </address>
        <br />
        <p>Owner:Avom Brice</p>
      </main>
      <footer>
        <Link to={"/login"}>Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
