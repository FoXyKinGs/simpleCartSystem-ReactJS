import React, { useState, useEffect } from 'react'
import arrow from '../images/angle-down-solid.svg'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const style = {
  arrowRight: {
    width: '15px',
    position: 'absolute',
    right: '20px',
    top: '17.5px',
    transform: 'rotate(-90deg)'
  },
  arrowDown: {
    width: '15px',
    position: 'absolute',
    right: '20px',
    top: '17.5px',
    transform: 'rotate(0deg)'
  }
}

const Cart = () => {

  const [discount, setDiscount] = useState(false)
  const amount = useSelector((state) => state.amount)
  const [totalAmount, setTotalAmount] = useState(0)
  const [discountCode, setDiscountCode] = useState('')
  useEffect(() => {
    let result = []
    amount.cartAmount.forEach(item => {
      result = [...result, item.price * item.total]
    })
    setTotalAmount(result.reduce((partialSum, a) => partialSum + a, 0))
  }, [amount.cartAmount])

  const buy = () => {
    Swal.fire({
      title: 'Are you sure want to buy this stuff?',
      showDenyButton: true,
      confirmButtonText: 'Buy',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('YAY!!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Checkout canceled', '', 'error')
      }
    })
  }

  const discountButton = () => {
    if (discountCode === '') {
      Swal.fire({
        icon: 'warning',
        title: 'There is no discount code used',
        text: 'Try to use code, example: DISC50%'
      })
    } else if (discountCode === 'DISC50%') {
      Swal.fire({
        icon: 'success',
        title: 'Yay discound code has been added',
        text: 'Try to explore for more info coupun'
      })
      setDiscountCode('')
    } else {
      Swal.fire({
        icon: 'question',
        title: 'Hmm try to use another discount code',
        text: 'Your code has been expire/not valid'
      })
    }
  }

  return (
    <div>
      <div className='p-4 border border-1 rounded-3 shadow'>
        <div className='content'>
          <h5 className='mb-4'>The total amount of</h5>
          <div className='row'>
            <div className='col-8'>
              <p>Temporary amount</p>
            </div>
            <div className='col-4'>
              <p className='float-end'>{
                `$${totalAmount}`
              }</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-8'>
              <p>Shipping</p>
            </div>
            <div className='col-4'>
              <p className='float-end'>Free</p>
            </div>
          </div>
          <hr />
          <div className='row mb-3 flex align-items-center'>
            <div className='col-8 bold'>
              <p className='fw-bold'>The total amount of (including VAT)</p>
            </div>
            <div className='col-4'>
              <p className='fw-bold float-end'>{
                `$${totalAmount}`
              }</p>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-lg fs-6" type="button" onClick={() => buy()}>GO TO CHECKOUT</button>
        </div>
      </div>
      <div className='p-3 border border-1 rounded-3 shadow mt-3' style={{ position: 'relative', cursor: 'pointer' }}>
        <div onClick={() => setDiscount(!discount)}>
          Add a discount code (optional) 
          <img 
          src={arrow} 
          style={ discount ? style.arrowDown : style.arrowRight }
          alt='...'/>
        </div>
        {
          discount ? (
            <div>
              <div className="input-group mt-2">
                <input type="text" className="form-control" placeholder="Discount Code" aria-label="Discount Code" aria-describedby="button-addon2" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)}/>
                <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => discountButton()}>Confirm</button>
              </div>
            </div>
          ) :  (
            <div/>
          )
        }
      </div>
    </div>
  )
}

export default Cart