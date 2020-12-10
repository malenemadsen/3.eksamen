<?php
    $severName = "malenemadsen_dklockdowngames";
    $dBUsernam = "root";
    $dBPassword = "lockdowngames";
    $dBname = "lockdowngames";

    $conn = mysqli_connect($severName, $dBUsernam, $dBPassword, $dBname); //conecter til databasen

    if(!$conn){
        die("connection failed: " . mysqli_connect_error()); //Hvis den ikke kan få forbindesle 
    }
?>