import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Nav from './Pages/Nav';

//import './App.css';

function App() {
  return (
    <div>

                <Nav user={user} />

            </div>
  );
}

export default App;
