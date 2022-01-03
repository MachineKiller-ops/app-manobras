import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Main from './Pages/Main';
import Elabora from './Pages/Elabora';
import Simula from './Pages/Simula';
import Nav from './Pages/Nav';
import Lista from './Pages/Lista';
import ListaElab from './Pages/ListaElab';

//import './App.css';

function App() {
  return (
    <Router>

      <div>

        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/simula" element={<Lista />} />
          <Route path="/simula/:id" element={<Simula />} />
          <Route exact path="/elabora" element={<ListaElab />} />
          <Route path="/elabora/:id" element={<Elabora />} />
          {/*<Route path="/configurase" exact component={ListaConf} />
          <Route path="/configurase/:id" component={ConfiguraSE} /> */}
        </Routes>

      </div>

    </Router>
  );
}

export default App;
