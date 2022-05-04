import React from 'react';
import {SlidingTable} from './sliding_table'
import './App.css';

interface State {
  slidingColumn: number;
  originalCol: number;
  headerOrder: number[];
  mouseStart: number;
  mouseCurrent: number;
  slidingColumnXOffset: number;
}

class App extends React.Component<{}, State> {
    constructor(props: {}) {
    super(props);
    this.state = {
      slidingColumn: -1,
      originalCol: 0,
      headerOrder: [4, 0, 1, 2, 3],
      mouseStart: 0,
      mouseCurrent: 0,
      slidingColumnXOffset: -1
    };
  }

  public render(): JSX.Element {
    const slidingColumnXPosition = this.state.slidingColumnXOffset +
      this.state.mouseCurrent - this.state.mouseStart;
    return (
      <div className="App">
        <SlidingTable
          headerOrder={this.state.headerOrder}
          header={headers}
          data={data}
          slidingColumnXPosition={slidingColumnXPosition}
          slidingColumn={this.state.slidingColumn}
          onMouseDown={this.onMouseDown}
          onMouseUp={() => {this.setState({slidingColumn: -1})}}
          onMouseMove={this.onMouseMove}/>
      </div>
    );
  }

  private onMouseDown = (x: number, col: number) => {
    const slidingColumnPos = this.state.headerOrder.indexOf(col)
    this.setState({
      mouseCurrent: x,
      mouseStart: x,
      slidingColumn: col,
      originalCol: slidingColumnPos,
      slidingColumnXOffset: slidingColumnPos * column_width
    });
  }

  private onMouseMove = (newCurrent: number) => {
    if(this.state.slidingColumn > -1) {
      const mouseMoveDelta = newCurrent - this.state.mouseCurrent;
      const mouseOffset = this.state.mouseCurrent - this.state.mouseStart
      this.shouldColumnsSwap(mouseMoveDelta, mouseOffset);
      this.setState({
        mouseCurrent: newCurrent
      });
    }
  }

  private shouldColumnsSwap = (shift: number, difference: number) => {
    if(shift > 0) {
      const stepsFromStart = Math.floor(difference / 75);
      if(stepsFromStart% 2 === 1 || stepsFromStart%2 === -1) {
        const destinationCol = this.state.originalCol + Math.ceil(stepsFromStart / 2);
        const sourceCol = this.state.headerOrder.indexOf(this.state.slidingColumn);
        console.log(destinationCol, sourceCol);
        if(destinationCol != sourceCol) {
          this.swapColumns(
            sourceCol,
            destinationCol
          );
        }
      }
    } else if(shift < 0) {
      const stepsFromStart = Math.floor(difference / 75);
      console.log(stepsFromStart)
      if(stepsFromStart% 2 === 0) {
        const destinationCol = this.state.originalCol + Math.ceil(stepsFromStart / 2);
        const sourceCol = this.state.headerOrder.indexOf(this.state.slidingColumn);
        console.log(destinationCol, sourceCol);
        if(destinationCol != sourceCol) {
          this.swapColumns(
            sourceCol,
            destinationCol
          );
        }
      }
    }
  }

  private swapColumns = (source: number, dest: number) => {
    if(dest >= this.state.headerOrder.length || dest < 0) {
      return;
    }
    //console.log('swap', source, dest)
    const sourceValue = this.state.headerOrder[source];
    const destValue = this.state.headerOrder[dest];
    this.state.headerOrder[source] = destValue;
    this.state.headerOrder[dest] = sourceValue;
    this.setState({headerOrder: this.state.headerOrder});
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
