@extends('layouts.main')
@section('content')
    @vite([
    'public/js/main3Dpage.js',
])
    <div class="main-page mt-5">
        <div class="main-text">
            <h2 style="font-size: calc(var(--index)*2); text-align: center; font-weight: bold; color: white;">Welcome!</h2>
            <p style="color: white; text-align: center; font-size: calc(var(--index)*1)">
                This site was created solely for informational purposes. It will allow you to get a general idea of the
                structure of the vertebra, intervertebral disc, pulpous nucleus, plasma membrane. Thanks to our website, you
                will be able to visit the body from the cervical spine to the processes taking place inside. The site also
                presents methods for detecting the condition of intervertebral discs, which you can familiarize yourself
                with at any time
            </p>
            <form action="{{route('excursion.index')}}">
                <input class="btn btn-outline-light" type="submit" value="Start Excursion" style="margin: 0 auto; display: block; font-size: calc(var(--index)*1)" >
            </form>
        </div>
        <div id="main-container">
            <canvas id="main-canvas"></canvas>
        </div>
    </div>
@endsection
