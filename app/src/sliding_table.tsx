import React from 'react';
import './App.css';

interface Properties {
  headerOrder: number[];
  header: string[];
  data: string[][];
  slidingColumn: number;
  slidingColumnXPosition: number;
  onMouseDown: (x: number, index: number) => void;
  onMouseUp: () => void;
  onMouseMove: (newX: number) => void;
}

export class SlidingTable extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div className='rails'>
        <SlidingColumn
          show={this.props.slidingColumn > -1}
          header={this.props.header}
          data={this.props.data}
          slidingColumn={this.props.slidingColumn}
          leftValue={this.props.slidingColumnXPosition}/>
        <table className='base-table'>
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
          className={isSlidingColumn ? 'header-selected ' : 'base-th'}
          onMouseDown={(event) => this.onMouseDown(event, col)}>
        {this.props.slidingColumn === col? '' :this.props.header[col]}
      </th>);
  }

  private renderRow = (row_data: string[], row: number) => {
    return (
      <tr id={`${row}`} key={`${row}`}>
        {this.props.headerOrder.map(col => {
          const isSlidingColumn = this.props.slidingColumn === col;
          const isBottomRow = row === 3;
          const className = (() => {
            if(isBottomRow && isSlidingColumn) {
              return 'bottom-selected'
            } else if (isSlidingColumn) {
              return 'td-selected'
            } else {
              return 'base-td';
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
}

interface SlidingColProperties {
  header: string[];
  data: string[][];
  slidingColumn: number;
  leftValue: number;
  show: boolean;
}

class SlidingColumn extends React.Component<SlidingColProperties> {
  public render(): JSX.Element {
    if(!this.props.show) {
      return <div style={{display: 'none'}}/>
    }
    return (
      <div className='sliding-column-container'
          style={{left: this.props.leftValue}}>
        <table className='sliding-column-table '>
          <thead>
            <tr>
              <th>
                {this.props.header[this.props.slidingColumn]}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr><td>{this.props.data[0][this.props.slidingColumn]}</td></tr>
            <tr><td>{this.props.data[1][this.props.slidingColumn]}</td></tr>
            <tr><td>{this.props.data[2][this.props.slidingColumn]}</td></tr>
            <tr><td>{this.props.data[3][this.props.slidingColumn]}</td></tr>
          </tbody>
        </table>
      </div>);
  }
}
