<html>
<head>
<style>
  .well-personalizado:hover{
    background-color: aqua;
}
</style>
<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" integrity="sha512-07I2e+7D8p6he1SIM+1twR5TIrhUQn9+I6yjqD53JQjFiMf8EtC93ty0/5vJTZGF8aAocvHYNEDJajGdNx1IsQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js" integrity="sha512-A7vV8IFfih/D732iSSKi20u/ooOfj/AGehOKq0f4vLT1Zr2Y+RX7C+w8A1gaSasGtRUZpF/NZgzSAu4/Gc41Lg==" crossorigin=""></script>
 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet-geocoder-mapzen/1.9.2/leaflet-geocoder-mapzen.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-geocoder-mapzen/1.9.2/leaflet-geocoder-mapzen.js"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
<link rel="stylesheet" href="https://bootswatch.com/3/flatly/bootstrap.min.css"/>
<link rel="stylesheet" href="./css/styles.css" /> 
</head>
<body>
<div class="container-fluid">
<div class="row">
<div class="col-lg-6">
<div id="map" style="width:100%; height:50em;">
</div>
</div>
<div class="col-lg-6"> 
<button id="ubicar" class="btn btn-warning">Mi ubicacion</button>
<button id="traza" disabled="true" class="btn btn-success">Trazar ruta</button>
<button id="MostrarRuta" disabled="true" class="btn btn-info" value="ocultar">Ocultar Indicaciones</button>
<div class="form-group" id="opciones">

</div>
</div>

<div class="col-lg-6 bg-info informacion-scroll" id="seccion" style="margin-top:1em;">

  <h3>Informacion</h3>
  <div id="marcadorActual">
    
  </div>
</div>
</div>
</div>
<script src="js/main.js">
</script>
</body>
</html>