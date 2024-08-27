export function createFileForDownload(id, file, name){
    
        const getLink = document.querySelector(id);
        // getLink.href = file;
        // getLink.src = file
        getLink.href = file
        getLink.download = name;
//        getLink.addEventListener("click",()=>{URL.revokeObjectURL(getLink.href)});
       setTimeout(function(){ window.URL.revokeObjectURL(url); }, 3000)
       getLink.addEventListener("click",()=>{ setTimeout(function(){ window.URL.revokeObjectURL(getLink.href); }, 3000)});

    
}