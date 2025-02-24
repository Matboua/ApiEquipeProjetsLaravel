<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Personne extends Model
{
    protected $fillable = ['nom', 'prenom', 'ville', 'telephone'];

    public function projets()
    {
        return $this->belongsToMany(Projet::class);
    }
}
