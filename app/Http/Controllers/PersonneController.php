<?php

namespace App\Http\Controllers;

use App\Http\Resources\PersonneResource;
use App\Http\Resources\ProjetResource;
use App\Models\Personne;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Personnes",
 *     description="Operations related to Personnes"
 * )
 */
class PersonneController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/personnes",
     *     tags={"Personnes"},
     *     summary="Get list of all personnes",
     *     @OA\Response(response=200, description="Success")
     * )
     */
    public function index()
    {
        $personnes = Personne::paginate(10);
        return PersonneResource::collection($personnes);
    }

    /**
     * @OA\Post(
     *     path="/api/personnes",
     *     tags={"Personnes"},
     *     summary="Create a new personne",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom", "prenom"},
     *             @OA\Property(property="nom", type="string"),
     *             @OA\Property(property="prenom", type="string"),
     *             @OA\Property(property="telephone", type="string"),
     *             @OA\Property(property="ville", type="string"),
     *             @OA\Property(property="date_fin", type="string", format="date")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Personne created")
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            "nom" => "required|string|max:255",
            "prenom" => "required|string|max:255",
            "telephone" => "nullable|regex:/^[0-9]{10,15}$/",
            "ville" => "nullable|string|max:255",
            "date_fin" => "nullable|date",
        ]);

        $personne = Personne::create($request->all());
        return response()->json([
            'status' => 'success',
            'data' => new PersonneResource($personne),
        ], 201);
    }

    /**
     * @OA\Get(
     *     path="/api/personnes/{id}",
     *     tags={"Personnes"},
     *     summary="Get a specific personne by ID",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Success"),
     *     @OA\Response(response=404, description="Personne not found")
     * )
     */
    public function show(string $id)
    {
        $personne = Personne::findOrFail($id);
        return new PersonneResource($personne);
    }

    /**
     * @OA\Put(
     *     path="/api/personnes/{id}",
     *     tags={"Personnes"},
     *     summary="Update a specific personne by ID",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nom", type="string"),
     *             @OA\Property(property="prenom", type="string"),
     *             @OA\Property(property="telephone", type="string"),
     *             @OA\Property(property="ville", type="string"),
     *             @OA\Property(property="date_fin", type="string", format="date")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Personne updated"),
     *     @OA\Response(response=404, description="Personne not found")
     * )
     */
    public function update(Request $request, string $id)
    {
        $personne = Personne::findOrFail($id);

        $request->validate([
            "nom" => "sometimes|required|string|max:255",
            "prenom" => "sometimes|required|string|max:255",
            "telephone" => "sometimes|nullable|regex:/^[0-9]{10,15}$/",
            "ville" => "sometimes|nullable|string|max:255",
            "date_fin" => "sometimes|nullable|date",
        ]);

        $personne->update($request->all());
        return new PersonneResource($personne);
    }

    /**
     * @OA\Delete(
     *     path="/api/personnes/{id}",
     *     tags={"Personnes"},
     *     summary="Delete a specific personne by ID",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Personne deleted"),
     *     @OA\Response(response=404, description="Personne not found")
     * )
     */
    public function destroy(string $id)
    {
        $personne = Personne::findOrFail($id);
        $personne->delete();

        return response()->json([
            'status' => 'success',
            'message' => "La personne avec l'ID $id a été supprimée avec succès."
        ], 200);
    }

    /**
     * @OA\Get(
     *     path="/api/personnes/{id}/projets",
     *     tags={"Personnes"},
     *     summary="Get all projets for a specific personne",
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="List of projets"),
     *     @OA\Response(response=404, description="Personne not found")
     * )
     */
    public function getProjets(string $id)
    {
        $personne = Personne::with('projets')->findOrFail($id);
        return ProjetResource::collection($personne->projets);
    }
}
