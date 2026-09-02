const ahora=new Date();
new Date().toLocaleDateString();
setInterval(()=>{

},1000);

export class Reloj{
    constructor(elemento){
    this.elemento=elemento;
    this.segundos=0;
    this.iniciar();
    }
    iniciar(){
        setInterval(()=>{
        this.elemento.textContent = new Date().toLocaleTimeString();    
        },1000)
    }
}