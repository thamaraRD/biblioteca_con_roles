import React from "react";
import styles from "../scss/BookEditRC.module.scss";
import { Form, Input, Button, Row, Col, Rate } from "antd";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const BookEditRC = ({ processSubmit, initialValues, titleButton }) => {
  const [form] = Form.useForm();
  return (
    <>
      <div className={styles.static}>
        <img
          src={initialValues.bookImageUrl}
          alt={`portada del libro ${initialValues.title}`}
        ></img>
        <p>Autor: {initialValues.author}</p>
        <p>Título: {initialValues.title}</p>
      </div>
      <Row justify="center">
        <Col span={13} className={styles.static}>
          <Form
            form={form}
            name="validate_other"
            {...formItemLayout}
            onFinish={processSubmit}
            initialValues={{
              rating: initialValues.rating,
              comment: initialValues.comment,
            }}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="rating" label="Valoración">
              <Rate allowHalf />
            </Form.Item>
            <Form.Item name={["comment"]}>
              <Input.TextArea
                placeholder="Deja un comentario al libro..."
                showCount
                maxLength={400}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                {titleButton}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
