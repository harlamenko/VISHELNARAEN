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
 * Class ProductColorSize
 * @package App\Models
 *
 * @property int $id
 * @property int $id_color
 * @property string $sizes
 * @property string $id_photo
 *
 * @property array|Collection|ProductColorSizePhoto[]
 */

class ProductColorSizePhoto extends Model
{
    protected $fillable = [
        'id', 'id_color', 'sizes', 'id_photo'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_color_size_photos', 'id', 'id');
    }
}

