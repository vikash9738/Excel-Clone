
//  ONLY DATA AND PROPERTY CUT COPY PASTE NOT CHILDREN AND GRAPH REALTION
let ctrlKey=false;
document.addEventListener("keydown",(e)=>{
    ctrlKey=e.ctrlKey;
})
document.addEventListener("keyup",(e)=>{
    ctrlKey=e.ctrlKey;
})

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

let copyBtn=document.querySelector(".copy");
let cutBtn=document.querySelector(".cut");
let pasteBtn=document.querySelector(".paste");
let rangeStorage=[];
function handleSelectedCells(cell){
    cell.addEventListener("click",(e)=>{
            //select work range
        if(ctrlKey===false)
          return ;
        if(rangeStorage.length>=2){
            defalultSelectedCellsUI();
            rangeStorage=[];
        }
        //UI
        cell.style.border="3px solid #218c74";
        let rid=Number(cell.getAttribute("rid"));
        let cid=Number(cell.getAttribute("cid"));
        rangeStorage.push([rid,cid]);
        // console.log(rangeStorage);
    })
}

function defalultSelectedCellsUI(){
    for(let i=0;i<rangeStorage.length;i++){
        let cell=document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border="1px solid  lightgray";
    }
}

let copyData=[];

cutBtn.addEventListener("click",(e)=>{
      if(rangeStorage.length<2)
        return ;
       let startRow=rangeStorage[0][0];
       let endRow=rangeStorage[1][0];
       let startCol=rangeStorage[0][1];
       let endCol=rangeStorage[1][1];
       for(let i=startRow;i<=endRow&&i<rows;i++){
            for(let j=startCol;j<=endCol&&j<cols;j++){
                let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
                //DB work
                let cellProp=sheetDB[i][j];
                cellProp.value="";
                cellProp.bold=false;
                cellProp.italic=false;
                cellProp.underline=false;
                cellProp.fontSize="14";
                cellProp.fontFamily="monospace";
                cellProp.fontColor="#000000";
                cellProp.BGcolor="#f1f2f6";
                cellProp.alignment="left";
                //UI 
                cell.click();
            }
       }
    // console.log(copyData);
    defalultSelectedCellsUI();
})

copyBtn.addEventListener("click",(e)=>{
      if(rangeStorage.length<2)
         return ;
       let startRow=rangeStorage[0][0];
       let endRow=rangeStorage[1][0];
       let startCol=rangeStorage[0][1];
       let endCol=rangeStorage[1][1];
       for(let i=startRow;i<=endRow&&i<rows;i++){
            let copyRow=[];
            for(let j=startCol;j<=endCol&&j<cols;j++){
                let cellProp=sheetDB[i][j];
                copyRow.push(cellProp);
            }
            copyData.push(copyRow);
       }
    console.log(copyData);
    defalultSelectedCellsUI();
})

pasteBtn.addEventListener("click",(e)=>{
    //paste cell data
    //difference
    if(rangeStorage.length<2)
        return ;
    let rowDiff=Math.abs(rangeStorage[1][0]-rangeStorage[0][0]);
    let colDiff=Math.abs(rangeStorage[1][1]-rangeStorage[0][1]);
    //get target start row and col
    let address=addressBar.value;
    let [strow,stcol]=decodeRIDCIDFromAddress(address);
    
    //r->copy data row , c->copy data column
    for(let i=strow,r=0;i<=(strow+rowDiff)&&i<rows;i++,r++){
        for(let j=stcol,c=0;j<=(stcol+colDiff)&&j<cols;j++,c++){
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(cell){
                //DB and UI
                //DB
                let data=copyData[r][c];
                let cellProp=sheetDB[i][j];
                cellProp.value=data.value;
                cellProp.bold=data.bold;
                cellProp.italic=data.italic;
                cellProp.underline=data.underline;
                cellProp.fontSize=data.fontSize;
                cellProp.fontFamily=data.fontFamily;
                cellProp.fontColor=data.fontColor;
                cellProp.BGcolor=data.BGcolor;
                cellProp.alignment=data.alignment;
                //UI
                cell.click();
            }
        }
    }
})