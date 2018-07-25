<?php
    $dir = dirname(__FILE__).'/';
    include($dir.'barcode.php');
    shell_exec('rm *.png');
    $code = $_POST['barcode'];
    $barcode = new Barcode($code, 4, $dir.'FreeSansBold.ttf');
    imagepng($barcode->image(), $dir.$code.'.png');
    shell_exec('convert -transparent white '.$code.'.png '.$code.'.png');
    echo('PNG barcode '.$code.' sucessfully generated!');
?>

