import HomeScreen from './Screens/HomeScreen';
import { v4 as uuidV4 } from 'uuid';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<Navigate to={`/documents/${uuidV4()}`} />}
          />
          <Route path="/documents/:id" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
