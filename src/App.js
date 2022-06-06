//import logo from './logo.svg';
import './App.css';
import {ChuckNorris} from "./components/ChuckNorris";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
              <h3 className="p-3 text-center">ChuckNorris API</h3>
              <ChuckNorris />
          </div>
      </header>
    </div>
  );
}

export default App;
