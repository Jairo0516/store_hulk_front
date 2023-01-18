import './checkout.css'
import axios from 'axios'
import { useState } from 'react'
import cartImage from '../../assets/cart.png'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckout } from '../../reducers/home/actions'

function Checkout() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [checkout] = useSelector(({ checkout }) => [checkout])
  const { cart } = checkout

  const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })

  const sumProduct = (index) => {
    let newArray = cart
    newArray[index].cont = newArray[index].cont + 1
    if (newArray[index].cont > newArray[index].stock) {
      newArray[index].cont = newArray[index].stock
      alert('El producto no cuenta con más unidades')
    } else {
      dispatch(setCheckout(newArray))
    }
  }

  const minusProduct = (index) => {
    let newArray = cart
    newArray[index].cont = newArray[index].cont - 1
    if (newArray[index].cont === 0) {
      removeItemFromArr(newArray, newArray[index])
    }
    dispatch(setCheckout(newArray))
  }

  const removeItemFromArr = (arr, item) => {
    var i = arr?.indexOf(item)
    arr?.splice(i, 1)
  }

  const getTotal = () => {
    let count = []
    for (const data of cart) {
      count.push(parseInt(data.value * data.cont))
    }
    let total = count.reduce((a, b) => a + b, 0)
    return total
  }

  const deleteCart = async () => {
    for (const products of cart) {
      const data = new FormData()
      data.append('id', products.id)
      data.append('name', products.name)
      data.append('value', products.value)
      data.append('image', products.image)
      data.append('description', products.description)
      data.append('stock', products.stock - products.cont)
      await axios.put('http://localhost:8080/api/v1/store/product/update', data)
    }
    dispatch(setCheckout([]))
    alert('Tu compra ha finalizado con éxito')
    setOpen(false)
  }

  return (
    !open ?
      <div className='logoCheckout' onClick={() => setOpen(true)} data-cy='open_cart' >
        <img src={cartImage} alt='Carrito' className='cart' ></img>
      </div> :
      <div className='overlayProduct' >
        <div className='backModalProduct' >
          {cart.length > 0 ?
            <>
              <p className='closeCart' onClick={() => setOpen(false)} >X</p>
              <p className='nameProductCart'>Mis productos:</p>
              {cart.map((product, index) =>
                <div className='rowProductCart' key={index} >
                  <img src={product.image} alt={product.name} className='imageProductCart' ></img>
                  <div className='columnProductCart' >
                    <p className='nameProductCart' >{product.name}</p>
                    <div className='rowStock' >
                      <p className='textStock' >
                        Cantidades:
                      </p>
                      <p className='plusMinus' onClick={() => minusProduct(index)} data-cy={'less_product_' + index} >
                        -
                      </p>
                      <p className='textStock' >
                        {product.cont}
                      </p>
                      <p className='plusMinus' onClick={() => sumProduct(index)} data-cy={'sum_product_' + index} >
                        +
                      </p>
                    </div>
                    <p className='valueProductCart' >{formatter.format(product.value * product.cont)}</p>
                  </div>
                </div>
              )}
              <p className='nameProductCart'>Total: {formatter.format(getTotal())}</p>
              <div className='buttonAdd' onClick={() => deleteCart()} data-cy='end_checkout' >
                Finalizar compra
              </div>
            </> :
            <>
              <p className='closeCart' onClick={() => setOpen(false)} >X</p>
              <p className='nameProductCart'>No tienes productos en tu carrito</p>
            </>
          }
        </div>
      </div>
  );
}

export default Checkout;
