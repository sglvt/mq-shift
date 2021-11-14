import React, { useState } from 'react';
import Select from 'react-select';
import Navbar from './Navbar';

// async function getQueueList() {
//   var response = await fetch("http://localhost:8080/queue-list")
//   console.log(response);
// }

const getQueueList = async () => {
  try {
    const response = await fetch('http://localhost:8080/queue-list', {mode:'cors'});
    const data = await response.json();
    console.log({ data })
  }
  catch (e) {
    console.log(e)
  }
}

function FetchPage() {
  
  var data = ["turqoise", "orange"]
  // var data = [
  //   {
  //     value: 1,
  //     label: "orange"
  //   },
  //   {
  //     value: 2,
  //     label: "fuchsia"
  //   },
  //   {
  //     value: 3,
  //     label: "red"
  //   },
  //   {
  //     value: 4,
  //     label: "aqua"
  //   },
  //   {
  //     value: 5,
  //     label: "purple"
  //   },
  //   {
  //     value: 6,
  //     label: "turquoise"
  //   }
  // ];

  // data = getQueueList()

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState(1);

  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedValue(e.value);
  }

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
                <div style={{ width: "20em" }}>
                  <Select
                    placeholder="Select Option"
                    // value={data.find(obj => obj.value === selectedValue)} // set selected value
                    value={data.find(obj => obj === selectedValue)}
                    options={data}
                    onChange={handleChange}
                    className="selectQueue"
                  />
                </div>
              </td>
              <td>
                <p>{data[selectedValue-1]}</p>
              </td>
            </tr>
            <tr>
              <td>
                <label for="quantity">Quantity (between 1 and 10): </label>
                <input type="number" id="quantity" name="quantity" min="1" max="10"></input>
              </td>
            </tr>
            <tr>
              <td>
                {selectedValue && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                  <div><b>Selected Value: </b> {selectedValue}</div>
                </div>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default FetchPage;