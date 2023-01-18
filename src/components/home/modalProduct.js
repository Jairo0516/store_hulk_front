import './modalProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCheckout } from '../../reducers/home/actions'

function ModalProduct(props) {
  const dispatch = useDispatch()
  const [checkout] = useSelector(({ checkout }) => [checkout])
  const { cart } = checkout

  const closeModal = () => {
    props.setModal(false)
  }

  const addProduct = (data) => {
    if (data.stock > 0) {
      let newCart = cart
      const exist = containsObject(data, newCart)
      if (!exist) {
        data.cont = 1
        newCart.push(data)
        props.setModal(false)
        dispatch(setCheckout(newCart))
        alert('El producto fue agregado al carrito')
      } else {
        alert('El producto ya se encuentra agregado en el carrito')
      }
    } else {
      alert('El producto no cuenta con cantidades disponibles')
    }
  }

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true
      }
    }
    return false
  }

  return (
    <div className='overlay' >
      <div className='backModal' >
        <p className='closeModal' onClick={() => closeModal()} >
          X
        </p>
        <img src={props.info.image} className='imageProduct' alt={props.info.name} ></img>
        <p className='textModal' >
          {props.info.name}
        </p>
        <p className='textModal'>
          {props.info.description}
        </p>
        <div className='buttonAdd' onClick={() => addProduct(props.info)} data-cy='add_to_cart' >
          Agregar al carrito
        </div>
      </div>
    </div>
  );
}

export default ModalProduct;
