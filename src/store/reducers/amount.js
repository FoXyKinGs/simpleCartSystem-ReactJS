import update from 'immutability-helper'

const initialState = {
    cartAmount: [
        {   
            id: 0,
            id_product: 1,
            item: 'Black T-Shirt',
            title: 'T-shirt (short) - Black',
            img: 'https://img.freepik.com/free-psd/black-t-shirt-mockup_125540-430.jpg?t=st=1648549160~exp=1648549760~hmac=a54e0889721a27d951c31c27fabb28c3d7447edd2a7e280f71e483395fc1c9c8&w=740',
            color: 'black',
            size: 'M',
            price: 10,
            total: 1
        },
        {
            id: 1,
            id_product: 2,
            item: 'Black and Yellow casual hoodie',
            title: 'Hoodie (long) - Black and Yellow ',
            img: 'https://ae01.alicdn.com/kf/Sc2056fb679a8480abc10f489a264782aZ/Wetailor-2022-Baru-Hoodie-Sweatshirt-Pria-Hip-Hop-Pullover-Hoodies-Streetwear-Kasual-Mode-Pakaian-Colorblock-Hoodie.jpg_640x640.jpg',
            color: 'black',
            size: 'L',
            price: 17.50,
            total: 1
        }
    ]
}

const amountReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_DATA':
            let indexAdd = state.cartAmount.findIndex(val => val.id_product === action.payload)
            return update(state, {
                cartAmount: {
                    [indexAdd]: {
                        total: {$set: state.cartAmount[indexAdd].total + 1}
                    }
                }
            })
            /* falls through */
        case 'DELETE_DATA':
            let indexDelete = state.cartAmount.findIndex(val => val.id_product === action.payload)
            if (state.cartAmount[indexDelete].total <= 1) {
                return update(state, {
                    cartAmount: {
                        [indexDelete]: {
                            total: {$set: 1}
                        }
                    }
                })
            } else {
                return update(state, {
                    cartAmount: {
                        [indexDelete]: {
                            total: {$set: state.cartAmount[indexDelete].total - 1}
                        }
                    }
                })
            }
            /* falls through */
        default: 
            return state
    }
}

export default amountReducer
