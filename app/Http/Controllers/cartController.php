<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
//use JWTAuth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;
use Auth;
use Cart;
use App\Product;

class cartController extends Controller
{
    //
    public function add(Request $res){
   //since email is unique for every user email is used for session id of user to get items to cart
              $session_id = session()->getId();
              $qty=$res->qty;
             $id=$res->id; 
             $userId=$res->email;
             $data=product::find($id);

      //$userId='1dffsdfd0'; //za ovaj userId je potrebno bilo sta sto identifikuje korisnika
            $add=   Cart::session($userId)->add([
              'id'=>$id,
              'name'=>$data->title,
              'description' => $data->body,
              'price' =>$data->price,
              'quantity' => $qty         
       ]);
        return Cart::session($userId)->getContent();
       // return $userId;
      }

      public function removeCart(Request $res){
        $id=$res->id; 
        $userId = $res->email;
        $data=product::find($id);
        $remove=   Cart::session($userId)->remove($id);
        if($remove){
         return Cart::session($userId)->getContent();
        }
       }

public function updateCart (Request $res)
{
    $qty=$res->qty;
       $id=$res->id; 
       $userId = $res->email;
       $data=product::find($id);
       $change=   Cart::session($userId)-> update($id,[
        'quantity' => $qty,
       
    ]);
    if($change)
    {
        return Cart::session($userId)->getContent();
    }
}

      public function total(Request $res){
       // $userId = Auth::id();
       $userId=$res->email;
      return Cart::session($userId)->getTotal();
      
    }
    public function myCartR(Request $res)
    {
        $userId=$res->email;
       $cartCollection=Cart::session($userId)->getContent();
       return $cartCollection;
      
    }

  // public function myCart(Request $res){
   // $userId = Auth::id();
 //  $userId=$res->email;
//$cartCollection = Cart::session($userId)->getContent();
//return view('cart',['data'=>$cartCollection] );
//}
public function clearCart(Request $res)
{
    //$userId = Auth::id();
    $userId=$res->email;
    $clear = Cart::session($userId)->clear();
   
    if($clear){
       return Cart::session($userId)->getContent();
    }
}

}

