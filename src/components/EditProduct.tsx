import React, {useState, useEffect} from 'react'
import ProductForm from './ProductForm'
import {useParams} from 'react-router-dom'
import {IProduct} from './AppInterface'
import {Divider} from 'antd'
import {Link} from 'react-router-dom'
import {getBase64} from './utils'

interface IProps {
    products: IProduct[]
    editProduct: (product: IProduct) => void
}


function EditProduct(props: IProps) {
    const params = useParams();
    const [product, setProduct] = useState<IProduct>()

    useEffect(() => {
        const editProduct = props.products.find((item: any) => item.id == params.id)
        setProduct(editProduct)
    },[])

    const handleFinish = async (data: any) => {
      if(typeof data.image !== 'string') {
        const imageUrl = await getBase64(data.image.fileList[0].originFileObj)
        if(imageUrl) {
          props.editProduct({...data, image:imageUrl});
        }
      } else {
        props.editProduct(data)
      }
    }
    
  return (
    <div style={{padding: '50px'}}>
      <Link to='/'>Home</Link>
      <Divider />
      <ProductForm handleFinish={handleFinish} product={product} />
    </div>
  )
}

export default EditProduct