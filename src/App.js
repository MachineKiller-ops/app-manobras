import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Main from './Pages/Main';
import Elabora from './Pages/Elaborar/Elabora';
import Configura from './Pages/Configurar/Configura';
import CriarSub from './Pages/Criar/CriarSub';
//import Simula from './Pages/Simula';
import Nav from './Pages/Nav';
//import Lista from './Pages/Lista';
import ListaElab from './Pages/Elaborar/ListaElab';
import ListaConf from './Pages/Configurar/ListaConf';
import ListaCriar from './Pages/Criar/ListaCriar';

//import './App.css';

function App() {
  return (
    <Router>

      <div>

        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/elabora" element={<ListaElab />} />
          <Route path="/elabora/:id" element={<Elabora />} />
          <Route exact path="/configurase" element={<ListaConf />} />
          <Route path="/configurase/:id" element={<Configura />} />
          <Route exact path="/criar" element={<ListaCriar />} />
          <Route path="/criar/:id" element={<CriarSub />} />
          
        </Routes>

      </div>

    </Router>
  );
}

export default App;
