import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getHome, getOneHome } from '../store/home'

function Post({home, getHome, getOneHome }) {
  const [visible, setVisible] = useState(false)
  const [currentData, setCurrentData] = useState('')
  
  useEffect(()=>{
    getHome()
  }, [])
  
  function toggle() {
    setCurrentData('')
    setVisible(prev=>!prev)
  }
  
  function getOne(id){
    getOneHome(id)
  }
  
  function handleEdit(item) {
    setVisible(true)
    setCurrentData(item)
  }
  
  return (
    <div className='vh-100 d-flex flex-column '>
      <div>
        <Link to="/create" onClick={toggle} className='float-right btn btn-primary float-end my-4 '>New document form</Link>
      </div>
      <table className="table shadow rounded table-hover table-striped">
        <thead>
          <tr key="">
            <th>ID</th>
            <th>DOCUMENT TITLE</th>
            <th>CREATED DATA</th>
            <th>DOCUMENT SIZE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            home.map((el,i)=><tr key={i} className='py-3'>
              <td>{ el.id }</td>
              <td>{ el.document_name }</td>
              <td>{ el.created_at }</td>
              <td>{ el.field_count }</td>
              <td><Link className='text-decoration-none' onClick={()=>getOne(el.id)} to={`/preview/${el.id}`}>Document preview</Link></td>
            </tr>)
          }        
        </tbody>
      </table>
    </div>
  )
}

export default connect(
  /* State */
  ({
    home:{home},
    
  })=>({
    home,
    
  }),
  /* Action */
  {getHome, getOneHome}
)(Post)
