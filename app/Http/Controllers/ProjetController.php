<?php

namespace App\Http\Controllers;

use App\Http\Resources\PersonneResource;
use App\Models\Projet;
use Illuminate\Http\Request;
use App\Http\Resources\ProjetResource;

class ProjetController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/projets",
     *     summary="Get all projects",
     *     tags={"Projets"},
     *     @OA\Response(
     *         response=200,
     *         description="List of all projects"
     *     )
     * )
     */
    public function index()
    {
        $projets = Projet::all();
        return ProjetResource::collection($projets);
    }

    /**
     * @OA\Post(
     *     path="/api/projets",
     *     summary="Create a new project",
     *     tags={"Projets"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"intitule", "date_debut", "duree"},
     *             @OA\Property(property="intitule", type="string", example="New Project"),
     *             @OA\Property(property="date_debut", type="string", format="date", example="2024-03-01"),
     *             @OA\Property(property="duree", type="integer", example=30)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Project created successfully"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $request->validate([
            "intitule" => "required|string|max:255",
            "date_debut" => "required|date",
            "duree" => "required|integer",
        ]);
        $projet = Projet::create($request->all());
        return new ProjetResource($projet);
    }

    /**
     * @OA\Get(
     *     path="/api/projets/{id}",
     *     summary="Get a specific project by ID",
     *     tags={"Projets"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the project",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project data"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found"
     *     )
     * )
     */
    public function show(string $id)
    {
        $projet = Projet::find($id);
        if (!$projet) {
            return response()->json([
                "error" => "Ressource introuvable",
                "message" => "Le projet avec l'id $id n'existe pas."
            ], 404);
        }
        return new ProjetResource($projet);
    }

    /**
     * @OA\Put(
     *     path="/api/projets/{id}",
     *     summary="Update a project",
     *     tags={"Projets"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the project to update",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="intitule", type="string", example="Updated Project"),
     *             @OA\Property(property="date_debut", type="string", format="date", example="2024-03-05"),
     *             @OA\Property(property="duree", type="integer", example=45)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project updated successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found"
     *     )
     * )
     */
    public function update(Request $request, string $id)
    {
        $projet = Projet::find($id);
        if (!$projet) {
            return response()->json([
                "error" => "Ressource introuvable",
                "message" => "Le projet avec l'id $id n'existe pas."
            ], 404);
        }
        $request->validate([
            "intitule" => "sometimes|required|string|max:255",
            "date_debut" => "sometimes|required|date",
            "duree" => "sometimes|required|integer",
        ]);
        $projet->update($request->all());
        return new ProjetResource($projet);
    }

    /**
     * @OA\Delete(
     *     path="/api/projets/{id}",
     *     summary="Delete a project",
     *     tags={"Projets"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the project to delete",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found"
     *     )
     * )
     */
    public function destroy(string $id)
    {
        $projet = Projet::find($id);
        if (!$projet) {
            return response()->json([
                "error" => "Ressource introuvable",
                "message" => "Le projet avec l'id $id n'existe pas."
            ], 404);
        }
        $projet->delete();
        return response()->json([
            "message" => "Le projet avec l'ID $id a été supprimé avec succès."
        ], 200);
    }
}
