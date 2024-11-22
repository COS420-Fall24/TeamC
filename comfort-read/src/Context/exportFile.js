

export function exportAsTxt (content, filename = "export.txt") { //export plin text
    const blob = new Blob([content], {type: "text/plain" }); //blob object text content
    const link = document.createElement("a");//temp eleement
    link.href=URL.createObjectURL(blob); //make url for blob assign href
    link.download=filename; //dwnld attribute 
    document.body.appendChild(link); //appends link to doc body
    link.click();
    document.body.removeChild(link); //remove link from doc after dwnld

}
export function exportAsHtml(content,filename="export.html"){ //export html
    //crates str basic html doc 
    const htmlContent=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Export</title>
    </head>
    <body>
        ${content}
    </body>
    </html>`;
    const blob=new Blob([htmlContent], {type:"text/html"}); //blob obj for html content
    const link=document.createElement("a"); //temp element 
    link.href=URL.createObjectURL(blob); //make url for blob and assign
    link.download=filename; 
    document.body.appendChild(link); //append link to doc body
    link.click();
    document.body.removeChild(link); //remove link from doc body after dwnld
}

