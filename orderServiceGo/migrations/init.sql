CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    userId TEXT NOT NULL,
    productId TEXT NOT NULL,
    quantity INT NOT NULL,
    totalAmount REAL NOT NULL
)