<?php
require("sentencias.php");
@$rs = Sentencias::sentencia("select * from Categories");
$html = "<select class='form-control' id='categorias'>";
while($row = mysqli_fetch_array($rs)){
    $html.="<option value='".$row[1]."'>".$row[1]."</option>";
}
$html.="</select>";
echo $html;
