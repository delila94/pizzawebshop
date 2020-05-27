<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // Test database connection
  /* try {
        DB::connection()->getPdo();
        echo "Connected successfully to: " . DB::connection()->getDatabaseName();
       
    } catch (\Exception $e) {
        die("Could not connect to the database. Please check your configuration. error:" . $e );
    }*/
    return view('welcome');
});
Route::get('product', function(){ return App\Product::all(); });
Route::post('add', 'cartController@add');
Route::post('total', 'cartController@total');
   Route::get('cart', 'cartController@myCart');
   Route::post('myCart','cartController@myCartR');
   Route::post('clear','cartController@clearCart');
   Route::post('remove','cartController@removeCart');
   Route::post('update', 'cartController@updateCart');
   Route::get('remove','cartController@removeCart');
   Route::post('register', 'Auth\RegisterController@register');
   Route::post('login', 'UserController@login');
   Route::post('logout', 'UserController@logout');
  //Route::post('login', 'UserController@login');
 //  Route::get('profile', 'UserController@getAuthenticatedUser');

Auth::routes();



