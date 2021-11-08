import './App.css';
import Navbar from './components/Navbar';
import styles from './styles'

function App() {
  return (
    <div>
      <div style={{height: '100%',width: '200px',left: '0px', backgroundColor: '#1f3044'}}>
        <Navbar />
      </div>
      <div>
        <p>initial text</p>
      </div>
    </div>
  );
}

export default App;
