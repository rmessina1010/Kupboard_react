import './App.css';
import Main from './components/mainComponent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </ BrowserRouter>

  );
}
export default App;