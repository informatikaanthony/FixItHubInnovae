<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    use HasFactory;

    protected $fillable = [
        'tokenable_type',
        'tokenable_id',
        'name',
        'token',
        'expires_at',
    ];

    // Relación polimórfica con el usuario
    public function tokenable()
    {
        return $this->morphTo();
    }

    public function isExpired(): bool
    {
        return $this->created_at->addDays(30)->isPast();
    }
}
