# Node Api
El api para logearse, crud de productos y crear y obtener ordenes
This is the api that allows you log in and log out, crud of products, create and get orders

## Installing

1- Create your own  data base

2- Need to create a `dev.env` file under the folder `/config` with this format

```bash
PORT= #Port of the node app
JWT_SECRET=#Secret token for jwt
DB=#Data base name
USER=#User Of Data Base
PASSWORD=#Password for user for data base
HOST=#ip address
DIALECT=mysql
```

3- run npm install

4- run npm dev

## DataBase Info

In the file `/src/models/index.js` in line `71` is the call to `function createDummyData()` if you uncomment this it will create a dummy data necesarily for the site like, roles, users and information about tips, if the application is stoped and restarted it will drop the database and re created it, so i recomend that it should comment again after the first time you run it.

## Test

For testing there were created 2 files to test the login and test the creations of products, for this you will have to create anothe database and storage that information in a `test.dev` file under `./config` folder
