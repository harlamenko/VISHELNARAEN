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
 * Class Size
 * @package App\Models
 *
 * @property-read int $id
 * @property string $name
 *
 * @property array|Collection|Product[]
 */

class Size extends Model
{
    protected $fillable = [
        'name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}