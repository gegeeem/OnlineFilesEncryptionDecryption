import {showHide} from "./showHideElement.js"
function  fileUploadedName(idOfInpuFile, idSpan){
    const getFileUploadedNam = ()=>{
        const file = document.querySelector(idOfInpuFile);
        const getSpanDisplayFileName = document.querySelector(idSpan)
        getSpanDisplayFileName.innerHTML = file.files[0].name;
        console.log("ime fajla", file.files[0].name)
        showHide("show","#resetDiv"); // prikazi "ponisti" dugme
        showHide("show","#startEncryption") // prikazi "Pokreni enkripciju dugme"

    }
    
    document.addEventListener("change",getFileUploadedNam)
}

fileUploadedName("#textForEncFile", "#fileUploadedName")

