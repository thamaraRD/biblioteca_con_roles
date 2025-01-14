import React, { useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/LoginContext";
import { UserFormAntd } from "../components/UserFormAntd";
import { Row, Col } from "antd";
// import styles from "../scss/LoginRegisterScreen.module.scss";

export const LoginRegisterScreen = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (user?.role === "admin") {
      history.push("/admin/books");
    } else if (user?.role === "basic") {
      history.push("/user/books");
    }
    location.pathname === "/register" ? setIsLogin(false) : setIsLogin(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="m-3 w-75 mx-auto">
      <Row>
        <Col span={14} className="border rounded bg-light mx-auto pb-2 pt-4">
          {isLogin ? (
            <h2 className="text-center">Login</h2>
          ) : (
            <h2 className="text-center">Registro</h2>
          )}
          <UserFormAntd titleSubmitButton={isLogin ? "Login" : "Registro"} />
        </Col>
      </Row>
    </Container>
  );
};
