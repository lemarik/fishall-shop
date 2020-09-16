<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="templates/style/styles.css">
    <title>Название страницы</title>
</head>
<body>

<?php

    include('templates/header.php');

?>
<div class="body-container">
    <?php
        include('templates/navigation-panel.php');
      //  include('templates/start-page-blocks.php');

        $user = 'root';
        $password = '';
        $db = 'fishall';
        $host = 'localhost';

        $dsn = 'mysql:host='.$host.';dbname='.$db;
        $pdo = new PDO($dsn, $user, $password);

        $query = $pdo->query('SELECT * FROM `products` ORDER BY `title`');
    ?>

    <div class="main-container-card">

        <?php
            while($row = $query->fetch(PDO::FETCH_OBJ)) {
                echo  '
                <div class="middle-item-card">
                    <img class="card-picture" src="templates/img/'.$row->img.'">
                        <div class="middle-item-card-container">
                            <span class="card-picture-name">'.$row->title.'<br></span>
                            <span class="is-in-stock">В наличии<br></span>
                            <p>'.$row->price.' руб./кг</p>
                            <span>Масса<br></span>
                            <p>'.$row->weight.'</p>
                            <br><br>
                            <div class="item-card-button-container">
                                <button class="info-button-card">
                                    <span>Подробнее</span>
                                </button>
                                <button class="buy-button-card">
                                    <span>Купить</span>
                                </button>
                            </div>
                     </div>
                </div> 
            ';

            }
         ?>
    </div>


</div>
<?php
include('templates/footer.php');


?>


</body>
</html>
