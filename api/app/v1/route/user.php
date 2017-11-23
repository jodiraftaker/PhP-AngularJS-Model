<?php

$app->group('/v1', function () {

    $this->group('/user', function () {

        $this->POST('', App\v1\Api\UserApi::class . ':createUser');
        $this->GET('', App\v1\Api\UserApi::class . ':loginUser');
        $this->GET('/list', App\v1\Api\UserApi::class . ':getUsersAsList');
        $this->GET('/{id}', App\v1\Api\UserApi::class . ':getUserById');
        $this->DELETE('/{id}', App\v1\Api\UserApi::class. ':deleteUser');
        $this->PUT('/{id}', App\v1\Api\UserApi::class. ':editUser');

    });

});