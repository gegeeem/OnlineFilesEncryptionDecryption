import {showHide} from "./showHideElement.js"
function scrollToElementDec (id){
    const getElToScroll = document.querySelector(id);
    const rect = getElToScroll.getBoundingClientRect();
    window.scrollTo({
        top:rect.top,
        left:0,
        behavior:"smooth"
    })

}
function  displayFileUploadedNameDec(idOfInpuFile, idSpan, displayFileType){
    const file = document.querySelector(idOfInpuFile);
    const getSpanDisplayFileName = document.querySelector(idSpan)
    
   
    


    const getFileUploadedNam = ()=>{
        getSpanDisplayFileName.innerHTML = file.files[0].name.slice(0,15)+"...";
         //prikazi tip fajla na ikoni
        const getIconFileToDisplayType = document.querySelector(displayFileType)
        if(getIconFileToDisplayType){
            const fileType = file.files[0].type;// file type, example "image/png"
            const dashIndex = file.files[0].type.indexOf("/")// find index of dash "/"
            const extensionFile = fileType.slice(dashIndex + 1, dashIndex + 5)// slice string and get png
            getIconFileToDisplayType.textContent = extensionFile; // dodeli format "png"

        }
        showHide("show","#fileUploadedNameDec")//prikazi ime fajla
       
        showHide("show", ".inlnBlckDec")// prikazi ikonicu fajla
        showHide("hide","#fileUploadedDec")// sakrij dugme "izaberite fajl"
        showHide("show","#resetBtnForDec"); // prikazi "ponisti" dugme
        showHide("show", ".keyAndIVDec")
        // showHide("show", "#dataForDecCls")// prikazi dugme za ucitavanje podataka za dekripciju
        
        showHide("show", ".userKeyIVLabel")
        if(idOfInpuFile == "#dataForDec"){// ako je poziv za dugme ucitajte podatke za dekripciju onda prikazi dugme ya dekripciju
        showHide("show", "#btnForDec")


        }
        if(idOfInpuFile == "#dataForDec"){
            showHide("show",".fileDataForDec")
            showHide("show", ".btnForDecEndHeaderLine")
        }
        window.scrollTo(0, document.body.scrollHeight)
        

    }
    
    file.addEventListener("change",getFileUploadedNam)
}

displayFileUploadedNameDec("#textForDecFile","#displayNameOfUploadedFileDec","#fileExtensionDec")
displayFileUploadedNameDec("#dataForDec","#dataForDecryption")