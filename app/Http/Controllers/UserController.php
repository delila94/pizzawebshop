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

class UserController extends Controller
{   

    public function register(Request $request)
    {
        $validator = Validator::make($request->json()->all() , [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6', 
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
      
    }
    
    public function login(Request $request)
    {
        $credentials = $request->json()->all();

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json( compact('token'));
        //return redirect()->to('/')->send();
        /*$this->validate($request,[
            'email' => 'required|email',
            'password' => 'required'
          ]);    
        if(Auth::attempt(['email'=>$request['email'],'password'=>$request['password']])){
            return redirect('app/dashboard');
    }
          return redirect()->back();*/
    }
    public function logout2(Request $request) {
     //auth()->logout();
     //return response()->json(['message' => 'Successfully logged out']);
     // Get JWT Token from the request header key "Authorization"
     $token = $request->header("Authorization");
     // Invalidate the token
     try {
         JWTAuth::invalidate(JWTAuth::getToken());
         return response()->json([
             "status" => "success", 
             "message"=> "User successfully logged out."
         ]);
     } catch (JWTException $e) {
         // something went wrong whilst attempting to encode the token
         return response()->json([
         "status" => "error", 
         "message" => "Failed to logout, please try again."
         ], 500);
     }
     //return redirect('/login');
      }

      public function logout() {
        auth()->logout();

// Pass true to force the token to be blacklisted "forever"
auth()->logout(true);
    }

    

      public function getAuthenticatedUser()
      {
          try {
              if (! $user = JWTAuth::parseToken()->authenticate()) {
                  return response()->json(['user_not_found'], 404);
              }
          } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
              return response()->json(['token_expired'], $e->getStatusCode());
          } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
              return response()->json(['token_invalid'], $e->getStatusCode());
          } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
              return response()->json(['token_absent'], $e->getStatusCode());
          }
          return response()->json(compact('user'));
      }
  

}