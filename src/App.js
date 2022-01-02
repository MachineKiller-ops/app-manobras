import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Main from './Pages/Main';
import Nav from './Pages/Nav';

//import './App.css';

function App() {
  return (
    <Router>

      <div>

        <Nav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          {/* <Route path="/simula" exact component={Lista} />
          <Route path="/simula/:id" component={Simula} />
          <Route path="/elabora" exact component={ListaElab} />
          <Route path="/elabora/:id" component={Elabora} />
          <Route path="/configurase" exact component={ListaConf} />
          <Route path="/configurase/:id" component={ConfiguraSE} /> */}
        </Routes>

      </div>

    </Router>
  );
}

export default App;
