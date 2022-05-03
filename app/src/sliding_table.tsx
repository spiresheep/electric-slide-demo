import React from 'react';
import './App.css';

interface Properties {
  headerOrder: number[];
  header: string[];
  data: string[][];
  onMouseDown: (index: number) => void;
  onMouseUp: () => void;
}

/** The controller for the IntroPage. */
export class SlidingTable extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
  }

  public render(): JSX.Element {
    //<th id='r0-c2' onMouseDown={() => this.props.onMouseDown('c2')}>Type</th>
    return (
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
    );
  }

  private renderHeader = (value: number) => {
    return (
      <th id={`${0}-${value}`} key={`${0}-${value}`}
          onMouseDown={() => this.props.onMouseDown(value)}>
        {this.props.header[value]}
      </th>);
  }

  private renderRow = (row_data: string[], row: number) => {
    return (
      <tr id={`${row}`} key={`${row}`}>
        {this.props.headerOrder.map(value => {
          const id= `${row}-${value}`
          return (
            <td id={`${row}-${value}`} key={`${row}-${value}`}>
              {row_data[value]}
            </td>);
        })}
      </tr>);
  }

  public componentDidMount(): void {
    window.addEventListener('mouseup', this.props.onMouseUp)
  }

  public componentWillUnmount(): void {
    window.removeEventListener('mouseup', this.props.onMouseUp)
  }
}

