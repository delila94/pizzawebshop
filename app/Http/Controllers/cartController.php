<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Cart;
use App\Product;

class cartController extends Controller
{
    //
    public function add(Request $res){
       $qty=$res->qty;
       $id=$res->id; 
      
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

      public function removeCart(Request $res){
        $id=$res->id; 
        $data=product::find($id);
        $remove=   Cart::remove($id);
        if($remove){
         return Cart::getContent();
        }
       }

public function updateCart (Request $res)
{
    $qty=$res->qty;
       $id=$res->id; 
      
       $data=product::find($id);
       $change=   Cart:: update($id,[
        'quantity' => $qty,
       
    ]);
    if($change)
    {
        return Cart::getContent();
    }
}

      public function total(){
      return Cart::getTotal();
      
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
public function item(Request $res){
    $id=$res->id;
    $data=product::find($id);
    return $data;
    
}


}

