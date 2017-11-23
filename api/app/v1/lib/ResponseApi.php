<?php

namespace App\v1\lib;

class ResponseApi
{
    function __invoke($request, $response, $next)
    {
        $response = $next($request, $response);

        return $response
            ->withHeader('Access-Control-Allow-Orgin', '*')
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');
    }
}

