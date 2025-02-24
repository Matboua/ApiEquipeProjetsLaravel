<?php
/**
 * @OA\Info(
 *     title="API Equipe Projets",
 *     version="1.0.0",
 *     description="Documentation for the Equipe Projets API built with Laravel",
 *     @OA\Contact(
 *         email="support@yourdomain.com"
 *     )
 * )
 *
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Local API Server"
 * )
 */
use App\Models\Projet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjetController;
use App\Http\Controllers\PersonneController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projets/termines', [ProjetController::class, 'projetsTermines']);

Route::get('projets/enretard', [ProjetController::class, 'projetsEnRetard']);

Route::get('projets/encours', [ProjetController::class, 'projetsEnCours']);

Route::apiResource('personnes', PersonneController::class);
Route::apiResource('projets', ProjetController::class);

Route::post('projets/{id}/personne', [ProjetController::class, 'addPersonne']);

Route::post('projets/{id}/personnes', [ProjetController::class, 'addPersonnes']);

Route::delete('projet/{id}/personne', [ProjetController::class, 'removePersonne']);

Route::delete('projet/{id}/personnes', [ProjetController::class, 'removePersonnes']);

Route::get('projet/{id}/personnes', [ProjetController::class, 'getPersonnes']);

Route::get('personne/{id}/projets', [PersonneController::class, 'getProjets']);
