<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true, 'data' => User::all()], 200);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required', 'email' => 'required|email|unique:users', 'role' => 'required']);
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make('password123') // Default password untuk staf baru
        ]);

        return response()->json(['success' => true, 'data' => $user], 200);
    }

    public function destroy($id)
    {
        if ($id == 1) return response()->json(['success' => false, 'message' => 'Super Admin Utama tidak boleh dihapus!'], 403);
        
        User::destroy($id);
        return response()->json(['success' => true, 'message' => 'Admin berhasil dihapus.'], 200);
    }
}