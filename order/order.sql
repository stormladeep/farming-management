CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    order_status VARCHAR(20),
    order_type VARCHAR(20),
    customer_name VARCHAR(50),
    customer_contact VARCHAR(50),
    shipping_address VARCHAR(100),
    total_cost DECIMAL(10, 2),
    vat DECIMAL(10, 2),
    payment_status VARCHAR(20),
    payment_method VARCHAR(20),
    invoice_number VARCHAR(20)
   

);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    item_name VARCHAR(50),
    item_description VARCHAR(255),
    quantity INT,
    unit_price DECIMAL(10, 2),
    total_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);
