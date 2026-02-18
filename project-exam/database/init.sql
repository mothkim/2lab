CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    cover_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO public.books (id, title, author, price, cover_url, created_at) VALUES 
(1, 'The DevOps Handbook', 'Gene Kim', 35.00, 'https://placehold.co/300x450/2563eb/white?text=DevOps+Handbook', '2026-02-11 04:12:56.522289'),
(2, 'Clean Code', 'Robert C. Martin', 42.00, 'https://placehold.co/300x450/3b82f6/white?text=Clean+Code', '2026-02-11 04:12:56.522289'),
(3, 'The Pragmatic Programmer', 'Andrew Hunt', 45.00, 'https://placehold.co/300x450/1e293b/white?text=Pragmatic+Programmer', '2026-02-11 04:12:56.522289'),
(4, 'Learning DevOps', 'Betanews', 199.00, 'https://www.techtalkthai.com/wp-content/uploads/2021/03/Learning-DevOps-Ebook-600x330.jpg', '2026-02-11 04:13:35.779856'),
(37, 'The DevOps Handbook', 'Gene Kim ', 199.00, 'https://m.media-amazon.com/images/I/71mhqEw8LcL._SY466_.jpg', '2026-02-11 04:14:36.940141'),
(39, 'DevOps For Beginners', 'Craig Berg', 199.00, 'https://m.media-amazon.com/images/I/61KNflSdv4L._SY466_.jpg', '2026-02-11 04:15:33.710722'),
(40, 'Effective DevOps', 'Jennifer Davis, Ryn Daniels', 299.00, 'https://m.media-amazon.com/images/I/91uRZwhpyTL._SY385_.jpg', '2026-02-11 04:16:11.673199');

SELECT pg_catalog.setval('public.books_id_seq', 40, true);
