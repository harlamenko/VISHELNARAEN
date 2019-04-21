<?php
/**
 * Created by PhpStorm.
 * User: apricarto
 * Date: 2019-04-15
 * Time: 15:19
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class Product
 * @package App\Models
 *
 * @property-read int $id
 * @property string $title
 * @property string $cat
 * @property string $type
 * @property int $price
 * @property string $rus_name
 * @property string $img
 *
 * @property Cat $category
 * @property array|Collection|Color $colors
 * @property array|Collection|Size $sizes
 * @property array|Collection|Type $types
 * @method static Builder publish()
 */

class Product extends Model
{
    protected $fillable = [
        'title', 'cat', 'type', 'price', 'rus_name', 'img'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cat()
    {
        return $this->belongsTo(Cat::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function color()
    {
        return $this->belongsToMany(Color::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function size()
    {
        return $this->belongsToMany(Size::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    /**
     * @param Builder $query
     */
    public function scopePublish(Builder $query) //Скоуп
    {
        $query->where('publish', 1);
    }

    /**
     * @param $value
     * @return string
     */
    public function getImageAttribute($value)
    {
        return $value ?: \Storage::url($value);
    }

}