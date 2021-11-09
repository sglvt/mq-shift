import { PureComponent } from 'react';
import Navbar from './Navbar';
import SearchInput from './SearchInput';
import filterQueue from './QueueList';
import QueueResults from './QueueResults';

export default class FetchPage extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      filteredQueue: filterQueue("", 20)
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredQueue: filterQueue(event.target.value, 20)
    });
  };
  
  render() {
    return (
      <div>
        <div>
          <Navbar />
          <SearchInput textChange={this.handleSearchChange} />
        </div>
        <div>
          <p>Fetching a message</p>
          <QueueResults queueData={this.state.filteredQueue} />
        </div>
      </div>
    );
  }
}