// js/variant-config.js
// Variant configuration for devices (Storage, RAM, etc.)

const variantConfig = {
  Phone: {
    // Storage options for phones
    storage: [
      { value: '64GB', label: '64 GB', priceMultiplier: 0.85 },
      { value: '128GB', label: '128 GB', priceMultiplier: 1.0 },
      { value: '256GB', label: '256 GB', priceMultiplier: 1.15 },
      { value: '512GB', label: '512 GB', priceMultiplier: 1.30 },
      { value: '1TB', label: '1 TB', priceMultiplier: 1.50 },
      { value: '2TB', label: '2 TB', priceMultiplier: 1.70 }
    ],

    // RAM options for phones (model-specific defaults)
    ram: {
      // iPhone 16 Series
      'iPhone 16 Pro Max': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 16 Pro': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 16 Plus': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 16': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],

      // iPhone 15 Series
      'iPhone 15 Pro Max': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 15 Pro': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone 15 Plus': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 15': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],

      // iPhone 14 Series
      'iPhone 14 Pro Max': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14 Pro': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14 Plus': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 14': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],

      // iPhone 13 Series
      'iPhone 13 Pro Max': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 13 Pro': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 13': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 13 Mini': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],

      // iPhone 12 Series
      'iPhone 12 Pro Max': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 12 Pro': [{ value: '6GB', label: '6 GB', priceMultiplier: 1.0 }],
      'iPhone 12': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 12 Mini': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],

      // iPhone 11 Series
      'iPhone 11 Pro Max': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 11 Pro': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone 11': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],

      // iPhone XS/XR/X Series
      'iPhone XS Max': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone XS': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone XR': [{ value: '3GB', label: '3 GB', priceMultiplier: 1.0 }],
      'iPhone X': [{ value: '3GB', label: '3 GB', priceMultiplier: 1.0 }],

      // iPhone 8 Series
      'iPhone 8 Plus': [{ value: '3GB', label: '3 GB', priceMultiplier: 1.0 }],
      'iPhone 8': [{ value: '2GB', label: '2 GB', priceMultiplier: 1.0 }],

      // iPhone 7 Series
      'iPhone 7 Plus': [{ value: '3GB', label: '3 GB', priceMultiplier: 1.0 }],
      'iPhone 7': [{ value: '2GB', label: '2 GB', priceMultiplier: 1.0 }],

      // iPhone SE Series
      'iPhone SE 2024': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'iPhone SE 2022': [{ value: '4GB', label: '4 GB', priceMultiplier: 1.0 }],
      'iPhone SE 2020': [{ value: '3GB', label: '3 GB', priceMultiplier: 1.0 }],
      'iPhone SE': [{ value: '2GB', label: '2 GB', priceMultiplier: 1.0 }],

      // iPhone 6S Series
      'iPhone 6S Plus': [{ value: '2GB', label: '2 GB', priceMultiplier: 1.0 }],
      'iPhone 6S': [{ value: '2GB', label: '2 GB', priceMultiplier: 1.0 }],

      // Samsung Galaxy S Series
      'Samsung Galaxy S24 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S24+': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S24': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S23 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S23+': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S23': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S22 Ultra': [{ value: '8GB', label: '8 GB', priceMultiplier: 0.95 }, { value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S22+': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S22': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S21 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 0.95 }, { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S21+': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S21': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S21 FE': [{ value: '6GB', label: '6 GB', priceMultiplier: 0.95 }, { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S20 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 0.95 }, { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S20+': [{ value: '8GB', label: '8 GB', priceMultiplier: 0.95 }, { value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S20': [{ value: '8GB', label: '8 GB', priceMultiplier: 0.95 }, { value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy S20 FE': [{ value: '6GB', label: '6 GB', priceMultiplier: 0.95 }, { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],

      // Samsung Galaxy Z Fold Series
      'Samsung Galaxy Z Fold 5': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Z Fold 4': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Z Fold 3': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Z Fold 2': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Fold': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],

      // Samsung Galaxy Z Flip Series
      'Samsung Galaxy Z Flip 5': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Z Flip 4': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Z Flip 3': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Z Flip': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],

      // Samsung Galaxy A Series
      'Samsung Galaxy A54': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy A53': [{ value: '6GB', label: '6 GB', priceMultiplier: 0.95 }, { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy A52': [{ value: '6GB', label: '6 GB', priceMultiplier: 0.95 }, { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy A34': [{ value: '6GB', label: '6 GB', priceMultiplier: 0.95 }, { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy A33': [{ value: '6GB', label: '6 GB', priceMultiplier: 0.95 }, { value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],

      // Samsung Galaxy Note Series
      'Samsung Galaxy Note 20 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Note 20': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Note 10+': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Samsung Galaxy Note 10': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],

      // Short name aliases (without Samsung prefix)
      'Galaxy S24 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Galaxy S24+': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Galaxy S24': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Galaxy S23 Ultra': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Galaxy Z Flip 5': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Galaxy Z Flip 4': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Galaxy Z Flip 3': [{ value: '8GB', label: '8 GB', priceMultiplier: 1.0 }],
      'Galaxy Z Fold 5': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Galaxy Z Fold 4': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],
      'Galaxy Z Fold 3': [{ value: '12GB', label: '12 GB', priceMultiplier: 1.0 }],

      // Default for phones - EMPTY to not show RAM for unknown models
      default: []
    }
  },

  Laptop: {
    // Storage options for laptops
    storage: [
      { value: '128GB', label: '128 GB', priceMultiplier: 0.70 },
      { value: '256GB', label: '256 GB', priceMultiplier: 0.85 },
      { value: '512GB', label: '512 GB', priceMultiplier: 1.0 },
      { value: '1TB', label: '1 TB', priceMultiplier: 1.15 },
      { value: '2TB', label: '2 TB', priceMultiplier: 1.35 },
      { value: '4TB', label: '4 TB', priceMultiplier: 1.60 },
      { value: '8TB', label: '8 TB', priceMultiplier: 2.0 }
    ],

    // RAM options for laptops
    ram: {
      // MacBook Air - M3 (2024)
      'MacBook Air M3 2024': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Air M3 15': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Air M3': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],

      // MacBook Air - M2 (2022-2023)
      'MacBook Air M2 2023': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Air M2 2022': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Air M2': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],

      // MacBook Air - M1 (2020)
      'MacBook Air M1 2020': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Air M1': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],

      // MacBook Air - Intel (2018-2020)
      'MacBook Air 2020': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Air 2019': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Air 2018': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],

      // MacBook Pro 16" - M3 (2023-2024)
      'MacBook Pro 16 M3 Max': [
        { value: '36GB', label: '36 GB', priceMultiplier: 0.90 },
        { value: '48GB', label: '48 GB', priceMultiplier: 0.95 },
        { value: '128GB', label: '128 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 16 M3 Pro': [
        { value: '18GB', label: '18 GB', priceMultiplier: 0.95 },
        { value: '36GB', label: '36 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 16 M3': [
        { value: '18GB', label: '18 GB', priceMultiplier: 0.95 },
        { value: '36GB', label: '36 GB', priceMultiplier: 1.0 },
        { value: '48GB', label: '48 GB', priceMultiplier: 1.10 },
        { value: '128GB', label: '128 GB', priceMultiplier: 1.30 }
      ],

      // MacBook Pro 16" - M2 (2023)
      'MacBook Pro 16 M2 Max': [
        { value: '32GB', label: '32 GB', priceMultiplier: 0.90 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.0 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.15 }
      ],
      'MacBook Pro 16 M2 Pro': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 16 M2': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.90 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.15 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.30 }
      ],

      // MacBook Pro 16" - M1 (2021)
      'MacBook Pro 16 M1 Max': [
        { value: '32GB', label: '32 GB', priceMultiplier: 0.90 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 16 M1 Pro': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 16 2021': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.90 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 }
      ],

      // MacBook Pro 16" - Intel (2019)
      'MacBook Pro 16 2019': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.90 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 }
      ],

      // MacBook Pro 14" - M3 (2023-2024)
      'MacBook Pro 14 M3 Max': [
        { value: '36GB', label: '36 GB', priceMultiplier: 0.90 },
        { value: '48GB', label: '48 GB', priceMultiplier: 0.95 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.0 },
        { value: '128GB', label: '128 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Pro 14 M3 Pro': [
        { value: '18GB', label: '18 GB', priceMultiplier: 0.95 },
        { value: '36GB', label: '36 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 14 M3': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.85 },
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.0 }
      ],

      // MacBook Pro 14" - M2 (2023)
      'MacBook Pro 14 M2 Max': [
        { value: '32GB', label: '32 GB', priceMultiplier: 0.90 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.0 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.15 }
      ],
      'MacBook Pro 14 M2 Pro': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 14 M2': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.40 }
      ],

      // MacBook Pro 14" - M1 (2021)
      'MacBook Pro 14 M1 Max': [
        { value: '32GB', label: '32 GB', priceMultiplier: 0.90 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 14 M1 Pro': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 14 2021': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 }
      ],

      // MacBook Pro 13" - M2 (2022)
      'MacBook Pro 13 M2': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],
      'MacBook Pro 13 M2 2022': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '24GB', label: '24 GB', priceMultiplier: 1.10 }
      ],

      // MacBook Pro 13" - M1 (2020)
      'MacBook Pro 13 M1': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 13 M1 2020': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],

      // MacBook Pro 13" - Intel (2016-2020)
      'MacBook Pro 13 2020': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.15 }
      ],
      'MacBook Pro 13 2019': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 13 2018': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'MacBook Pro 13 2017': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],

      // Generic fallback patterns
      'MacBook Pro 13': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.15 }
      ],
      'MacBook Pro 14': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.95 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.40 }
      ],
      'MacBook Pro 16': [
        { value: '16GB', label: '16 GB', priceMultiplier: 0.90 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.0 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.20 },
        { value: '96GB', label: '96 GB', priceMultiplier: 1.40 },
        { value: '128GB', label: '128 GB', priceMultiplier: 1.60 }
      ],

      // Default for laptops
      default: [
        { value: '4GB', label: '4 GB', priceMultiplier: 0.75 },
        { value: '8GB', label: '8 GB', priceMultiplier: 0.90 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 },
        { value: '32GB', label: '32 GB', priceMultiplier: 1.15 },
        { value: '64GB', label: '64 GB', priceMultiplier: 1.35 }
      ]
    }
  },

  iPad: {
    // Storage options for iPads
    storage: [
      { value: '32GB', label: '32 GB', priceMultiplier: 0.75 },
      { value: '64GB', label: '64 GB', priceMultiplier: 0.85 },
      { value: '128GB', label: '128 GB', priceMultiplier: 0.95 },
      { value: '256GB', label: '256 GB', priceMultiplier: 1.0 },
      { value: '512GB', label: '512 GB', priceMultiplier: 1.15 },
      { value: '1TB', label: '1 TB', priceMultiplier: 1.35 },
      { value: '2TB', label: '2 TB', priceMultiplier: 1.60 }
    ],

    // RAM for iPads
    ram: {
      // iPad Pro 12.9" - All generations (M4, M2, M1)
      'iPad Pro 12.9 M4': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9 M2': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9 M1': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9 2022': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9 2021': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9 2020': [
        { value: '6GB', label: '6 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9 2018': [
        { value: '4GB', label: '4 GB', priceMultiplier: 0.95 },
        { value: '6GB', label: '6 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 12.9': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],

      // iPad Pro 11" - All generations
      'iPad Pro 11 M4': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11 M2': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11 M1': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11 2022': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11 2021': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11 2020': [
        { value: '6GB', label: '6 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11 2018': [
        { value: '4GB', label: '4 GB', priceMultiplier: 0.95 },
        { value: '6GB', label: '6 GB', priceMultiplier: 1.0 }
      ],
      'iPad Pro 11': [
        { value: '8GB', label: '8 GB', priceMultiplier: 0.95 },
        { value: '16GB', label: '16 GB', priceMultiplier: 1.0 }
      ],

      // iPad Air - All generations (no visible RAM selection)
      'iPad Air M2 2024': [],
      'iPad Air M1 2022': [],
      'iPad Air 2022': [],
      'iPad Air 2020': [],
      'iPad Air 2019': [],
      'iPad Air': [],

      // iPad Mini - All generations (no visible RAM selection)
      'iPad Mini 2024': [],
      'iPad Mini 2021': [],
      'iPad Mini 2019': [],
      'iPad Mini': [],

      // iPad standard - All generations (no visible RAM selection)
      'iPad 10th Gen 2022': [],
      'iPad 9th Gen 2021': [],
      'iPad 8th Gen 2020': [],
      'iPad 7th Gen 2019': [],
      'iPad 2022': [],
      'iPad 2021': [],
      'iPad 2020': [],
      'iPad 2019': [],

      // Default: no RAM selection for standard iPads
      default: []
    }
  }
};

/**
 * Get storage variants for a category
 * @param {string} category - Device category (Phone, Laptop, iPad)
 * @returns {Array} Array of storage variant objects
 */
function getStorageVariants(category) {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return variantConfig[normalizedCategory]?.storage || [];
}

/**
 * Get RAM variants for a device
 * @param {string} category - Device category
 * @param {string} modelName - Specific model name
 * @returns {Array} Array of RAM variant objects
 */
function getRAMVariants(category, modelName) {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const ramConfig = variantConfig[normalizedCategory]?.ram;

  if (!ramConfig) return [];
  if (!modelName) return ramConfig.default || [];

  // First, try exact match
  if (ramConfig[modelName]) {
    return ramConfig[modelName];
  }

  // Try case-insensitive match
  const modelLower = modelName.toLowerCase();
  for (const [modelPattern, ramOptions] of Object.entries(ramConfig)) {
    if (modelPattern === 'default') continue;
    if (modelPattern.toLowerCase() === modelLower) {
      return ramOptions;
    }
  }

  // Try partial match (model name contains pattern or pattern contains model name)
  for (const [modelPattern, ramOptions] of Object.entries(ramConfig)) {
    if (modelPattern === 'default') continue;

    const patternLower = modelPattern.toLowerCase();
    if (modelLower.includes(patternLower) || patternLower.includes(modelLower)) {
      return ramOptions;
    }
  }

  // Return default RAM options (empty array for unknown models)
  return ramConfig.default || [];
}

/**
 * Check if category supports variants
 * @param {string} category - Device category
 * @returns {boolean} True if category supports variant selection
 */
function supportsVariants(category) {
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return ['Phone', 'Laptop', 'Ipad'].includes(normalizedCategory);
}

/**
 * Calculate adjusted price based on variant selections
 * @param {number} basePrice - Base price of the device
 * @param {Object} variants - Object with storage and ram values
 * @param {string} category - Device category
 * @param {string} modelName - Model name
 * @returns {number} Adjusted price
 */
function calculateVariantPrice(basePrice, variants, category, modelName) {
  if (!basePrice || !variants) return basePrice;

  let finalPrice = basePrice;

  // Apply storage multiplier
  if (variants.storage) {
    const storageOptions = getStorageVariants(category);
    const storageVariant = storageOptions.find(s => s.value === variants.storage);
    if (storageVariant) {
      finalPrice *= storageVariant.priceMultiplier;
    }
  }

  // Apply RAM multiplier
  if (variants.ram) {
    const ramOptions = getRAMVariants(category, modelName);
    const ramVariant = ramOptions.find(r => r.value === variants.ram);
    if (ramVariant) {
      finalPrice *= ramVariant.priceMultiplier;
    }
  }

  return Math.round(finalPrice);
}

/**
 * Format variant display text
 * @param {Object} variants - Variant object with storage and ram
 * @returns {string} Formatted text like "(256GB / 8GB)" or "(512GB)"
 */
function formatVariantDisplay(variants) {
  if (!variants) return '';

  const parts = [];
  if (variants.storage) parts.push(variants.storage);
  if (variants.ram) parts.push(variants.ram);

  return parts.length > 0 ? `(${parts.join(' / ')})` : '';
}

// Export functions globally
window.variantConfig = variantConfig;
window.getStorageVariants = getStorageVariants;
window.getRAMVariants = getRAMVariants;
window.supportsVariants = supportsVariants;
window.calculateVariantPrice = calculateVariantPrice;
window.formatVariantDisplay = formatVariantDisplay;

console.log('✅ Variant configuration loaded for:', Object.keys(variantConfig).join(', '));

