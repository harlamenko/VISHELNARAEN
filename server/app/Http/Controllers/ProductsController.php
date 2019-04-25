<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CheckAdmin;
use Illuminate\Http\Request; //PostRequest
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use App\Models\Cat;
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

    public function showProductsWithParams(Request $request) {
        $sex= '';

        switch ($request->sex) {
            case 'men':
                $sex = 'for_men';
                break;
            case 'women':
                $sex = 'for_women';
                break;
        }

        if ($request->sex && $request->type) {
            return Product::where('cat', $sex)->where('type', $request->type)->get(['id','cat','type','price','rus_name','rating','img']);
        } else if ($request->sex && !$request->type) {
            return Product::where('cat', $sex)->get(['id','cat','type','price','rus_name','rating','img']);
        } else if (!$request->sex && $request->type) {
            return Product::where('type', $request->type)->get(['id','cat','type','price','rus_name','rating','img']);
        } else {
            return Product::all(['id','cat','type','price','rus_name','rating','img']);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function getAssortment(Request $request) {
        $products = Product::select()->where('id', $request->id)->get();
        return $products;

        //return Product::get();
    }

//    public function store (Request $request) {
//        $response = [];
//
//        $validator = $this->createValidator($request);
//
//        if ($validator->fails()) {
//            $response["status"] = false;
//            $response["message"] = $validator->errors();
//
//            return $this->jsonResponse($response, 400, "Editing error");
//        }
//
//        $newProduct = new Product();
//        if (!$this->createOrUpdateProduct($request, $newProduct))
//        {
//            return response("Error while saving data in db", 500);
//        }
//
//        return $this->jsonResponse(["status" => true, "product_id" => $newProduct->id], 201, "Successful creation");
//    }
//
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product)
        {
            return $this->jsonResponse([
                "message" => "Product not found"
            ], 404, "Product not found");
        }
        return $this->jsonResponse($product, 200, "View product");

    }
//
//    /**
//     * Update the specified resource in storage.
//     *
//     * @param  \Illuminate\Http\Request $request
//     * @param  int $id
//     * @return \Illuminate\Http\Response
//     */
//
//    public function update(Request $request, $id) {
//
//        $product = Product::find($id);
//
//        if (!$product) {
//            return $this->jsonResponse(["message"=> "Advert not found"], 404, "Advert not found");
//        }
//
//        $validator = $this->createValidator($request);
//
//        if ($validator->fails()) {
//            $response["status"] = false;
//            $response["message"] = $validator->errors();
//
//            return $this->jsonResponse($response, 400, "Editing error");
//        }
//
//        if (!$this->createOrUpdateProduct($request, $product)) {
//            return response("Ошибка при сохранении данных в БД", 500);
//        }
//
//        $product->cats = explode(',', $product->cats);
//
//        return $this->jsonResponse(["status"=> true, "product" => $product], 201, "Successful creation");
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     *
//     * @param  int $id
//     * @return \Illuminate\Http\Response
//     */
//
//    public function destroy($id) {
//        $product = Product::find($id);
//
//        if (!$product) {
//            return $this->jsonResponse(["message"=> "Product not found"], 404, "Product not found");
//        }
//
//        if (!$product->delete()) {
//            return response("Something went terrebly wrong", 500);
//        }
//
//        return $this->jsonResponse(["status" => true], 201, "Successful delete");
//    }
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
    /**
     * @param Request $request
     * @param $newProduct
     * @return bool
     */

    private function createOrUpdateProduct(Request $request, $newProduct): bool {
        $newProduct->rus_name = $request->rus_name;
        $newProduct->cat = $request->cat;
        $newProduct->type = $request->type;
        $newProduct->price = $request->price;
        //$newProduct->img = $this->saveImageAndGetPath($request);

        return $newProduct->save();
    }

    /**
     * @param Request $request
     * @return mixed
     */

    private function createValidator(Request $request) {
        $bytesInMegabyte = 1000000; //КАВОО
        $fileLimit = 2 * $bytesInMegabyte;

        $validator = Validator::make($request->all(), [
            'rus_name' => 'required|unique:products',
            'cat' => 'required',
            'type' => 'required',
            'price' => 'required',
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
