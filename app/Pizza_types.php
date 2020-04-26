<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pizza_types extends Model
{
    //dodato
    
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'price'];
}
