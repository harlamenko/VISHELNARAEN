<?php
/**
 * Created by PhpStorm.
 * User: apricarto
 * Date: 2019-04-29
 * Time: 18:26
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class Product_Color_Size
 * @package App\Models
 *
 * @property int $id_product
 * @property string $id_color
 * @property string $id_size
 *
 * @property array|Collection|Product_Color_size[]
 */

class Product_Color_Size extends Model
{
    protected $fillable = [
        'id_product', 'id_color', 'id_size'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_colors_sizes', 'id_product', 'id');
    }
}

