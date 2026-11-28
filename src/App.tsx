import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './components/MainView';
import ReposView from './components/ReposView';
import { useGitHubData } from './hooks/useGitHubData';
import './App.css';

function App() {
  useGitHubData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/repos" element={<ReposView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
