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
        $password = 'root';
        $db = 'fishall';
        $host = 'localhost';

        $dsn = 'mysql:host='.$host.';dbname='.$db;
        $pdo = new PDO($dsn, $user, $password);

        $query = $pdo->query('SELECT * FROM `products` ORDER BY `id`');
    ?>

    <div class="main-container-card">

        <?php
            $jsonString = '';
            $jsonArray = array();

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
                                <button class="buy-button-card" data-id="'.$row->id.'">
                                    <span>Купить</span>
                                </button>
                            </div>
                     </div>
                </div> 
            ';
            $jsonItem = array(
                'id'      => $row->id,
                'title'   => $row->title,
                'price'   => $row->price,
                'weight'  => $row->weight,
                'img'     => $row->img,
                'inCart'  => $row->inCart
            );
            $jsonArray[] = $jsonItem;
            }
        $jsonString = json_encode($jsonArray, JSON_UNESCAPED_UNICODE);
        file_put_contents('goods.json', $jsonString);
        echo $jsonString;
         ?>
    </div>


</div>
<?php
include('templates/footer.php');


?>

<script src="templates/scripts/basket.js" type="text/javascript"></script>
</body>
</html>
