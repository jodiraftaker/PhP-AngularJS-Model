<?php
/**
 * DigitalMade Control Panel
 * @version 0.0.1 Beta
 */

//namespace App\v1\Api;
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/app/v1/config/config.php';

$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$app->add(new App\v1\lib\ResponseApi());

$container['errorHandler'] = function ($c) {
    return function ($request, $response, $exception) use ($c) {
        $data = [
            'code' => $exception->getCode(),
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => explode("\n", $exception->getTraceAsString()),
        ];

        return $c->get('response')->withStatus(500)
            ->withHeader('Content-Type', 'application/json')
            ->write(json_encode($data));
    };
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

require __DIR__ .'/app/v1/config/routeManager.php';

$app->run();
