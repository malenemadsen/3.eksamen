<?php
    $severName = "localhost";
    $dBUsernam = "root";
    $dBPassword = "";
    $dBname = "lockdowngames";

    $conn = mysqli_connect($severName, $dBUsernam, $dBPassword, $dBname); //konecter til databasen

    if(!$conn){
        die("connection failed: " . mysqli_connect_error()); //Hvis den ikke kan få forbindesle 
    }
?>