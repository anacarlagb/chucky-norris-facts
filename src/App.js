//import logo from './logo.svg';
//import './App.css';
import {ChuckNorris} from "./ChuckNorris";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
              <h3 className="p-3 text-center">ChuckNorris API</h3>
              <ChuckNorris />
          </div>
      </header>
    </div>
  );
}

export default App;
