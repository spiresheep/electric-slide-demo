import React from 'react';
import {SlidingTable} from './sliding_table'
import './App.css';

interface State {
  currentIndex: number | null;
  headerOrder: number[]
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
    super(props);
    this.state = {
      currentIndex: null,
      headerOrder: [4, 0, 1, 2, 3]
    };
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        <header className="App-header">
          <SlidingTable
            headerOrder={this.state.headerOrder}
            header={headers}
            data={data}
            onMouseDown={(index) => {console.log(index)}}
            onMouseUp={() => {console.log('index cleared')}}/>
        </header>
      </div>
    );
  }
}

const headers = ['Color', 'Type', 'Name', 'Price', 'Available']

const data = [
  ['Red', 'Instant', 'Fling', '2.00', 'No'],
  ['Green', 'Creature', 'Jungle Lion', '0.10', 'No'],
  ['Green', 'Giant Growth', '0.5', 'Yes'],
  ['White', 'Instant', 'Steppe Lynx', '03.00', 'Yes']
]

export default App;
