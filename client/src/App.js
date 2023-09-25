import React, {useEffect, useState} from 'react'
import axios from 'axios';

function App() {
  const [backendData, setBackendData] = useState({});
  const BASEADDRESS = 'http://localhost:5000'

  useEffect(() =>{
    
      axios
        .get(`${BASEADDRESS}/api`)
        .then((response) => {
          console.log(response.data.users);
          setBackendData(response.data)
        })
        ;
    
    
  }, [])

  return (
    <div>
      {/* ternery operator */}
      {
        ( backendData.users === undefined)
        ?
        (<p>Loading...</p>)
        :
        (backendData.users.map((user) => {
          return (<p key={user.id}>  {user.data}  </p>)
        }))
      }
    </div>
  )
}

export default App