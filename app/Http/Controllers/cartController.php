<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cart;
use App\product;

class cartController extends Controller
{
    //
    public function add(Request $res){
       $qty=$res->qty;
       $id=$res->id; // i am passing quanttiy since id is not working
      
       $data=product::find($id);
      // $price=($data->price)*$qty;
       $add=   Cart::add([
              'id'=>$id,
              'name'=>$data->title,
              'description' => $data->body,
              'price' =>$data->price,
              'quantity' => $qty
              
            
       ]);
        return Cart::getContent();
       /* if($add){
           // return Cart::getContent();
           return"Product added to Cart";
    
        }*/
      }
      public function total(){
      $total = Cart::getTotal();
    }
    public function myCartR()
    {
        $cartCollection=Cart::getContent();
        return $cartCollection;
    }

   public function myCart(){
$cartCollection = Cart::getContent();
return view('cart',['data'=>$cartCollection] );
}
public function clearCart()
{
    $clear = Cart::clear();
   
    if($clear){
       return Cart::getContent();
    }
    }
}
