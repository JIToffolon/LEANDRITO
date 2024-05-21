<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuadro extends Model
{
    protected $table = 'cuadros';
    protected $fillable = ['id','name','price','photo','quanty'];
}
