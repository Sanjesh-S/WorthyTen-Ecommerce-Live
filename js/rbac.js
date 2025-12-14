// js/rbac.js - Role-Based Access Control Module

/**
 * Role definitions and permission mappings for the admin dashboard
 */

const RBAC = {
    // Role constants
    ROLES: {
        SUPER_ADMIN: 'superadmin',
        MANAGER: 'manager',
        STAFF: 'staff'
    },

    // Permission definitions
    PERMISSIONS: {
        VIEW_PICKUPS: 'view_pickups',
        MANAGE_PICKUPS: 'manage_pickups',
        VIEW_PRODUCTS: 'view_products',
        ADD_EDIT_PRODUCTS: 'add_edit_products',
        DELETE_PRODUCTS: 'delete_products',
        VIEW_ANALYTICS: 'view_analytics',
        MANAGE_USERS: 'manage_users'
    },

    // Role-Permission mapping
    rolePermissions: {
        superadmin: [
            'view_pickups',
            'manage_pickups',
            'view_products',
            'add_edit_products',
            'delete_products',
            'view_analytics',
            'manage_users'
        ],
        manager: [
            'view_pickups',
            'manage_pickups',
            'view_products',
            'add_edit_products',
            'view_analytics'
        ],
        staff: [
            'view_pickups',
            'manage_pickups',
            'view_products'
        ]
    },

    // Current user data (cached)
    currentUser: null,
    currentRole: null,

    /**
     * Initialize RBAC system for the current user
     * @param {Object} user - Firebase user object
     * @returns {Promise<Object>} User data with role
     */
    async initialize(user) {
        if (!user) {
            this.currentUser = null;
            this.currentRole = null;
            return null;
        }

        try {
            const db = firebase.firestore();
            const userDoc = await db.collection('staffUsers').doc(user.uid).get();

            if (!userDoc.exists) {
                throw new Error('User not found in staff database');
            }

            const userData = userDoc.data();
            
            if (!userData.isActive) {
                throw new Error('User account is inactive');
            }

            this.currentUser = {
                uid: user.uid,
                email: user.email,
                ...userData
            };
            this.currentRole = userData.role;

            // Update last login
            await db.collection('staffUsers').doc(user.uid).update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });

            if (window.Logger) {
                window.Logger.log(`RBAC initialized for ${user.email} with role: ${userData.role}`);
            }

            return this.currentUser;
        } catch (error) {
            if (window.Logger) {
                window.Logger.error('RBAC initialization error:', error);
            }
            throw error;
        }
    },

    /**
     * Get current user data
     * @returns {Object|null} Current user data
     */
    getCurrentUser() {
        return this.currentUser;
    },

    /**
     * Get current user role
     * @returns {string|null} Current user role
     */
    getCurrentRole() {
        return this.currentRole;
    },

    /**
     * Check if current user has a specific permission
     * @param {string} permission - Permission to check
     * @returns {boolean} True if user has permission
     */
    hasPermission(permission) {
        if (!this.currentRole) {
            return false;
        }

        const permissions = this.rolePermissions[this.currentRole];
        return permissions && permissions.includes(permission);
    },

    /**
     * Check if current user has a specific role
     * @param {string} role - Role to check
     * @returns {boolean} True if user has role
     */
    hasRole(role) {
        return this.currentRole === role;
    },

    /**
     * Check if current user is Super Admin
     * @returns {boolean}
     */
    isSuperAdmin() {
        return this.hasRole(this.ROLES.SUPER_ADMIN);
    },

    /**
     * Check if current user is Manager
     * @returns {boolean}
     */
    isManager() {
        return this.hasRole(this.ROLES.MANAGER);
    },

    /**
     * Check if current user is Staff
     * @returns {boolean}
     */
    isStaff() {
        return this.hasRole(this.ROLES.STAFF);
    },

    /**
     * Permission check methods for specific features
     */
    canViewPickups() {
        return this.hasPermission(this.PERMISSIONS.VIEW_PICKUPS);
    },

    canManagePickups() {
        return this.hasPermission(this.PERMISSIONS.MANAGE_PICKUPS);
    },

    canViewProducts() {
        return this.hasPermission(this.PERMISSIONS.VIEW_PRODUCTS);
    },

    canAddEditProducts() {
        return this.hasPermission(this.PERMISSIONS.ADD_EDIT_PRODUCTS);
    },

    canDeleteProducts() {
        return this.hasPermission(this.PERMISSIONS.DELETE_PRODUCTS);
    },

    canViewAnalytics() {
        return this.hasPermission(this.PERMISSIONS.VIEW_ANALYTICS);
    },

    canManageUsers() {
        return this.hasPermission(this.PERMISSIONS.MANAGE_USERS);
    },

    /**
     * UI Helper: Show/hide element based on permission
     * @param {string|HTMLElement} element - Element or selector
     * @param {string} permission - Required permission
     */
    showIfHasPermission(element, permission) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
            el.style.display = this.hasPermission(permission) ? '' : 'none';
        }
    },

    /**
     * UI Helper: Enable/disable element based on permission
     * @param {string|HTMLElement} element - Element or selector
     * @param {string} permission - Required permission
     */
    enableIfHasPermission(element, permission) {
        const el = typeof element === 'string' ? document.querySelector(element) : element;
        if (el) {
            el.disabled = !this.hasPermission(permission);
        }
    },

    /**
     * Get role display name
     * @param {string} role - Role key
     * @returns {string} Display name
     */
    getRoleDisplayName(role) {
        const displayNames = {
            superadmin: 'Super Admin',
            manager: 'Manager',
            staff: 'Staff'
        };
        return displayNames[role] || role;
    },

    /**
     * Get role badge HTML
     * @param {string} role - Role key
     * @returns {string} HTML for role badge
     */
    getRoleBadgeHTML(role) {
        const colors = {
            superadmin: '#dc2626', // Red
            manager: '#2563eb', // Blue
            staff: '#16a34a' // Green
        };
        const color = colors[role] || '#6b7280';
        const displayName = this.getRoleDisplayName(role);
        
        return `<span class="role-badge" style="background: ${color}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">${displayName}</span>`;
    },

    /**
     * Clear current user data (on logout)
     */
    clear() {
        this.currentUser = null;
        this.currentRole = null;
        if (window.Logger) {
            window.Logger.log('RBAC data cleared');
        }
    }
};

// Make RBAC available globally
window.RBAC = RBAC;





