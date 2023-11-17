<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/laravel', function () {
    return view('welcome');
});
Route::group(['namespace'=>'\App\Http\Controllers\Page3D'], function () {
    Route::get('/excursion', IndexController::class)->name('excursion.index');
    //Route::get('/excursion/{id}', ShowController::class);
});
//For Ajax Logic
Route::group(['namespace' => '\App\Http\Controllers\Page3D\Ajax_Request'], function () {
    Route::get('/getAjax/{partName}', ShowController::class);
});

Route::group(['namespace' => 'App\Http\Controllers\Home'], function () {
    Route::get('/', IndexController::class)->name('home.index');
});
Auth::routes();
