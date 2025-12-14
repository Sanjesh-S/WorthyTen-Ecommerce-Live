// js/product-data.js
// Product data for iPhones and MacBooks to seed the Firestore database

const productData = {
    samsung: [
        // Samsung Galaxy S24 Series (Latest Flagship)
        { name: "Samsung Galaxy S24 Ultra (256GB)", brand: "Samsung", category: "Phone", price: 95000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztqins-thumb-539573335" },
        { name: "Samsung Galaxy S24 Ultra (512GB)", brand: "Samsung", category: "Phone", price: 110000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztqins-thumb-539573335" },
        { name: "Samsung Galaxy S24 Ultra (1TB)", brand: "Samsung", category: "Phone", price: 125000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztqins-thumb-539573335" },
        { name: "Samsung Galaxy S24+ (256GB)", brand: "Samsung", category: "Phone", price: 75000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s926-sm-s926bztqins-thumb-539573295" },
        { name: "Samsung Galaxy S24+ (512GB)", brand: "Samsung", category: "Phone", price: 85000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s926-sm-s926bztqins-thumb-539573295" },
        { name: "Samsung Galaxy S24 (128GB)", brand: "Samsung", category: "Phone", price: 60000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s921-sm-s921bztqins-thumb-539573255" },
        { name: "Samsung Galaxy S24 (256GB)", brand: "Samsung", category: "Phone", price: 68000, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s921-sm-s921bztqins-thumb-539573255" },

        // Samsung Galaxy S23 Series
        { name: "Samsung Galaxy S23 Ultra (256GB)", brand: "Samsung", category: "Phone", price: 82000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S23+Ultra" },
        { name: "Samsung Galaxy S23 Ultra (512GB)", brand: "Samsung", category: "Phone", price: 95000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S23+Ultra" },
        { name: "Samsung Galaxy S23+ (256GB)", brand: "Samsung", category: "Phone", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S23+" },
        { name: "Samsung Galaxy S23 (128GB)", brand: "Samsung", category: "Phone", price: 52000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S23" },
        { name: "Samsung Galaxy S23 (256GB)", brand: "Samsung", category: "Phone", price: 58000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S23" },

        // Samsung Galaxy S22 Series
        { name: "Samsung Galaxy S22 Ultra (256GB)", brand: "Samsung", category: "Phone", price: 65000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S22+Ultra" },
        { name: "Samsung Galaxy S22 Ultra (512GB)", brand: "Samsung", category: "Phone", price: 75000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S22+Ultra" },
        { name: "Samsung Galaxy S22+ (128GB)", brand: "Samsung", category: "Phone", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S22+" },
        { name: "Samsung Galaxy S22+ (256GB)", brand: "Samsung", category: "Phone", price: 55000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S22+" },
        { name: "Samsung Galaxy S22 (128GB)", brand: "Samsung", category: "Phone", price: 38000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S22" },
        { name: "Samsung Galaxy S22 (256GB)", brand: "Samsung", category: "Phone", price: 45000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S22" },

        // Samsung Galaxy S21 Series
        { name: "Samsung Galaxy S21 Ultra (256GB)", brand: "Samsung", category: "Phone", price: 55000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S21+Ultra" },
        { name: "Samsung Galaxy S21 Ultra (512GB)", brand: "Samsung", category: "Phone", price: 65000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S21+Ultra" },
        { name: "Samsung Galaxy S21+ (128GB)", brand: "Samsung", category: "Phone", price: 40000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S21+" },
        { name: "Samsung Galaxy S21 (128GB)", brand: "Samsung", category: "Phone", price: 32000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S21" },
        { name: "Samsung Galaxy S21 (256GB)", brand: "Samsung", category: "Phone", price: 38000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=S21" },

        // Samsung Galaxy Z Fold Series (Foldables - Ultra Premium)
        { name: "Samsung Galaxy Z Fold 5 (256GB)", brand: "Samsung", category: "Phone", price: 115000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Fold+5" },
        { name: "Samsung Galaxy Z Fold 5 (512GB)", brand: "Samsung", category: "Phone", price: 135000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Fold+5" },
        { name: "Samsung Galaxy Z Fold 4 (256GB)", brand: "Samsung", category: "Phone", price: 95000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Fold+4" },
        { name: "Samsung Galaxy Z Fold 4 (512GB)", brand: "Samsung", category: "Phone", price: 110000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Fold+4" },
        { name: "Samsung Galaxy Z Fold 3 (256GB)", brand: "Samsung", category: "Phone", price: 75000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Fold+3" },
        { name: "Samsung Galaxy Z Fold 3 (512GB)", brand: "Samsung", category: "Phone", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Fold+3" },

        // Samsung Galaxy Z Flip Series (Compact Foldables)
        { name: "Samsung Galaxy Z Flip 5 (256GB)", brand: "Samsung", category: "Phone", price: 72000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Flip+5" },
        { name: "Samsung Galaxy Z Flip 5 (512GB)", brand: "Samsung", category: "Phone", price: 82000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Flip+5" },
        { name: "Samsung Galaxy Z Flip 4 (128GB)", brand: "Samsung", category: "Phone", price: 55000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Flip+4" },
        { name: "Samsung Galaxy Z Flip 4 (256GB)", brand: "Samsung", category: "Phone", price: 62000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Flip+4" },
        { name: "Samsung Galaxy Z Flip 3 (128GB)", brand: "Samsung", category: "Phone", price: 42000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Flip+3" },
        { name: "Samsung Galaxy Z Flip 3 (256GB)", brand: "Samsung", category: "Phone", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=Z+Flip+3" }
    ],

    iphones: [
        // iPhone 11 Series
        { name: "iPhone 11 (64GB)", baseModel: "iPhone 11", variant: "64GB", brand: "Apple", category: "Phone", price: 22000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+11" },
        { name: "iPhone 11 (128GB)", baseModel: "iPhone 11", variant: "128GB", brand: "Apple", category: "Phone", price: 25000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+11" },
        { name: "iPhone 11 Pro (64GB)", baseModel: "iPhone 11 Pro", variant: "64GB", brand: "Apple", category: "Phone", price: 32000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+11+Pro" },
        { name: "iPhone 11 Pro (256GB)", baseModel: "iPhone 11 Pro", variant: "256GB", brand: "Apple", category: "Phone", price: 38000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+11+Pro" },
        { name: "iPhone 11 Pro Max (64GB)", baseModel: "iPhone 11 Pro Max", variant: "64GB", brand: "Apple", category: "Phone", price: 35000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+11+Pro+Max" },
        { name: "iPhone 11 Pro Max (256GB)", baseModel: "iPhone 11 Pro Max", variant: "256GB", brand: "Apple", category: "Phone", price: 42000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+11+Pro+Max" },

        // iPhone 12 Series
        { name: "iPhone 12 (64GB)", baseModel: "iPhone 12", variant: "64GB", brand: "Apple", category: "Phone", price: 32000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12" },
        { name: "iPhone 12 (128GB)", baseModel: "iPhone 12", variant: "128GB", brand: "Apple", category: "Phone", price: 36000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12" },
        { name: "iPhone 12 mini (64GB)", baseModel: "iPhone 12 mini", variant: "64GB", brand: "Apple", category: "Phone", price: 28000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12+mini" },
        { name: "iPhone 12 mini (128GB)", baseModel: "iPhone 12 mini", variant: "128GB", brand: "Apple", category: "Phone", price: 31000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12+mini" },
        { name: "iPhone 12 Pro (128GB)", baseModel: "iPhone 12 Pro", variant: "128GB", brand: "Apple", category: "Phone", price: 42000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12+Pro" },
        { name: "iPhone 12 Pro (256GB)", baseModel: "iPhone 12 Pro", variant: "256GB", brand: "Apple", category: "Phone", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12+Pro" },
        { name: "iPhone 12 Pro Max (128GB)", baseModel: "iPhone 12 Pro Max", variant: "128GB", brand: "Apple", category: "Phone", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12+Pro+Max" },
        { name: "iPhone 12 Pro Max (256GB)", baseModel: "iPhone 12 Pro Max", variant: "256GB", brand: "Apple", category: "Phone", price: 55000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+12+Pro+Max" },

        // iPhone 13 Series
        { name: "iPhone 13 (128GB)", baseModel: "iPhone 13", variant: "128GB", brand: "Apple", category: "Phone", price: 42000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13" },
        { name: "iPhone 13 (256GB)", baseModel: "iPhone 13", variant: "256GB", brand: "Apple", category: "Phone", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13" },
        { name: "iPhone 13 mini (128GB)", baseModel: "iPhone 13 mini", variant: "128GB", brand: "Apple", category: "Phone", price: 38000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13+mini" },
        { name: "iPhone 13 mini (256GB)", baseModel: "iPhone 13 mini", variant: "256GB", brand: "Apple", category: "Phone", price: 43000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13+mini" },
        { name: "iPhone 13 Pro (128GB)", baseModel: "iPhone 13 Pro", variant: "128GB", brand: "Apple", category: "Phone", price: 55000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13+Pro" },
        { name: "iPhone 13 Pro (256GB)", baseModel: "iPhone 13 Pro", variant: "256GB", brand: "Apple", category: "Phone", price: 62000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13+Pro" },
        { name: "iPhone 13 Pro Max (128GB)", baseModel: "iPhone 13 Pro Max", variant: "128GB", brand: "Apple", category: "Phone", price: 60000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13+Pro+Max" },
        { name: "iPhone 13 Pro Max (256GB)", baseModel: "iPhone 13 Pro Max", variant: "256GB", brand: "Apple", category: "Phone", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+13+Pro+Max" },

        // iPhone 14 Series
        { name: "iPhone 14 (128GB)", baseModel: "iPhone 14", variant: "128GB", brand: "Apple", category: "Phone", price: 52000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14" },
        { name: "iPhone 14 (256GB)", baseModel: "iPhone 14", variant: "256GB", brand: "Apple", category: "Phone", price: 58000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14" },
        { name: "iPhone 14 Plus (128GB)", baseModel: "iPhone 14 Plus", variant: "128GB", brand: "Apple", category: "Phone", price: 58000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14+Plus" },
        { name: "iPhone 14 Plus (256GB)", baseModel: "iPhone 14 Plus", variant: "256GB", brand: "Apple", category: "Phone", price: 65000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14+Plus" },
        { name: "iPhone 14 Pro (128GB)", baseModel: "iPhone 14 Pro", variant: "128GB", brand: "Apple", category: "Phone", price: 72000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14+Pro" },
        { name: "iPhone 14 Pro (256GB)", baseModel: "iPhone 14 Pro", variant: "256GB", brand: "Apple", category: "Phone", price: 80000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14+Pro" },
        { name: "iPhone 14 Pro Max (128GB)", baseModel: "iPhone 14 Pro Max", variant: "128GB", brand: "Apple", category: "Phone", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14+Pro+Max" },
        { name: "iPhone 14 Pro Max (256GB)", baseModel: "iPhone 14 Pro Max", variant: "256GB", brand: "Apple", category: "Phone", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+14+Pro+Max" },

        // iPhone 15 Series
        { name: "iPhone 15 (128GB)", baseModel: "iPhone 15", variant: "128GB", brand: "Apple", category: "Phone", price: 62000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15" },
        { name: "iPhone 15 (256GB)", baseModel: "iPhone 15", variant: "256GB", brand: "Apple", category: "Phone", price: 70000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15" },
        { name: "iPhone 15 Plus (128GB)", baseModel: "iPhone 15 Plus", variant: "128GB", brand: "Apple", category: "Phone", price: 70000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Plus" },
        { name: "iPhone 15 Plus (256GB)", baseModel: "iPhone 15 Plus", variant: "256GB", brand: "Apple", category: "Phone", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Plus" },
        { name: "iPhone 15 Pro (128GB)", baseModel: "iPhone 15 Pro", variant: "128GB", brand: "Apple", category: "Phone", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Pro" },
        { name: "iPhone 15 Pro (256GB)", baseModel: "iPhone 15 Pro", variant: "256GB", brand: "Apple", category: "Phone", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Pro" },
        { name: "iPhone 15 Pro Max (256GB)", baseModel: "iPhone 15 Pro Max", variant: "256GB", brand: "Apple", category: "Phone", price: 105000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Pro+Max" },
        { name: "iPhone 15 Pro Max (512GB)", baseModel: "iPhone 15 Pro Max", variant: "512GB", brand: "Apple", category: "Phone", price: 120000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Pro+Max" },

        // iPhone 16 Series (Latest)
        { name: "iPhone 16 (128GB)", baseModel: "iPhone 16", variant: "128GB", brand: "Apple", category: "Phone", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16" },
        { name: "iPhone 16 (256GB)", baseModel: "iPhone 16", variant: "256GB", brand: "Apple", category: "Phone", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16" },
        { name: "iPhone 16 Plus (128GB)", baseModel: "iPhone 16 Plus", variant: "128GB", brand: "Apple", category: "Phone", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16+Plus" },
        { name: "iPhone 16 Plus (256GB)", baseModel: "iPhone 16 Plus", variant: "256GB", brand: "Apple", category: "Phone", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16+Plus" },
        { name: "iPhone 16 Pro (128GB)", baseModel: "iPhone 16 Pro", variant: "128GB", brand: "Apple", category: "Phone", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16+Pro" },
        { name: "iPhone 16 Pro (256GB)", baseModel: "iPhone 16 Pro", variant: "256GB", brand: "Apple", category: "Phone", price: 110000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16+Pro" },
        { name: "iPhone 16 Pro Max (256GB)", baseModel: "iPhone 16 Pro Max", variant: "256GB", brand: "Apple", category: "Phone", price: 118000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16+Pro+Max" },
        { name: "iPhone 16 Pro Max (512GB)", baseModel: "iPhone 16 Pro Max", variant: "512GB", brand: "Apple", category: "Phone", price: 135000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+16+Pro+Max" }
    ],

    macbooks: [
        // MacBook Air M1
        { name: "MacBook Air M1 (8GB/256GB) 2020", brand: "Apple", category: "Laptop", price: 52000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M1" },
        { name: "MacBook Air M1 (8GB/512GB) 2020", brand: "Apple", category: "Laptop", price: 62000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M1" },

        // MacBook Air M2
        { name: "MacBook Air M2 (8GB/256GB) 2022", brand: "Apple", category: "Laptop", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M2" },
        { name: "MacBook Air M2 (8GB/512GB) 2022", brand: "Apple", category: "Laptop", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M2" },
        { name: "MacBook Air M2 (16GB/512GB) 2022", brand: "Apple", category: "Laptop", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M2" },

        // MacBook Air M3
        { name: "MacBook Air M3 (8GB/256GB) 2024", brand: "Apple", category: "Laptop", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M3" },
        { name: "MacBook Air M3 (16GB/512GB) 2024", brand: "Apple", category: "Laptop", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Air+M3" },

        // MacBook Pro 13" M1
        { name: "MacBook Pro 13\" M1 (8GB/256GB) 2020", brand: "Apple", category: "Laptop", price: 65000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+13+M1" },
        { name: "MacBook Pro 13\" M1 (8GB/512GB) 2020", brand: "Apple", category: "Laptop", price: 75000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+13+M1" },
        { name: "MacBook Pro 13\" M1 (16GB/512GB) 2020", brand: "Apple", category: "Laptop", price: 85000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+13+M1" },

        // MacBook Pro 13" M2
        { name: "MacBook Pro 13\" M2 (8GB/256GB) 2022", brand: "Apple", category: "Laptop", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+13+M2" },
        { name: "MacBook Pro 13\" M2 (16GB/512GB) 2022", brand: "Apple", category: "Laptop", price: 95000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+13+M2" },

        // MacBook Pro 14" M1 Pro/Max
        { name: "MacBook Pro 14\" M1 Pro (16GB/512GB) 2021", brand: "Apple", category: "Laptop", price: 115000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+14+M1" },
        { name: "MacBook Pro 14\" M1 Max (32GB/1TB) 2021", brand: "Apple", category: "Laptop", price: 145000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+14+M1" },

        // MacBook Pro 14" M2 Pro/Max
        { name: "MacBook Pro 14\" M2 Pro (16GB/512GB) 2023", brand: "Apple", category: "Laptop", price: 130000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+14+M2" },
        { name: "MacBook Pro 14\" M2 Max (32GB/1TB) 2023", brand: "Apple", category: "Laptop", price: 165000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+14+M2" },

        // MacBook Pro 14" M3 Pro/Max
        { name: "MacBook Pro 14\" M3 Pro (18GB/512GB) 2023", brand: "Apple", category: "Laptop", price: 145000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+14+M3" },
        { name: "MacBook Pro 14\" M3 Max (36GB/1TB) 2023", brand: "Apple", category: "Laptop", price: 180000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+14+M3" },

        // MacBook Pro 16" M1 Pro/Max
        { name: "MacBook Pro 16\" M1 Pro (16GB/512GB) 2021", brand: "Apple", category: "Laptop", price: 135000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+16+M1" },
        { name: "MacBook Pro 16\" M1 Max (32GB/1TB) 2021", brand: "Apple", category: "Laptop", price: 165000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+16+M1" },

        // MacBook Pro 16" M2 Pro/Max
        { name: "MacBook Pro 16\" M2 Pro (16GB/512GB) 2023", brand: "Apple", category: "Laptop", price: 155000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+16+M2" },
        { name: "MacBook Pro 16\" M2 Max (32GB/1TB) 2023", brand: "Apple", category: "Laptop", price: 190000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+16+M2" },

        { name: "MacBook Pro 16\" M3 Pro (18GB/512GB) 2023", brand: "Apple", category: "Laptop", price: 170000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+16+M3" },
        { name: "MacBook Pro 16\" M3 Max (36GB/1TB) 2023", brand: "Apple", category: "Laptop", price: 210000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=MacBook+Pro+16+M3" }
    ],

    // ===== iPAD MODELS =====
    ipads: [
        // iPad (Standard) - 9th Generation
        { name: "iPad 9th Gen (64GB) WiFi", brand: "Apple", category: "iPad", price: 22000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+9th" },
        { name: "iPad 9th Gen (256GB) WiFi", brand: "Apple", category: "iPad", price: 28000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+9th" },
        { name: "iPad 9th Gen (64GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 28000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+9th" },
        { name: "iPad 9th Gen (256GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 34000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+9th" },

        // iPad (Standard) - 10th Generation
        { name: "iPad 10th Gen (64GB) WiFi", brand: "Apple", category: "iPad", price: 32000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+10th" },
        { name: "iPad 10th Gen (256GB) WiFi", brand: "Apple", category: "iPad", price: 42000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+10th" },
        { name: "iPad 10th Gen (64GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 42000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+10th" },
        { name: "iPad 10th Gen (256GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 52000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+10th" },

        // iPad mini - 5th Generation
        { name: "iPad mini 5th Gen (64GB) WiFi", brand: "Apple", category: "iPad", price: 25000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+mini+5" },
        { name: "iPad mini 5th Gen (256GB) WiFi", brand: "Apple", category: "iPad", price: 32000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+mini+5" },

        // iPad mini - 6th Generation
        { name: "iPad mini 6th Gen (64GB) WiFi", brand: "Apple", category: "iPad", price: 38000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+mini+6" },
        { name: "iPad mini 6th Gen (256GB) WiFi", brand: "Apple", category: "iPad", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+mini+6" },
        { name: "iPad mini 6th Gen (64GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+mini+6" },
        { name: "iPad mini 6th Gen (256GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 58000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+mini+6" },

        // iPad Air - 4th Generation (M1)
        { name: "iPad Air 4th Gen (64GB) WiFi", brand: "Apple", category: "iPad", price: 38000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+4" },
        { name: "iPad Air 4th Gen (256GB) WiFi", brand: "Apple", category: "iPad", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+4" },

        // iPad Air - 5th Generation (M1)
        { name: "iPad Air 5th Gen M1 (64GB) WiFi", brand: "Apple", category: "iPad", price: 48000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M1" },
        { name: "iPad Air 5th Gen M1 (256GB) WiFi", brand: "Apple", category: "iPad", price: 58000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M1" },
        { name: "iPad Air 5th Gen M1 (64GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 58000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M1" },
        { name: "iPad Air 5th Gen M1 (256GB) WiFi+Cellular", brand: "Apple", category: "iPad", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M1" },

        // iPad Air - 6th Generation (M2) - 11"
        { name: "iPad Air 11\" M2 (128GB) WiFi", brand: "Apple", category: "iPad", price: 52000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+11" },
        { name: "iPad Air 11\" M2 (256GB) WiFi", brand: "Apple", category: "iPad", price: 60000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+11" },
        { name: "iPad Air 11\" M2 (512GB) WiFi", brand: "Apple", category: "iPad", price: 72000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+11" },
        { name: "iPad Air 11\" M2 (1TB) WiFi", brand: "Apple", category: "iPad", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+11" },

        // iPad Air - 6th Generation (M2) - 13"
        { name: "iPad Air 13\" M2 (128GB) WiFi", brand: "Apple", category: "iPad", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+13" },
        { name: "iPad Air 13\" M2 (256GB) WiFi", brand: "Apple", category: "iPad", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+13" },
        { name: "iPad Air 13\" M2 (512GB) WiFi", brand: "Apple", category: "iPad", price: 92000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+13" },
        { name: "iPad Air 13\" M2 (1TB) WiFi", brand: "Apple", category: "iPad", price: 108000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Air+M2+13" },

        // iPad Pro 11" - M1
        { name: "iPad Pro 11\" M1 (128GB) WiFi", brand: "Apple", category: "iPad", price: 55000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M1" },
        { name: "iPad Pro 11\" M1 (256GB) WiFi", brand: "Apple", category: "iPad", price: 65000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M1" },
        { name: "iPad Pro 11\" M1 (512GB) WiFi", brand: "Apple", category: "iPad", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M1" },
        { name: "iPad Pro 11\" M1 (1TB) WiFi", brand: "Apple", category: "iPad", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M1" },

        // iPad Pro 12.9" - M1
        { name: "iPad Pro 12.9\" M1 (128GB) WiFi", brand: "Apple", category: "iPad", price: 72000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M1" },
        { name: "iPad Pro 12.9\" M1 (256GB) WiFi", brand: "Apple", category: "iPad", price: 82000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M1" },
        { name: "iPad Pro 12.9\" M1 (512GB) WiFi", brand: "Apple", category: "iPad", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M1" },
        { name: "iPad Pro 12.9\" M1 (1TB) WiFi", brand: "Apple", category: "iPad", price: 120000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M1" },

        // iPad Pro 11" - M2
        { name: "iPad Pro 11\" M2 (128GB) WiFi", brand: "Apple", category: "iPad", price: 68000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M2" },
        { name: "iPad Pro 11\" M2 (256GB) WiFi", brand: "Apple", category: "iPad", price: 78000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M2" },
        { name: "iPad Pro 11\" M2 (512GB) WiFi", brand: "Apple", category: "iPad", price: 92000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M2" },
        { name: "iPad Pro 11\" M2 (1TB) WiFi", brand: "Apple", category: "iPad", price: 115000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M2" },
        { name: "iPad Pro 11\" M2 (2TB) WiFi", brand: "Apple", category: "iPad", price: 140000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M2" },

        // iPad Pro 12.9" - M2
        { name: "iPad Pro 12.9\" M2 (128GB) WiFi", brand: "Apple", category: "iPad", price: 88000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M2" },
        { name: "iPad Pro 12.9\" M2 (256GB) WiFi", brand: "Apple", category: "iPad", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M2" },
        { name: "iPad Pro 12.9\" M2 (512GB) WiFi", brand: "Apple", category: "iPad", price: 115000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M2" },
        { name: "iPad Pro 12.9\" M2 (1TB) WiFi", brand: "Apple", category: "iPad", price: 140000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M2" },
        { name: "iPad Pro 12.9\" M2 (2TB) WiFi", brand: "Apple", category: "iPad", price: 165000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+12.9+M2" },

        // iPad Pro 11" - M4 (Latest)
        { name: "iPad Pro 11\" M4 (256GB) WiFi", brand: "Apple", category: "iPad", price: 82000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M4" },
        { name: "iPad Pro 11\" M4 (512GB) WiFi", brand: "Apple", category: "iPad", price: 98000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M4" },
        { name: "iPad Pro 11\" M4 (1TB) WiFi", brand: "Apple", category: "iPad", price: 125000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M4" },
        { name: "iPad Pro 11\" M4 (2TB) WiFi", brand: "Apple", category: "iPad", price: 155000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+11+M4" },

        // iPad Pro 13" - M4 (Latest)
        { name: "iPad Pro 13\" M4 (256GB) WiFi", brand: "Apple", category: "iPad", price: 105000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+13+M4" },
        { name: "iPad Pro 13\" M4 (512GB) WiFi", brand: "Apple", category: "iPad", price: 125000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+13+M4" },
        { name: "iPad Pro 13\" M4 (1TB) WiFi", brand: "Apple", category: "iPad", price: 155000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+13+M4" },
        { name: "iPad Pro 13\" M4 (2TB) WiFi", brand: "Apple", category: "iPad", price: 185000, image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPad+Pro+13+M4" }
    ],

    // ===== DSLR/LENS CAMERA MODELS (Canon, Nikon, Sony, Fujifilm) =====
    // Extracted from Combined_Camera_Lens.csv
    cameras: [
        {
            "name": "EOS 300D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 16037,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 350D (Rebel XT / Kiss Digital N)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 102021,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 400D (Rebel XTi / Kiss Digital X)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 112091,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 450D (Rebel XSi / Kiss X2)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 66997,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 500D (Rebel T1i / Kiss X3)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 104796,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 550D (Rebel T2i / Kiss X4)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 62110,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 600D (Rebel T3i / Kiss X5)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 113058,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 650D (Rebel T4i / Kiss X6i)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 113772,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 700D (Rebel T5i / Kiss X7i)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 76349,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 750D (Rebel T6i / Kiss X8i)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 118519,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 760D (Rebel T6s / 8000D)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 104768,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 800D (Rebel T7i / Kiss X9i)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 50999,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 850D (Rebel T8i / Kiss X10i)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 72919,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 1000D (Rebel XS / Kiss F)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 106210,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 1100D (Rebel T3 / Kiss X50)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 51776,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 1200D (Rebel T5 / Kiss X70)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 110342,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 1300D (Rebel T6 / Kiss X80)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 95825,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 1500D (Rebel T7 / Kiss X90)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 102115,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 2000D (Rebel T7 / Kiss X90)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 70158,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 250D (Rebel SL3 / Kiss X10)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 92094,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 3000D (Rebel T100)",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 100749,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 4000D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 21199,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 60D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 30239,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 70D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 58709,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 77D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 55262,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 80D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 57532,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 90D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 92478,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 7D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 27386,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 79513,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS RP",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 80478,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R5",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 261027,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R6",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 119540,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 200D Mark I",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 54811,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 200D Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 75126,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R6 Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 103627,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R3",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 159950,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R5 C",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 247197,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R8",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 91671,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 7D Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 56960,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 5D Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 63147,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 5D Mark III",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 97792,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 5D Mark IV",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 92461,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 6D",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 25618,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS 6D Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 60344,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 27191,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M2",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 28218,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M3",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 29417,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M5",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 30293,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M6",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 27069,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M6 Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 89628,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M10",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 28234,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M100",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 16157,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M50 Mark I",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 105549,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M50 Mark II",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 67488,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS M200",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 21969,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R7",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 98512,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R10",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 98129,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R50",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 255544,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "EOS R100",
            "brand": "Canon",
            "category": "DSLR/Lens",
            "price": 82971,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Canon%20EOS"
        },
        {
            "name": "D40",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 27773,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D40"
        },
        {
            "name": "D40x",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 28728,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D40x"
        },
        {
            "name": "D50",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 55599,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D50"
        },
        {
            "name": "D60",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 31614,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D60"
        },
        {
            "name": "D70",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 96427,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D70"
        },
        {
            "name": "D80",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 18015,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D80"
        },
        {
            "name": "D90",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 34103,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D90"
        },
        {
            "name": "D100",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 19831,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D100"
        },
        {
            "name": "D200",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 21418,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D200"
        },
        {
            "name": "D300",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 52643,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D300"
        },
        {
            "name": "D300s",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 32272,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D300s"
        },
        {
            "name": "D500",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 36466,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D500"
        },
        {
            "name": "D3100",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 56927,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D3100"
        },
        {
            "name": "D3200",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 54352,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D3200"
        },
        {
            "name": "D3300",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 54879,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D3300"
        },
        {
            "name": "D3400",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 46872,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D3400"
        },
        {
            "name": "D3500",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 64348,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D3500"
        },
        {
            "name": "D5000",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 37281,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D5000"
        },
        {
            "name": "D5100",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 30677,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D5100"
        },
        {
            "name": "D5200",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 32427,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D5200"
        },
        {
            "name": "D5300",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 31373,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D5300"
        },
        {
            "name": "D5500",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 50358,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D5500"
        },
        {
            "name": "D5600",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 45130,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D5600"
        },
        {
            "name": "D7000",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 93902,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D7000"
        },
        {
            "name": "D7100",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 82538,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D7100"
        },
        {
            "name": "D7200",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 105153,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D7200"
        },
        {
            "name": "D7500",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 85925,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D7500"
        },
        {
            "name": "D600",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 32163,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D600"
        },
        {
            "name": "D610",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 15390,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D610"
        },
        {
            "name": "D700",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 70247,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D700"
        },
        {
            "name": "D750",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 69470,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D750"
        },
        {
            "name": "D780",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 158851,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D780"
        },
        {
            "name": "D800",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 23066,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D800"
        },
        {
            "name": "D810",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 23502,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D810"
        },
        {
            "name": "D850",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 129974,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20D850"
        },
        {
            "name": "Z30",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 48821,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z30"
        },
        {
            "name": "Z5",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 97934,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z5"
        },
        {
            "name": "Z6",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 110525,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z6"
        },
        {
            "name": "Z6 II",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 72099,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z6"
        },
        {
            "name": "Z6 III",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 94348,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z6"
        },
        {
            "name": "Z7",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 80428,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z7"
        },
        {
            "name": "Z7 II",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 56981,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z7"
        },
        {
            "name": "Z8",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 252975,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z8"
        },
        {
            "name": "Z9",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 282757,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Z9"
        },
        {
            "name": "Coolpix A1000",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 15100,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix B500",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 31458,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix B600",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 33304,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix B700",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 32156,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix P600",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 21102,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix P950",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 30096,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix P1000",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 16915,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "Coolpix P900",
            "brand": "Nikon",
            "category": "DSLR/Lens",
            "price": 18631,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Nikon%20Coolpix"
        },
        {
            "name": "A55",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 59143,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A55"
        },
        {
            "name": "A57",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 35845,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A57"
        },
        {
            "name": "A58",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 40388,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A58"
        },
        {
            "name": "A65",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 117443,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A65"
        },
        {
            "name": "A68",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 110793,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A68"
        },
        {
            "name": "A77",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 65485,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A77"
        },
        {
            "name": "A77 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 79949,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A77"
        },
        {
            "name": "A99",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 246401,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A99"
        },
        {
            "name": "A99 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 240019,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A99"
        },
        {
            "name": "NEX-3",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 41220,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-3"
        },
        {
            "name": "NEX-3N",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 42178,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-3N"
        },
        {
            "name": "NEX-5",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 55586,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-5"
        },
        {
            "name": "NEX-5N",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 54826,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-5N"
        },
        {
            "name": "NEX-5R",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 111776,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-5R"
        },
        {
            "name": "NEX-5T",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 37673,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-5T"
        },
        {
            "name": "NEX-6",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 62550,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-6"
        },
        {
            "name": "NEX-7",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 60439,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20NEX-7"
        },
        {
            "name": "A5000",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 33100,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A5000"
        },
        {
            "name": "A5100",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 49193,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A5100"
        },
        {
            "name": "A6000",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 61358,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6000"
        },
        {
            "name": "A6100",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 99029,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6100"
        },
        {
            "name": "A6300",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 59241,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6300"
        },
        {
            "name": "A6400",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 78636,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6400"
        },
        {
            "name": "A6500",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 65961,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6500"
        },
        {
            "name": "A6600",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 115497,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6600"
        },
        {
            "name": "A6700",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 81615,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A6700"
        },
        {
            "name": "ZV-E10",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 17190,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20ZV-E10"
        },
        {
            "name": "A7",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 85350,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7"
        },
        {
            "name": "A7 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 75248,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7"
        },
        {
            "name": "A7 IV",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 54015,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7"
        },
        {
            "name": "A7R",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 117394,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7R"
        },
        {
            "name": "A7R II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 62999,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7R"
        },
        {
            "name": "A7R III",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 77692,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7R"
        },
        {
            "name": "A7R IV",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 219798,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7R"
        },
        {
            "name": "A7S",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 95447,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7S"
        },
        {
            "name": "A7S II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 76563,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7S"
        },
        {
            "name": "A7C",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 72034,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7C"
        },
        {
            "name": "A7C II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 89534,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7C"
        },
        {
            "name": "A7CR",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 75102,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7CR"
        },
        {
            "name": "A9",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 252665,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A9"
        },
        {
            "name": "A9 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 278462,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A9"
        },
        {
            "name": "FX3",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 139315,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20FX3"
        },
        {
            "name": "FX30",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 180443,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20FX30"
        },
        {
            "name": "FX6",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 202199,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20FX6"
        },
        {
            "name": "FX9",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 252976,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20FX9"
        },
        {
            "name": "VENICE",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 243925,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20VENICE"
        },
        {
            "name": "VENICE 2",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 239147,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20VENICE"
        },
        {
            "name": "RX0",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 81539,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX0"
        },
        {
            "name": "RX0 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 93932,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX0"
        },
        {
            "name": "RX1",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 117803,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX1"
        },
        {
            "name": "RX1R",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 96583,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX1R"
        },
        {
            "name": "RX1R II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 102457,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX1R"
        },
        {
            "name": "RX10",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 60428,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX10"
        },
        {
            "name": "RX10 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 111077,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX10"
        },
        {
            "name": "RX10 III",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 65536,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX10"
        },
        {
            "name": "RX10 IV",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 115697,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX10"
        },
        {
            "name": "RX100",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 63638,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 61322,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 III",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 101956,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 IV",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 89980,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 V",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 118638,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 VA",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 111270,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 VI",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 97791,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "RX100 VII",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 69536,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20RX100"
        },
        {
            "name": "HX50",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 26426,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20HX50"
        },
        {
            "name": "HX60",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 32316,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20HX60"
        },
        {
            "name": "HX80",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 24167,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20HX80"
        },
        {
            "name": "HX90",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 29209,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20HX90"
        },
        {
            "name": "HX99",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 25499,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20HX99"
        },
        {
            "name": "H300",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 34171,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20H300"
        },
        {
            "name": "H400",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 41421,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20H400"
        },
        {
            "name": "W800",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 31765,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20W800"
        },
        {
            "name": "W810",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 34289,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20W810"
        },
        {
            "name": "W830",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 20641,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20W830"
        },
        {
            "name": "ZV-1",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 26653,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20ZV-1"
        },
        {
            "name": "ZV-1 II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 25240,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20ZV-1"
        },
        {
            "name": "A7 Mark III",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 100314,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7"
        },
        {
            "name": "A7 Mark II",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 64991,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7"
        },
        {
            "name": "A7 Mark I",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 83547,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20A7"
        },
        {
            "name": "ZV-1F",
            "brand": "Sony",
            "category": "DSLR/Lens",
            "price": 19412,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Sony%20ZV-1F"
        },
        {
            "name": "X-A1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 22868,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-A1"
        },
        {
            "name": "X-A2",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 16656,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-A2"
        },
        {
            "name": "X-A3",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 24323,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-A3"
        },
        {
            "name": "X-A5",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 40369,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-A5"
        },
        {
            "name": "X-A7",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 83714,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-A7"
        },
        {
            "name": "X-M1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 22525,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-M1"
        },
        {
            "name": "X-M2",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 18230,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-M2"
        },
        {
            "name": "X-T1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 35707,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T1"
        },
        {
            "name": "X-T2",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 45360,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T2"
        },
        {
            "name": "X-T3",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 99651,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T3"
        },
        {
            "name": "X-T4",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 61304,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T4"
        },
        {
            "name": "X-T5",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 115364,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T5"
        },
        {
            "name": "X-T10",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 50870,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T10"
        },
        {
            "name": "X-T20",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 55393,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T20"
        },
        {
            "name": "X-T30",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 98870,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T30"
        },
        {
            "name": "X-T30 II",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 94231,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T30"
        },
        {
            "name": "X-T100",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 34550,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T100"
        },
        {
            "name": "X-T200",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 46058,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-T200"
        },
        {
            "name": "X-H1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 106012,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-H1"
        },
        {
            "name": "X-H2",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 257298,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-H2"
        },
        {
            "name": "X-H2S",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 157835,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-H2S"
        },
        {
            "name": "X-Pro1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 95051,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-Pro1"
        },
        {
            "name": "X-Pro2",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 115587,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-Pro2"
        },
        {
            "name": "X-Pro3",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 261332,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-Pro3"
        },
        {
            "name": "X-E1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 40660,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-E1"
        },
        {
            "name": "X-E2",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 57714,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-E2"
        },
        {
            "name": "X-E3",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 39999,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-E3"
        },
        {
            "name": "X-E4",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 41419,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-E4"
        },
        {
            "name": "X-S10",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 61787,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-S10"
        },
        {
            "name": "X-S20",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 38641,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X-S20"
        },
        {
            "name": "X100",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 24214,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X100"
        },
        {
            "name": "X100S",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 26585,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X100S"
        },
        {
            "name": "X100T",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 16901,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X100T"
        },
        {
            "name": "X100F",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 15560,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X100F"
        },
        {
            "name": "X100V",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 34506,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X100V"
        },
        {
            "name": "X10",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 18737,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X10"
        },
        {
            "name": "X20",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 44187,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X20"
        },
        {
            "name": "X30",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 52419,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X30"
        },
        {
            "name": "X70",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 26255,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20X70"
        },
        {
            "name": "XF1",
            "brand": "Fujifilm",
            "category": "DSLR/Lens",
            "price": 45018,
            "image": "https://via.placeholder.com/300x300/667eea/ffffff?text=Fujifilm%20XF1"
        }
    ],

    // ===== CAMERA LENSES =====

    // ===== CAMERA LENSES =====
    // Lenses organized by brand (sample of key lenses - full list can be added)
    lenses: [
        {
            "name": "Canon EF 14mm f/2.8L II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 138751,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 20mm f/2.8 USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 37772,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 24mm f/1.4L II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 20443,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 24mm f/2.8 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 30227,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 28mm f/1.8 USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 24548,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 28mm f/2.8 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 26320,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 35mm f/1.4L II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 67252,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 35mm f/2 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 23535,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 40mm f/2.8 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 111339,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 50mm f/1.2L USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 81536,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 50mm f/1.4 USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 46508,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 50mm f/1.8 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 22217,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 85mm f/1.2L II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 179962,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 85mm f/1.4L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 81478,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 85mm f/1.8 USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 17304,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 100mm f/2 USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 33492,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 100mm f/2.8 Macro USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 44764,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 100mm f/2.8L Macro IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 186392,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 135mm f/2L USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 27965,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 200mm f/2L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 45605,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 200mm f/2.8L II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 104140,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 300mm f/2.8L IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 321002,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 300mm f/4L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 31658,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 400mm f/2.8L IS III USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 287540,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 400mm f/4 DO IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 45577,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 500mm f/4L IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 210776,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 600mm f/4L IS III USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 218574,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 800mm f/5.6L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 367816,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 16- 35mm f/2.8L III USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 172075,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 16- 35mm f/4L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 91855,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 24- 70mm f/2.8L II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 199813,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 24- 105mm f/4L IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 27336,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 24- 105mm f/3.5-5.6 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 42186,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 70- 200mm f/2.8L IS III USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 116374,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 70- 200mm f/4L IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 33901,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 70- 300mm f/4- 5.6 IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 38638,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF 100- 400mm f/4.5-5.6L IS II USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 36206,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 10- 18mm f/4.5- 5.6 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 28402,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 10- 22mm f/3.5- 4.5 USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 25768,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 17- 55mm f/2.8 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 43181,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 17- 85mm f/4- 5.6 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 73770,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 18- 135mm f/3.5-5.6 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 58232,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 55- 250mm f/4- 5.6 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 61020,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-S 24mm f/2.8 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 156280,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 15- 35mm f/2.8L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 150849,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 16mm f/2.8 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 171572,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 24- 70mm f/2.8L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 154209,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 24- 105mm f/4L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 43008,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 24- 240mm f/4- 6.3 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 34699,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 28- 70mm f/2L USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 31264,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 35mm f/1.8 IS Macro STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 19065,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 50mm f/1.2L USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 151036,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 50mm f/1.8 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 28318,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 85mm f/1.2L USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 137333,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 85mm f/1.2L DS USM RF 85mm f/2 Macro IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 112538,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 70- 200mm f/2.8L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 123494,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 70- 200mm f/4L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 44333,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 100- 400mm f/5.6-8 IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 26712,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 100mm f/2.8L Macro IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 124523,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 600mm f/11 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 272134,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 800mm f/11 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 327545,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 400mm f/2.8L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 395196,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF 600mm f/4L IS USM",
            "brand": "Canon",
            "category": "Lens",
            "price": 290352,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF-S 18- 150mm f/3.5-6.3 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 83386,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon RF-S 10- 18mm f/4.5- 6.3 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 25580,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-M 11- 22mm f/4- 5.6 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 31673,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-M 18- 150mm f/3.5-6.3 IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 70772,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-M 22mm f/2 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 32276,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-M 28mm f/3.5 Macro IS STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 48475,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Canon EF-M 32mm f/1.4 STM",
            "brand": "Canon",
            "category": "Lens",
            "price": 43127,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Canon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 14- 24mm f/2.8G ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 30038,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 16- 35mm f/4G ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 96969,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 17- 35mm f/2.8D IF-ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 16226,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 24- 70mm f/2.8G ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 35715,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 24- 70mm f/2.8E ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 23089,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 24- 85mm f/3.5- 4.5G ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 91013,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 24- 120mm f/4G ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 41916,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 28- 70mm f/2.8D ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 49756,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 28- 300mm f/3.5-5.6G ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 35029,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 35mm f/1.4G",
            "brand": "Nikon",
            "category": "Lens",
            "price": 88434,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 35mm f/1.8G ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 18706,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 50mm f/1.4G",
            "brand": "Nikon",
            "category": "Lens",
            "price": 80988,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 50mm f/1.8G",
            "brand": "Nikon",
            "category": "Lens",
            "price": 21592,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 105mm f/1.4E ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 44264,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 105mm f/2.8G VR Micro",
            "brand": "Nikon",
            "category": "Lens",
            "price": 21537,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 200mm f/2G ED VR II",
            "brand": "Nikon",
            "category": "Lens",
            "price": 35635,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 300mm f/4E PF ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 29557,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S 500mm f/4E FL ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 393449,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 10- 24mm f/3.5- 4.5G ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 29879,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 12- 24mm f/4G IF-ED",
            "brand": "Nikon",
            "category": "Lens",
            "price": 24943,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 16- 85mm f/3.5- 5.6G ED VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 70121,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 18- 55mm f/3.5- 5.6G VR II",
            "brand": "Nikon",
            "category": "Lens",
            "price": 23782,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 18- 105mm f/3.5-5.6G VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 22093,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 18- 140mm f/3.5-5.6G VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 38662,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 18- 200mm f/3.5-5.6G VR II",
            "brand": "Nikon",
            "category": "Lens",
            "price": 44204,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 35mm f/1.8G",
            "brand": "Nikon",
            "category": "Lens",
            "price": 27315,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 40mm f/2.8G Micro",
            "brand": "Nikon",
            "category": "Lens",
            "price": 33903,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 55- 200mm f/4- 5.6G VR II",
            "brand": "Nikon",
            "category": "Lens",
            "price": 44389,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-S DX 55- 300mm f/4.5-5.6G VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 43720,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-P DX 10- 20mm f/4.5- 5.6G VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 35924,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-P DX 18- 55mm f/3.5- 5.6G VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 22004,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon AF-P DX 70- 300mm f/4.5-6.3G VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 23154,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 14-24mm f/2.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 161885,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 14-30mm f/4 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 36911,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 17-28mm f/2.8",
            "brand": "Nikon",
            "category": "Lens",
            "price": 40299,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 20mm f/1.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 48849,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 24mm f/1.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 20908,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 24-50mm f/4-6.3",
            "brand": "Nikon",
            "category": "Lens",
            "price": 48072,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 24-70mm f/2.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 177936,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 24-70mm f/4 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 66204,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 24-120mm f/4 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 48981,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 28mm f/2.8",
            "brand": "Nikon",
            "category": "Lens",
            "price": 20631,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 35mm f/1.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 29169,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 40mm f/2",
            "brand": "Nikon",
            "category": "Lens",
            "price": 40221,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 50mm f/1.2 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 95106,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 50mm f/1.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 22556,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 70-200mm f/2.8 VR S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 116294,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 70-180mm f/2.8",
            "brand": "Nikon",
            "category": "Lens",
            "price": 43841,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 85mm f/1.2 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 140356,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 85mm f/1.8 S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 16744,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 100-400mm f/4.5-5.6 VR S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 34909,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 135mm f/1.8 S Plena",
            "brand": "Nikon",
            "category": "Lens",
            "price": 25445,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 400mm f/4.5 VR S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 26123,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 600mm f/4 TC VR S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 256820,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z 800mm f/6.3 PF VR S",
            "brand": "Nikon",
            "category": "Lens",
            "price": 187944,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z DX 12- 28mm f/3.5- 5.6 PZ VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 31055,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z DX 16- 50mm f/3.5- 6.3 VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 56708,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z DX 18- 140mm f/3.5-6.3 VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 46418,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z DX 24mm f/1.7",
            "brand": "Nikon",
            "category": "Lens",
            "price": 20058,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Nikon NIKKOR Z DX 50- 250mm f/4.5-6.3 VR",
            "brand": "Nikon",
            "category": "Lens",
            "price": 45452,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Nikon%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 50mm f/1.4 (A-Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 75685,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 50mm f/1.8(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 28785,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 85mm f/2.8 SAM(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 94227,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 100mm f/2.8 Macro(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 21146,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 135mm f/1.8 ZA(A-Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 20338,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 16-35mm f/2.8 ZA SSM(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 45821,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 24-70mm f/2.8 ZA SSM(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 175801,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 24-70mm f/2.8 ZA SSM II(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 134001,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 70-200mm f/2.8 G SSM II(A-Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 198590,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 70-300mm f/4.5-5.6 G SSM(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 37538,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 70-400mm f/4-5.6 G SSM II(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 45640,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony 300mm f/2.8 G SSM II(A- Mount)",
            "brand": "Sony",
            "category": "Lens",
            "price": 370760,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 10-18mm f/4 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 43431,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 11mm f/1.8",
            "brand": "Sony",
            "category": "Lens",
            "price": 22957,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 15mm f/1.4 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 24705,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 16mm f/2.8",
            "brand": "Sony",
            "category": "Lens",
            "price": 31103,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 16-50mm f/3.5-5.6 OSS PZ",
            "brand": "Sony",
            "category": "Lens",
            "price": 92914,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 16-55mm f/2.8 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 25788,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 18-55mm f/3.5-5.6 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 9914,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 18- 135mm f/3.5-5.6 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 72480,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 18- 200mm f/3.5-6.3 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 43655,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 20mm f/2.8",
            "brand": "Sony",
            "category": "Lens",
            "price": 35510,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 30mm f/3.5 Macro",
            "brand": "Sony",
            "category": "Lens",
            "price": 25115,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 35mm f/1.8 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 19208,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 50mm f/1.8 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 28150,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E 55- 210mm f/4.5-6.3 OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 29846,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E PZ 10- 20mm f/4 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 32319,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E PZ 18- 105mm f/4 G OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 44749,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony E PZ 18- 110mm f/4 G OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 33680,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 14mm f/1.8 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 29425,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 16- 35mm f/2.8 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 22845,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 24mm f/1.4 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 167927,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 24- 70mm f/2.8 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 25949,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 24- 70mm f/2.8 GM II",
            "brand": "Sony",
            "category": "Lens",
            "price": 27091,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 70- 200mm f/2.8 GM OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 195710,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 70- 200mm f/2.8 GM OSS II",
            "brand": "Sony",
            "category": "Lens",
            "price": 194791,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 100mm f/2.8 STF GM OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 127216,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 135mm f/1.8 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 12025,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 200- 600mm f/5.6-6.3 G OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 220506,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 300mm f/2.8 GM OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 209395,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 12- 24mm f/4 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 34951,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 20mm f/1.8 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 38523,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 24- 105mm f/4 G OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 49110,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 70- 300mm f/4.5-5.6 G OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 24866,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 28mm f/2",
            "brand": "Sony",
            "category": "Lens",
            "price": 40486,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 35mm f/1.4 ZA",
            "brand": "Sony",
            "category": "Lens",
            "price": 64839,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 35mm f/1.8",
            "brand": "Sony",
            "category": "Lens",
            "price": 17456,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 40mm f/2.5 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 24826,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 50mm f/1.2 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 122288,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 50mm f/1.4 ZA",
            "brand": "Sony",
            "category": "Lens",
            "price": 79263,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 50mm f/1.8",
            "brand": "Sony",
            "category": "Lens",
            "price": 24490,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 55mm f/1.8 ZA",
            "brand": "Sony",
            "category": "Lens",
            "price": 44212,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 85mm f/1.4 GM",
            "brand": "Sony",
            "category": "Lens",
            "price": 199170,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 85mm f/1.8",
            "brand": "Sony",
            "category": "Lens",
            "price": 23099,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 90mm f/2.8 Macro G OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 46507,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE 100- 400mm f/4.5-5.6 GM OSS",
            "brand": "Sony",
            "category": "Lens",
            "price": 138573,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE C 16- 35mm T3.1 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 94639,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE C 24- 105mm T4",
            "brand": "Sony",
            "category": "Lens",
            "price": 41327,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony G",
            "brand": "Sony",
            "category": "Lens",
            "price": 47822,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Sony FE C 85mm T2.0 G",
            "brand": "Sony",
            "category": "Lens",
            "price": 47484,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Sony%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 14mm f/2.8 R",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 41239,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 16mm f/1.4 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 34205,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 16mm f/2.8 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 33244,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 18mm f/1.4 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 27925,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 18mm f/2 R",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 39961,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 23mm f/1.4 R",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 46443,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 23mm f/1.4 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 49687,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 23mm f/2 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 27079,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 27mm f/2.8",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 47141,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 27mm",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 37740,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm f/2.8 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 35870,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 33mm f/1.4 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 25767,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 35mm f/1.4 R",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 85950,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 35mm f/2 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 12040,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 50mm f/1.0 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 56094,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 50mm f/2 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 23027,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 56mm f/1.2 R",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 155945,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 56mm f/1.2 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 92074,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 56mm f/1.2 R APD",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 132982,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 60mm f/2.4 Macro",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 22181,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 80mm f/2.8 Macro OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 43510,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 90mm f/2 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 43796,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 8-16mm f/2.8 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 36700,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 10- 24mm f/4 R OIS",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 25035,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 10- 24mm f/4 R OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 22961,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 16- 55mm f/2.8 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 26610,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 18- 55mm f/2.8- 4 R LM OIS",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 34333,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 16- 80mm f/4 R OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 49352,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 18- 120mm f/4 LM PZ WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 32102,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 70- 300mm f/4- 5.6 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 34472,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 50- 140mm f/2.8 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 47991,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 55- 200mm f/3.5-4.8 R LM OIS",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 45804,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 100- 400mm f/4.5-5.6 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 28262,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XF 150- 600mm f/5.6-8 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 348914,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XC 15- 45mm f/3.5- 5.6 OIS PZ",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 23142,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XC 16- 50mm f/3.5- 5.6 OIS II",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 55425,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XC 35mm f/2",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 27444,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm XC 50- 230mm f/4.5-6.7 OIS II",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 31569,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 23mm f/4 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 40192,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 30mm f/3.5 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 34412,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 45mm f/2.8 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 42369,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 50mm f/3.5 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 58560,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 55mm f/1.7 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 38133,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 63mm f/2.8 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 35306,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 80mm f/1.7 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 43331,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 110mm f/2 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 24691,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 120mm f/4 Macro R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 34601,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 250mm f/4 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 74268,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 20- 35mm f/4 R WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 57886,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 32- 64mm f/4 R LM WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 24186,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 45- 100mm f/4 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 48804,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        },
        {
            "name": "Fujifilm GF 100- 200mm f/5.6 R LM OIS WR",
            "brand": "Fujifilm",
            "category": "Lens",
            "price": 33092,
            "image": "https://via.placeholder.com/300x300/4ade80/ffffff?text=Fujifilm%20Lens",
            "type": "lens"
        }
    ]
};

/**
 * Function to upload products to Firestore
 * Use this in the browser console on your admin page or create a dedicated upload page
 */
async function uploadProductsToFirestore() {
    if (!window.firebase || !firebase.firestore) {
        console.error('Firebase not loaded. Please ensure Firebase is initialized.');
        return;
    }

    const db = firebase.firestore();
    const allProducts = [
        ...productData.samsung,
        ...productData.iphones,
        ...productData.macbooks,
        ...productData.cameras,
        ...productData.lenses
    ];

    console.log(`Starting upload of ${allProducts.length} products...`);

    let successCount = 0;
    let errorCount = 0;

    for (const product of allProducts) {
        try {
            await db.collection('products').add(product);
            successCount++;
            console.log(`✓ Added: ${product.name}`);
        } catch (error) {
            errorCount++;
            console.error(`✗ Failed to add ${product.name}:`, error);
        }
    }

    console.log(`\nUpload complete!`);
    console.log(`Success: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Total: ${allProducts.length}`);
}

/**
 * Function to get product count by category
 */
function getProductStats() {
    return {
        samsung: productData.samsung.length,
        iphones: productData.iphones.length,
        macbooks: productData.macbooks.length,
        cameras: productData.cameras.length,
        lenses: productData.lenses.length,
        total: productData.samsung.length + productData.iphones.length + productData.macbooks.length + productData.cameras.length + productData.lenses.length
    };
}

// Export for use
window.productData = productData;
window.uploadProductsToFirestore = uploadProductsToFirestore;
window.getProductStats = getProductStats;

console.log('Product data loaded:', getProductStats());

