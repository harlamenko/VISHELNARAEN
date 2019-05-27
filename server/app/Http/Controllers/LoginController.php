<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = $this->createValidator($request);
        if (!$validator->fails())
        {
            $user = User::where("name", "=", $request->name)
                ->first();
            if($user)
            {
                if (!Hash::check($request->password, $user->password))
                {
                    return $this->jsonResponse([
                        "status" => 'error',
                        "message" => "Invalid authorization data"
                    ], 401, "Invalid authorization data");
                }
                $isAdmin = User::where('name','=', $request->name)->first()->isAdmin;
                if (!$isAdmin) {
                    $isAdmin = false;
                }
                else {
                    $isAdmin = true;
                }
                return $this->jsonResponse(
                    [

                        "status" => 'ok',
                        "isAdmin" => $isAdmin,
                        "message" => "Success authorization"
                    ]
                    , 200, "Successful authorization");
            }
        }
        return $this->jsonResponse([
            "status" => 'error',
            "message" => "Invalid authorization data"
        ], 401, "Invalid authorization data");
    }
    /**
     * @param Request $request
     * @return mixed
     */
    private function createValidator(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required',
        ]);
        return $validator;
    }
}