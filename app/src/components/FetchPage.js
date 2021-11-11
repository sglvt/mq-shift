import { PureComponent } from 'react';
import Navbar from './Navbar';
import SearchInput from './SearchInput';
import filterQueues from './QueueList';
import QueueResults from './QueueResults';

export default class FetchPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredQueues: filterQueues("", 20),
      selectedQueue: ""
    };
  }

  handleSearchChange = event => {
    this.setState({
      filteredQueues: filterQueues(event.target.value, 20)
    });
  };

  handleQueueSelection = event => {
    this.setState({
      selectedQueue: filterQueues(event.target.value, 20)
    });
  };

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <SearchInput textChange={this.handleSearchChange} />
                  <QueueResults queueData={this.state.filteredQueues} />
                </td>
                <td>
                  <p>Fetching a message</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}