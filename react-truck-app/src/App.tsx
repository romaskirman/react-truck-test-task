import { Route, Routes } from 'react-router-dom';
import CatalogPage from './components/CatalogPage';
import { BrowserRouter } from 'react-router-dom';

const App = () => {

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="*" element={<div>404 (Not Found)</div>} />
                </Routes>
            </div>           
        </BrowserRouter>
    );
};

export default App;