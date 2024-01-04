//storage
let collectedSheetDB=[];//contain all sheet DB
let sheetDB=[];

{
    let addSheetBtn=document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}
// for(let i = 0;i < rows; i++){
//     let sheetRow=[];
//     for(let j=0;j<cols;j++){
//        let cellProp={
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor: "#000000",
//             BGcolor: "#f1f2f6",
//             value: "",
//             formula: "",
//             children: [],
//        }
//        sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

//selector for cell properties
let bold=document.querySelector(".bold");
let italic=document.querySelector(".italic");
let underline=document.querySelector(".underline");
let fontSize=document.querySelector(".font-size-prop");
let fontFamily=document.querySelector(".font-family-prop");
let fontColor=document.querySelector(".font-color-prop");
let BGcolor=document.querySelector(".BGcolor-prop");
let alignment=document.querySelectorAll(".alignment");
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

let activeColorProp="#bdc3c7"
let inactiveColorProp="#ecf0f1";
//Atttach prop listener and Two way binding
bold.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.bold=!cellProp.bold;
    cell.style.fontWeight=cellProp.bold ? "bold" : "normal"; //part 1
    bold.style.backgroundColor= cellProp.bold ? activeColorProp : inactiveColorProp;
})

italic.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.italic=!cellProp.italic;
    cell.style.fontStyle=cellProp.italic ? "italic" : "normal"; //part 1
    italic.style.backgroundColor= cellProp.italic ? activeColorProp : inactiveColorProp;
})


underline.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.underline=!cellProp.underline;
    cell.style.textDecoration=cellProp.underline ? "underline" : "none"; //part 1
    underline.style.backgroundColor= cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.fontSize=fontSize.value;
    cell.style.fontSize=cellProp.fontSize + "px";
    fontSize.value=cellProp.fontSize;

})
fontFamily.addEventListener("click",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellProp.fontFamily;
    fontFamily.value=cellProp.fontFamily;
})
fontColor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.fontColor=fontColor.value;
    cell.style.color=cellProp.fontColor;
    fontColor.value=cellProp.fontColor;
})
BGcolor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let [cell,cellProp]=getCellAndCellProp(address);
    //modification
    cellProp.BGcolor=BGcolor.value;
    cell.style.backgroundColor=cellProp.BGcolor;
    BGcolor.value=cellProp.BGcolor;
})

alignment.forEach((alignElem)=>{
    alignElem.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [cell,cellProp]=getCellAndCellProp(address);

        let alignValue=e.target.classList[0];
        cellProp.alignment=alignValue;//data change
        cell.style.textAlign=cellProp.alignment;

        switch(alignValue){
            case "left":
                 leftAlign.style.backgroundColor=activeColorProp;
                 centerAlign.style.backgroundColor=inactiveColorProp;
                 rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
        }
    })
})

let allcells=document.querySelectorAll(".cell");
for(let i=0;i<allcells.length;i++){
    addListenerToAttachCellProperties(allcells[i]);
}
function addListenerToAttachCellProperties(cell){
    //work
    cell.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [rid,cid]=decodeRIDCIDFromAddress(address);
        let cellProp=sheetDB[rid][cid];
        //apply cell properties
        cell.style.fontWeight=cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle=cellProp.italic ? "italic" : "normal"; //part 1
        cell.style.textDecoration=cellProp.underline ? "underline" : "none"; //part 1
        cell.style.fontSize=cellProp.fontSize + "px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGcolor;
        cell.style.textAlign=cellProp.alignment;
        //apply proprty to UI
        bold.style.backgroundColor= cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor= cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor= cellProp.underline ? activeColorProp : inactiveColorProp;
        fontSize.value=cellProp.fontSize;
        fontFamily.value=cellProp.fontFamily;
        fontColor.value=cellProp.fontColor;
        BGcolor.value=cellProp.BGcolor;
        switch(cellProp.alignment){
            case "left":
                 leftAlign.style.backgroundColor=activeColorProp;
                 centerAlign.style.backgroundColor=inactiveColorProp;
                 rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
        }
        let formulaBar=document.querySelector(".formula-bar");
        formulaBar.value=cellProp.formula;
        cell.innerText=cellProp.value;
    })
}
function getCellAndCellProp(address){
    let [rid, cid]=decodeRIDCIDFromAddress(address);
    //access cell and storage obj
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp=sheetDB[rid][cid];
    return [cell,cellProp];
}

function decodeRIDCIDFromAddress(address){
    //adresss-"A1"
    let rid=Number(address.slice(1)) - 1;
    let cid=Number(address.charCodeAt(0)) - 65;
    return [rid, cid];
}
