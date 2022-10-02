import React from "react";
import { Spin, Space } from "antd";


const Loading = () => {
    return ( 
        <Space size="middle">
            <Spin size="large"/>
        </Space>
     );
}
 
export default Loading;