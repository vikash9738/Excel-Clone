let sheetsFolderCont=document.querySelector(".sheets-folder-cont");
let addSheetBtn=document.querySelector(".sheet-add-icon");

addSheetBtn.addEventListener("click",(e)=>{
    let sheet=document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
    let allSheetFolders=document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheetFolders.length);
    sheet.innerHTML=`
        <div class="sheet-content">Sheet${allSheetFolders.length+1}</div>
    `;
    sheetsFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    //DB for each sheet
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        //0->left 1 ->scroll 2->right;
        if(e.button!==2){
             return ;
        }
        let allSheetFolders=document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length===1){
            alert("You need to have atleast one sheet");
            return ;
        }
        let response=confirm("Your sheet will be remove permanently")
        let sheetIdx=Number(sheet.getAttribute("id"));
        if(response===false)
          return ;
        //DB removal
        collectedSheetDB.splice(sheetIdx,1);
        graphComponentMatrix.splice(sheetIdx,1);
        //UI removal
        handleSheetUIRemoval(sheet);
        //by defalult assign dB to 1
        sheetDB=collectedSheetDB[0];
        graphComponentMatrix=collectedGraphComponent[0];
        handleSheetProperties();
    })
}
function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolders=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
       allSheetFolders[i].setAttribute("id",i);
       let sheetContent=allSheetFolders[i].querySelector(".sheet-content");
       sheetContent.innerText=`Sheet${i+1}`;
       allSheetFolders[i].style.backgroundColor="transparent";
    }
    allSheetFolders[0].style.backgroundColor="#ced6e0";
}

function handleSheetDB(sheetIdx){
   sheetDB=collectedSheetDB[sheetIdx];
   graphComponentMatrix=collectedGraphComponent[sheetIdx];
}

function handleSheetProperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    //defalut click on first cell via DOM
     let firstCell=document.querySelector(".cell");
    firstCell.click();
}
function handleSheetUI(sheet){
    let allSheetFolders=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor="transparent";
    }
    sheet.style.backgroundColor="#ced6e0"
}
function handleSheetActiveness(sheet){
      sheet.addEventListener("click",(e)=>{
        let sheetIdx=Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
        // console.log(sheetDB);
      })
}
 
function createSheetDB(){
    let sheetDB=[];
    for(let i = 0;i < rows; i++){
        let sheetRow=[];
        for(let j=0;j<cols;j++){
           let cellProp={
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontFamily: "monospace",
                fontSize: "14",
                fontColor: "#000000",
                BGcolor: "#f1f2f6",
                value: "",
                formula: "",
                children: [],
           }
           sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix=[];
    for(let i=0;i<rows;i++){
         let row=[];
         for(let j=0;j<cols;j++){
             //more than 1 child relation
            row.push([]);
         }
        graphComponentMatrix.push(row);
     }
     collectedGraphComponent.push(graphComponentMatrix);
}
