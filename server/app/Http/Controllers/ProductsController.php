<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CheckAdmin;
use Illuminate\Http\Request; //PostRequest
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use App\Models\Cat;
use App\Models\Color;
use App\Models\Type;
use App\Models\ProductColorSizePhoto;
use Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Product[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index() {
        return $this->jsonResponse(Product::select()->get(), 200, "Список одежды");
    }

    public function getSexAndTypes () {
        $sex = Cat::get(['name','rus_name']);
        $type = Type::get(['name','rus_name']);
        $sexType = ['sex'=>$sex,'types'=>$type];
        return $sexType;
    }

    public function showProductsWithParams(Request $request) {

        switch ($request->sex) {
            case 'men':
                $sex = 'for_men';
                break;
            case 'women':
                $sex = 'for_women';
                break;
        }

        if ($request->sex && $request->type) {
            $products = Product::where('cat', $sex)->where('type', $request->type)->get(['id','cat','type','price','rus_name','rating']);
        } else if ($request->sex && !$request->type) {
            $products = Product::where('cat', $sex)->get(['id','cat','type','price','rus_name','rating']);
        } else if (!$request->sex && $request->type) {
            $products = Product::where('type', $request->type)->get(['id','cat','type','price','rus_name','rating']);
        } else {
            $products = Product::all(['id','cat','type','price','rus_name','rating']);
        }
        $fullProducts = [];
        foreach ($products as $key=>$product) {
            $productsPhotos[$key] = ProductColorSizePhoto::where('id', $product->id)->get('photo')->first();
            $fullProducts[] = ['id'=>$product->id, 'cat'=>$product->cat, 'type'=>$product->type, 'price'=>$product->price,
                'rus_name'=>$product->rus_name, 'rating'=>$product->rating, 'photo'=>$productsPhotos[$key]->photo];
        }
        return $fullProducts;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        //Получение объекта товара
        $product = Product::find($id);
        if (!$product)
        {
            return $this->jsonResponse([
                "message" => "Product not found"
            ], 404, "Product not found");
        }

        //Получение объекта параметров товара
        $product_color_size_photos = ProductColorSizePhoto::where('id','=',$id)->get();
        if (!$product_color_size_photos)
        {
            return $this->jsonResponse([
                "message" => "Product params not found"
            ], 404, "Product params not found");
        }

        //Получение размеров товара
        $sizes = ProductColorSizePhoto::select('sizes')->where('id','=',$id)->get();
        if (!$sizes)
        {
            return $this->jsonResponse([
                "message" => "Sizes not found"
            ], 404, "Sizes not found");
        }

        //Получение цветов товара
        $colors = ProductColorSizePhoto::select('colors.name')
            ->join('colors', 'product_color_size_photos.id_color', '=', 'colors.id')
            ->where('product_color_size_photos.id','=', $id)
            ->get();

        if (!$colors)
        {
            return $this->jsonResponse([
                "message" => "Color not found"
            ], 404, "Color not found");
        }

        //Получение фотографий товара
        $photos = ProductColorSizePhoto::select('photo')
            ->where('product_color_size_photos.id','=', $id)
            ->get();

        if (!$photos)
        {
            return $this->jsonResponse([
                "message" => "Photo not found"
            ], 404, "Photo not found");
        }

        //Приведение параметров в требуемый вид
        $resultDescr = explode('; ', $product->descr);
        $product->descr = $resultDescr;

        $resultSizes = [];
        foreach ($sizes as $size) {
            $resultSizes[] = explode(',', $size->sizes);
        }

        $resultColors = [];
        foreach($colors as $color) {
            $resultColors[] = $color->name;
        }

        $resultPhotos = [];
        foreach($photos as $photo) {
            $resultPhotos[] = $photo->photo;
        }

        //Объединение параметров в вид variant
        foreach ($colors as $index => $color) {
            $variants[] = ['color'=>$resultColors[$index],'sizes'=>$resultSizes[$index],'photo'=>$resultPhotos[$index]];
        }

        $product->variants = $variants;
        return $this->jsonResponse($product, 200, "View product");
    }



    public function getAssortment($id) {
        $product = Product::find($id);
        if (!$product)
        {
            return $this->jsonResponse([
                "message" => "Product not found"
            ], 404, "Product not found");
        }

        //Получение размеров товара
        $sizes = ProductColorSizePhoto::select('sizes')->where('id','=',$id)->get();
        if (!$sizes)
        {
            return $this->jsonResponse([
                "message" => "Sizes not found"
            ], 404, "Sizes not found");
        }

        //Получение цветов товара
        $colors = ProductColorSizePhoto::select('colors.name')
            ->join('colors', 'product_color_size_photos.id_color', '=', 'colors.id')
            ->where('product_color_size_photos.id','=', $id)
            ->get();

        if (!$colors)
        {
            return $this->jsonResponse([
                "message" => "Color not found"
            ], 404, "Color not found");
        }

        $resultCat = Product::find($id)->cat;

        $resultSizes = [];
        foreach ($sizes as $size) {
            $resultSizes[] = explode(',', $size->sizes);
        }

        $resultColors = [];
        foreach($colors as $color) {
            $resultColors[] = $color->name;
        }

        foreach ($colors as $index => $color) {
            $variants[] = ['cat'=>$resultCat, 'color'=>$resultColors[$index],'sizes'=>$resultSizes[$index]];
        }

        return $variants;
    }

    public function getCats() {
        $cats = Type::select('name', 'rus_name')->get();
        if (!$cats)
        {
            return $this->jsonResponse([
                "message" => "Cats not found"
            ], 404, "Cats not found");
        }

        return $cats;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function store (Request $request) {
        $response = [];

        $validator = $this->createValidator($request);

        if ($validator->fails()) {
            $response["status"] = false;
            $response["message"] = $validator->errors();

            return $this->jsonResponse($response, 400, "Editing error");
        }

        $variants = $request->variants;

        foreach($variants as $variant) {
            $colors[] = Color::where('name', $variant['color'])->get();
            $sizes[] = implode(",",$variant['sizes']);
            $photos[] = $variant['photo'];
        }

        //Проверка, существует ли цвет
        foreach($colors as $color) {
            if (!$color) {
//                TODO:: сделать как в update
//                $newColor[] = new Color();
//                if (!$this->createColor($request, $newColor)) {
//                    return response("Error while saving color in db", 500);
//                }
//                $id_colors[] = $color->first()->id;
            } else {
                $newColor[] = $color;
                $id_colors[] = $color->first()->id;
            }
        }

        $request->descr = implode("; ",$request->descr);

        $newProduct = new Product();
        if (!$this->createOrUpdateProduct($request, $newProduct))
        {
            return response("Error while saving product in db", 500);
        }
        $id = $newProduct->id;

        foreach ($id_colors as $key=>$id_color) {
            $newProductColorSizePhoto = new ProductColorSizePhoto();
            if (!$this->createOrUpdateProductColorSizePhoto($id, $id_color, $sizes[$key], $photos[$key], $newProductColorSizePhoto))
            {
                return response("Error while saving id->color->size->photo in db", 500);
            }
        }


        return $this->jsonResponse(["status" => true, "product_id" => $id], 201, "Successful creation");
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id) {
        $product = Product::find($id);

        if (!$product) {
            return $this->jsonResponse(["message"=> "Advert not found"], 404, "Advert not found");
        }

        $validator = $this->createValidator($request);

        if ($validator->fails()) {
            $response["status"] = false;
            $response["message"] = $validator->errors();

            return $this->jsonResponse($response, 400, "Editing error");
        }

        $variants = $request->variants;

        foreach($variants as $variant) {
            $colorArr = Color::where('name', $variant['color'])->get();
            if (count($colorArr) > 0){
                $colors[] = Color::where('name', $variant['color'])->get()->first();
            } else {
                $colors[] = 'pupa';
            }
            $sizes[] = implode(",",$variant['sizes']);
            $photos[] = $variant['photo'];
        }

        //Проверка, существует ли цвет
        for($i=0;$i<count($colors);$i++) {
            $color = $colors[$i];
            if ($color == 'pupa') {
                if (!$this->createColor($variants[$i]['color'])) {
                    return response("Error while saving color in db", 500);
                }
                $id_colors[] = Color::where('name', $variants[$i]['color'])->get()->first()->id;
            } else {
                $id_colors[] = Color::where('name', $variants[$i]['color'])->get()->first()->id;
            }
        }
        $request->descr = implode("; ",$request->descr);


//        TODO:: изменить метод createOrUpdateProduct так, чтобы происходила перезапись, а не добавление
        if (!$this->createOrUpdateProduct($request, $product)) {
            return response("Error while saving product in db", 500);
        }

        foreach ($id_colors as $key=>$id_color) {
            ProductColorSizePhoto::where('id','=',$id)->where('id_color','=',$id_color)
                ->update(['sizes'=> $sizes[$key], 'photo' => $photos[$key]]);
//            if (!$this->UpdateProductColorSizePhoto($id, $id_color, $sizes[$key], $photos[$key], $newProductColorSizePhoto))
//            {
//                return response("Error while saving id->color->size->photo in db", 500);
//            }

        }
//
//        $product->cats = explode(',', $product->cats);
//
        return $this->jsonResponse(["status"=> true, "product_id" => $product->id], 201, "Successful creation");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id) {
        $product = Product::find($id);

        if (!$product) {
            return $this->jsonResponse(["message"=> "Product not found"], 404, "Product not found");
        }

        if (!$product->delete()) {
            return response("Something went terrebly wrong with product", 500);
        }

        return $this->jsonResponse(["status" => true], 201, "Successful delete");
    }
//
//    public function searchByTitle($title) {
//        $products = Product::where("title", "like", '%' . $title . '%')->get();
//
//        foreach($products as $product) {
//            $product->title = explode(',',$product->title);
//        }
//
//        return $this->jsonResponse(["body" => $products], 200, "Found Products");
//    }
//
//    /**
//     * @param Request $request
//     * @param $newProduct
//     * @return bool
//     */
//
    private function createColor($colorName): bool {
        $newColor = new Color();
        $newColor->name = $colorName;
        return $newColor->save();
    }

    private function createOrUpdateProduct(Request $request, $newProduct): bool {
        $newProduct->rus_name = $request->rus_name;
        $newProduct->title = $request->title;
        $newProduct->cat = $request->cat;
        $newProduct->type = $request->type;
        $newProduct->price = $request->price;
        $newProduct->descr = $request->descr;
        $newProduct->rating = 0;
        //$newProduct->img = $this->saveImageAndGetPath($request);

        return $newProduct->save();
    }

    private function createOrUpdateProductColorSizePhoto($id, $id_color, $sizes, $photos, $newProductColorSizePhoto): bool {
        $newProductColorSizePhoto->id = $id;
        $newProductColorSizePhoto->id_color = $id_color;
        $newProductColorSizePhoto->sizes = $sizes;
        $newProductColorSizePhoto->photo = $photos;

        return $newProductColorSizePhoto->save();
    }

    /**
     * @param Request $request
     * @return mixed
     */

    private function createValidator(Request $request) {
        $bytesInMegabyte = 1000000; //КАВОО
        $fileLimit = 2 * $bytesInMegabyte;

        $validator = Validator::make($request->all(), [
            'rus_name' => 'required',
            'title' => 'required',
            'cat' => 'required',
            'type' => 'required',
            'price' => 'required|int',
            'descr' => 'required',
            'variants' => 'required|array',
            'variants.*' => 'required|array',
            'variants.*.color' => 'required',
            'variants.*.sizes' => 'required',
            'variants.*.photo' => 'required'
            //'img' => "required|mimes:jpg,png|max:{$fileLimit}",
        ]);
        return $validator;
    }
//
//    /**
//     * @param Request $request
//     * @return string
//     */
//
//    private function saveImageAndGetPath(Request $request): string {
//        $imagePath = Storage::disk('product_images')->put('', $request->image);
//
//        return "product_images/" . $imagePath;
//    }
}