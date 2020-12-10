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
                <form action="includes/signup.inc.php" method="post">
                    <div>
                        <div class="form-group">
                            <input type="text" name="name" class="form-control" placeholder="Full name">
                        </div>
                        <div class="form-group">
                            <input type="text" name="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="text" name="uid" class="form-control" placeholder="Username">
                        </div>
                        <div class="form-group">
                            <input type="password" name="pwd" class="form-control" placeholder="Password">
                        </div>
                        <div class="form-group">
                            <input type="password" name="pwdrepeat" class="form-control" placeholder="Repeat Password">
                        </div>
                        <button type="submit" name="submit" class="submit mb-2">Sign Up</button>
                        <p>Already have an account? <a href="index.php">Log in</a></p>

                        <?php
                            if(isset($_GET["error"])){
                                if($_GET["error"] == "emptyinput"){
                                    echo "<p class='error'>Fill in all fields</p>";
                                }
                                else if($_GET['error'] == "invaliduid"){
                                    echo "<p>Username cannot contain special characters</p>";
                                }
                                else if($_GET['error'] == "invalidemail"){
                                    echo "<p>Enter valid email</p>";
                                }
                                else if($_GET['error'] == "passworddontmatch"){
                                    echo "<p>The passwords don't match</p>";
                                }
                                else if($_GET['error'] == "usernametaken"){
                                    echo "<p>Username or email is alredy in use</p>";
                                }
                            }
                        ?>
                </from>
            </div>
        </div>
    </div>
</section>

