

export class Carta{
    constructor(code,value,suit,imagen){
        this.code = code;
        this.value = value;
        this.suit = suit;
        this.imagen = imagen;
        }

    toJsonString(){
        return JSON.stringify(this)
    }

    static createFromJsonString(json){
        const carta = JSON.parse(json);

        return new Carta(
            carta.code,
            carta.value,
            carta.suit,
            carta.imagen
    );
    }

    createHtmlElement(){
        const HTMLCarta = document.createElement("div");

        HTMLCarta.innerHTML = `
        <h2>${this.code}</h2>

        <a href="${this.imagen}" target="_blank">
            <img 
                src="${this.imagen}" 
            >
        </a>

        <p>Valor: ${this.value} Palo: ${this.suit}</p>

        <button class="btn btn-outline-warning btn-lg w-100"" id="guardar">
            Guardar
        </button>`
          
        const botonGuardar = HTMLCarta.querySelector("#guardar");

        botonGuardar.addEventListener("click", () => {
            Carta.guardarCarta(this);
    });
        return HTMLCarta;
    }

    static guardarCarta(carta){

        let cartasGuardadas =
            localStorage.getItem("cartas");

        if(cartasGuardadas == null){
            cartasGuardadas = [];
        }
        else{
            cartasGuardadas =
                JSON.parse(cartasGuardadas);
        }
        
        const controlCarta = cartasGuardadas.some(c => c.code === carta.code) 
        
        if (!controlCarta){
        cartasGuardadas.push(carta)
        alert("Carta guardada exitosamente");}
        else{
            alert("Carta ya guardada.")}

        localStorage.setItem(
            "cartas",
            JSON.stringify(cartasGuardadas)
        );
    }


}