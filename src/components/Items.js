import React from 'react'
import heart from '../images/heart-solid.svg'
import trash from '../images/trash-can-solid.svg'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const style = {
  p_sm: {
    fontSize: '10px'
  }
}

const Items = (props) => {
  const data = props.cartItem

  const dispatch = useDispatch()

  const addData = (payload) => {
    return {
      type: 'ADD_DATA',
      payload
    }
  }

  const deleteData = (payload) => {
    return {
      type: 'DELETE_DATA',
      payload
    }
  }

  const sendAddData = (id) => {
    dispatch(addData(id))
  }
  
  const sendDeleteData = (id) => {
    dispatch(deleteData(id))
  }

  const removeItem = () => {
    Swal.fire({
      title: 'Sorry',
      text: 'Yay u clicked remove item button, but sorry that because this only modal feature',
      icon: 'question'
    })
  }

  const whislist = () => {
    Swal.fire({
      title: 'Sorry',
      text: 'Yay u clicked move to whislist button, but sorry that because this only modal feature',
      icon: 'success'
    })
  }

  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={item.id_product}>
            <div className="card mb-3 border-0" style={{maxWidth: '100%'}}>
              <div className="row g-0">
                <div className="col-md-3">
                  <img 
                    src={item.img}
                    className="img-fluid rounded-3"
                    alt="..." 
                    style={{ height: '200px', width: '100%' }}/>
                </div>
                <div className="col-md-9">
                  <div className='row'>
                    <div className='col-9'>
                      <div className="card-body">
                        <h5 className="card-title">{item.item}</h5>
                        <p>{item.title}</p>
                        <div className='row mt-3'>
                          <p className='col-12' style={style.p_sm}>Color: {item.color}</p>
                          <p className='col-12' style={style.p_sm}>Size: {item.size}</p>
                        </div>
                        <div className='row mt-3'>
                          <p className='col-6 text-secondary' onClick={() => removeItem()} style={{ fontSize: '10px', cursor: 'pointer' }}><img src={trash} alt='...' style={{ width: '10px', color: 'gray'}} /> REMOVE ITEM</p>
                          <p className='col-6 text-secondary' onClick={() => whislist()} style={{ fontSize: '10px', cursor: 'pointer' }}><img src={heart} alt='...' style={{ width: '10px', color: 'gray'}} /> MOVE TO WHISLIST</p>
                        </div>
                      </div>
                    </div>
                    <div className='col-3' style={{ position: 'relative' , padding: ' 0 10px 0 10px'}}>
                      <div className='row mt-3'>
                        <div className='col-3 border border-end-0 rounded-start d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => sendDeleteData(item.id_product)}> - </div>
                        <div className='col-3 border d-flex justify-content-center'> {item.total} </div>
                        <div className='col-3 border border-start-0 rounded-end d-flex justify-content-center' style={{ cursor: 'pointer' }} onClick={() => sendAddData(item.id_product)}> + </div>
                      </div>
                      <div>
                        <small style={style.p_sm}>(Note, 1 per price)</small>
                      </div>
                      <div style={{ position: 'absolute', bottom: '20px', right: '35px' }}>
                        <h5>{`$${item.price}`}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { data[index + 1] ? (<hr className='mb-4'/>) : ( '' ) }
          </div>
        )
      })}
    </>
  )
}

export default Items