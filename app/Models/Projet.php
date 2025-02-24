<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    protected $fillable = ['intitule', 'date_debut', 'duree', 'date_fin'];

    public function personnes()
    {
        return $this->belongsToMany(Personne::class);
    }
}
