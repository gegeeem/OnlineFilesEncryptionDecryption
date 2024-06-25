import {showHide} from "./showHideElement.js"
function  fileUploadedName(idOfInpuFile, idSpan){
    const file = document.querySelector(idOfInpuFile);
    const getSpanDisplayFileName = document.querySelector(idSpan)


    const getFileUploadedNam = ()=>{
        getSpanDisplayFileName.innerHTML = file.files[0].name;
        console.log("ime fajla", file.files[0].name)
        showHide("show","#resetDiv"); // prikazi "ponisti" dugme
        showHide("show","#startEncryption") // prikazi "Pokreni enkripciju dugme"
        showHide("show", "#btnForDec")

    }
    
    file.addEventListener("change",getFileUploadedNam)
}

fileUploadedName("#textForEncFile", "#fileUploadedName")
fileUploadedName("#textForDecFile","#encryptedFileUploadedName")
fileUploadedName("#dataForDec","#dataForDecryption")



