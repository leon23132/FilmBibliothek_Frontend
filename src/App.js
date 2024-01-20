import './Reqeusts';
import { GlobalNavigation } from './GlobalNavigation';

export default function App() {

    return (
        <div className="App">
            <header className="bg-dark text-white text-center h4 p-2">
                Film Bibliothek
            </header>
            <body>
                <div>
                    <GlobalNavigation />
                </div>
            </body>
        </div>
    );
}
