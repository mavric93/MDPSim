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
			waypoint:-100,
			squares: defaultArray,
			path: [],
			xIsNext: true,
		};	
	}
	renderSquare(i) {
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
		});
	}
	
	resetMap(){
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
	
	handleResetMap(){
		this.resetMap();
	}
		
	handleComputePathClick(start,end,map){
		
		if(this.state.waypoint == -100){
			alert("please set a waypoint first.");
			return;	
		}
		
		//transform obstacles to be one layer thicker to account for reduction of robot from 3x3 to 1x1
		let transMap = this.transform(map);
		
		let path1 = algo.AStarSearch(start, this.state.waypoint, transMap);
		let path2 = algo.AStarSearch(this.state.waypoint, end, transMap);
		
		let path = path1.concat(path2);
		
		if(path1 == null || path2 == null){
			this.setState({
			  path: "No solution"
			});
			return;
		}
			
		let pathToString = start + " -> ";
		
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
		
	}
	
	handleExploreClick(map){
		var transMap = this.transform(map);
		
		this.setState({squares:transMap});
	}
	
	handleWaypointChange(){
		var x = parseInt(document.getElementById("wayPointXInput").value);
		var y = parseInt(document.getElementById("wayPointYInput").value);
		
		if(isNaN(x) || isNaN(y)){
			alert("Enter digits only");
			return;
		}
		
		if( x>14 || y>19 || x<0 || y<0){
			alert("Enter digits less than 15 for x and less than 20 for y");
			return;
		}
		
		if(x%15==0 || x%15==14){
			alert("invalid x coordinates for waypoint");
			return;
		}
		
		if(y==0 || y==19){
			alert("invalid y coordinates for waypoint");
			return;
		}
		
		let waypoint = this.state.waypoint;
		let defaultArray = this.state.squares;
		
		//clear old waypoints
		defaultArray[waypoint] = "#FFFFFF";
		defaultArray[waypoint-1] = "#FFFFFF";
		defaultArray[waypoint+1] = "#FFFFFF";
		
		defaultArray[waypoint+14] = "#FFFFFF";
		defaultArray[waypoint+15] = "#FFFFFF";
		defaultArray[waypoint+16] = "#FFFFFF";
		
		defaultArray[waypoint-14] = "#FFFFFF";
		defaultArray[waypoint-15] = "#FFFFFF";
		defaultArray[waypoint-16] = "#FFFFFF";
		
		waypoint = y*15+x;
		//set new waypoints
		defaultArray[waypoint] = "#00FF00";
		defaultArray[waypoint-1] = "#AAFFAA";
		defaultArray[waypoint+1] = "#AAFFAA";
		
		defaultArray[waypoint+14] = "#AAFFAA";
		defaultArray[waypoint+15] = "#AAFFAA";
		defaultArray[waypoint+16] = "#AAFFAA";
		
		defaultArray[waypoint-14] = "#AAFFAA";
		defaultArray[waypoint-15] = "#AAFFAA";
		defaultArray[waypoint-16] = "#AAFFAA";
		
		this.setState({squares:defaultArray});	
		
		this.setState({waypoint:waypoint});
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
		console.log(bitStr.length);
		
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
			
			if(i%24 == 0 	){
				output+=" ";
			}
        }
		
		return output;
	}
	
	transform(map){
		
		let newMap = map.slice(0,300);	//copy map
		
		//search for update map for occupied blocks and set its 3x3 to occupied
		for(let i =15; i<map.length-15;i++){
			if(map[i] == "#000000"){
				//ignore update to blocks on left for occupied blocks on extreme left
				if(i%15!=0){
					newMap[i-1] = "#000000";
					newMap[i-14] = "#000000";
					newMap[i+14] = "#000000";
				}
				
				newMap[i] = "#000000";
				newMap[i-15] = "#000000";
				newMap[i+15] = "#000000";
				
				//ignore update to blocks on right for occupied blocks on extreme right
				if(i%15!=14){
					newMap[i+1] = "#000000";
					newMap[i+16] = "#000000";
					newMap[i-16] = "#000000";
				}
			}
		}
		
		//set bordering blocks to occupied
		for(let i =0; i<map.length;i++){
			
			//update bottommost row
			if(i<15){
				newMap[i] = "#000000";
			}
			//update topmost row
			if(i>284){
				newMap[i] = "#000000";
			}
			
			//update leftmost column
			if(i%15==0){
				newMap[i] = "#000000";
			}
			
			//update rightmost column
			if(i%15==14){
				newMap[i] = "#000000";
			}
		}
		
		return newMap;
	}

  render() {
    return (
      <div>
        <div className="game-info">
        <div className="status"> Map code = {this.generateMapCode()}</div>
		<div className="status">inputs</div>
		
		<div><b>Start Point</b> X: <input id="startXInput" value={algo.getX(this.state.start)}/> Y:<input id="startYInput" value={algo.getY(this.state.start)} /></div>
		<div><b>End Point</b> X: <input id="endXInput" value={algo.getX(this.state.end)}/> Y:<input id="endYInput" value={algo.getY(this.state.end)} /></div>
		<div><b>Way point</b> X: <input id="wayPointXInput" defaultValue="0" onChange={() => this.handleWaypointChange()}/> Y:<input id="wayPointYInput" defaultValue="0" onChange={() => this.handleWaypointChange()}/></div>
		
		<div><Explore value="Explore" onClick={() => this.handleExploreClick(this.state.squares)}/></div>
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
