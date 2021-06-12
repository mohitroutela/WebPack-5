import  zoro from 'C:/mohit/WebPack-5/tutorial/assets/images/Roronoa.jpg';
import altText from './alternateText.txt'
function DisplayImage() {
    let image=document.createElement('img')
    image.alt= altText;
    image.width=300;
    image.src=zoro
    let body=document.querySelector('body');
    body.appendChild(image);
}


export default DisplayImage();