import { Button } from 'antd';
import React, { useState } from 'react';
import ProductsForm from './ProductsForm';

function Products() {
    const [showProductForm, setShowProductForm] = useState(false);
    return(
        <div className='text-white'>
            <div className='d-flex justify-content-end'>
                <Button
                type='default'
                onClick={() => setShowProductForm(true)}>
                    Add Product
                </Button>
            </div>
            {showProductForm && <ProductsForm showProductForm={showProductForm} setShowProductForm={setShowProductForm}/>}
        </div>
    );
}

export default Products;