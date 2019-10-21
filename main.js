let width = 600, height = 600;

let margin = {
    top: 20,
    bottom: 20,
    left: 30,
    right: 30
};

svg = d3.select(".airport").append("svg")
    .attr("width",width)
    .attr("height",height)
    .attr("viewBox","0 0 1000 1000")
    .style("border","1px solid black");
  
d3.svg("737-800.svg").then(svgFile => {
    svg.node().appendChild(svgFile.querySelector("#avion"))

    let ruta = svg.node().appendChild(svgFile.querySelector("#ruta"))
    let avion = svg.select("#avion");
    let ruedas = svg.select("#ruedas");

    let circle = avion.append("circle").attr("r",10)
    let t = 0; 
    let heading = -45;
    let wheelbase = 123;

    avion.attr("transform","translate(200,200)")
    ruedas.attr("transform","rotate(0)")

    document.addEventListener("keydown",event => {
        if(event.key === "j") {

            let matrixRuedas = ruedas.node().transform.baseVal.consolidate().matrix;
            let anguloRuedas = Math.atan2(matrixRuedas.b,matrixRuedas.a);

            if (anguloRuedas *180 / Math.PI < 40) {
                let rotate = svg.node().createSVGTransform();
                rotate.setRotate(10,0,0);
                ruedas.node().transform.baseVal.appendItem(rotate);
            }
        }

        if(event.key === "f") {
            let matrixRuedas = ruedas.node().transform.baseVal.consolidate().matrix;
            let anguloRuedas = Math.atan2(matrixRuedas.b,matrixRuedas.a);

            if (anguloRuedas * 180 / Math.PI > -40) {
                let rotate = svg.node().createSVGTransform();
                rotate.setRotate(-10,0,0);
                ruedas.node().transform.baseVal.appendItem(rotate);
            }

        }

        let matrixRuedas = ruedas.node().transform.baseVal.consolidate().matrix;
        let matrixAvion = avion.node().transform.baseVal.consolidate().matrix;
        let anguloRuedas = Math.atan2(matrixRuedas.b,matrixRuedas.a);
        let anguloAvion = Math.atan2(matrixAvion.b,matrixAvion.a);

        let valory = Math.tan(Math.PI/2-anguloRuedas)*wheelbase;
        circle.attr("cx",-wheelbase)
            .attr("cy",valory)

        console.log("Angulo Ruedas ",anguloRuedas * 180 / Math.PI)
        if(event.key === "p") {
            if(Math.abs(anguloRuedas) < 0.1) {
                let translate = svg.node().createSVGTransform();
                translate.setTranslate(5,0);
                
                avion.node().transform.baseVal.appendItem(translate);
            } else {
                let rotate = svg.node().createSVGTransform();       
                rotate.setRotate(Math.sign(valory)*1,-wheelbase,valory);

                avion.node().transform.baseVal.appendItem(rotate);
            }
        }
    })
})

