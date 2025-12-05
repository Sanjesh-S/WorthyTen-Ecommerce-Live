// js/user-management.js - User Management Module for RBAC

/**
 * User Management functionality for creating, updating, and deleting staff users
 */

const UserManagement = {
    db: null,
    unsubscribeUsers: null,

    /**
     * Initialize user management module
     */
    init() {
        this.db = firebase.firestore();
        this.setupFormListener();
    },

    /**
     * Setup form submission listener for creating new users
     */
    setupFormListener() {
        const userForm = document.getElementById('user-form');
        const saveUserBtn = document.getElementById('save-user-btn');
        const userFormStatus = document.getElementById('user-form-status');

        if (!userForm) return;

        userForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('user-email').value.trim();
            const password = document.getElementById('user-password').value;
            const displayName = document.getElementById('user-displayname').value.trim();
            const role = document.getElementById('user-role').value;

            if (!email || !password || !displayName || !role) {
                this.showFormStatus(userFormStatus, 'Please fill in all fields', 'error');
                return;
            }

            if (password.length < 6) {
                this.showFormStatus(userFormStatus, 'Password must be at least 6 characters', 'error');
                return;
            }

            // Check permission
            if (!window.RBAC || !window.RBAC.canManageUsers()) {
                this.showFormStatus(userFormStatus, 'You do not have permission to create users', 'error');
                return;
            }

            saveUserBtn.disabled = true;
            saveUserBtn.textContent = 'Creating...';
            userFormStatus.style.display = 'none';

            try {
                await this.createUser(email, password, displayName, role);
                this.showFormStatus(userFormStatus, 'User created successfully!', 'success');
                userForm.reset();
            } catch (error) {
                if (window.Logger) {
                    window.Logger.error('Error creating user:', error);
                }
                this.showFormStatus(userFormStatus, error.message || 'Failed to create user', 'error');
            } finally {
                saveUserBtn.disabled = false;
                saveUserBtn.textContent = 'Create User';
            }
        });
    },

    /**
     * Create a new staff user
     * @param {string} email - User email
     * @param {string} password - User password
     * @param {string} displayName - User display name
     * @param {string} role - User role (superadmin, manager, staff)
     */
    async createUser(email, password, displayName, role) {
        try {
            // Create Firebase Auth user using secondary app to avoid signing out current user
            const secondaryApp = firebase.initializeApp(
                firebase.app().options,
                'Secondary-' + Date.now()
            );
            
            const userCredential = await secondaryApp.auth().createUserWithEmailAndPassword(email, password);
            const newUser = userCredential.user;

            // Create Firestore document for the new user
            const currentUser = window.RBAC.getCurrentUser();
            await this.db.collection('staffUsers').doc(newUser.uid).set({
                uid: newUser.uid,
                email: email,
                displayName: displayName,
                role: role,
                isActive: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: currentUser ? currentUser.uid : 'system',
                lastLogin: null
            });

            // Sign out from secondary app and delete it
            await secondaryApp.auth().signOut();
            await secondaryApp.delete();

            if (window.Logger) {
                window.Logger.log(`User created: ${email} with role ${role}`);
            }

            return newUser.uid;
        } catch (error) {
            if (window.Logger) {
                window.Logger.error('Create user error:', error);
            }
            
            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('This email is already registered');
            } else if (error.code === 'auth/invalid-email') {
                throw new Error('Invalid email address');
            } else if (error.code === 'auth/weak-password') {
                throw new Error('Password is too weak');
            } else {
                throw error;
            }
        }
    },

    /**
     * Load and display all staff users
     */
    loadUsers() {
        const userListBody = document.getElementById('user-list-body');
        
        if (!userListBody) return;

        // Unsubscribe from previous listener if exists
        if (this.unsubscribeUsers) {
            this.unsubscribeUsers();
        }

        // Set up real-time listener
        this.unsubscribeUsers = this.db.collection('staffUsers')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                if (snapshot.empty) {
                    userListBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No users found</td></tr>';
                    return;
                }

                userListBody.innerHTML = '';
                snapshot.forEach((doc) => {
                    const user = doc.data();
                    const row = this.createUserRow(doc.id, user);
                    userListBody.appendChild(row);
                });
            }, (error) => {
                if (window.Logger) {
                    window.Logger.error('Error loading users:', error);
                }
                userListBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: red;">Error loading users</td></tr>';
            });
    },

    /**
     * Create a table row for a user
     * @param {string} userId - User ID
     * @param {Object} userData - User data
     * @returns {HTMLTableRowElement}
     */
    createUserRow(userId, userData) {
        const row = document.createElement('tr');
        
        // Email
        const emailCell = document.createElement('td');
        emailCell.textContent = userData.email || 'N/A';
        row.appendChild(emailCell);

        // Display Name
        const nameCell = document.createElement('td');
        nameCell.textContent = userData.displayName || 'N/A';
        row.appendChild(nameCell);

        // Role
        const roleCell = document.createElement('td');
        if (window.RBAC) {
            roleCell.innerHTML = window.RBAC.getRoleBadgeHTML(userData.role);
        } else {
            roleCell.textContent = userData.role || 'N/A';
        }
        row.appendChild(roleCell);

        // Status
        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = 'status-badge';
        statusBadge.textContent = userData.isActive ? 'Active' : 'Inactive';
        statusBadge.style.background = userData.isActive ? '#d1fae5' : '#e5e7eb';
        statusBadge.style.color = userData.isActive ? '#065f46' : '#374151';
        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        // Last Login
        const lastLoginCell = document.createElement('td');
        if (userData.lastLogin) {
            const date = userData.lastLogin.toDate();
            lastLoginCell.textContent = date.toLocaleString();
        } else {
            lastLoginCell.textContent = 'Never';
            lastLoginCell.style.color = '#999';
        }
        row.appendChild(lastLoginCell);

        // Actions
        const actionsCell = document.createElement('td');
        actionsCell.className = 'action-buttons';

        // Check if user can manage other users
        const canManage = window.RBAC && window.RBAC.canManageUsers();
        const currentUserId = window.RBAC && window.RBAC.getCurrentUser() ? window.RBAC.getCurrentUser().uid : null;
        
        // Don't allow users to edit/delete themselves
        const isSelf = currentUserId === userId;

        if (canManage && !isSelf) {
            // Toggle Active/Inactive button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'action-btn-sm ' + (userData.isActive ? 'btn-hold' : 'btn-reopen');
            toggleBtn.textContent = userData.isActive ? 'Deactivate' : 'Activate';
            toggleBtn.onclick = () => this.toggleUserStatus(userId, !userData.isActive);
            actionsCell.appendChild(toggleBtn);

            // Change Role button
            const changeRoleBtn = document.createElement('button');
            changeRoleBtn.className = 'action-btn-sm btn-complete';
            changeRoleBtn.textContent = 'Change Role';
            changeRoleBtn.onclick = () => this.showChangeRoleDialog(userId, userData);
            actionsCell.appendChild(changeRoleBtn);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn-sm btn-suspect';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => this.deleteUser(userId, userData.email);
            actionsCell.appendChild(deleteBtn);
        } else if (isSelf) {
            actionsCell.innerHTML = '<span style="color: #999; font-size: 13px;">Current User</span>';
        } else {
            actionsCell.innerHTML = '<span style="color: #999; font-size: 13px;">No Actions</span>';
        }

        row.appendChild(actionsCell);

        return row;
    },

    /**
     * Toggle user active status
     * @param {string} userId - User ID
     * @param {boolean} newStatus - New active status
     */
    async toggleUserStatus(userId, newStatus) {
        try {
            await this.db.collection('staffUsers').doc(userId).update({
                isActive: newStatus
            });
            
            if (window.Logger) {
                window.Logger.log(`User ${userId} status changed to ${newStatus}`);
            }
        } catch (error) {
            if (window.Logger) {
                window.Logger.error('Error toggling user status:', error);
            }
            alert('Failed to update user status: ' + error.message);
        }
    },

    /**
     * Show dialog to change user role
     * @param {string} userId - User ID
     * @param {Object} userData - User data
     */
    showChangeRoleDialog(userId, userData) {
        const newRole = prompt(
            `Change role for ${userData.email}\n\nCurrent role: ${userData.role}\n\nEnter new role (superadmin, manager, or staff):`,
            userData.role
        );

        if (newRole && ['superadmin', 'manager', 'staff'].includes(newRole.toLowerCase())) {
            this.changeUserRole(userId, newRole.toLowerCase());
        } else if (newRole) {
            alert('Invalid role. Please enter: superadmin, manager, or staff');
        }
    },

    /**
     * Change user role
     * @param {string} userId - User ID
     * @param {string} newRole - New role
     */
    async changeUserRole(userId, newRole) {
        try {
            await this.db.collection('staffUsers').doc(userId).update({
                role: newRole
            });
            
            if (window.Logger) {
                window.Logger.log(`User ${userId} role changed to ${newRole}`);
            }
            alert('Role updated successfully!');
        } catch (error) {
            if (window.Logger) {
                window.Logger.error('Error changing user role:', error);
            }
            alert('Failed to update role: ' + error.message);
        }
    },

    /**
     * Delete a user
     * @param {string} userId - User ID
     * @param {string} userEmail - User email for confirmation
     */
    async deleteUser(userId, userEmail) {
        const confirmation = confirm(
            `Are you sure you want to delete user: ${userEmail}?\n\n` +
            `This will remove them from the staff database, but their Firebase Auth account will remain.\n\n` +
            `To fully delete the account, you'll need to do so from the Firebase Console.`
        );

        if (!confirmation) return;

        try {
            await this.db.collection('staffUsers').doc(userId).delete();
            
            if (window.Logger) {
                window.Logger.log(`User ${userId} deleted from staff database`);
            }
            alert('User removed from staff database successfully!');
        } catch (error) {
            if (window.Logger) {
                window.Logger.error('Error deleting user:', error);
            }
            alert('Failed to delete user: ' + error.message);
        }
    },

    /**
     * Show form status message
     * @param {HTMLElement} element - Status element
     * @param {string} message - Message to display
     * @param {string} type - Message type (success or error)
     */
    showFormStatus(element, message, type) {
        if (!element) return;
        
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = type === 'success' ? 'var(--ok)' : 'var(--danger)';
        
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        }
    },

    /**
     * Cleanup listeners
     */
    cleanup() {
        if (this.unsubscribeUsers) {
            this.unsubscribeUsers();
            this.unsubscribeUsers = null;
        }
    }
};

// Make UserManagement available globally
window.UserManagement = UserManagement;





