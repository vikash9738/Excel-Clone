let downloadBtn=document.querySelector(".download");
let openBtn=document.querySelector(".open");


//Download Task
downloadBtn.addEventListener("click",(e)=>{
    let jsonData=JSON.stringify([sheetDB,graphComponentMatrix]);
    let file=new Blob([jsonData],{type: "application/json"});
    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download="SheetData.json";
    a.click();
})

//Upload Task
openBtn.addEventListener("click",(e)=>{
    //open file explorer
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr=new FileReader();
        let files=input.files;
        let fileObj=files[0];
        
        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
            let readSheetData=JSON.parse(fr.result);
           //Basic sheet wiil be created with defalut data will be created
            addSheetBtn.click();
            // sheetDB and GraphComponent wiil be made
            sheetDB=readSheetData[0];
            graphComponentMatrix=readSheetData[1];
            collectedSheetDB[collectedSheetDB.length-1]=sheetDB;
            collectedGraphComponent[collectedGraphComponent.length-1]=graphComponentMatrix;
            handleSheetProperties();
        })
    })
})

