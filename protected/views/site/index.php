<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name;
?>
 <?php  
  $baseUrl = Yii::app()->baseUrl; 
  $cs = Yii::app()->getClientScript();
  $cs->registerScriptFile($baseUrl.'/js/meshes.js');
  $cs->registerScriptFile($baseUrl.'/js/transform.js');
  $cs->registerScriptFile($baseUrl.'/js/main.js');
 
?>

<div class="container">
            <canvas id="scene" height="500" width="700" tabindex="1"></canvas>
            <div class="hint"> Нажмите - ↑ / ↓ -  для регулировки прозрачности</div>
</div>
<div class="sld-conteiner">
    <div class="sld">
        <div id="sliderx"></div>
    </div>
    <div class="sld">
        <div id="slidery"></div>
    </div>
    <div class="sld">
        <div id="sliderz"></div>
    </div>
</div>
