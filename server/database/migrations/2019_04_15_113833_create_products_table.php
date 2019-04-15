<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id')
                ->unique();
            $table->string('title',50);
            $table->string('cat', 50)
                ->index();
            $table->foreign('cat')
                ->references('name')
                ->on('cats')
                ->onDelete('cascade');
            $table->string('type', 50)
                ->index();
            $table->foreign('type')
                ->references('name')
                ->on('types')
                ->onDelete('cascade');
            $table->integer('price');
            $table->string('rus_name', 50);
            $table->string('img', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
