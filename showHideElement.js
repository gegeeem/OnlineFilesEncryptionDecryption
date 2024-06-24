export function showHide(displayOpt,classNameElem){
    const htmlElement = document.querySelector(classNameElem)
    if(displayOpt == "show"){
    htmlElement.classList.remove("hide")
    }
    if(displayOpt == "hide"){
    htmlElement.classList.add("hide")
    }


}