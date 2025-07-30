import './App.css'
import AnimalGuardianPage from "./Page/AnimalGuardianPage"
import AnimalPage from './Page/AnimalPage';
import AnimalConsultPage from './Page/AnimalConsultPage';
import AnimalGuardianConsultPage from './Page/AnimalGuardianConsultPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>  
      <div className="App">
        <Routes>
          <Route path="/animal-guardian" element={<AnimalGuardianPage />} />
          <Route path="/animal" element={<AnimalPage />} />
          <Route path="/animal-consult" element={<AnimalConsultPage />} />
          <Route path="/animal-guardian-consult" element={<AnimalGuardianConsultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
