import { Upload, Button, message } from 'antd';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { UploadImage } from '../../../apicalls/products';

function Images({ selectedProduct, setShowProductForm, getData, }) {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const upload = async() => {
        try {
            dispatch(SetLoader(true));
            //upload to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('productId', selectedProduct._id);
            const response = await UploadImage(formData);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    };

    return (
        <div>
            <Upload
                listType='picture'
                beforeUpload={false}
                onChange={(info) => {
                    setFile(info.file);
                }}>
                <Button type='default'>Upload images</Button>
            </Upload>
            <div className='d-flex justify-content-end gap-1'>
                <Button type='default' onClick={() => {
                    setShowProductForm(false);
                }}>
                    Cancel
                </Button>
                <Button type='primary'
                    disabled={!file}
                    onClick={upload}>
                    Upload
                </Button>
            </div>
        </div>
    )
}

export default Images;