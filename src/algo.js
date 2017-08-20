export function getX(index){
	return index % 15;
}

export function getY(index){
	return  Math.floor(index / 15);
}

export function AStarSearch(start, end, map){
	console.log("Performing Search");
		
	//array of nodes that are explored
	var closedSet = Array(300).fill(false);
	
	//list of nodes that are discovered but not evaluated
	var openSet = [];
	openSet.push(start);
	
	//array of where each square can be reached
	var cameFrom = Array(300).fill(-1);
	
	//cost of g(n)
	var gScore = Array(300).fill(99999);
	//start point will be 0
	gScore[start] = 0;
	
	//cost of f(n) from get distance
	var fScore = Array(300).fill(99999);
	fScore[start] = getDistance(start,end);
	
	while (openSet.length !=0){
		
		//sort opensort by f(n)
		console.log("function");	
		console.log(openSet);	
		openSet = sortByFScore(fScore,openSet);
		
		let current = openSet.pop();
		console.log("Current " + current);
		
        if (current == end){
			console.log("Found solution");
            return reconstruct_path(cameFrom, cameFrom[current]);
		}
			
        closedSet[current] = true;
		
		//get all neigbours
		var neighbours = getNeighbours(current, map);
		
		for(var i =0; i< neighbours.length;i++){
			//if neighbour is evaluated skip
			
			var neighbour = neighbours[i];
			if(closedSet[neighbour]){
				continue;
			}
			
			//if not found in openset add it to openset
			if(openSet.lastIndexOf(neighbour) == -1){
				openSet.push(neighbour);
				console.log("pushed " + neighbour);
				console.log(openSet);
			}
			
			//calculate neighbour gScore
			var tempGScore = gScore[current] + 1;
			
			if (tempGScore >= gScore[neighbour]){
                continue;		// This is not a better path.
			}else{
				cameFrom[neighbour] = current;
				gScore[neighbour] = tempGScore;
				fScore[neighbour] = gScore[neighbour] + getDistance(neighbour, end);
			}
		}
	}
	console.log("No solution found");
	return null;
}

export function getNeighbours(point, map){
	var neighbours = [];
	var topNeighbour = point + 15;
	var bottomNeighbour = point -15;
	var leftNeighbour = point - 1;
	var rightNeighbour = point + 1;
	
	//check top
	if(topNeighbour <300 && map[topNeighbour] != "#000000"){
		neighbours.push(topNeighbour);
	}
	//check bottom
	if(bottomNeighbour >= 0 && map[bottomNeighbour] != "#000000"){
		neighbours.push(bottomNeighbour);
	}
	//check left
	if(point%15 != 0 && map[leftNeighbour] != "#000000" ){
		neighbours.push(leftNeighbour);
	}
	//check right
	if(point%15 != 14&& map[rightNeighbour] != "#000000"){
		neighbours.push(rightNeighbour);
	}
	
	return neighbours;
	
}

function getDistance(start,end){
	var startX = getX(start);
	var startY = getY(start);
	
	var endX = getX(end);
	var endY = getY(end);
	
	
	return Math.sqrt(Math.pow(startX-endX,2) + Math.pow(startY - endY,2));
	
}

function sortByFScore(fScore,openSet){
	
	//find index with lowest FScore
	let lowestScore = 99999;
	let lowestIndex = -1;
	for(let i = 0; i< openSet.length; i++){		
		if(fScore[openSet[i]] < lowestScore){
			lowestScore = fScore[openSet[i]];
			lowestIndex = i;
		}
	}
	
	//make new array with lowestIndex infront
	var newSet = [];
	
	//concat remaining arrary
	console.log(openSet);
	console.log(lowestIndex);
	console.log("newset");
	newSet = newSet.concat(openSet.slice(0,lowestIndex));
	console.log(newSet);
	console.log(openSet.slice(0,lowestIndex));
	newSet = newSet.concat(openSet.slice(lowestIndex+1, lowestIndex.length));
	console.log(newSet);
	
	newSet.push(openSet[lowestIndex]);
	console.log(newSet);
	
	return newSet;
}

function reconstruct_path(cameFrom, current){
	var path = [];
    while (cameFrom[current] != -1){
		console.log(current);
		path.push(current);
		current = cameFrom[current];
	}
    return path;
}