import React from 'react';
import './App.css';

interface Properties {
  headerOrder: number[];
  header: string[];
  data: string[][];
  slidingColumn: number | null;
  //Can be negative, indicating it has slid off the table, or positive.
  slidingColumnXPosition: number;
  onMouseDown: (x: number, index: number) => void;
  onMouseUp: () => void;
  onMouseMove: (newX: number) => void;
}

export class SlidingTable extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className='rails'>
        <SlidingColumn  show={this.props.slidingColumn !== null}
          leftValue={this.props.slidingColumnXPosition}/>
        <table>
          
          <thead>
            <tr>
              {this.props.headerOrder.map(this.renderHeader)}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    );
  }

  public componentDidMount(): void {
    window.addEventListener('mouseup', this.props.onMouseUp)
    window.addEventListener('mousemove', this.onMouseMove)
  }

  public componentWillUnmount(): void {
    window.removeEventListener('mouseup', this.props.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  private onMouseDown(event: React.MouseEvent, col: number) {
    this.props.onMouseDown(event.clientX, col);
  }

  private onMouseMove = (event: MouseEvent) => {
    this.props.onMouseMove(event.clientX)
  }

  private renderHeader = (col: number) => {
    const isSlidingColumn = this.props.slidingColumn === col;
    return (
      <th id={`${0}-${col}`} key={`${0}-${col}`}
          className={isSlidingColumn ? 'header-selected ' : ''}
          onMouseDown={(event) => this.onMouseDown(event, col)}>
        {this.props.slidingColumn === col? '' :this.props.header[col]}
      </th>);
  }

  private renderRow = (row_data: string[], row: number) => {
    return (
      <tr id={`${row}`} key={`${row}`}>
        {this.props.headerOrder.map(col => {
          const id= `${row}-${col}`
          const isSlidingColumn = this.props.slidingColumn === col;
          const isBottomRow = row === 3;
          const className = (() => {
            if(isBottomRow && isSlidingColumn) {
              return 'bottom-selected'
            } else if (isSlidingColumn) {
              return 'td-selected'
            } else {
              return ''
            }
          })();
          return (
            <td id={`${row}-${col}`} key={`${row}-${col}`}
              className={className}>
              {this.props.slidingColumn === col? '' : row_data[col]}
            </td>);
        })}
      </tr>);
  }

  private getStyle =(row: number, column: number) => {
    if('hidden') {
      return
    } else if('highlighetd'){
      return
    } else {
      return
    }
  }


}

interface SlidingColProperties {
  leftValue: number;
  show: boolean;
}

class SlidingColumn extends React.Component<SlidingColProperties> {
  constructor(props: SlidingColProperties) {
    super(props);
  }

  public render(): JSX.Element {
    if(!this.props.show) {
      return <div style={{display: 'none'}}/>
    }
    return (
      <div className='sliding-column-container' style={{left: this.props.leftValue}}>
        <table className='sliding-column-table '>
          <thead>
            <tr>
              <th>
              {'header'}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Some data</td></tr>
            <tr><td> Some data</td></tr>
            <tr><td> Some data</td></tr>
            <tr><td> Some data</td></tr>
          </tbody>
        </table>
      </div>);
  }
}

