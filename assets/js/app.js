const formularioElement = $("#formulario");
const inputElement = $("#superhero-input");
const requestSection = $("request-section");

console.log(formularioElement);

function renderSuperheroCard(superhero) {
    const imagen = document.getElementById("imagen");
    const nombre = document.getElementById("nombre");

    const conexiones = $("#conexiones")
    const publicadopor = $("#publicadopor");
    const ocupacion = $("#ocupacion");
    const aparicion = $("#aparicion");
    const altura = $("#altura");
    const peso = $("#peso");
    const alianzas = $("#alianzas");

    imagen.setAttribute("src", superhero.image.url);
    nombre.innerHTML = `Nombre: ${superhero.name}`;

    conexiones.html(`Conexiones: ${superhero.connections["group-affiliation"]} , ${superhero.connections.relatives}`);
    publicadopor.html(`Publicado por: ${superhero.biography.publisher}`);
    ocupacion.html(`Ocupación: ${superhero.work.occupation}`);
    aparicion.html(`Primera Aparición: ${superhero.biography["first-appearance"]}`);
    altura.html(
        `Altura: ${superhero.appearance.height[0]} - ${superhero.appearance.height[1]}`
    );
    peso.html(
        `Peso: ${superhero.appearance.weight[0]} - ${superhero.appearance.weight[1]}`
    );
    alianzas.html(`Alianzas: ${superhero.biography.aliases.join(" - ")}`);
}

function renderSuperheroChart(superhero) {
    const options = {
    title: {
        text: `Estadísticas de Poder para ${superhero.name}`,
    },
    data: [{
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString:"#,##0.#"%"",
        dataPoints: [
            {
                label: "Intelligence",
                y: Number.parseInt(superhero.powerstats.intelligence),
            },
            {
                label: "Strenght",
                y: Number.parseInt(superhero.powerstats.strength),
            },
            {
                label: "Speed",
                y: Number.parseInt(superhero.powerstats.speed),
            },
            {
                label: "Durability",
                y: Number.parseInt(superhero.powerstats.durability),
            },
            {
                label: "Power",
                y: Number.parseInt(superhero.powerstats.power),
            },
            {
                label: "Combat",
                y: Number.parseInt(superhero.powerstats.combat),
          },
        ],
      },
    ],
};
$("#chartContainer").CanvasJSChart(options);

};

formularioElement.submit(function (event) {
    event.preventDefault();

    const idDelSuperHeroe = inputElement.val();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: `https://www.superheroapi.com/api.php/10225269663111295/${idDelSuperHeroe}`,
        }).done(function (data) {
            renderSuperheroCard(data);
            renderSuperheroChart(data);
        }).fail( function( jqXHR, textStatus, errorThrown ) {

            if (jqXHR.status === 0) {
        
            alert('Not connect: Verify Network.');
        
            } else if (jqXHR.status == 404) {
        
            alert('Requested page not found [404]');
        
            } else if (jqXHR.status == 500) {
        
            alert('Internal Server Error [500].');
        
            } else if (textStatus === 'parsererror') {
        
            alert('Requested JSON parse failed.');
        
            } else if (textStatus === 'timeout') {
        
            alert('Time out error.');
        
            } else if (textStatus === 'abort') {
        
            alert('Ajax request aborted.');
        
            } else {
        
            alert('Uncaught Error: ' + jqXHR.responseText);
            }
    });
});