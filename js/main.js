//Aqui inicializamos el valor de la variables
var map = L.map('map').setView([-25.265237, -57.503603], 16);
var miUbicacion,contenidoHtml;
var auxMyUbi;
var iconos = new Array();
var marcadoresCategorias = new Array();
var routing = null;
var miMarcador,marcador = null;
var contador = 1;

//Aqui inicializamos con un evento de pantalla cuando inicia que traiga todas las categorias y cargue el menu de opciones
window.onload = function(){
    var opciones = this.document.getElementById("opciones");
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onload = function(e){
        e.preventDefault();
        if(this.status == 200 && this.readyState == 4){
            opciones.innerHTML = this.responseText;
        }
    }
    xmlHttpRequest.open('GET','http://localhost/mapas/bd/categorias.php',false);
    xmlHttpRequest.send();
    document.getElementById("categorias").addEventListener("change",function(){
        console.log(this.value);
        buscarLugares(this.value);
    });
};
L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}.png?access-token=cEFTaX3NK7VqIpeBnx66tVES54EzIM4HcizwT2W07xl6NQqYqMKQztWCXtWETOPc', {}).addTo(map);
  L.control.geocoder('cEFTaX3NK7VqIpeBnx66tVES54EzIM4HcizwT2W07xl6NQqYqMKQztWCXtWETOPc', {url: 'https://api.jawg.io/places/v1', autocomplete: true}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
map.locate({setView:true,maxZoom:16});
//L.control.geocoder('', {url: 'https://api.jawg.io/places/v1', autocomplete: false}).addTo(mymap);

//Se indica la accion que se realizara una vez localizado al usuario
function onLocationFound(e){
    let coord = e.coords;
    auxMyUbi = coord;
    map.setZoom(19);
    miUbicacion=L.latLng(coord.latitude,coord.longitude);
    L.circleMarker(
        L.latLng(coord.latitude,coord.longitude),{
            radius:30
        }
    ).addTo(map).bindPopup('<h3>Mi ubicacion actual</h3>');
    buscarLugares(document.getElementById('categorias').value);
}

//Aqui se crea la funcion para que se muestre la tarjeta de todas las ubicaciones en el panel de informaciones
function mostrarTarjetas(indice,targeta){
    marcadoresCategorias[indice] = marcadoresCategorias[indice].setIcon(L.icon({iconUrl:`${iconos[indice]}`,iconSize: [35, 51],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]}));
    if(!targeta){
        console.log(document.getElementById(`${indice}`).offsetTop);
        document.getElementById(`${indice}`).classList.add('amarillo');
        document.getElementById('seccion').scrollTop=document.getElementById(`${indice}`).offsetTop;
    }else{
        document.getElementById(`${indice}`).classList.add('amarillo');
    }
}
function ocultarTarjetas(indice,targeta){
    marcadoresCategorias[indice] = marcadoresCategorias[indice].setIcon(L.icon({iconUrl:`${iconos[indice]}`,iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]}));
    if(!targeta){
        document.getElementById(`${indice}`).classList.remove('amarillo');
        document.getElementById('seccion').scrollTop=document.getElementById(`${indice}`).offsetTop;
    }else{
        document.getElementById(`${indice}`).classList.remove('amarillo');
    }
}
//Aqui se indica lo que hara el boton ubicar dentro de el
document.getElementById("ubicar").addEventListener('click',function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            onLocationFound,
            onLocationError
        );
    }
})
function onLocationError(e){
    alert(e.message);
}

