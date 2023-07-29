import { useEffect, useState } from "react";
import { Tabs, Form } from "antd";
import CreatePolicy from "./createPolicy";
import DefaultPolicy from "./defaultPolicy";
import "./style.css";
const Policy = () => {
  const [tab, setTab] = useState("tab1");

  const [tabsList, setTabsList] = useState([
    {
      tab: "Danh sach ban ke da tao",
      key: "tab1",
      children: <DefaultPolicy />,
    },
    { tab: "Tao ban ke Moi", key: "tab2", children: <CreatePolicy /> },
  ]);

  return (
    <div className="policy-container">
      <div className="p-header">
        <Tabs defaultActiveKey={tab}>
          {tabsList.map((tabInfo, index) => {
            return (
              <Tabs.TabPane tab={tabInfo.tab} key={tabInfo.key}>
                <div>{tabInfo.children}</div>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
export default Policy;
