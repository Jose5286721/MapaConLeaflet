<?php
class Conexion{
   public static function conn(){
        $host="localhost";
        $user="root";
        $pass="";
        $bd="MapsWithBD";
        return(mysqli_connect($host,$user,$pass,$bd));
    }
}
