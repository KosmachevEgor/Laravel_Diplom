<?php

namespace App\Http\Controllers\Page3D\Ajax_Request;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Model3D;
use App\Models\PartsOf3dModel;

class ShowController extends Controller
{
    public function __invoke($partName)
    {
        $result = PartsOf3dModel::where('part_name', $partName)->get();

        return response()->json($result);
    }
}
