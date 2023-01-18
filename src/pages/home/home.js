import './home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import ModalProduct from '../../components/home/modalProduct'

export default function Home() {
  const [info, setInfo] = useState()
  const [data, setData] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getProducts()
  }, [])

  const showModalProduct = (data) => {
    setInfo(data)
    setModal(true)
  }

  const getProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/v1/store/product/all')
    setData(response.data.products)
  }

  return (
    <div>
      <div className='header'>
        <img src={logo} className='imageLogo' alt='Hulk Store' ></img>
        <p className='titleHeader' >Hulk Store</p>
      </div>
      <div className='container' >
        <div className='containerDescription' >
          <p className='descriptionText' >
            Hola, somos Hulk Store! Aqui podras encontrar todo tipo de productos, desde camisetas, vasos, comics, juguetes y accesorios basados en los superheroes de Marvel y DC comics, incluso algunos alternativos creados por la comunidad.
          </p>
        </div>
        <h1 className='ourProducts' >
          Nuestros productos:
        </h1>
        <div className='containerProducts' >
          {data.map((product, index) =>
            <div className='containerInfoProduct' key={index} >
              <div className='rowDetail' >
                <p className='nameProduct' >{product.name}</p>
                <p className='buttonDetail' onClick={() => showModalProduct(product)} data-cy={'see_more_' + index} > Ver mas + </p>
              </div>
              <img src={product.image} className='imageProduct' alt={product.name} ></img>
            </div>
          )}
        </div>
        {modal ? <ModalProduct info={info} setModal={setModal} /> : null}
      </div>
    </div>
  );
}
