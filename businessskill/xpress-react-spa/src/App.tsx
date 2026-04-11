import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import ProjectSelector from './pages/ProjectSelector';
import Editor from './pages/Editor';
import TopNavLayout from './components/TopNavLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Layout with TopNav only (Projects & Onboarding) */}
        <Route path="/app" element={<TopNavLayout />}>
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="projects" element={<ProjectSelector />} />
        </Route>

        {/* Editor Layout has specific TerraWP navigations */}
        <Route path="/app/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
