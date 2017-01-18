<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;



class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //
        Schema::create('events', function($table) {
          $table->increments('id');
          $table->string('name');
          $table->dateTime('start_at');
          $table->dateTime('end_at');
          $table->timestamp('online_at')->default(\DB::raw('CURRENT_TIMESTAMP'));
          $table->boolean('public')->default(false);
          $table->boolean('all_day')->nullable()->default(false);
          $table->integer('location_id');
          $table->integer('image')->nullable();
          $table->text('description')->nullable();
          $table->string('facebook_id')->nullable();
          $table->integer('type_id');
          $table->integer('user_id')->nullable();
          $table->integer('parent_id')->nullable();
          $table->timestamps();
        });

        Schema::create('event_users', function($table){
            $table->increments('id');
            $table->integer('event_id');
            $table->integer('user_id');
            $table->integer('status_id');
            $table->timestamps();
        });
        Schema::create('event_types', function($table){
            $table->increments('id');
            $table->string('name');
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('events');
        Schema::drop('event_users');
        Schema::drop('event_types');
   }


}
