import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Carousel, Rate } from "antd";
import styles from "../scss/HomeScreen.module.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { uid } from "../helpers/uniqueId";
import noBookCover from "../images/book-without-cover.gif";

export const HomeScreen = () => {
  const [bookData, setBookData] = useState([]);

  const getBooksRCHomeScreen = async () => {
    try {
      const RCHomeScreen = await axios.get(
        `${process.env.REACT_APP_API_URL}/books/homescreen/crs`
      );
      // console.log("todos los comentarios del libro home screen", RCHomeScreen);
      setBookData(RCHomeScreen.data);
    } catch (err) {
      console.log("Error al obtener comentario/rating del libro", err);
      Swal.fire({
        icon: "error",
        title: "Error al traerse los comentarios/rating",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    getBooksRCHomeScreen();
  }, []);

  const carouselData = () => {
    let data = [];
    for (const libro of bookData) {
      if (libro.comments.length > 0) {
        data.push({
          title: libro.title,
          comment: libro.comments[0].comment,
          rating: libro.comments[0].rating,
          image: libro.bookImageUrl,
        });
      }
    }
    return data;
  };
  return (
    <>
      <Carousel autoplay effect="fade">
        {carouselData().map((ele) => (
          <div key={uid()}>
            <ul className={styles.contentStyle}>
              <li style={{ listStyle: "none" }}>
                {" "}
                <span style={{ fontSize: "1.5rem" }}> {ele.title}</span>{" "}
              </li>
              <li style={{ listStyle: "none" }}>
                <img
                  src={ele.image ? ele.image : noBookCover}
                  alt={`Imagen del libro ${ele.title}`}
                  style={{ height: "180px", margin: "0 auto" }}
                />
              </li>
              <li style={{ listStyle: "none" }}>
                <Rate allowHalf disabled defaultValue={ele.rating} />{" "}
              </li>
              <li style={{ listStyle: "none" }}>
                "<em style={{ fontSize: "1.2rem" }}>{ele.comment} </em>"
              </li>
            </ul>
          </div>
        ))}
      </Carousel>

      <Footer />
    </>
  );
};
