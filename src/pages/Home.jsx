import React, { useState, useEffect } from "react";
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
  notification,
  Pagination,
} from "antd";
import instance from "../http-common";
import { useNavigate  } from "react-router-dom"
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

const Home = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("inline");
  const [listJob, setListJob] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreJob, setHasMore] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const onFormLayoutChange = ({ layout }) => {
    console.log(layout, "?");
    // setFormLayout(layout);
  };

  const fetchData = async () => {
    const retrieveAllJob = await instance
      .post(`/job/retrieveAllList`, {
        description: formLayout.job_desc ? formLayout.job_desc : "",
        location: formLayout.location ? formLayout.location : "",
        full_time: formLayout.full_time ? formLayout.full_time : false,
        page: page,
      })
      .then((response) => response.data);
    if (retrieveAllJob.error) {
      api.open({
        message: "Error",
        description: retrieveAllJob.response,
        duration: 3,
      });
    } else {
      setListJob(
        listJob.concat(retrieveAllJob.response.filter((data) => data))
      );
    }
  };

  const onFinish = async () => {
    fetchData();
  };

  const fetchMoreData = async () => {
    setPage(page + 1);

    if(page >= 3) {
      setHasMore(false);
    } else {
      fetchData();
    }

  };

  useEffect(() => {
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
            <Col span={24}>
              <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{
                  layout: formLayout,
                  full_time: false,
                }}
                onValuesChange={onFormLayoutChange}
                onFinish={onFinish}
                style={{
                  maxWidth: formLayout === "inline" ? "none" : 200,
                }}
              >
                <Form.Item name="job_desc">
                  <Input placeholder="Filter by title, benefits, companies, expertise" />
                </Form.Item>
                <Form.Item name="location">
                  <Input placeholder="Filter by city, state, zip code or country" />
                </Form.Item>
                <Form.Item name="full_time" valuePropName="checked">
                  <Checkbox>Full Time</Checkbox>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row
            style={{ borderBottom: "1px solid #0000003d", marginBottom: 10 }}
          >
            <Col span={24}>
              <Title level={2}>Job List</Title>
            </Col>
          </Row>
          {listJob.map((job, index) => {
            return (
              <Row
                key={index}
                style={{
                  borderBottom: "1px solid #0000003d",
                  marginBottom: 10,
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/${job.id}`)}
              >
                <Col span={20}>
                  <Title level={4} style={{ color: "#7d81ff" }}>
                    {job.title}
                  </Title>
                  <div className="d-flex">
                    <span style={{ color: "#0000003d", fontWeight: "bold" }}>
                      {job.company}{" "}
                    </span>{" "}
                    &nbsp; - &nbsp;
                    <span style={{ color: "#5add51", fontWeight: "bold" }}>
                      {job.type}{" "}
                    </span>
                  </div>
                </Col>
                <Col span={4}>
                  <Title level={4} style={{ color: "#7d81ff" }}>
                    {job.location}
                  </Title>
                  <div className="d-flex">
                    {" "}
                    <span style={{ color: "#0000003d", fontWeight: "bold" }}>
                      1 day ago
                    </span>
                  </div>
                </Col>
              </Row>
            );
          })}

          {hasMoreJob ? (
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={fetchMoreData}
                >
                  More Jobs
                </Button>
              </Col>
            </Row>
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
