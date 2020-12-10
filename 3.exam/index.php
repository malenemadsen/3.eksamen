<?php
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <!--Own CSS-->
    <link rel="stylesheet" href="css/style.css">
    <!--Fonts-->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Nerko+One&display=swap" rel="stylesheet">
    <!--Favicon-->
    <link rel="icon" type="image/png" href="images/other/favicon.png"/>
    <title>Lockdown Games</title>
</head>
<body>

<section>
    <div class="container login-form">
        <div class="row">
            <div class="col-12 col-sm-6 section-1">
                <img src="images/other/combination-mark.png">
            </div>
            <div class="col-12 col-sm-6 section-2">
                <form action="includes/login.inc.php" method="post">
                    <div>
                        <div class="form-group">
                            <input type="text" name="uid" class="form-control" placeholder="Username/Email">
                        </div>
                        <div class="form-group">
                            <input type="password" name="pwd" class="form-control" placeholder="Password">
                        </div>
                        <button type="submit" name="submit" class="submit mb-2">Log In</button>
                        <p>or <a href="signup.php">sign up</a></p>
                        <?php
                            if(isset($_GET["error"])){
                                if($_GET["error"] == "emptyinput"){
                                    echo '<p class="error">Fill in all fields</p>';
                                }
                                else if($_GET["error"] == "wronglogin"){
                                    echo '<p class="error">Username or password is not correct</p>';
                                }
                            }
                        ?>
                </from>
            </div>
        </div>
    </div>
</section>

