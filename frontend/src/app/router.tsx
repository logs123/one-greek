import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoot from './routes/app/root';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={<AppRoot />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;