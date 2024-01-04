let collectedGraphComponent=[];
let graphComponentMatrix=[];
// for(let i=0;i<rows;i++){
//     let row=[];
//     for(let j=0;j<cols;j++){
//         //more than 1 child relation
//         row.push([]);
//     }
//     graphComponentMatrix.push(row);
// }

function isGraphCyclic(graphComponenetMatrix){
    //dependency ->visited, dfsvisited
    let visited=[];//node visit track
    let dfsvisited=[];//recursion call stack trace
    for(let i=0;i<rows;i++){
        let visitedRow=[];
        let dfsVisitedRow=[];
        for(let j=0;j<cols;j++){
           visitedRow.push(false);
           dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsVisitedRow);
    }
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
           if(visited[i][j]===false){
               if(dfsCycleDetection(graphComponenetMatrix,i,j,visited,dfsvisited)===true)
                  return [i,j];
           }
        }
    }
    return null;
}
//
function dfsCycleDetection(graphComponenetMatrix,srcr,srcc,visited,dfsvisited){
     visited[srcr][srcc]=true;
     dfsvisited[srcr][srcc]=true;
     for(let i=0;i<graphComponenetMatrix[srcr][srcc].length;i++){
         let [nbrr,nbrc]=graphComponenetMatrix[srcr][srcc][i];
         if(visited[nbrr][nbrc]===false){
            if(dfsCycleDetection(graphComponenetMatrix,nbrr,nbrc,visited,dfsvisited)===true)
                 return true;
         }
         else if(visited[nbrr][nbrc]===true&&dfsvisited[nbrr][nbrc]===true){
           return true;
         }
     }
     dfsvisited[srcr][srcc]=false;
     return false;
}