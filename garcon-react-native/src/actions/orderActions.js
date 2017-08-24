import { ORDER_FETCH_START, ORDER_FETCH_SUCCESS, ORDER_FETCH_ERROR,
         ORDER_NEW_START, ORDER_NEW_SUCCESS, ORDER_NEW_ERROR,
         EDIT_PRODUCT, ADD_PRODUCT, REMOVE_PRODUCT ,INRECREMENT_PRODUCT, DECREMENT_PRODUCT } from '../actions/types'

import { Toast } from 'native-base';
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import Server from '../constants/Server';

let server = Server.address;
let port = Server.port;

export const fetchOrder = () => {
  return (dispatch) => {
    dispatch({ type: ORDER_FETCH_START });
    fetch('http://' + server + ':' + port + '/api/order', {
           method: 'GET',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
          })
      .then((response) => response.json())
      .then((responseJson) => { fetchOrderSuccess(dispatch, responseJson) })
      .catch((error) => { fetchOrderFail(dispatch, error) });
  }
};

export const fetchOrderSuccess = (dispatch, responseJson) => {
  dispatch({ type: ORDER_FETCH_SUCCESS, payload: responseJson.result });
}

export const fetchOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_FETCH_ERROR });

  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}

export const newOrder = (order) => {
  return (dispatch) => {
    dispatch({ type: ORDER_NEW_START });
    fetch('http://' + server + ':' + port + '/api/order', {
           method: 'POST',
           headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
           body: JSON.stringify({ tableNumber: order.tableNumber,
                                  listProduct: order.listProduct,
                                  totalPrice: order.totalPrice,
                                  waiter: order.waiter._id
                                })
          })
      .then((response) => response.json())
      .then((responseJson) => { newOrderSuccess(dispatch, responseJson) })
      .catch((error) => { newOrderFail(dispatch, error) });
  }
}

export const newOrderSuccess = (dispatch, responseJson) => {
  dispatch({ type: ORDER_NEW_SUCCESS });
  Toast.show({ text: "Ordine confermato!", position: 'bottom', buttonText: 'Ok', duration: 4000, type: 'success' })
}

export const newOrderFail = (dispatch, error) => {
  dispatch({ type: ORDER_NEW_ERROR });
  Toast.show({ text: "Qualcosa è andato storto", position: 'bottom', duration: 3000, type: 'danger' })
  console.log(error);
}

export const editProduct = (product, index, navigation) => {
  return (dispatch) => {
    dispatch({ type: EDIT_PRODUCT, payload: product, index: index});
    Toast.show({ text: product.name + " modificato!", position: 'bottom', duration: 3000, type: 'success' })
    if(navigation) navigation.goBack()
  }
}

export const addProduct = (product, navigation) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
    Toast.show({ text: product.name + " aggiunto!", position: 'bottom', duration: 3000, type: 'success' })
    if(navigation) navigation.goBack()
  }
}

export const removeProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_PRODUCT, payload: product });
    Toast.show({ text: product.name + " rimosso!", position: 'bottom', duration: 3000, type: 'success' })
  }
}

export const incrementProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: INRECREMENT_PRODUCT, payload: product });
    Toast.show({ text: product.name + " incrementato!", position: 'bottom', duration: 3000, type: 'success' })
  }
}

export const decrementProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: DECREMENT_PRODUCT, payload: product  });
    Toast.show({ text: product.name + " decrementato!", position: 'bottom', duration: 3000, type: 'success' })
  }
}
