<?php
    include_once 'header.php'
?>  

<?php
    if (isset($_SESSION["useruid"])){
        echo '<div class="container game d-none d-lg-block">
                <div class="row">
                    <div class="col-sm">
                        <h1 class="title mb-2">Toilet paper rush!</h1>
                        <p>Hey ' . $_SESSION["useruid"] . ' !</p>
                        <p>Get enough toilet paper to surive the pandemic, but be carfule you only have a limet amount of moves.</p><br>
                        <p>The only way to win is to get all the toilet papper.. ALL THE TOILET PAPPER!</p><br>
                        <p><b>Tip:</b> Every time you get througe a level you get some extra moves.</p>
                    </div>
                    <div class="col-sm">
                        <canvas width="480" height="480" id="canvas"></canvas>
                    </div>
                    <div class="col-sm">
                        <p class="moves">You have <br><span id="moves"></span><br>moves left!</p>
                    </div>
                </div>
            </div>
            <div class="container game-info center d-lg-none d-xl-block>
              <p class="log-in">You can only play this game on a computer</p>
            </div>';
    }
    else{
      echo '<div class="container game-info center">
      <p class="log-in">Log in to play</p><br>
      <p class="play mt-1"><a href="index.php">Log in</a></p>
      <p class="mt-1">or <a href="signup.php">sign up</a></p>
      </div>';
    }
?>

<?php
    include_once 'footer.php'
?>