import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/Products'
import {Routes, Route, useNavigate} from 'react-router-dom'
import AddProduct from './components/AddProduct'
import {IProduct} from'./components/AppInterface'
import axios from 'axios'
import EditProduct from './components/EditProduct'


function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editKey, setEditKey] = useState<number|null>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/products')
    .then(res => setProducts(res.data))
  },[]);

  const deleteProducts = (id: number) => {
    const newProducts = products.filter((product:IProduct) => product.id !== id);
    setProducts(newProducts);
  }

  const addProduct = (product: IProduct) => {
    setProducts([{...product, id:Math.floor(Math.random()*100)}, ...products])
  }

  const editProductStart = (id:number) => {
    setEditKey(id);
    navigate(`/${id}`);
  }

  const editProduct = (product: IProduct) => {
    const updatedProduct = {
      ...product,
      id: editKey,
    }
    const newProducts = products.map((item: IProduct) => {
      return (
        item.id === updatedProduct.id ? product : item
      )
    })
    setProducts(newProducts)
    setEditKey(null)
    navigate('/')
  }

  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Products products={products} deleteProducts={deleteProducts} editProductStart={editProductStart} />} />
        <Route path='add' element={<AddProduct addProduct={addProduct} />} />
        <Route path='/:id' element={<EditProduct products={products} editProduct={editProduct} />} />
      </Routes>
    </div>
  );
}

export default App;
