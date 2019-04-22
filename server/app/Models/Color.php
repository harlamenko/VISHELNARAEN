<?php
/**
 * Created by PhpStorm.
 * User: apricarto
 * Date: 2019-04-15
 * Time: 16:02
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class Color
 * @package App\Models
 *
 * @property-read int $id
 * @property string $name
 * @property string $rus_name
 *
 * @property array|Collection|Product[]
 */

class Color extends Model
{
    protected $fillable = [
        'name', 'rus_name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'products_colors_sizes', 'color_id', 'product_id');
    }
}