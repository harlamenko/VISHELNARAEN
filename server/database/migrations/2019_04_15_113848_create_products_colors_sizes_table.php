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
        Schema::create('products_colors_sizes', function (Blueprint $table) {
            $table->integer('id_product')
                ->unsigned()
                ->index();
            $table->foreign('id_product')
                ->references('id')
                ->on('products')
                ->onDelete('cascade');
            $table->integer('id_color')
                ->unsigned()
                ->index();
            $table->foreign('id_color')
                ->references('id')
                ->on('colors')
                ->onDelete('cascade');
            $table->integer('id_size')
                ->unsigned()
                ->index();
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
        Schema::dropIfExists('products_colors_sizes');
    }
}
