@extends('layouts.main')
@section('content')
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
@vite([
    'public/js/excursion/model_scripts/disk.js',
])
<div class="main-page">
    <div id="main-exursion-container">
        <canvas id="main-canvas"></canvas>
    </div>
    <ul class = "btn-panel">
        <li><button class="btn btn-dark btn-panel-item">B1</button>
        </li>
        <li><button class="btn-panel-item">B2</button></li>
        <li><button class="btn-panel-item">B3</button></li>
        <li><button class="btn-panel-item">B4</button></li>
    </ul>
    <div id='info-div'>
        <h2 id='title'></h2>
        <div id='info-text'></div>
    </div>
</div>
@endsection
