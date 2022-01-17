import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <ul>
          <li><b>Fetch</b>: retrieve a message from a queue</li>
          <li><b>Move</b>: move(or copy if acknowledge is disabled) a number of messages between two queues</li>
          <li><b>Insert</b>: insert a message into a queue</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
