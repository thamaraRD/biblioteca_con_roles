import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import UserForm from "../components/UserForm";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

const KEY = "biblioteca-app";
const LoginAndRegister = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const handleLogin = () => {
    if (isLogin) {
      setIsLogin(false);
      history.push("/register");
    } else {
      setIsLogin(true);
      history.push("/login");
    }
  };
  //Registro de usuario
  const registerUser = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        values
      );
      console.log(response.data);
      Swal.fire({
        title: "Registro exitoso",
        text: `${values.firstName} se registró con éxito, porfavor inicie sesión`,
        icon: "success",
        confirmButtonText: "¡Qué bien!",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLogin(true);
          history.push("/login");
        }
      });
      resetForm();
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        title: "¡Algo ha sucedido!",
        text: err.response.data.error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  //Login
  const loginUser = async (values) => {
    try {
      const login = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        values
      );
      console.log("Data de axios:", login.data);
      setUser(login.data);
      localStorage.setItem(KEY, JSON.stringify(login.data));
      Swal.fire({
        title: "¡Se inició sesión exitosamente!",
        icon: "success",
        showConfirmButton: false,
        timer: 2400,
      });
      setTimeout(() => {
        if (login.data.role === "admin") {
          history.push("/admin/books");
        } else {
          history.push("/user/books");
        }
      }, 2500);
    } catch (err) {
      Swal.fire({
        title:
          "Usuario o contraseña inválida, por favor revise e intente de nuevo",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      history.push("/admin/books");
    } else if (user?.role === "basic") {
      history.push("/user/books");
    }
    location.pathname === "/register" ? setIsLogin(false) : setIsLogin(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Container className="mx-auto mt-5">
        <Row className="justify-content-center align-items-center">
          <Col className="col-5 bg-light shadow">
            <h1 className="text-center">{isLogin ? "Login" : "Registro"}</h1>
            <UserForm
              isLogin={isLogin}
              formHandler={isLogin ? loginUser : registerUser}
              nameButton={isLogin ? "Login" : "Registrarse"}
            />
            <Button variant="success" className="my-2" onClick={handleLogin}>
              {!isLogin ? "Ir al login" : "Me voy a registrar"}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default LoginAndRegister;
