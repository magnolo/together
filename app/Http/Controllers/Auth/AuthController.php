<?php

namespace App\Http\Controllers\Auth;

use Auth;
use JWTAuth;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp;
use Config;


class AuthController extends Controller
{

    public function me(Request $request){
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

   // the token is valid and we have found the user via the sub claim
   return response()->json(compact('user'));
    }
    public function login(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'password' => 'required|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->error('Email und/oder Passwort passen irgendwie nicht!', 401);
            }
        } catch (\JWTException $e) {
            return response()->error('Could not create token', 500);
        }

        $user = Auth::user();

        return response()->success(compact('user', 'token'));
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name'       => 'required|min:3',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:8',
        ]);

        $user = new User;
        $user->name = trim($request->name);
        $user->display_name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->save();

        $userRole = Role::where('name', '=', 'user')->first();
        $user->attachRole($userRole);

        $token = JWTAuth::fromUser($user);

        return response()->success(compact('user', 'token'));
    }
    /**
     * Login with Facebook.
     */
    public function facebook(Request $request)
    {
        $client = new GuzzleHttp\Client();
        $params = [
            'code' => $request->input('code'),
            'client_id' => $request->input('clientId'),
            'redirect_uri' => $request->input('redirectUri'),
            'client_secret' => Config::get('app.facebook_secret')
        ];
        // Step 1. Exchange authorization code for access token.
        $accessTokenResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/oauth/access_token', [
            'query' => $params
        ]);
        $accessToken = json_decode($accessTokenResponse->getBody(), true);
        // Step 2. Retrieve profile information about the current user.
        $fields = 'id,email,first_name,last_name,link,name';
        $profileResponse = $client->request('GET', 'https://graph.facebook.com/v2.5/me', [
            'query' => [
                'access_token' => $accessToken['access_token'],
                'fields' => $fields
            ]
        ]);
        $profile = json_decode($profileResponse->getBody(), true);
        // Step 3a. If user is already signed in then link accounts.
        if ($request->header('Authorization'))
        {
            $user = User::where('facebook', '=', $profile['id']);
            if ($user->first())
            {
                $user = $user->first();
                $token = JWTAuth::fromUser($user);

                return response()->success(compact('user', 'token'));
                // return response()->json(['message' => 'There is already a Facebook account that belongs to you'], 409);
            }
            $token = explode(' ', $request->header('Authorization'))[1];
            //$payload = (array) JWT::decode($token, Config::get('app.token_secret'), array('HS256'));
            //$user = User::find($payload['sub']);
           // $user = JWTAuth::parseToken()->authenticate();
            $user = new User;
            $user->name = $profile['name'];
            $user->facebook = $profile['id'];
            $user->email = $profile['email'];
            $user->display_name = $profile['name'];
            $user->save();

            $userRole = Role::where('name', '=', 'user')->first();
            $user->attachRole($userRole);


            $token = JWTAuth::fromUser($user);

            return response()->success(compact('user', 'token'));
        }
        // Step 3b. Create a new user account or return an existing one.
        else
        {
            $user = User::where('facebook', '=', $profile['id']);
            if ($user->first())
            {
                $user = $user->first();
                $token = JWTAuth::fromUser($user);
                return response()->success(compact('user', 'token'));
            }
            $user = new User;
            $user->facebook = $profile['id'];
            $user->email = $profile['email'];
            $user->display_name = $profile['name'];
            $user->name = $profile['name'];
            $user->save();

            $userRole = Role::where('name', '=', 'user')->first();
            $user->attachRole($userRole);


            $token = JWTAuth::fromUser($user);
            return response()->success(compact('user', 'token'));
        }
    }
}
