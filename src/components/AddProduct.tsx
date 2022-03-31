import React from 'react'
import {Divider} from 'antd'
import {IProduct} from './AppInterface'
import {Link} from 'react-router-dom'
import {getBase64} from './utils'
import ProductForm from './ProductForm'

interface IProps {
  addProduct: (product: IProduct) => void
}


function AddProduct(props: IProps) {
  
  const handleFinish = async (data: any) => {
    const imageUrl: any = await getBase64(data.image.fileList[0].originFileObj)
    if(imageUrl){
      props.addProduct({...data, image:imageUrl})
    }
  }

  return (
    <div style={{padding: '50px'}}>
      <Link to='/'>Home</Link>
      <Divider />
      <ProductForm handleFinish={handleFinish} />
    </div>
  )
}

export default AddProduct