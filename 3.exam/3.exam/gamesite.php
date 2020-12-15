<?php
    include_once 'header.php'
?>  

<?php
    if (isset($_SESSION["useruid"])){
        echo '<div class="container game-info d-none d-lg-block">
                <h1 class="title mb-4">Toilet paper rush!</h1>
                <p>The pandemic is here! what do you need to survive? Toilet paper and lots of it. Help <strong>Karen</strong> get enough to get through it!</p><br>
                
                <p class="small-heading">Who or what is a <b>Karen</b>?</p>
                <p>"Karen is a pejorative slang term for an obnoxious, angry, entitled, and often racist middle-aged white woman who uses her privilege to get her way or police other peoples behaviors."<a href="https://www.dictionary.com/e/slang/karen/"> Karen was one of the top trends in 2020.</a></p>
                <p class="play mt-3"><a href="game.php">PLAY</a></p>
            </div>
            <div class="container game-info center d-lg-none d-xl-block>
              <p class="log-in">You can only play this game on a computer</p>
            </div>';;
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