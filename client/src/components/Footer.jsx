import React from "react";
import styles from "../scss/Footer.module.scss";
import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>Sobre Nosotros</h6>
              <p>
                Aquí encontrarás información útil relacionada con los libros que
                están en tendencia, lo más demandados, los que te llevan a
                soñar, enamorarte y vivir una vida de fantasía mientras los
                lees. Déjate guiar a través de las recomendaciones hechas por
                nuestros usuarios.
              </p>
            </div>
            <div className="col-md-3 mx-auto mt-0">
              <h6>Síguenos en nuestras redes</h6>
              <p>
                <a href={"/"}>
                  <TwitterOutlined className="fs-4" />
                </a>
              </p>
              <p>
                <a href={"/"}>
                  <FacebookOutlined className="fs-4" />
                </a>
              </p>
              <p>
                <a href={"/"}>
                  <LinkedinOutlined className="fs-4" />
                </a>
              </p>
            </div>
          </div>
          <hr />
        </div>
        <div className="container text-center">
          <p>Copyright &copy; 2021</p>
        </div>
      </footer>
    </div>
  );
};
