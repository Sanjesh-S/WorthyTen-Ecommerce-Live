/**
 * Reusable Modal Component
 * @file js/components/modal.js
 */

class Modal {
    constructor(options = {}) {
        this.id = options.id || 'modal-' + Date.now();
        this.title = options.title || '';
        this.content = options.content || '';
        this.size = options.size || 'medium'; // small, medium, large
        this.closeOnBackdrop = options.closeOnBackdrop !== false;
        this.closeOnEscape = options.closeOnEscape !== false;
        this.onOpen = options.onOpen || null;
        this.onClose = options.onClose || null;

        this.element = null;
        this.isOpen = false;
        this._boundKeyHandler = this._handleKeydown.bind(this);
    }

    /**
     * Create modal DOM
     */
    _create() {
        if (this.element) return;

        this.element = document.createElement('div');
        this.element.id = this.id;
        this.element.className = `modal-backdrop modal-${this.size}`;
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        this.element.setAttribute('aria-labelledby', `${this.id}-title`);

        this.element.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <h2 id="${this.id}-title" class="modal-title">${this.title}</h2>
          <button class="modal-close" aria-label="Close modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">${this.content}</div>
        <div class="modal-footer"></div>
      </div>
    `;

        // Event listeners
        this.element.querySelector('.modal-close').addEventListener('click', () => this.close());

        if (this.closeOnBackdrop) {
            this.element.addEventListener('click', (e) => {
                if (e.target === this.element) this.close();
            });
        }

        document.body.appendChild(this.element);
    }

    /**
     * Handle keydown events
     */
    _handleKeydown(e) {
        if (e.key === 'Escape' && this.closeOnEscape) {
            this.close();
        }
    }

    /**
     * Open modal
     */
    open() {
        this._create();

        requestAnimationFrame(() => {
            this.element.classList.add('modal-open');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', this._boundKeyHandler);

            // Focus first focusable element
            const focusable = this.element.querySelector('button, [href], input, select, textarea');
            if (focusable) focusable.focus();

            if (this.onOpen) this.onOpen(this);
        });

        return this;
    }

    /**
     * Close modal
     */
    close() {
        if (!this.element || !this.isOpen) return;

        this.element.classList.remove('modal-open');
        this.isOpen = false;
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this._boundKeyHandler);

        if (this.onClose) this.onClose(this);

        // Remove after animation
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
                this.element = null;
            }
        }, 300);

        return this;
    }

    /**
     * Update content
     */
    setContent(html) {
        this.content = html;
        if (this.element) {
            this.element.querySelector('.modal-body').innerHTML = html;
        }
        return this;
    }

    /**
     * Add footer button
     */
    addButton(text, className = 'cta-button', onClick = null) {
        if (!this.element) this._create();

        const btn = document.createElement('button');
        btn.className = className;
        btn.textContent = text;
        if (onClick) btn.addEventListener('click', onClick);

        this.element.querySelector('.modal-footer').appendChild(btn);
        return this;
    }

    /**
     * Static: Create and open immediately
     */
    static show(options) {
        return new Modal(options).open();
    }

    /**
     * Static: Confirm dialog
     */
    static confirm(message, onConfirm, onCancel) {
        const modal = new Modal({
            title: 'Confirm',
            content: `<p>${message}</p>`,
            size: 'small'
        });

        modal.addButton('Cancel', 'nav-button prev', () => {
            modal.close();
            if (onCancel) onCancel();
        });

        modal.addButton('Confirm', 'cta-button', () => {
            modal.close();
            if (onConfirm) onConfirm();
        });

        return modal.open();
    }
}

// Export
window.Modal = Modal;
