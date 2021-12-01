import React from 'react';
import styles from '../scss/Footer.module.scss'
import { FacebookOutlined, LinkedinOutlined } from "@ant-design/icons";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <footer>
        <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>Sobre Nosotros</h6>
            <p>Aquí encontrarás información útil relacionada con los libros que están en tendencia, lo más demandados, los que te llevan a soñar, enamorarte y vivir una vida de fantasía mientras los lees. Dejate guiar a través de las recomendaciones echas por nuestros usuarios.</p>
          </div>
          </div>
          
          <ul className="social-icons">
              <li><a href="#"><FacebookOutlined className="fs-3" /></a></li>
              <li><a href="#"><LinkedinOutlined className="fs-3" /></a></li>
              
              </ul>
          <hr />
        </div>
        <div className="container text-center text-md-start">
        
           
              <p>Copyright &copy; 2021</p>
          
          
          
        </div>
       
      </footer>
      

    </div>
  )
};
