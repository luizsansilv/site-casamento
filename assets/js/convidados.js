document.addEventListener("DOMContentLoaded", () => {

    function confirmarPresenca(){

        let nome = document.getElementById("nomeConvidado").value;

        //verificar se o input está vazio
        if(nome === "") {
            alert ("Por favor digite o seu nome!");
            return;
        }

        let lista = document.getElementById("listaConvidados");
        let convidados = lista.getElementsByTagName("li");
        
        //verificar se um nome já existe e ignorar maiusculas e minusculas na comparação
        for(let i = 0; i < convidados.length; i++){
            if(convidados[i].textContent.toLowerCase() === nome.toLowerCase()){
                alert("Esse nome já confirmou presença!");
                return;
            }
        }

        alert("Presença confirmada! 🎉");

        criarConvidado(nome);

        salvarConvidados();

        document.getElementById("nomeConvidado").value = "";
    }

    function salvarConvidados() {
        let lista = document.getElementById("listaConvidados");
        let convidados = lista.querySelectorAll(".nome");

        let nomes = [];

        convidados.forEach(convidado => {
            nomes.push(convidado.textContent);
        });

        localStorage.setItem(
            "convidados",
            JSON.stringify(nomes)
        );

    }

    function criarConvidado(nome) {
        let lista = document.getElementById("listaConvidados");

        let template = document.getElementById("templateConvidado");
        let clone = template.content.cloneNode(true);
        
        clone.querySelector(".nome").textContent = nome;

        clone.querySelector(".remover").onclick = function () {
            this.parentElement.remove();
            salvarConvidados();
        }

        lista.appendChild(clone);

    }

    let convidadosSalvos = 
        JSON.parse(localStorage.getItem("convidados")) || [];

    convidadosSalvos.forEach(nome => {
        criarConvidado(nome);
    })

    // tecla Enter
    const input = document.getElementById("nomeConvidado");

    if (input) {
        input.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                confirmarPresenca();
            }
        });
    }

    window.confirmarPresenca = confirmarPresenca;

}); 