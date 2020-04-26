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
   try {
        DB::connection()->getPdo();
        echo "Connected successfully to: " . DB::connection()->getDatabaseName();
       
    } catch (\Exception $e) {
        die("Could not connect to the database. Please check your configuration. error:" . $e );
    }
    return view('welcome');
});
Route::get('product', function(){ return App\product::all(); });
Route::post('add', 'cartController@add');
Route::post('total', 'cartController@total');
/*Route::get('add', function(){

    $add =  Cart::add([
          'id'=>2,
          'name'=>'sdbh dnd ',
          'price' =>350,
          'quantity' => 2,
          
  
    ]);
  
      if($add){
          return Cart::getContent();
      }
  
  
  });*/
/*Route::get('cart', function(){  
    return Cart:: getContent();
});*/
Route::get('total', function(){  
    return Cart:: getTotal();
});
/*Route::get('clear', function(){
    $clear = Cart::clear();
   
    if($clear){
       return Cart::getContent();
    }
   });*/
  
   Route::get('cart', 'cartController@myCart');
   Route::get('myCart','cartController@myCartR');
   Route::get('clear','cartController@clearCart');

/*Route::view('/orderCompleted','orderCompleted');*/
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
