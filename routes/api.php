<?php

use Illuminate\Http\Request;

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

Route::get('auth/me', 'Auth\AuthController@me');
Route::post('auth/login', 'Auth\AuthController@login');
Route::post('auth/register', 'Auth\AuthController@register');
Route::post('auth/facebook', 'Auth\AuthController@facebook');

Route::post('auth/password/email', 'Auth\PasswordResetController@sendResetLinkEmail');
Route::get('auth/password/verify', 'Auth\PasswordResetController@verify');
Route::post('auth/password/reset', 'Auth\PasswordResetController@reset');

Route::get('/events/types', 'EventController@getTypes');
Route::get('/events', 'EventController@get');

Route::group(['middleware' => 'auth:api'], function(){

  Route::group(['middleware' => 'role:admin|superadmin'], function(){
      Route::get('/users', 'UserController@all');
  });

  Route::put('/events/{id}', 'EventController@update');
  Route::post('/events', 'EventController@create');
  Route::delete('/events/{id}', 'EventController@remove');
  Route::get('/locations', 'LocationController@all');

  Route::get('/user', function (Request $request) {
      return $request->user();

  });
});
//protected API routes with JWT (must be logged in)
