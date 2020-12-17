<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::middleware('auth:sanctum')->group(function () {
Route::get('products', [ProductController::class, 'index']);
}); 