//Aqui se crea la funcion que sirve para buscar lugares cercanos clasificados por categoria como vemos el parametro
//que se le pasa es una categoria ya indicada del select option
function buscarLugares(categoria){
    var res = new XMLHttpRequest();
    res.onload = ()=>{
    if(res.status == 200 && res.readyState == 4){
        var respuesta = JSON.parse(res.responseText);
        var resultados = respuesta.results.items;
        console.log(resultados);
       
        if(marcadoresCategorias.length > 0){
            marcadoresCategorias.forEach(elemento =>{
                map.removeLayer(elemento);
            });
            marcadoresCategorias = new Array();
        }
        
        var contador = 0;
        resultados.map(function(item){
            iconos.push(item.icon);
            marcadoresCategorias.push(L.marker(L.latLng(item.position),{icon:L.icon({iconUrl:`${item.icon}`,iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]})}).bindPopup(`<div class="well" id=${contador++}><strong class="titulo">${item.title}</strong>
            <p  class="direccion">${item.vicinity.toString()}
            </p>
            <p >${item.category.title}</p></div>
            `).on('mouseover',function(e){
                /*var tempMarc = document.getElementById("marcadorActual");
                var popup = e.target.getPopup();
                var content = popup.getContent();
                tempMarc.innerHTML = content;
                var temp = document.createElement('div');
                temp.innerHTML = content;
                console.log(temp.getElementsByClassName('titulo')[0].innerHTML);*/
                document.getElementById('traza').disabled = false;
                miMarcador=this.getLatLng();
                console.log(miMarcador.lat);
                mostrarTarjetas(verificarNumeroMarcador(miMarcador.lat),false);
            }).on('mouseout',function(e){
                document.getElementById('traza').disabled = false;
                miMarcador=this.getLatLng();
                console.log(miMarcador.lat);
                ocultarTarjetas(verificarNumeroMarcador(miMarcador.lat),false);
            }).addTo(map));
            
            });
            /*
            for(var cont = 0 ; cont<marcadoresCategorias.length ; cont++){
                var elemento = marcadoresCategorias[cont];
                (elemento.getPopup()).getContent();
            }*/
            contenidoHtml = '';
            marcadoresCategorias.forEach(function(elemento,index,array){
                 contenidoHtml+=(elemento.getPopup()).getContent();
                 document.getElementById('marcadorActual').innerHTML = contenidoHtml;
                 
                });
            for(var cont = 0; cont<contador; cont++){
                document.getElementById(`${cont}`).addEventListener('mouseover',function(e){
                    e.preventDefault();
                    if(e.target.id > -1){
                        mostrarTarjetas(e.target.id,true);
                    }
                });
                document.getElementById(`${cont}`).addEventListener('mouseout',function(e){
                    e.preventDefault();
                    if(e.target.id > -1){
                        ocultarTarjetas(e.target.id,true);
                    }
                });
            
            }
            console.log(contenidoHtml);
            //console.log(document.getElementById('marcadorActual').childElementCount);
            
        }
}
res.open('GET',`https://places.demo.api.here.com/places/v1/discover/search?at=${auxMyUbi.latitude},${auxMyUbi.longitude}&q=${categoria}&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg`,false);
res.send();
}

function verificarNumeroMarcador(latitude){
    var indice = 0;
    marcadoresCategorias.forEach(function(value, index, array){
        var tmp = value.getLatLng();
        if(tmp.lat == latitude){
            indice = index;
        }
    })
    return indice;
}

//Aqui codificamos el boton para mostrar las indicaciones o ocultarlas
document.getElementById('MostrarRuta').addEventListener('click',function(){
    var boton = document.getElementById('MostrarRuta');
    if(boton.value !== "ocultar"){
        boton.innerText = "Ocultar indicaciones";
        boton.value="ocultar";
        routing.show();
    }else{
        boton.innerHTML = "Mostrar indicaciones";
        boton.value="mostrar";
        routing.hide();
    }
})

//Aqui se define la accion que hara el boton de trazar ruta
document.getElementById('traza').addEventListener('click',function(){
    if(miMarcador!=null){
        if(routing!=null){
            
            routing.spliceWaypoints(0, 2);
            routing.hide();
            map.removeControl(routing);
            routing = null;
        }
        try{
         routing = L.Routing.control({
            waypoints: [
                miUbicacion,
                miMarcador
            ],
            routeWhileDragging: true
        }).addTo(map);
        document.getElementById('MostrarRuta').disabled = false;
        document.getElementById('MostrarRuta').innerHTML = "Ocultar indicaciones";
        document.getElementById('MostrarRuta').value = "ocultar";
    }catch(e){
        alert("No se pudo trazar la ruta");
    }
    }else{
        alert("Seleccione un marcador");
    }
    
});
//Se ejecuta cuando se produce un error al ubicar 
map.on('locationerror',onLocationError);

//Ejecuta un evento de click en el mapa
map.on('click',function(e){
    document.getElementById('traza').disabled = false;
    marcador = L.marker(e.latlng).addTo(map).on('click',function(e){
        miMarcador=this.getLatLng();
        contador++;
        console.log(`Usted ha solicitado ${contador} veces para este marcador`);
        if(contador==2){
            map.removeLayer(marcador);
            contador=1;
        }
    });
});

