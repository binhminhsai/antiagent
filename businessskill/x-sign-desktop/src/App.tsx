import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import WizardLayout from './layouts/WizardLayout';
import DocumentUpload from './pages/DocumentUpload';
import SignerConfig from './pages/SignerConfig';
import SignaturePlacement from './pages/SignaturePlacement';
import ExecutionGate from './pages/ExecutionGate';
import SignatureStatus from './pages/SignatureStatus';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/app" element={<WizardLayout />}>
          <Route index element={<Navigate to="/app/upload" replace />} />
          <Route path="upload" element={<DocumentUpload />} />
          <Route path="placement" element={<SignaturePlacement />} />
          <Route path="config" element={<SignerConfig />} />
          <Route path="execute" element={<ExecutionGate />} />
          <Route path="status" element={<SignatureStatus />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
