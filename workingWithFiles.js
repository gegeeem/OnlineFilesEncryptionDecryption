export function createFileForDownload(id, file, name){
    
        const getLink = document.querySelector(id);
        // getLink.href = file;
        // getLink.src = file
        getLink.href = file
        getLink.download = name;
        getLink.click();
        URL.revokeObjectURL(getLink.href)

//        getLink.addEventListener("click",()=>{URL.revokeObjectURL(getLink.href)});
    
}