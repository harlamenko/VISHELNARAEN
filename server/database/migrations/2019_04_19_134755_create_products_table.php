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
            $table->string('cat_id', 50)
                ->index();
            $table->string('type', 50)
                ->index();
            $table->integer('price');
            $table->string('rus_name', 50);
            $table->longText('img');
            $table->integer('rating');
            $table->string('brief', 50);
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreign('cat_idg')
                ->references('name')
                ->on('cats')
                ->onDelete('cascade');
            $table->foreign('type')
                ->references('name')
                ->on('types')
                ->onDelete('cascade');
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
