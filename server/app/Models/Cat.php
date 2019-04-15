<?php
/**
 * Created by PhpStorm.
 * User: apricarto
 * Date: 2019-04-15
 * Time: 15:51
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class Cat
 * @package App\Models
 *
 * @property-read int $id
 * @property string $name
 * @property string $rus_name
 *
 * @property array|Collection|Product[]
 */

class Cat extends Model
{
    protected $fillable = [
        'name', 'rus_name'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}