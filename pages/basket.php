<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="../templates/style/styles.css">
    <title>Название страницы</title>
</head>
<body>

<?php

include('../templates/header.php');

?>
<div class="body-container">
    <?php
    include('../templates/navigation-panel.php');
    ?>
    <div class="container">
      <h1>Корзина</h1>
        <div class="items-table">
          <div class="items-table-product">
              <div style="width: 20%;">Фото:</div>
              <div style="width: 10%;">Название:</div>
              <div style="width: 10%;">Вес:</div>
              <div style="width: 10%;">Цена:</div>
              <div style="width: 10%;">Количество:</div>
              <div style="width: 10%;">Итого:</div>
          </div>
        </div>
    </div>
</div>
<?php
include('../templates/footer.php');
?>

<script src="../templates/scripts/basket.js" type="text/javascript"></script>
</body>
</html>
