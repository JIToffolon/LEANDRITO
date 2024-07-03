<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Email;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactoController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacto/Index');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:500',
        ]);

        $email = new Email();
        $email->name = $request->name;
        $email->last_name = $request->last_name;
        $email->email = $request->email;
        $email->message = $request->message;
        $email->viewed = false;
        $email->save();

        try {
            Mail::to(env('MAIL_USERNAME'))->send(new ContactMail($email));
        } catch (Exception $th) {
           Log::info('CONTACT EMAIL ERROR: '.$th);
        }

        return response()->json(['success' => 'Message sent successfully!']);
    }
}
