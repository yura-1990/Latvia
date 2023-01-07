import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import {postHome} from '../store/home'


 function Form({selects, postHome}) {
  const [formItems, setFormItems] = useState([{
      "field_seq": "",
      "is_mandatory": 0,
      "field_type": 0,
      "field_name": "",
      "select_values": [{
          "value": true,
          "label": "Agree"
        },
        {
          "value": false,
          "label": "Disagree"
        }
      ]
    },
  ])
  const [titleName, setTitleName]=useState('')
  const navigate = useNavigate();
  
  function addForm(){
    setFormItems(prev=>[...prev, {
      "field_seq": "",
      "is_mandatory": 0,
      "field_type": 0,
      "field_name": "",
      "select_values": [{
          "value": false,
          "label": "Agree"
        },
        {
          "value": false,
          "label": "Disagree"
        }
      ]
    },])
  }
  
  
  function getTitleName(value){
    setTitleName(value)
  }
  
  function getInputValue(i,value){
    let formItem = [...formItems ]
    formItem[i].field_seq = value
    setFormItems(formItem)
  }
  
  function getSelectValue(i,value){
    let formItem = [...formItems]
    formItem[i].field_type = value
    setFormItems(formItem)
  }
  
  function getFieldName(i,value){
    let formItem = [...formItems ]
    formItem[i].field_name = value
    setFormItems(formItem)
  }
  
  function getIsMendatiry(i,value, isAgree){
    const formItem = [...formItems]
    formItem[i].is_mandatory = value
    if (isAgree) {
      formItem[i].select_values[0].value = true
      formItem[i].select_values[1].value = false
    } else {
      formItem[i].select_values[0].value = false
      formItem[i].select_values[1].value = true
    }
    setFormItems(formItem)
  }
  
  function getData() {
    
    const data = {
      "document_name": titleName,
      "form_values": formItems
    }
    
    if (titleName!=="") {
      postHome(data);
      navigate('/')
    }
  }
  
  
  return (
    <div className='container'>
      <div className='col-5 mx-auto mt-5'>
        <form className='form'>
          <label className='fw-bold mb-3 fs-3'>Document title</label>
          <input type="text" onChange={(e)=>getTitleName(e.target.value)} className='form-control'/>
          <hr/>
          {
            formItems.map((el,i)=><div key={i}>
              <div className='md-col-4'>
                <div className='mt-3'>
                  <label className='fs-5'>Field sequence (weight)</label>
                  <input type="text" defaultValue={el.field_seq} onChange={(e)=>getInputValue(i, e.target.value)} className='form-control' />
                </div>
                <div className='mt-3'>
                  <label className='fs-5'>Field type</label>
                  <select  className='form-select'  onChange={(e)=>getSelectValue(i, e.target.value)}>
                    {
                      selects?.map((el,i)=><option value={i} key={i}>{el}</option>)
                    }
                  </select>
                </div>
                <div className='mt-3'>
                  <label className='fs-5' >Field name</label>
                  <input type="text" defaultValue={el.field_name} onChange={(e)=>getFieldName(i,e.target.value)} className='form-control'/>
                </div>
                <div className='mt-3 d-flex gap-3 align-items-center'>
                  <input onChange={(e)=>getIsMendatiry(i, e.target.checked ? 1 : 0, e.target.checked)} checked={el.is_mandatory} type="checkbox" id={'mandatory'+i}/>
                  <label className='fs-5'  htmlFor={'mandatory'+i}>Mandatory</label>
                </div>
                <hr/>
              </div>
            </div>)
          }
          <div className='d-flex justify-content-between'>
            <button onClick={addForm} type='button' className='btn btn-outline-secondary'>Add more</button>
            <button className='btn btn-primary'  type='button' onClick={getData}>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default connect(({home:{selects}})=>({selects}), {postHome})(Form)