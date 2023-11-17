<?php

namespace App\Http\Controllers\Page3D;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Model3D;
use App\Models\PartsOf3dModel;

class ShowController extends Controller
{
    public function __invoke($id){
        $model = Model3D::find($id);
        $parts = PartsOf3dModel::where('model3_d_s_id', $id)->get();

        return response()->json([$model, $parts]);
    }
}
