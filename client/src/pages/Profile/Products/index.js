import { Button, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import ProductsForm from './ProductsForm';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import moment from 'moment';

function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const dispatch = useDispatch();
    const getData = async() => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts();
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.products);
            } 
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };
    
    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message)
                getData();
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Descrpition",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render : (text, record) => {
                return <div className='d-flex'>
                    <i className="ri-edit-2-line me-4" onClick={() => {
                        setSelectedProduct(record);
                        setShowProductForm(true);
                    }}></i>
                    <i className="ri-delete-bin-6-line" onClick={() => {
                        deleteProduct(record._id);
                    }}></i>
                </div>
            }
        },
    ];

    
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='text-white'>
            <div className='d-flex justify-content-end'>
                <Button
                    type='default'
                    onClick={() => {
                        setSelectedProduct(null);
                        setShowProductForm(true);
                    }}>
                    Add Product
                </Button>
            </div>
            <Table className='mt-3' columns={columns} dataSource={products}/>
            {showProductForm && <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} selectedProduct={selectedProduct} getData={getData}/>}
        </div>
    );
}

export default Products;