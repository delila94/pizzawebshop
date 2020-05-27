<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//ovo je bilo
/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
//Route::group(['middleware' => ['web']], function () {

//Route::post('register', 'UserController@register');
//Route::post('register','Auth\RegisterController@register');  
//Route::post('login','Auth\LoginController@login');  
//Route::post('login', 'UserController@login');
//Route::post('logout', 'UserController@logout');
//Route::get('profile', 'UserController@getAuthenticatedUser');
//});
//Route::post('register','Auth\RegisterController@register'); 
Route::post('register', 'UserController@register'); 
//Route::post('login','Auth\LoginController@login');  
Route::post('login', 'UserController@login');
Route::post('logout', 'UserController@logout');
//Route::post('logout','Auth\LoginController@logout');
Route::get('profile', 'UserController@getAuthenticatedUser');
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        Route::get('logout', 'UserController@logout2')->name('api.jwt.logout');
        return $request->user();

    });