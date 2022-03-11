users Table:
    (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password TEXT NOT NULL
    );

    create  --> /newuser  [post]   body{first_name, last_name, email, password}
    authenticate --> /authenticate [post]  body{first_name, last_name, email, password}
    index   --> /allusers  [get]    header{token}, no content in body
    show    --> /user/:id [get]    header{token}, header{id}
    delete  --> /deleteuser/:id [delete] header{token}, header{id}
    
Products Table:

    (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
    )

    create --> /newproduct    [post] body{name, price}, header{token}
    index  --> /allproducts   [get] no content in body, header{token}
    show   --> /product/:id  [get] no content in body, header{token}, header{id}
    delete --> /deleteproduct/:id [delete]  header{token} , header{token}, header{id}

Orders Table:

    (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
    )

    create     --> /neworder           [post] body{status, user(id)} header{token}
    index      --> /allorders          [get] header{token}, no content in body
    show       --> /order:id [get] header{token}, header{id}, no content in body
    delete     --> /deleteorder:id [delete] header{token}, header{id}

order_products Table:

    (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
    );

    addProduct --> /neworder/:id/product [post] header{token}, body{quantit, product_id} header{token}, header{order_id};
    cart --> /cart [get] header{token}, no content in body, 