import { configureStore } from "@reduxjs/toolkit";
import home from './home'
import api from "./middleware/api"; 

export default configureStore({
  reducer:{
    home
  },
  middleware:[
    api
  ]
  
})