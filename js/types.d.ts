/**
 * Type definitions for WorthyTen
 * Shared interfaces and types for the application
 */

// ============ Product Types ============

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: ProductCategory;
    price: number;
    image?: string;
    subcategory?: string;
    baseModel?: string;
    variant?: string;
    variants?: string[];
    variantsWithPrices?: VariantWithPrice[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface VariantWithPrice {
    variant: string;
    price: number;
}

export type ProductCategory =
    | 'Phone'
    | 'Laptop'
    | 'iPad'
    | 'DSLR/Lens'
    | 'Tablet'
    | 'Console';

// ============ User Types ============

export interface User {
    uid: string;
    email?: string;
    phoneNumber?: string;
    displayName?: string;
    isActive: boolean;
}

export interface StaffUser extends User {
    role: StaffRole;
    permissions: string[];
    createdAt: Date;
}

export type StaffRole = 'superadmin' | 'manager' | 'staff';

// ============ Pickup Request Types ============

export interface PickupRequest {
    id: string;
    userId: string;
    productName: string;
    productBrand: string;
    productCategory: string;
    quotedPrice: number;
    finalPrice?: number;
    status: PickupStatus;
    condition: DeviceCondition;
    pickupAddress: Address;
    scheduledDate?: Date;
    completedDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type PickupStatus =
    | 'pending'
    | 'confirmed'
    | 'picked_up'
    | 'inspected'
    | 'paid'
    | 'cancelled';

export interface DeviceCondition {
    screenCondition: 'perfect' | 'minor_scratches' | 'major_scratches' | 'cracked';
    bodyCondition: 'perfect' | 'minor_scratches' | 'dents' | 'major_damage';
    battery?: number;
    functional: {
        touchscreen: boolean;
        buttons: boolean;
        speakers: boolean;
        camera: boolean;
        wifi: boolean;
        charging: boolean;
    };
    accessories: {
        box: boolean;
        charger: boolean;
        earphones: boolean;
    };
}

export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
}

// ============ UI State Types ============

export interface AppState {
    currentCategory: string | null;
    currentBrand: string | null;
    currentProductType: string | null;
    productsLoaded: boolean;
    allProducts: Product[];
}

// ============ Logger Types ============

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
    debug: (message: string, ...args: unknown[]) => void;
    info: (message: string, ...args: unknown[]) => void;
    warn: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
}

// ============ Global Window Extensions ============

declare global {
    interface Window {
        firebase: typeof import('firebase/compat/app').default;
        Logger: Logger;
        SkeletonUI: {
            showSkeleton: (container: HTMLElement, count: number, type: string) => void;
            clearSkeleton: (container: HTMLElement) => void;
            createSpinner: (size: string, text: string) => string;
            showOverlay: (container: HTMLElement, text: string) => HTMLElement;
            hideOverlay: (container: HTMLElement) => void;
        };
        LazyLoader: {
            loadedModules: Map<string, unknown>;
            preloadImages: (urls: string[]) => Promise<PromiseSettledResult<string>[]>;
            createObserver: (callback: (target: Element) => void, options?: IntersectionObserverInit) => IntersectionObserver;
        };
        ProgressIndicator: {
            steps: string[];
            currentStep: number;
            create: (containerId: string) => void;
            setStep: (stepIndex: number) => void;
            detectStep: () => number;
        };
        supportsVariants: (category: string) => boolean;
    }
}

export { };
