
//for delay and wait
function colorPromise(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           resolve();
         },1000);
    })
}


async function isGraphCyclicTracePath(graphComponenetMatrix,cycleResponse){
    //dependency ->visited, dfsvisited
    let [srcr,srcc]=cycleResponse;
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
    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //        if(visited[i][j]===false){
    //            if(dfsCycleDetection(graphComponenetMatrix,i,j,visited,dfsvisited)===true)
    //               return true;
    //        }
    //     }
    // }
    // return false;
    if(await dfsCycleDetectionTracePath(graphComponenetMatrix,srcr,srcc,visited,dfsvisited)===true){
        return Promise.resolve(true);
    }
    return Promise.resolve(false);
}



//coloring cells for tracing
async function dfsCycleDetectionTracePath(graphComponenetMatrix,srcr,srcc,visited,dfsvisited){
     visited[srcr][srcc]=true;
     dfsvisited[srcr][srcc]=true;
     let cell=document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
     cell.style.backgroundColor= "lightblue";
     await colorPromise();

     for(let i=0;i<graphComponenetMatrix[srcr][srcc].length;i++){
         let [nbrr,nbrc]=graphComponenetMatrix[srcr][srcc][i];
         if(visited[nbrr][nbrc]===false){
            if(await dfsCycleDetectionTracePath(graphComponenetMatrix,nbrr,nbrc,visited,dfsvisited)===true){
                cell.style.backgroundColor="transparent";
                await colorPromise();
                return Promise.resolve(true);
            }
         }
         else if(visited[nbrr][nbrc]===true&&dfsvisited[nbrr][nbrc]===true){
            let cyclicCell=document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
            cyclicCell.style.backgroundColor="lightsalmon";
            await colorPromise();
            cyclicCell.style.backgroundColor="transparent";
            await colorPromise();
            cell.style.backgroundColor="transparent";
            await colorPromise();
            return Promise.resolve(true);
         }
     }
     cell.style.backgroundColor= "transparent";
     await colorPromise();
     dfsvisited[srcr][srcc]=false;
     return Promise.resolve(false);
}