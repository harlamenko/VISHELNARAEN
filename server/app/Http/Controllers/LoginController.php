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
            $user = User::where("login", "=", $request->login)
                ->first();
            if($user)
            {
                if (!Hash::check($request->password, $user->password))
                {
                    return $this->jsonResponse([
                        "status" => false,
                        "message" => "Invalid authorization data"
                    ], 401, "Invalid authorization data");
                }
                return $this->jsonResponse(
                    [
                        "status" => true,
                        "token" => $user->token
                    ]
                    , 200, "Successful authorization");
            }
        }
        return $this->jsonResponse([
            "status" => false,
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
            'login' => 'required',
            'password' => 'required',
        ]);
        return $validator;
    }
}