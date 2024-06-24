export function createFileForDownload(id, file, name){
    
        const getLink = document.querySelector(id);
        getLink.href = file;
        getLink.download = name;
    
}