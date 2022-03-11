# store front-end back-end:
build store front-end back-end for udacity, that creat an the back end of an online store, writing the models, handlers, middleware and the test needed using jasmine

#### used frames:
es-lint,
prettier,
jasmine.
db-migrate.

#### install frames:
npm i --save `frame` (used in production);
npm i --save-dev `frame` (used in development);
npm i --save-dev @types/`frame` (to be able to use `import... from '...'` with typescript)

#### used env:
postman

### runnning project process:

* port: 5432
* Create data pase: 
user:   create user `mohammedmersal` 
password for user mohammedmersal: `password123`
database:   create database postgres owner mohammedmersal;
            create database postgres_test owner mohammedmersal;
            grant all on database postgres to mohammedmersal;
            grant all on database postgres_test to mohammedmersal;
            `if accquired schema: create schema public;`

* to be able to check this project I used postman (reaching every access is illuminated in the routes file).
use `db-migrate up` to build the database before using postman.
use `db-migrate reset` to drop all the tables build.

sequnce the files should be created in: (In the `body` of postman)
localhost/newuser (enter the aquired data: {
    first_name:, 
    last_name:, 
    email:, 
    password:
})
** all next routes has middleware so the nex is to authenticate the user using:
localhost/authenticate (user data), and the res `token` should be added to the authenticate in the postman authentication bearer token. 

localhost/newproduct (enter the aquired data: {
    name:,
    price:
})
localhost/neworder (enter the aquired data: {
    status:,
    user_id: (this should be the same id of the created user)
})

* to create a cart we should use the same order, products id we created
localhost/neworder/:id/product enter the aquired data: {
    quantity:,
    order_id: (this should be the same id of the created order),
    product_id: (this should be the same id of the created product),
})

** running the jasmine test we are gonna use: `npm run test` ( note: jasmne needs to be run `twice` to 
excute functions correctly): `npm run test` then `npm run test`;
