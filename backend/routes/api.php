<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminReportController;
use App\Http\Controllers\SettingController;

// PUBLIK
Route::get('/settings/profile', [SettingController::class, 'getProfile']);
Route::post('/reports', [ReportController::class, 'store']);
Route::get('/reports/{ticket_code}', [ReportController::class, 'track']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/public/stats', [App\Http\Controllers\Api\ReportController::class, 'publicStats']);

// ADMIN

Route::middleware('auth:sanctum')->group(function () {
    
    // Auth Logout & Cek User
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json(['success' => true, 'data' => $request->user()]);
    });

    // Pengelolaan Laporan
    Route::get('/admin/dashboard-stats', [AdminReportController::class, 'stats']);
    Route::get('/admin/reports', [AdminReportController::class, 'index']);
    Route::put('/admin/reports/{id}', [AdminReportController::class, 'update']);
    Route::get('/admin/reports', [App\Http\Controllers\Api\AdminReportController::class, 'index']);
    Route::put('/admin/reports/{id}/status', [App\Http\Controllers\Api\AdminReportController::class, 'updateStatus']);
    
    Route::post('/admin/settings/profile', [SettingController::class, 'updateProfile']);

    // Notifikasi Email
    Route::get('/admin/settings/email', [App\Http\Controllers\SettingController::class, 'getEmailSettings']);
    Route::post('/admin/settings/email', [App\Http\Controllers\SettingController::class, 'updateEmailSettings']);

    // Kelola Staf Admin
    Route::get('/admin/users', [App\Http\Controllers\Api\AdminUserController::class, 'index']);
    Route::post('/admin/users', [App\Http\Controllers\Api\AdminUserController::class, 'store']);
    Route::delete('/admin/users/{id}', [App\Http\Controllers\Api\AdminUserController::class, 'destroy']);

    // Export CSV
    Route::get('/admin/reports/export', [App\Http\Controllers\Api\AdminReportController::class, 'exportCsv']);
});