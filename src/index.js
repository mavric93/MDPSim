import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as algo from './algo.js';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} style={{background: props.color}}>
    </button>
  );
}

function Explore(props){
  return (
    <button onClick={props.onClick}>
		{props.value}
    </button>
  );
}

function ComputePath(props){
  return (
    <button onClick={props.onClick}>
		{props.value}
    </button>
  );
	
}

function DisplayPath(props){
  return (
    <p>
		{props.value}
    </p>
  );
}

function ResetMap(props){
  return (
    <button onClick={props.onClick}>
		{props.value}
    </button>
  );
}


class Board extends React.Component {
	
	
	constructor() {
		super();
		
		let defaultArray = [];
		defaultArray = Array(300).fill('#FFFFFF');
		
		//fixed color for origin
		defaultArray[16]="#0000FF"//blue
		defaultArray[15]="#00FFFF";//cyan
		defaultArray[17]="#00FFFF";
		defaultArray[30]="#00FFFF";
		defaultArray[31]="#00FFFF";
		defaultArray[32]="#00FFFF";
		defaultArray[0]="#00FFFF";
		defaultArray[1]="#00FFFF";
		defaultArray[2]="#00FFFF";
		
		
		//fixed color for destination
		defaultArray[283]="#FF0000";//red
		defaultArray[282]="#FFAA00";//orange
		defaultArray[284]="#FFAA00";
		defaultArray[299]="#FFAA00";
		defaultArray[298]="#FFAA00";
		defaultArray[297]="#FFAA00";
		defaultArray[267]="#FFAA00";
		defaultArray[268]="#FFAA00";
		defaultArray[269]="#FFAA00";
		
		this.state = {
			start: 16,
			end: 283,
			squares: defaultArray,
			path: [],
			xIsNext: true,
		};	
	}
	renderSquare(i) {
		
		//fixed color for way point
		for(let i = 0; i < this.state.path; i++){
			this.state.squares[i] = "#FFFF00";
		}
		
		//return the rest based on occupied/not
		return (<Square value={i} onClick={() => this.handleClick(i)} color={this.state.squares[i]}/>);
	}
  
	handleClick(i) {
		const squares = this.state.squares.slice();
		
		if(squares[i] == "#FFFFFF"){
			squares[i] = "#000000";
		}else if(squares[i] == "#000000"){
			squares[i] = "#FFFFFF";
			
		}
		
		this.setState({
		  squares: squares,
		  xIsNext: !this.state.xIsNext,
		});
	}
	
	handleResetMap(){
				let defaultArray = [];
		defaultArray = Array(300).fill('#FFFFFF');
		
		//fixed color for origin
		defaultArray[16]="#0000FF"//blue
		defaultArray[15]="#00FFFF";//cyan
		defaultArray[17]="#00FFFF";
		defaultArray[30]="#00FFFF";
		defaultArray[31]="#00FFFF";
		defaultArray[32]="#00FFFF";
		defaultArray[0]="#00FFFF";
		defaultArray[1]="#00FFFF";
		defaultArray[2]="#00FFFF";
		
		
		//fixed color for destination
		defaultArray[283]="#FF0000";//red
		defaultArray[282]="#FFAA00";//orange
		defaultArray[284]="#FFAA00";
		defaultArray[299]="#FFAA00";
		defaultArray[298]="#FFAA00";
		defaultArray[297]="#FFAA00";
		defaultArray[267]="#FFAA00";
		defaultArray[268]="#FFAA00";
		defaultArray[269]="#FFAA00";
		
		this.setState({squares:defaultArray});
	}
		
	handleComputePathClick(start,end,map){
		let path = algo.AStarSearch(start, end, map);
		let pathToString = start + " -> ";
		
		if(path != null){
			path = path.reverse();
		
			let renderPath = [];
			
			renderPath = this.state.squares.slice(0,300);
			for(let i = 0; i < path.length;i++){
				renderPath[path[i]] = "#FFFF00";
			}
			
			this.setState({squares:renderPath});
		
			for(let i = 0; i< path.length; i++){
				pathToString += path[i] + " -> ";
			}
		}else{
			pathToString = "No solution"
		}
		
		this.setState({
		  path: pathToString
		});
	}
	
	renderDisplayPath(){
		return (<div><DisplayPath value={this.state.path} /></div>);
	}
 
	renderRows(index){
		let rows = [];
		
		for (let i=index; i < index+15; i++) {
			rows.push(this.renderSquare(i));
		}	
		return rows;
	}

	generateMapCode(){
		
		//convert array to bit string
		let bitStr = '11'; //two bit of padding at front
		for(let i=0;i<300;i++){
			if(this.state.squares[i] == '#000000'){
				bitStr+=1;
			}else{
				bitStr+=0;
			}
		}
		bitStr+='11'; //two bit of padding at end
		
		let output = '';
		//convert bitstring to hexadecmial
		for (var i=0; i < bitStr.length; i+=4)
        {
            // Grab a chunk of 4 bits
            var bytes = bitStr.substr(i, 4);

            // Convert to decimal then hexadecimal
            var decimal = parseInt(bytes, 2);
            var hex = decimal.toString(16);

            // Uppercase all the letters and append to output
            output += hex.toUpperCase();
        }
		
		return output;
	}

  render() {
    return (
      <div>
        <div className="game-info">
        <div className="status"> Map code = {this.generateMapCode()}</div>
		<div className="status">inputs</div>
		<div><b>Start Point</b> X: <input  value={algo.getX(this.state.start)}/> Y:<input  value={algo.getY(this.state.start)} /></div>
		<div><b>End Point</b> X: <input  value={algo.getX(this.state.end)}/> Y:<input  value={algo.getY(this.state.end)} /></div>
		<div><b>Way point</b> X: <input  value={algo.getX(this.state.end)}/> Y:<input  value={algo.getY(this.state.end)} /></div>
		<div><Explore value="Explore"/></div>
		<div><ComputePath value="Compute Path" onClick={() => this.handleComputePathClick(this.state.start, this.state.end, this.state.squares)}/></div>
		<div><ResetMap value="ResetMap" onClick={() => this.handleResetMap()}/></div>
		<div><DisplayPath value={this.state.path} /></div>
        </div>
        <div className="board-row">
		{this.renderRows(285)}
        </div>
		<div className="board-row">
		{this.renderRows(270)}
        </div>
		<div className="board-row">
		{this.renderRows(255)}
        </div>
		<div className="board-row">
		{this.renderRows(240)}
        </div>
		<div className="board-row">
		{this.renderRows(225)}
        </div>
		<div className="board-row">
		{this.renderRows(210)}
        </div>
		<div className="board-row">
		{this.renderRows(195)}
        </div>
		<div className="board-row">
		{this.renderRows(180)}
        </div>
		<div className="board-row">
		{this.renderRows(165)}
        </div>
		<div className="board-row">
		{this.renderRows(150)	}
        </div>
		<div className="board-row">
		{this.renderRows(135)	}
        </div>
		<div className="board-row">
		{this.renderRows(120)	}
        </div>
		<div className="board-row">
		{this.renderRows(105)	}
        </div>
		<div className="board-row">
		{this.renderRows(90)	}
        </div>
		<div className="board-row">
		{this.renderRows(75)	}
        </div>
		<div className="board-row">
		{this.renderRows(60)	}
        </div>
		<div className="board-row">
		{this.renderRows(45)	}
        </div>
		<div className="board-row">
		{this.renderRows(30)	}
        </div>
		<div className="board-row">
		{this.renderRows(15)	}
        </div>
		<div className="board-row">
		{this.renderRows(0)	}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
