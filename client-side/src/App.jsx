import './App.css'
import { Link } from 'react-router-dom';

function App() {


  return (
    <>
      <h1>Client-Side</h1>
      <Link to='/insert_AData'>
        <button>
          Insert Data
        </button>
      </Link>
      <Link to='/read_all_data'>
        <button>
          Read All Data
        </button>
      </Link>
    </>
  )
}

export default App
