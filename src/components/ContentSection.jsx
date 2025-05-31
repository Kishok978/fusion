import {Button, Card, Flex, Form, Input, InputNumber, Select, Space, Typography} from "antd";
import {CloseOutlined, DeleteOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checklistActions} from "../redux/checklist/slice.js";

const defaultPartOptions = [
    {
        label: "Select 1",
        value: 1,
    },
    {
        label: "Select 2",
        value: 2,
    }
]

const ContentSection = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const formValue = useSelector(state => state.checklist.formValue);
    const [items, setItems] = useState([]);
    const handleFieldChange = (changeField) => {
        const name = changeField.name;
        const value = changeField.value;
        const updateItem = [...form.getFieldsValue()['items']];
        // console.log({ changeField },  form.getFieldsValue(),  updateItem, name)
        // form.setFieldValue('w')
        // return 10
    }

    useEffect(() => {
        const updateItem = formValue.items
        if(form) {
            form.setFieldsValue({
                items: updateItem.map(item => {
                    let weight = 0;
                    item?.sub_activity?.forEach(subItem => {
                        weight = weight + (subItem?.weight || 0)
                    })
                    return { ...item, weight: weight }
                }) })
        };
    }, [formValue, form])

    useEffect(() => {
        let totalWeight = 0
        form.getFieldsValue()?.items?.forEach(item => {
            totalWeight += (item.weight || 0)
        });
        dispatch(checklistActions.setWeightPercent(totalWeight))
    }, [form.getFieldsValue()])

    return (
        <Form
            form={form}
            layout="vertical"
            name="dynamic_form_complex"
            autoComplete="off"
            initialValues={{ ...formValue }}
            className="contentSection"
            onValuesChange={(_, allFields) => dispatch(checklistActions.setFormValue(allFields)) }
            onFieldsChange={handleFieldChange}
        >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {fields.map((field, index) => (
                            <Card
                                size="small"
                                key={field.key}
                            >
                                <Flex gap="middle">
                                    <div>{index + 1}</div>
                                    <Form.Item
                                        label="Activity"
                                        name={[field.name, 'activity']}
                                        className="formItem"
                                    >
                                        <Input placeholder="Activity" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Unit of Count"
                                        name={[field.name, 'part_id']}
                                        className="formItem">
                                        <Select options={defaultPartOptions} placeholder="Unit of Count" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Weight"
                                        name={[field.name, 'weight']}
                                        disabled
                                    >
                                        <InputNumber addonAfter="%" disabled />
                                    </Form.Item>
                                    <DeleteOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                        className="deleteBtn"
                                    />
                                </Flex>
                                <Form.Item className="subFormItem">
                                    <Form.List name={[field.name, 'sub_activity']}>
                                        {(subFields, subOpt) => (
                                            <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}>
                                                {subFields.map((subField, subItemIndex) => (
                                                    <Flex key={subItemIndex} gap="middle" align="start" >
                                                        <div className="subFormLabel">
                                                            {index + 1}.{subItemIndex + 1}
                                                        </div>
                                                        <Form.Item name={[subField.name, 'activity']} className="formItem">
                                                            <Input placeholder="Activity" />
                                                        </Form.Item>
                                                        <Form.Item name={[subField.name, 'part_id']}  className="formItem">
                                                            <Select placeholder="Part" options={defaultPartOptions} />
                                                        </Form.Item>
                                                        <Form.Item name={[subField.name, 'weight']} className="subItemNumber">
                                                            <InputNumber placeholder="weight" addonAfter="%" defaultValue={0} />
                                                        </Form.Item>
                                                        <DeleteOutlined
                                                            onClick={() => {
                                                                subOpt.remove(subField.name);
                                                            }}
                                                            className="deleteBtn"
                                                        />
                                                    </Flex>
                                                ))}
                                                <Button type="text" className="addMoreBtn" onClick={() => subOpt.add()} block>
                                                    + Add More
                                                </Button>
                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Card>
                        ))}
                    </div>
                )}
            </Form.List>
            <Form.Item noStyle shouldUpdate>
                {() => (
                    <Typography>
                        <pre>{JSON.stringify(form.getFieldsValue()?.items, null, 2)}</pre>
                    </Typography>
                )}
            </Form.Item>
        </Form>
    )
}

export default ContentSection;
