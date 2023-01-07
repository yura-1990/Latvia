import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getOneHome } from '../store/home'


 function Preview({home,oneData,getOneHome}) {
  const [gender, setGender] = useState(['Male', 'Female'])
  const navigate = useNavigate();
  const {id} = useParams()
  
  useEffect(()=>{
    getOneHome(id)
  }, [id])
  
  function goHome() {
    navigate('/')
  }
  
  console.log(oneData);
  
  return (
    <div className='conatiner'>
      <div className='col-6 mx-auto'>
        <h1 className='text-center my-5'>Document title</h1>
        <div> 
          <div className="mt-3">
            <label>Name</label>
            <input type="text" defaultValue={oneData.document_name} className='form-control'/>
          </div>
          <div className="mt-3">
            <label>Gender</label>
            <select className='form-control'>
              {
                gender.map((el,i)=><option value={el} key={i}>{el}</option>)
              }
            </select>
          </div>
          <div className="mt-3">
            <label>Age</label>
            <input type="text" className='form-control'/>
          </div>
          <button onClick={goHome} className='btn mt-4 btn-primary'> Back</button>
        </div>
      </div>
    </div>
  )
}

export default connect(({home:{home, oneData}})=>({home, oneData}), {getOneHome})(Preview)
