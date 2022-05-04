import React from 'react';
import {SlidingTable} from './sliding_table'
import './App.css';
import { stat } from 'fs';

interface State {
  slidingColumn: number | null;
  headerOrder: number[];
  mouseStart: number;
  mouseCurrent: number;
  slidingColumnStart: number;
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
    super(props);
    this.state = {
      slidingColumn: null,
      headerOrder: [4, 0, 1, 2, 3],
      mouseStart: 0,
      mouseCurrent: 0,
      slidingColumnStart: 0
    };
  }

  public render(): JSX.Element {
    return (
      <div className="App">
        <SlidingTable
          headerOrder={this.state.headerOrder}
          header={headers}
          data={data}
          slidingColumnXPosition={this.state.slidingColumnStart + this.state.mouseCurrent - this.state.mouseStart}
          slidingColumn={this.state.slidingColumn}
          onMouseDown={this.onMouseDown}
          onMouseUp={() => {this.setState({slidingColumn: null})}}
          onMouseMove={this.onMouseMove}/>
      </div>
    );
  }

  private onMouseDown = (x: number, col: number) => {
    console.log(x, col, this.state.headerOrder.indexOf(col))
    const slidingColumnOffset = this.state.headerOrder.indexOf(col)
    this.setState({
      mouseCurrent: x,
      mouseStart: x,
      slidingColumn: col,
      slidingColumnStart: slidingColumnOffset * column_width
    });
  }

  private onMouseMove = (newCurrent: number) => {
    console.log(newCurrent - this.state.mouseStart)
    this.setState({
      mouseCurrent: newCurrent
    });
  }

  private onThresholdCrossed = () => {
    
  }

}

const headers = ['Color', 'Type', 'Name', 'Price', 'Available']

const data = [
  ['Red', 'Instant', 'Fling', '2.00', 'No'],
  ['Green', 'Creature', 'Jungle Lion', '0.10', 'No'],
  ['Green', 'Instant', 'Giant Growth', '0.5', 'Yes'],
  ['White', 'Instant', 'Steppe Lynx', '03.00', 'Yes']
]

const column_width = 150;

export default App;
