<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Twilio\Rest\Client;

class AuthController extends Controller
{
    public function otp_login_send(Request $request){

        $request->validate([
            'phone_number' => 'required|string',
        ]);

        $user = User::where('phone_number', '=', $request->phone_number)->first();
        if ($user === null) {
            $token = getenv("TWILIO_AUTH_TOKEN");
            $twilio_sid = getenv("TWILIO_SID");
            $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
            $twilio = new Client($twilio_sid, $token);
            $twilio->verify->v2->services($twilio_verify_sid)
                ->verifications
                ->create("+91".$request->phone_number, "sms");
            return response()->json([
                "new_user" => 1,
                "emssage" => "Otp Sent"
            ]);
        }else{
            $token = getenv("TWILIO_AUTH_TOKEN");
            $twilio_sid = getenv("TWILIO_SID");
            $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
            $twilio = new Client($twilio_sid, $token);
            $twilio->verify->v2->services($twilio_verify_sid)
                ->verifications
                ->create("+91".$request->phone_number, "sms");
            return response()->json([
                "new_user" => 0,
                "emssage" => "Otp Sent"
            ]);
        }
    }


    public function otp_login_verify(Request $request){

        $data = $request->validate([
            'phone_number' => 'required|string',
            'verification_code' => 'required|string',
        ]);

        $user = User::where('phone_number', '=', $request->phone_number)->first();

        $token = getenv("TWILIO_AUTH_TOKEN");
        $twilio_sid = getenv("TWILIO_SID");
        $twilio_verify_sid = getenv("TWILIO_VERIFY_SID");
        $twilio = new Client($twilio_sid, $token);
        $verification = $twilio->verify->v2->services($twilio_verify_sid)
            ->verificationChecks
            ->create($data['verification_code'], array('to' => "+91".$data['phone_number']));

        $password = "8009220783FE70E42A06240552F57B47CDE7CC3EBA70015806F4C936C30F8249";

        if ($verification->valid) {
            if ($user === null) {
                $user = new User([
                    'phone_number' => $request->phone_number,
                    'password' => bcrypt($password)
                ]);
                $user->save();
                if(!Auth::attempt(['phone_number' => $request->phone_number, 'password' => $password]))
                    return response()->json([
                        'message' => 'Invalid Username or Password'
                    ], 401);
                $user = $request->user();
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->expires_at = Carbon::now()->addWeeks(20);
                $token->save();
                return response()->json([
                    'message' => 'Successfully verified New User.',
                    'name' => $user->name,
                    'id' => $user->id,
                    'email' => $user->email,
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse(
                        $tokenResult->token->expires_at
                    )->toDateTimeString(),
                    'misc' => $user
                ], 201);
            }else{
                if(!Auth::attempt(['phone_number' => $request->phone_number, 'password' => $password]))
                    return response()->json([
                        'message' => 'Invalid Username or Password'
                    ], 401);
                $user = $request->user();
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->expires_at = Carbon::now()->addWeeks(20);
                $token->save();
                return response()->json([
                    'message' => 'Successfully verified Existing User.',
                    'name' => $user->name,
                    'id' => $user->id,
                    'email' => $user->email,
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse(
                        $tokenResult->token->expires_at
                    )->toDateTimeString(),
                    'misc' => $user
                ], 200);
            }
        }
        return response()->json([
            'message' => 'verification error'
        ], 401);
    }


    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request){
        return response()->json($request->user());
    }
}
