## Installation (Local)

```
git clone https://github.com/liara-cloud/imgproxy-getting-started.git
```
```
cd imgproxy-getting-started
```
```
git checkout nodejs-app
```
```
mv .env.example .env # or rename .env.example to .env in Windows
```
- set ENVs in .env File
```
npm i
```
```
npm run start # or node server.js
```

## Installation (Liara)
```
git clone https://github.com/liara-cloud/imgproxy-getting-started.git
```
```
cd imgproxy-getting-started
```
```
git checkout nodejs-app
```
- create NodeJS-App on [Liara](https://console.liara.ir/apps/create)
- create needed disk on Liara (mentioned on liara.json file)
- add ENVs to NodeJS-App on Liara (mentioned on .env.example file)
```
npm install -g @liara/cli
```
```
liara login
```
```
liara deploy --port 3000
```
