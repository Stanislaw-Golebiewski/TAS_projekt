<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWherevotedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wherevoted', function (Blueprint $table) {
            $table->integer('whovote')->unsigned();
            $table->foreign('whovote')->references('id')->on('users');
            $table->integer('votingid')->unsigned();
            $table->foreign('votingid')->references('id')->on('votings');
            $table->rememberToken();
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
         Schema::dropIfExists('wherevoted');
    }
}