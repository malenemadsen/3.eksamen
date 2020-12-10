<?php
if (isset($_POST["submit"])) {
   
    $name = $_POST["name"];
    $email = $_POST["email"];
    $username = $_POST["uid"];
    $pwd = $_POST["pwd"];
    $pwdRepeat= $_POST["pwdrepeat"];

    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    if (emptyInputSignup($name, $email, $username, $pwd, $pwdRepeat)!== false){ //!== ikke det samme som
        header("location:../signup.php?error=emptyinput");//?error=emptyinput fortæller i url'en at der mangler at blive udfyldt noget
        exit();
    }
    if (invalidUid($username)!== false){ 
        header("location:../signup.php?error=invaliduid");//?error=invaliduis fortæller i url'en at username ikke er valid
        exit();
    }
    if (invalidEmail($email)!== false){ 
        header("location:../signup.php?error=invalidemail");
        exit();
    }
    if (pwdMatch($pwd, $pwdRepeat)!== false){ 
        header("location:../signup.php?error=passworddontmatch");
        exit();
    }
    if(strongPassword($pwd)!== false){
        header("location:../signup.php?error=passwordweak");
        exit();
    }
    if (uidExists($conn, $username, $email)!== false){ 
        header("location:../signup.php?error=usernametaken");
        exit();
    }
    
    createUser($conn, $name, $email, $username, $pwd);
    }

else{
    header("location:../signup.php"); //sender brugen tilbage til sign up
    exit();
}
?>