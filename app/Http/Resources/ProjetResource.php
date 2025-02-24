<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "intitule"=> $this->intitule,
            "date_debut"=> $this->date_debut,
            "duree"=> $this->duree,
            "date_fin"=> $this->date_fin,
        ];
    }
}
