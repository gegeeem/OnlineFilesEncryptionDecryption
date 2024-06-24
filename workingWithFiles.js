export function createFileForDownload(id, file){
    
        const getLink = document.querySelector(id);
        getLink.href = file;
        getLink.download = ".txt";
    
}