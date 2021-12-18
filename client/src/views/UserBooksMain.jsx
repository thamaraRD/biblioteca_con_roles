import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Table, Image, Badge, Button, Row, Col, Rate, Modal } from "antd";
import { axiosWithToken } from "../helpers/axios";
import { EditOutlined, WechatOutlined } from "@ant-design/icons";
import noBookCover from "../images/book-without-cover.gif";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { uid } from "../helpers/uniqueId";
import { uniqueArrayData } from "../helpers/uniqueArrayData";
import styles from "../scss/UserBooksMain.module.scss";
import moment from "moment";
import { Container } from "react-bootstrap";

const KEY = "biblioteca-app";

export const UserBooksMain = () => {
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const history = useHistory();

  //Obtener todos los libros de la base de datos
  const getAllBooks = async () => {
    try {
      const booksData = await axiosWithToken("books/user/crs");
      console.log("Todos los libros", booksData.data);
      const result = booksData.data.map((row) => ({
        ...row,
        key: uid(),
      }));
      setBooks(result);
      setLoaded(true);
    } catch (err) {
      console.log("Error al consultar todos los libros");
      console.log("error", err);
      if (err.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Su sesión ha expirado. Debe volver a iniciar sesión.",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          handleLogOut();
        }, 2100);
      }
    }
  };
  //Valido si usuario existe y si tiene el rol de admin
  useEffect(() => {
    if (user && user.role === "basic") {
      getAllBooks();
    } else {
      history.push("/login");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem(KEY);
    history.push("/login");
  };

  //Columnas de la tabla de Antd
  const columns = [
    {
      key: uid(),
      title: "Autor",
      dataIndex: "author",
      filters: uniqueArrayData(books, "author").map((author) => ({
        text: author,
        value: author,
      })),
      onFilter: (value, record) => record.author.indexOf(value) === 0,
    },
    {
      key: uid(),
      title: "Título",
      dataIndex: "title",
      filters: uniqueArrayData(books, "title").map((title) => ({
        text: title,
        value: title,
      })),
      onFilter: (value, record) => record.title.indexOf(value) === 0,
    },
    {
      key: uid(),
      title: "Año",
      dataIndex: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      key: uid(),
      title: "Editorial",
      dataIndex: "publisher",
      filters: uniqueArrayData(books, "publisher").map((publisher) => ({
        text: publisher,
        value: publisher,
      })),
      onFilter: (value, record) => record.publisher.indexOf(value) === 0,
    },
    {
      key: uid(),
      title: "Género",
      dataIndex: "subject",
      filters: uniqueArrayData(books, "subject").map((subject) => ({
        text: subject,
        value: subject,
      })),
      onFilter: (value, record) => record.subject.indexOf(value) === 0,
    },
    {
      key: uid(),
      title: "N.º de págs.",
      dataIndex: "numberOfPages",
      sorter: (a, b) => a.numberOfPages - b.numberOfPages,
    },
    {
      key: uid(),
      title: "Img",
      dataIndex: "bookImageUrl",
      render: (record) => {
        return <Image height={60} src={!record ? noBookCover : record} />;
      },
    },
    {
      key: uid(),
      title: "Rating",
      dataIndex: "avgRating",
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.avgRating - b.avgRating,
      render: (record) => {
        return (
          <Rate
            allowHalf
            disabled
            defaultValue={record === null ? 0 : record}
          />
        );
      },
    },
    {
      key: uid(),
      title: "Acciones",
      render: (record) => {
        return (
          <>
            <EditOutlined
              style={{ color: "#F18F01", marginLeft: 5, fontSize: 18 }}
              onClick={() => {
                history.push(`/user/book/${record._id}`);
              }}
            />
            <WechatOutlined
              style={{ color: "#3590ff", marginLeft: 8, fontSize: 22 }}
              onClick={() => showModal(record)}
            />
          </>
        );
      },
    },
  ];

  const tableOnChange = (pagination, filters, sorter) => {
    console.log("Table params", pagination, filters, sorter);
  };

  const [allComments, setAllComments] = useState({});

  const getAllCRByBook = async (record) => {
    try {
      const data = await axiosWithToken(`cr/book/${record._id}`);
      setAllComments(data.data);
    } catch (err) {
      console.log("Error al consultar todos los libros");
      console.log("error", err);
      if (err.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Su sesión ha expirado. Debe volver a iniciar sesión.",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          handleLogOut();
        }, 2100);
      }
    }
  };

  //Modal logic de mostrar comentarios
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setIsModalVisible(true);
    getAllCRByBook(record);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Container className="m-3 mx-auto">
      <Row>
        <Col span={22}>
          <p className="text-end">Hola, {user?.firstName}</p>
          <Button
            type="primary"
            danger
            className="float-end"
            onClick={handleLogOut}
          >
            Cerrar sesión
          </Button>
          <br />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={22}>
          <h2 className="text-center">Lista de Libros</h2>
          {loaded && (
            <>
              <div>
                <p className={styles.registeredBooks}>
                  Total de libros registrados
                </p>
                <Badge count={books.length} showZero />
              </div>
              <Table
                columns={columns}
                dataSource={books}
                onChange={tableOnChange}
                pagination={{
                  showSizeChanger: true,
                  current: page,
                  pageSize: pageSize,
                  onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize);
                  },
                }}
              />
            </>
          )}
        </Col>
      </Row>
      <Modal
        title="Comentarios de los usuarios"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {allComments?.comments?.map((comment) => (
          <div key={uid()}>
            <p>
              <b> Comentario de {comment?.user?.firstName}:</b>
              <p>
                {" "}
                "<em>{comment?.comment}</em>"{" "}
              </p>
              publicado: {moment(comment?.updatedAt).startOf("hour").fromNow()}
            </p>
            <hr />
          </div>
        ))}
      </Modal>
    </Container>
  );
};
