<?php
require("conexion.php");
class Sentencias{
    public static function sentencia($sql){
        $res = mysqli_query(Conexion::conn(),$sql);
        return $res;
    }
}