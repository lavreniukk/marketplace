import { Col, Form, Input, Modal, Row, Tabs, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from "../../../redux/loadersSlice";
import { AddProduct, EditProduct } from '../../../apicalls/products';
import Images from './images';

const additional = [
    {
        label: 'Bill Available',
        name: 'billAvailable'
    },
    {
        label: 'Warranty Available',
        name: 'warrantyAvailable'
    },
    {
        label: 'Accessories Available',
        name: 'accessoriesAvailable'
    },
    {
        label: 'Box Available',
        name: 'boxAvailable'
    }
];

const rules = [
    {
        required: true,
        message: 'Required'
    },
]

function ProductsForm({ showProductForm, setShowProductForm, selectedProduct, getData}) {
    const [selectedTab, setSelectedTab] = useState("1");
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            let response = null;
            if (selectedProduct) {
                response = await EditProduct(selectedProduct._id, values);
            } else {
                values.seller = user._id;
                values.status = 'pending'; 
                response = await AddProduct(values);
            }
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowProductForm(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    const formRef = React.useRef(null);

    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct);
        }
    }, [selectedProduct]);
    return (
        <Modal
            title=''
            open={showProductForm}
            onCancel={() => setShowProductForm(false)}
            centered
            width={800}
            okText='Save'
            onOk={() => {
                formRef.current.submit();
            }}
            {...(selectedTab === '2' && {footer : false})}
        >
            <div>
            <h1 className='text-white text-center'>
                {selectedProduct ? "Edit Product" : "Add product"}
            </h1>
            <Tabs className='text-white' defaultActiveKey='1'
            activeKey={selectedTab}
            onChange={(key) => setSelectedTab(key)}>
                <Tabs.TabPane tab='General' key='1'>
                    <Form layout='vertical'
                        ref={formRef}
                        onFinish={onFinish}>
                        <Form.Item label='Name' name='name' rules={rules}>
                            <Input type='text'></Input>
                        </Form.Item>
                        <Form.Item label='Description' name='description' rules={rules}>
                            <TextArea type='text'></TextArea>
                        </Form.Item>

                        <Row
                            gutter={[16, 16]}
                        >
                            <Col span={8}>
                                <Form.Item label='Price' name='price' rules={rules}>
                                    <Input type='number'></Input>
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label='Category' name='category' rules={rules}>
                                    <select>
                                        <option value=''>Select</option>
                                        <option value='electronics'>Electronics</option>
                                        <option value='sports'>Sports</option>
                                        <option value='home'>Home</option>
                                        <option value='clothes'>Clothes</option>
                                    </select>
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label='Age' name='age' rules={rules}>
                                    <Input type='number'></Input>
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className='d-flex gap-5'>
                            {additional.map((item) => {
                                return (
                                    <Form.Item label={item.label} name={item.name} valuePropName='checked'>
                                        <Input type='checkbox' value={item.name} onChange={(e) => {
                                            formRef.current.setFieldsValue({
                                                [item.name]: e.target.checked,
                                            });
                                        }}
                                            checked={formRef.current?.getFieldValue(item.name)}
                                        />
                                    </Form.Item>
                                );
                            })}
                        </div>
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab='Images' key='2'
                disabled={!selectedProduct}>
                    <Images selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} getData={getData}/>
                </Tabs.TabPane>
            </Tabs>
            </div>
        </Modal>
    )
}

export default ProductsForm;