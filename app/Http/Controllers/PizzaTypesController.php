<?php

namespace App\Http\Controllers;

use App\Pizza_types;
use Illuminate\Http\Request;

class PizzaTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // ovdje u index dodato

        $pizza_types = Pizza_types::all();
        return response()->json($pizza_typess);
    
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dodato

        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $pizza_types= Pizza_types::create($request->all());
        return response()->json(['message'=> 'pizza_types created', 
        'pizza_types' => $pizza_types]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Pizza_types  $pizza_types
     * @return \Illuminate\Http\Response
     */
    public function show(Pizza_types $pizza_types)
    {
        //dodato
         return $pizza_types;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Pizza_types  $pizza_types
     * @return \Illuminate\Http\Response
     */
    public function edit(Pizza_types $pizza_types)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pizza_types  $pizza_types
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pizza_types $pizza_types)
    {
        // dodato
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required' //optional if you want this to be required
        ]);
        $pizza_types->name = $request->name();
        $pizza_types->amount = $request->amount();
        $pizza_types->description = $request->description();
        $pizza_types->save();
        
        return response()->json([
            'message' => 'pizza_types updated!',
            'pizza_types' => $pizza_types
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pizza_types  $pizza_types
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pizza_types $pizza_types)
    {
        // dodato
        $pizza_types->delete();
        return response()->json([
            'message' => 'pizza_types deleted'
        ]);
    }
}
