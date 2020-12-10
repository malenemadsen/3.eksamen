<?php
//Funktion der tjkekker efter tomme felter
function emptyInputSignup($name, $email, $username, $pwd, $pwdRepeat) {
    $result;
if (empty($name) || empty($email) || empty($username) || empty($pwd) || empty($pwdRepeat)) { //tjekker om nogle af felterne er tomme (|| = eller)
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}
//Funktion der tjekker om usernamet er godt nok
//Der tjekkes for fejl først derfor bliver der testet med !
function invalidUid($username){
    $result;
if (!preg_match("/^[a-zA-Z0-9]*$/", $username)) { //hvis der er special tegn i username får man en fejl
        $result = true;
    } 
    else{
        $result = false;
    }
    return $result;
}
//Funktion der tjekker om email'en er god nok
function invalidEmail($email){
    $result;
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { //Indbygget funktion der tjekker om emailen er korrekt
        $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}
//Funktion der tjekker om passwordsne er ens
function pwdMatch($pwd, $pwdRepeat){
    $result;
if ($pwd !== $pwdRepeat) { //Tjekker om de 2 passwords er ens
        $result = true;
    }
    else{
        $result = false;
    }
    return $result;
}

 //Funktion der tjekker om passwordet er stærkt nok
 function strongPassword($pwd) {
    $result;
    if (strlen($pwd) < 8) { //skal være 8 langt.I virkeligheden tjekker den om den er mindre en 8, fordi vi tjekker efter fejl først
        $result = true;
    }

    if (!preg_match("#[0-9]+#", $pwd)) { //tjekker om der er tal
        $result = true;
    }

    if (!preg_match("#[a-zA-Z]+#", $pwd)) {//tjekker eftere store og små bokstaver
        $result = true;
    } 
    else{
        $result = false;
    }
    return $result;
}
//Funktion der tjekker om username eller email allerede eksitere inde i databasen 
function uidExists($conn, $username, $email){ //$conn skaber forbindesle til databasen
   $sql = "SELECT * FROM users WHERE usersUid = ? OR usersEmail = ?;"; //Henter informationerne. ?=placeholder til prepred statement
   $stmt = mysqli_stmt_init($conn);//prepred statement
   if(!mysqli_stmt_prepare($stmt, $sql)){ //hvid den ikke for forbindsle 
    header("location:../signup.php?error=stmtfaild");//Skriver fejeln i url
        exit();
   }
   mysqli_stmt_bind_param($stmt, "ss", $username, $email); //Fortæller hvilke type data der bliver sendt afsted.ss= 2 stings
   mysqli_stmt_execute($stmt);

   $resultData = mysqli_stmt_get_result($stmt);

   if ($row = mysqli_fetch_assoc($resultData)){
       return $row;
   }
   else{
       $result = false;
       return $result;
   }

   mysqli_stmt_close($stmt);
}
//Function Der sender informationen ind i databasen
function createUser($conn, $name, $email, $username, $pwd){//$conn skaber forbindesle til databasen
    $sql = "INSERT INTO users (usersName, usersEmail, usersUid, usersPwd) VALUES (?, ?, ?, ?);"; //inster informationerne. ?=placeholder til prepred statement
    $stmt = mysqli_stmt_init($conn);//prepred statement
    if(!mysqli_stmt_prepare($stmt, $sql)){//hvid den ikke for forbindsle 
     header("location:../signup.php?error=stmtfaild");//Skriver fejeln i url
         exit();
    }

    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT); //hashed password

    mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $username, $hashedPwd); //Fortæller hvilke type data der bliver sendt afsted.ssss= 4 stings
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    header("location:../index.php");
         exit();
 }

//Funktion der tjkekker efter tomme felter
function emptyInputLogin($username, $pwd) {
    $result;
if (empty($username) || empty($pwd)) { //tjekker om nogle af felterne er tomme (|| = eller)
        $result = true;
    }
    else {
        $result = false;
    }
    return $result;
}
//Funktion der tjkekker om du har en bruger
function loginUser($conn, $username, $pwd) {
    $uidExists = uidExists($conn, $username, $username);//se vidoen igen 1:39:15

    if($uidExists === false) {
        header("location:../index.php?error=wronglogin");
         exit();
    }

    $pwdHashed = $uidExists["usersPwd"];
    $checkPwd = password_verify($pwd, $pwdHashed); //tjekker om passwordet passer

    if($checkPwd === false){
        header("location:../index.php?error=wronglogin");
         exit();
    }
    else if ($checkPwd === true){ 
        session_start();
        $_SESSION["userid"] = $uidExists["usersId"];
        $_SESSION["useruid"] = $uidExists["usersUid"];
        header("location:../gamesite.php");//hvis det hele passer bliver de sendt ind til spilet
         exit();
    }
}
?>