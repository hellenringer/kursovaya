<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
->middleware(['guest'])
->name('login');

$limiter = config('fortify.limiters.login'); 

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
->middleware(array_filter([
    'guest',
    $limiter ? 'throttle:' . $limiter : null,
])); 

Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
->name('logout');

Route::get('/register', [RegisteredUserController::class, 'create'])
    ->middleware(['guest'])
    ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['guest']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('products', [ProductController::class, 'index']);
}); 

