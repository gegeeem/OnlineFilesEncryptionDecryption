import {showHide} from "./showHideElement.js"
function  displayFileUploadedName(idOfInpuFile, idSpan, displayFileType){
    const file = document.querySelector(idOfInpuFile);
    const getSpanDisplayFileName = document.querySelector(idSpan)
    
   
    


    const getFileUploadedNam = ()=>{
        getSpanDisplayFileName.innerHTML = file.files[0].name.slice(0,8)+"...";
        console.log("ime fajla", file.files[0].name)
        console.log("type",file.files[0].type)
         //prikazi tip fajla na ikoni
        const getIconFileToDisplayType = document.querySelector("#fileExtension")
        const fileType = file.files[0].type;// file type, example "image/png"
        const dashIndex = file.files[0].type.indexOf("/")// find index of dash "/"
        const extensionFile = fileType.slice(dashIndex + 1, dashIndex + 5)// slice string and get png
        console.log(extensionFile)
        getIconFileToDisplayType.textContent = extensionFile;

        showHide("show","#resetDiv"); // prikazi "ponisti" dugme
        showHide("show","#startEncryption") // prikazi "Pokreni enkripciju dugme"
        showHide("show", "#btnForDec")

    }
    
    file.addEventListener("change",getFileUploadedNam)
}

displayFileUploadedName("#textForEncFile", "#displayNameOfUploadedFile")
displayFileUploadedName("#textForDecFile","#encryptedFileUploadedName")
displayFileUploadedName("#dataForDec","#dataForDecryption")



