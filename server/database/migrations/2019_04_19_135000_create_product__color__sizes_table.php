<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductColorSizePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_color_size_photos', function (Blueprint $table) {
            $table->integer('id')
                ->unsigned()
                ->index();
            $table->integer('id_color')
                ->unsigned()
                ->index();
            $table->string('sizes')
                ->unsigned()
                ->index();
            $table->longText('photo');
        });

        Schema::table('product_color_size_photos', function (Blueprint $table) {
            $table->foreign('id_product')
                ->references('id')
                ->on('products')
                ->onDelete('cascade');
            $table->foreign('id_color')
                ->references('id')
                ->on('colors')
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
        Schema::dropIfExists('product_color_sizes_photos');
    }
}