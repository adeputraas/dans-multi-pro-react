import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Radio,
  Checkbox,
  Layout,
  Typography,
  Pagination,
  notification,
  Card,
  Space,
} from "antd";
import axios from "axios";
import { LeftOutlined } from "@ant-design/icons";
import instance from "../http-common";
import { Outlet, Link, useParams } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const listFilter = [
  {
    name: "Job Description",
    placeholder: "Filter by title, benefits, companies, expertise",
    value: "",
    type: "text",
  },
  {
    name: "Location",
    placeholder: "Filter by city, state, zip code or country",
    value: "",
    type: "text",
  },
  { name: "Full Time Only", placeholder: "", value: false, type: "checkbox" },
];

const HomeDetail = (props) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("inline");
  const { idJobs } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [jobDetail, setJobDetail] = useState({});
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  useEffect(() => {
    async function fetchData() {
      const retrieveJobDetail = await instance
        .get(`/job/${idJobs}`)
        .then((response) => response.data);
      if (retrieveJobDetail.error) {
        api.open({
          message: "Error",
          description: retrieveJobDetail.response,
          duration: 3,
        });
      } else {
        setJobDetail(retrieveJobDetail.response[0]);
      }
    }

    fetchData();
  }, []);

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  return (
    <Layout>
      {contextHolder}
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#ffffff",
          }}
        >
          <Row>
            <Col span={4}>
              <Link to="/">
                <LeftOutlined />
                Go back
              </Link>
            </Col>
          </Row>
          <Row
            style={{ borderBottom: "1px solid #0000003d", marginBottom: 10 }}
          >
            <Col span={24}>
              <Title level={5} style={{ color: "#0000003d", marginBottom: 0 }}>
                {jobDetail.type} / {jobDetail.location}
              </Title>
              <Title level={3} style={{ marginTop: 0 }}>
                {jobDetail.title}
              </Title>
            </Col>
          </Row>
          <Row>
            <Col span={16}>
              <div
                dangerouslySetInnerHTML={{ __html: jobDetail.description }}
              ></div>
            </Col>
            <Col span={8}>
              <Space direction="vertical" size={16}>
                <Card
                  title={jobDetail.company}
                  extra={<a href="/">1 other job</a>}
                  style={{
                    width: 300,
                  }}
                >
                  <img
                    src={jobDetail.company_logo}
                    width={50}
                    height={50}
                  ></img>
                  <a href={jobDetail.company_url}></a>
                </Card>
                <Card
                  size="small"
                  title="How to apply"
                  style={{
                    width: 300,
                    background: "#ff98001f",
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: jobDetail.how_to_apply }}
                  ></div>
                </Card>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeDetail;
