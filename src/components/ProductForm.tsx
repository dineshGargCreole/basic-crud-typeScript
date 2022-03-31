import React, {useEffect, useState} from 'react'
import {Form, Button, Input, Upload, Modal} from 'antd'
import {IProduct} from './AppInterface'
import {getBase64} from './utils'
import { InternalUploadFile, UploadFile } from 'antd/lib/upload/interface'


interface IProps {
    handleFinish: (product: IProduct) => void
    product?: IProduct
}

interface IUploadFile extends InternalUploadFile {
  preview?: any
}

function ProductForm(props: IProps) {
    const [fileList, setFileList] = useState<any>([])
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [previewImage, setPreviewImage] = useState<string>('')
    const [previewTitle, setPreviewTitle] = useState<string>('')
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: props?.product?.title,
            price: props?.product?.price,
            description: props?.product?.description,
            category: props?.product?.category,
            rate: props?.product?.rating.rate,
            count: props?.product?.rating.count,
            image: props?.product?.image,
        })
    }, [props.product])

    const handleChange = (e: any) => {
        setFileList(e.fileList)
    }

    const handlePreview = async (file:any) => {
      if(!file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }

      setPreviewImage(file.preview)
      setPreviewVisible(true)
      setPreviewTitle(file.name)
    }

  return (
    <div>
        <Form
        layout='vertical'
        name="basic"
        onFinish={props.handleFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Rate"
          name="rate"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Count"
          name="count"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: 'This is required field.' }]}
        >
          <Upload
            listType='picture-card'
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
          >
            {fileList.length >= 1 ? null : <Button>Upload</Button>}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img src={previewImage} style={{ width: '100%' }} />
      </Modal>
    </div>
  )
}

export default ProductForm