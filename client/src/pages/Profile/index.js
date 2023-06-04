import { Tabs } from "antd";
import React from "react";
import Products from "./Products";

function Profile() {
    return(
        <div>
            <Tabs className="text-white" defaultActiveKey="1">
                <Tabs.TabPane tab="Products" key="1">
                    <Products/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Bits" key="2">
                    <h1 className="text-white">Bits</h1>
                </Tabs.TabPane>
                <Tabs.TabPane tab="General" key="3">
                    <h1 className="text-white">General</h1>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default Profile;