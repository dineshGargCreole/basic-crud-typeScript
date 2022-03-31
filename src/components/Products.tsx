import React, {useState, useEffect} from 'react'
import {Table, Space, Button, Divider} from 'antd'
import {IProduct} from './AppInterface'
import {Link} from 'react-router-dom'


interface IProps {
  products: IProduct[]
  deleteProducts: (id: number) => void
  editProductStart: (id: number) => void
}

function Products(props: IProps) {

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text:any, record:IProduct) => {
        return <img src={record?.image} alt='No Image' style={{height: '80px', width: '80px'}} />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record:IProduct) => {
        return <Space>
          <Button onClick={() => props.editProductStart(record.id)}>Edit</Button>
          <Button onClick={() => props.deleteProducts(record.id)}>Delete</Button>
        </Space>
      }
    }
  ];

  return (
    <div>
      <Link to='/add'>New Product</Link>
      <Divider />
      <Table
        dataSource={props.products}
        columns={columns}
        rowKey={row => row.id}
      />
    </div>
  )
}

export default Products