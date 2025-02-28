<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function username()
    {
        return 'mobile';
    }

    protected function authenticated(Request $request, $user)
    {
        if ($user->user_type === 'management') {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('student.dashboard');
    }

    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function forgotPassword()
    {
        return view('auth.forgot-password');
    }

    public function sendResetLinkEmail(Request $request)
    {
        // In a real app, this would send an OTP to the user's mobile
        // For demo purposes, we'll just redirect back with a success message
        return back()->with('status', 'OTP sent to your mobile number!');
    }
}
