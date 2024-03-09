## Installation (Local)

```
git clone https://github.com/liara-cloud/imgproxy-getting-started.git
```
```
cd imgproxy-getting-started
```
```
git checkout laravel-app
```
```
composer install
```
- set ENVs (DataBase, IMGPROXY_URL & ENDPOINT_URL)
  
```
php artisan migrate
```
```
php artisan serve
```

## Installation (Liara)
```
git clone https://github.com/liara-cloud/imgproxy-getting-started.git
```
```
cd imgproxy-getting-started
```
```
git checkout laravel-app
```
- create your app on Liara, then create needed disk (mentioned on liara.json file)
- set ENVs (DataBase, IMGPROXY_URL & ENDPOINT_URL) on Liara (mentioned on .env.example file)
  
```
npm install -g @liara/cli
```
```
liara login
```
```
liara deploy
```
- after deploying, in CommandLine, execute:
```
php artisan migrate
```
