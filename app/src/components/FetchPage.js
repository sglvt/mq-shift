import Navbar from './Navbar';

export default function FetchPage() {  
    return (
      <div>
      <div style={{height: '100%',width: '200px',left: '0px', backgroundColor: '#1f3044'}}>
        <Navbar />
      </div>
      <div>
        <p>Fetching a message</p>
      </div>
    </div>
    );
}