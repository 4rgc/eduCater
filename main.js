
const url = 'images/recursion.pdf';

let pdfDoc = null,
    currentPage = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 1.5,
    canvas = document.querySelector('#pdf_render'),
    ctx = canvas.getContext('2d');

//Render the page
const renderPage = num => {

}

//Get document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {

    pdfDoc = pdfDoc_;
    console.log(pdfDoc);

    
});

function getSlideNum() {
    // to implement!!
}
