import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Conteiner from './components/layout/Conteiner'
import Home from './components/pages/Home';
import Projetos from './components/pages/Projetos'
import Projeto from './components/pages/Projeto';
import NewProject from './components/pages/NewProject';

function App() {  

  return (
    <>
      <Router>
        <Header />
        <Conteiner customClass='min-height'>
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/Projetos' element={<Projetos />}/>
              <Route path='/Projeto/:id' element={<Projeto />}/>
              <Route path='/NewProject' element={<NewProject />}/>
          </Routes>
        </Conteiner>
        <Footer />
      </Router>
    </>
  );
}

export default App;

/**/