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
  <nav class="navbar navbar-expand-lg">
    <a href="gamesite.php"><img src="images/other/favicon.png" alt="logo"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon">   
        <i class="fa fa-bars" style="color:#d51956; font-size:28px;"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto float-right ul">
        <li class="nav-item">
          <a class="nav-link" href="gamesite.php">Game <span class="sr-only"></span></a>
          <?php
              if (isset($_SESSION["useruid"])) {
                  echo "<li><a class='nav-link' href='includes/logout.inc.php'>Log out</a></li>";
              }
              else {
                  echo "<li><a class='nav-link' href='signup.php'>Sign up</a></li>";
                  echo "<li><a class='nav-link' href='index.php'>Log in</a></li>";
              }
              ?>
      </ul>
    </div>
  </nav>