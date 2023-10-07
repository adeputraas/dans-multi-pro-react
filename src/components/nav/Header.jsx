import {
  HomeTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("h");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Row>
        <Col span={20}>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="h" icon={<HomeTwoTone />}>
              <Link to="/home">GitHub Jobs</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <Menu>
            <Menu.Item key="l" icon={<CheckCircleTwoTone />}>
              <Link onClick={() =>  {
                localStorage.clear();
                window.location ='/login'
              }}>Logout</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>

      <Outlet />
    </>
  );
};
export default Header;
