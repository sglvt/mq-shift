import './App.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';


const rootElement = document.getElementById("root");
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="fetch" element={<FetchPage />} />
//       </Routes>
//     </BrowserRouter>,
//     rootElement
//   );
// }



function App() {
  return (
    <div className="App">
      <p>initial text</p>
    </div>
  );
}

export default App;
