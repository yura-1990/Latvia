import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { apiCall, clear } from "./api";

const slice = createSlice({
  name: "home",
  initialState: {
    home: [],
    selects: [ "input","select","number"],
    oneData:''
  },
  reducers: {
    getFromResponse: (state, action) => {
      state.home = action.payload;
    },
    postFrom: (state, action) => {
      state.home.unshift(action.payload) 
      toast.success("Data saved successfully");
    },
    getOne: (state, action) => {
      state.oneData = action.payload;
    },
  },
});

export const getHome = () =>
  apiCall({
    url: "api/v1/documents",
    method: "get",
    onSuccess: slice.actions.getFromResponse.type,
    headers: { "API-KEY": "secret-api-key" },
  });
  
export const postHome = (data) =>
  apiCall({
    url: "api/v1/documents/create",
    method: "post",
    data,
    onSuccess: slice.actions.postFrom.type,
    headers: { "API-KEY": "secret-api-key" },
  });
  
export const getOneHome = (id) =>
  apiCall({
    url: "api/v1/document/" + id,
    method: "get",
    onSuccess: slice.actions.getOne.type,
    headers: { "API-KEY": "secret-api-key" },
  });
  
 

export default slice.reducer;
