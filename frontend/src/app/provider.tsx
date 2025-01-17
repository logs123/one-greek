import { store } from '../stores/store';
import { Provider } from 'react-redux';

type AppProviderProps = {
    children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default AppProvider;