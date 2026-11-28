import { HashRouter, Routes, Route } from 'react-router-dom';
import MainView from './components/MainView';
import ReposView from './components/ReposView';
import { useGitHubData } from './hooks/useGitHubData';
import './App.css';

function App() {
  useGitHubData();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/repos" element={<ReposView />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
