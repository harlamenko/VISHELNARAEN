<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsColorsSizesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product__color__sizes', function (Blueprint $table) {
            $table->integer('id')
                ->unsigned()
                ->index();
            $table->integer('id_color')
                ->unsigned()
                ->index();
            $table->integer('id_size')
                ->unsigned()
                ->index();
            $table->longText('img');
        });

        Schema::table('product__color__sizes', function (Blueprint $table) {
            $table->foreign('id_product')
                ->references('id')
                ->on('products')
                ->onDelete('cascade');
            $table->foreign('id_color')
                ->references('id')
                ->on('colors')
                ->onDelete('cascade');
            $table->foreign('id_size')
                ->references('id')
                ->on('sizes')
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
        Schema::dropIfExists('product__color__sizes');
    }
}