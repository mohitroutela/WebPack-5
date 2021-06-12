 import './hello-world.style.scss'
 class HelloWorld{

    buttonClass="green-color";
    renderButton(){
        let button=document.createElement('button');
        button.innerHTML="Hello World";
        button.classList.add(this.buttonClass);
        let body=document.querySelector('body');
        button.onclick=function () {
            let p=document.createElement('p');
            p.innerHTML="welome to webpack learning";
            p.classList.add('red-text');
            body.append(p);
        }
        body.appendChild(button);

    }
}

export default HelloWorld;