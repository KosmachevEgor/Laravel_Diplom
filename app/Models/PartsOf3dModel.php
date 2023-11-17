<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartsOf3dModel extends Model
{
    use HasFactory;

    public function model3d(){
        return $this->belongsTo(Model3D::class);
    }
}
