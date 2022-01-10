import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Main from './Pages/Main';
import Elabora from './Pages/Elaborar/Elabora';
import Configura from './Pages/Configurar/Configura';
//import Simula from './Pages/Simula';
import Nav from './Pages/Nav';
//import Lista from './Pages/Lista';
import ListaElab from './Pages/Elaborar/ListaElab';
import ListaConf from './Pages/Configurar/ListaConf';

//import './App.css';

function App() {
  return (
    <Router>

      <div>

        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          {/* <Route exact path="/simula" element={<Lista />} />
          <Route path="/simula/:id" element={<Simula />} /> */}
          <Route exact path="/elabora" element={<ListaElab />} />
          <Route path="/elabora/:id" element={<Elabora />} />
          <Route exact path="/configurase" element={<ListaConf />} />
          <Route path="/configurase/:id" element={<Configura />} />
        </Routes>

      </div>

    </Router>
  );
}

export default App;
