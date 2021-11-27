//FIXME: Traer la data precargada cuando editemos un rating/comentario en el modal (CORREGIR COMA QUE SALE)
//TODO: actualizar la tabla sin llamar la api de getAllBooks
//TODO: Botón de ver en la columna de Acciones para ver todos los comentarios
//FIXME: al actualizar rating/comentario, agrega uno nuevo

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import {
  Table,
  Image,
  Badge,
  Button,
  Row,
  Col,
  Rate,
  Modal,
  Input,
  Form,
} from "antd";
import { axiosWithToken } from "../helpers/axiosWithToken";
import { EditOutlined } from "@ant-design/icons";
import noBookCover from "../images/book-without-cover.gif";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { uid } from "../helpers/uniqueId";
import { uniqueArrayData } from "../helpers/uniqueArrayData";
import styles from "../scss/UserBooksMain.module.scss";
import { noStartEndCommas } from "../helpers/noStartEndCommas";

const KEY = "biblioteca-app";

export const UserBooksMain = () => {
  const [books, setBooks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const history = useHistory();
  const [valuesToEdit, setValuesToEdit] = useState({});
  const [initialData, setInitialData] = useState([]);

  //Lógica del modal editar libro
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = async (record) => {
    try {
      const bookById = await axiosWithToken(`book/${record._id}`);
      setInitialData(bookById.data);
      setLoaded2(true);
      console.log("Initial data del show modal", initialData);
    } catch (err) {
      console.log("Error al traer el libro por el Id", err);
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
    console.log("Record en show modal", record);
    setIsModalVisible(true);
    setValuesToEdit(record);
  };

  const handleOk = () => {
    if (onFinishFailed() !== false) {
      setIsModalVisible(false);
      processSubmit();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const processSubmit = async (values) => {
    // console.log("Values del submit form", values?.comments, values?.rating);
    const dataToAxios = {
      ...valuesToEdit,
      rating:
        valuesToEdit.rating.length === 0
          ? values?.rating
          : [...valuesToEdit.rating, values?.rating],
      comments:
        valuesToEdit.comments.length === 0
          ? {
              AuthorIdComment: user._id,
              comment: values?.comments,
            }
          : [
              ...valuesToEdit.comments,
              { AuthorIdComment: user._id, comment: values?.comments },
            ],
    };
    try {
      const response = await axiosWithToken(
        `book/update/${valuesToEdit._id}`,
        dataToAxios,
        "PUT"
      );
      console.log("Respuesta al actualizar libro", response);
      Swal.fire({
        icon: "success",
        title: "Gracias por su rating/comentario",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.log("Error al modificar el libro", err);
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

  //Obtener todos los libros de la base de datos
  const getAllBooks = async () => {
    try {
      const booksData = await axiosWithToken("books");
      const result = booksData.data.books.map((row) => ({
        ...row,
        key: uid(),
      }));
      setBooks(result);
      setLoaded(true);
      console.log("Todos los libros", booksData.data.books);
    } catch (err) {
      console.log("Error al consultar todos los libros");
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
    // console.log("User dentro del useEffect", user);
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
      title: "Tema",
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
      dataIndex: "rating",
      width: "15%",
      sorter: (a, b) => a.rating - b.rating,
      filters: uniqueArrayData(books, "rating")
        .sort((a, b) => b - a)
        .map((rate) => ({
          text: (
            <Rate
              allowHalf
              disabled
              defaultValue={
                rate.length === 0
                  ? 0
                  : rate.reduce((prev, curr) => prev + curr) / rate.length
              }
            />
          ),
          value:
            rate.length === 0
              ? 0
              : rate.reduce((prev, curr) => prev + curr) / rate.length,
        })),
      onFilter: (value, record) =>
        console.log("Value", value, "record", record),
      render: (record) => {
        return (
          <Rate
            allowHalf
            disabled
            defaultValue={
              record.length === 0
                ? 0
                : record.reduce((prev, curr) => prev + curr) / record.length
            }
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
                showModal(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const tableOnChange = (pagination, filters, sorter) => {
    console.log("Table params", pagination, filters, sorter);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
    if (
      errorInfo?.values.rating === undefined ||
      errorInfo?.values.rating === undefined
    )
      return false;
  };

  const [form] = Form.useForm();

  return (
    <>
      <Row justify="center">
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
          <h2 className="text-center">Libros disponibles</h2>
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
        title="Editar libro"
        visible={isModalVisible}
        okButtonProps={{
          form: "user-edit-book",
          key: "submit",
          htmlType: "submit",
        }}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.imageModal}>
          <img
            src={valuesToEdit.bookImageUrl}
            alt={`Portada del libro ${valuesToEdit.title}`}
          />
        </div>
        <p>Autor: {valuesToEdit.author}</p>
        <p>Título: {valuesToEdit.title}</p>
        {loaded2 && (
          <Form
            form={form}
            name="user_books_edit"
            id="user-edit-book"
            onFinish={processSubmit}
            initialValues={{
              rating:
                initialData?.rating.length === 0
                  ? 0
                  : initialData?.rating.reduce((prev, curr) => prev + curr) /
                    initialData?.rating.length,
              comments: initialData?.comments.map((comment) =>
                comment.AuthorIdComment === user?._id
                  ? noStartEndCommas(comment.comment)
                  : null
              ),
            }}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="rating"
              label="Puntaje"
              rules={[{ required: true, message: "Este campo es requerido" }]}
            >
              <Rate allowHalf />
            </Form.Item>
            <Form.Item
              name={["comments"]}
              rules={[{ required: true, message: "Este campo es requerido" }]}
            >
              <Input.TextArea
                placeholder="Deja un comentario al libro"
                showCount
                maxLength={400}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};
