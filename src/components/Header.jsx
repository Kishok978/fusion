import {Button, Flex, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";
import {checklistActions, checklistSlice} from "../redux/checklist/slice.js";

const { Header } = Layout;
const CustomerHeader = () => {
    const dispatch = useDispatch();
    const weightPercent = useSelector(state => state.checklist.weightPercent);
    return (
        <Header className="header">
            <Flex justify="space-between" align="center">
                <h3>NX MUI Testing CP - Checklist</h3>
                <Flex gap="middle" align="center">
                    <Flex gap="small">
                        <div className="weightLabel">
                            Weight Percent:
                        </div>
                        <div  className={`weightValue ${weightPercent === 100 ? 'green' : 'red'}`}>
                            {weightPercent}%
                        </div>
                    </Flex>
                    <Button onClick={()=> dispatch(checklistActions.addItems())} className="addBtn" type="primary" shape="circle" variant="solid" danger>
                        <PlusOutlined />
                    </Button>
                    <Button onClick={()=>{}} className="saveBtn" type="primary" variant="solid" color="default" disabled={weightPercent !== 100}>
                        Save
                    </Button>
                </Flex>
            </Flex>
        </Header>
    )
}

export default CustomerHeader
