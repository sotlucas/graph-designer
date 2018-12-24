//--------------------------------
//            TDA COLA
//--------------------------------
//code.iamkate.com
function Queue(){var a=[],b=0;this.getLength=function(){return a.length-b};this.isEmpty=function(){return 0==a.length};this.enqueue=function(b){a.push(b)};this.dequeue=function(){if(0!=a.length){var c=a[b];2*++b>=a.length&&(a=a.slice(b),b=0);return c}};this.peek=function(){return 0<a.length?a[b]:void 0}};

//--------------------------------
//            TDA GRAFO
//--------------------------------
class Grafo {
    constructor() {
        this.cantidad = 0;
        this.AdjList = new Map();
    }

    agregarVertice(v) {
        this.AdjList.set(v, []);
        this.cantidad += 1;
    }

    agregarArista(v, w) {
        this.AdjList.get(v).push(w);
        this.AdjList.get(w).push(v); // No dirigido
    }                        

    adyacentes(v) {
        return this.AdjList.get(v);
    }

    getCantidad() {
        return this.cantidad;
    }

    printGrafo() {
        var get_keys = this.AdjList.keys();

        for (var i of get_keys) {
            var get_values = this.AdjList.get(i);
            var conc = "";

            for (var j of get_values)
                conc += j + " ";

            console.log(i + " -> "+ conc);
        }
    }

    bfs(origen) {
        var orden = [];
        var visitados = [];

        var q = new Queue();

        visitados[origen] = true;
        q.enqueue(origen);

        while (!q.isEmpty()) {
            var v = q.dequeue();

            orden.push(v);

            var adyacentes = this.adyacentes(v);
            for (var i in adyacentes) {
                var ady = adyacentes[i];
                if (!visitados[ady]) {
                    visitados[ady] = true;
                    q.enqueue(ady);
                }
            }

        }

        return orden
    }

    dfs(origen) {
        var orden = [];
        var visitados = [];

        this.dfsRec(origen, visitados, orden);
        return orden;
    }

    dfsRec(vert, visitados, orden) {
        visitados[vert] = true;
        orden.push(vert);
        var adyacentes = this.adyacentes(vert);
        for (var i in adyacentes) {
            var ady = adyacentes[i];
            if (!visitados[ady])
                this.dfsRec(ady, visitados, orden);
        }
    }
}
//--------------------------------

var contador = 1;
var grafo = new Grafo();

function crearArista(vertice1, vertice2) {
    var x1 = vertice1.offsetLeft;
    var y1 = vertice1.offsetTop;
    var x2 = vertice2.offsetLeft;
    var y2 = vertice2.offsetTop;

    var distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));

    var xMid = (x1 + x2) / 2;
    var yMid = (y1 + y2) / 2;

    var slopeInRadian = Math.atan2(y1 - y2, x1 - x2);
    var slopeInDegrees = (slopeInRadian * 180) / Math.PI;

    var div = document.querySelector(".arista");
    var arista = div.cloneNode(true);
    arista.id = "arista" + contador;
    arista.style.width = distance + "px";
    arista.style.top = (yMid + 50 / 2 ) + "px";
    arista.style.left = ((xMid - (distance / 2)) + 50 / 2) + "px";
    arista.style.transform = "rotate(" + slopeInDegrees + "deg)";
    document.querySelector('#container').appendChild(arista);
    grafo.agregarArista(vertice1.id, vertice2.id);
}

function crearVertice(nombre, x, y) {
    var div = document.querySelector('.vertice');
    var vert = div.cloneNode(true);
    vert.innerHTML = nombre;
    vert.id = nombre;
    vert.style.left = x + "px";
    vert.style.top = y + "px";
    vert.style.display = "block";
    document.querySelector('#container').appendChild(vert);
    grafo.agregarVertice(nombre);
    contador++;
    return vert;
}

var A = crearVertice("A", 200, 150);
var B = crearVertice("B", 350, 250);
var C = crearVertice("C", 350, 50);
var D = crearVertice("D", 350, 150);
var E = crearVertice("E", 650, 150);
var F = crearVertice("F", 500, 150);
var G = crearVertice("G", 500, 250);
var S = crearVertice("S", 50, 150);
crearArista(S, A);
crearArista(A, B);
crearArista(A, C);
crearArista(A, D);
crearArista(D, B);
crearArista(D, F);
crearArista(D, G);
crearArista(F, E);

grafo.printGrafo();
console.log("BFS");
var bfs = grafo.bfs("S");
console.log(bfs);
console.log("DFS");
var dfs = grafo.dfs("S");
console.log(dfs);

//-----------------------------
//          COLOREAR
//-----------------------------
function colorearAdy(vert, visitados) {
    var adyacentes = grafo.adyacentes(vert);
    for (var i in adyacentes) {
        var ady = adyacentes[i];
        if (!visitados[ady]) {
            visitados[ady] = true;
            var adyElem = document.getElementById(adyacentes[i]);
            adyElem.style.border = "5px #9AE0B4 solid";
            adyElem.style.color = "#9AE0B4";
        }
    }
}

function colorear(vertices, delay) {
    loop();
    var visitados = [];
    var i = 0;

    function loop () {
        setTimeout(function () {
            visitados[vertices[i]] = true;
            var vert = document.getElementById(vertices[i]);
            vert.style.border = "5px #0BAA46 solid";
            vert.style.color = "#0BAA46";
            
            console.log(visitados);
            colorearAdy(vert.id, visitados);

            i++;
            if (i < vertices.length) {
                loop();
            } else {
                done = true; // Queda muy hacky pero no se como hacer para multiples clicks
            }
        }, delay)
    }
}

function descolorear(vertices) {
    for (var i in vertices) {
        var vert = document.getElementById(vertices[i]);
        vert.style.border = "5px #3E92CC solid";
        vert.style.color = "#3E92CC";
    }
}

function colorearHandler(vertices, delay) {
    if (done == true) {
        done = false;
        boton.removeEventListener("click", colorearHandler); 
        descolorear(vertices);
        colorear(vertices, delay);
    }
}

var done = true;
var boton = document.querySelector('.boton');
boton.addEventListener("click", function() {
    colorearHandler(bfs, 1000);
}, false);


