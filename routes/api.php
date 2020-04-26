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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::resource('products', 'ProductController');
/*Route::post('add', 'cartController@add');
Route::get('cart', function(){  


    return Cart::getContent();


});
Route::get('clear', function(){
    $clear = Cart::clear();
   
    if($clear){
       return Cart::getContent();
    }
   });*/