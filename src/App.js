import './App.css';
import Main from './components/mainComponent';
import { BrowserRouter } from 'react-router-dom';

function App() {
  console.log(process.env.REMOTE_SERVER);
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </ BrowserRouter>

  );
}
export default App;