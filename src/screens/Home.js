import { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import Row from '../components/Row';
import { useUser } from '../context/useUser';

const url = 'http://localhost:3001'

function Home() {
  const {user} = useUser()
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    axios.get(url)
    .then(res => {
      setTasks(res.data)
    }).catch(error=>{
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }, [])

  const addTask = () => {
    const headers = {headers: {Authorization: user.token}}

    axios.post(url + '/create', { description: task }, headers)
      .then(res => {
        setTasks([...tasks, { id: res.data.id, description: task }])
        setTask('')
      }).catch(error => {
        alert(error.response.data.error ? error.response.data.error : error)
      })
  }

  const deleteTask = (id)=>{
    const headers = { headers: { Authorization: user.token } }

    axios.delete(url + '/delete/' + id, headers)
    .then(res=>{
      const withoutRemoved = tasks.filter(item=>item.id !== id)
      setTasks(withoutRemoved)
    }).catch(error=>{
      alert(error.response.data.error ? error.response.data.error : error)
    })
  }

  return (
    <div id='container'>
      <h3>Todo</h3>
      <form>
        <input
        type="text"
        placeholder='Add new task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={e=>{
          if(e.key === 'Enter'){
            e.preventDefault()
            addTask()
          }
        }}
        />
      </form>
      <ul>
        {
        tasks.map(item => (
          <Row key={item.id} item={item} deleteTask={deleteTask} />
        ))
        }
      </ul>
    </div>
  );
}

export default Home;
