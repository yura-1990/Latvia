import axios from "axios"

const api = ({dispatch})=>(next)=>(action)=>{
  
  if (action.type !== 'api/apiCall') {
    next(action)
    return
  }
  
  next(action)
  
  const {url, method, data, onSuccess, onFailed, headers} = action.payload
  axios({ baseURL: 'http://20.100.188.165:8083/', url, method, data, headers},
      
  )
    .then(res=>{dispatch({type:onSuccess,payload: res.data})})
    .catch(err=>{dispatch({type: onFailed, payload: err.data})})
  
}

export default api