import {showHide} from "./showHideElement.js"
function  displayFileUploadedName(idOfInpuFile, idSpan){
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

displayFileUploadedName("#textForEncFile", "#fileUploadedName")
displayFileUploadedName("#textForDecFile","#encryptedFileUploadedName")
displayFileUploadedName("#dataForDec","#dataForDecryption")



