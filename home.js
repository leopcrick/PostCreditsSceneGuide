document.addEventListener('DOMContentLoaded', () => {
    class Slider {
        constructor(sliderElement) {
            this.slider = sliderElement;
            this.list = sliderElement.querySelector('.list');
            this.items = Array.from(sliderElement.querySelectorAll('.item'));
            this.prevBtn = sliderElement.querySelector('.prev-btn');
            this.nextBtn = sliderElement.querySelector('.next-btn');
            this.currentIndex = this.items.length; // Começa na cópia dos itens
            this.autoScrollInterval = null;
            this.isPaused = false;
            this.isDragging = false;
            this.startX = 0;
            this.scrollX = 0;

            this.cloneItems();
            this.updatePosition(false);
            this.setupEvents();
            this.startAutoScroll();
        }

        cloneItems() {
            const firstClones = this.items.map(item => item.cloneNode(true));
            const lastClones = this.items.map(item => item.cloneNode(true));

            firstClones.forEach(clone => this.list.appendChild(clone)); // Clones finais
            lastClones.reverse().forEach(clone => this.list.prepend(clone)); // Clones iniciais

            this.items = Array.from(this.list.children); // Atualiza a lista de itens
        }

        setupEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.pause();
                    this.move(-1);
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.pause();
                    this.move(1);
                });
            }

            this.slider.addEventListener('mouseenter', () => {
                this.pause();
            });

            this.slider.addEventListener('mouseleave', () => {
                this.start();
            });

            this.list.addEventListener('mousedown', (e) => this.startDrag(e));
            this.list.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
            this.list.addEventListener('mousemove', (e) => this.dragMove(e));
            this.list.addEventListener('touchmove', (e) => this.dragMove(e), { passive: true });
            this.list.addEventListener('mouseup', () => this.endDrag());
            this.list.addEventListener('mouseleave', () => this.endDrag());
            this.list.addEventListener('touchend', () => this.endDrag());
        }

        startDrag(e) {
            this.isDragging = true;
            this.startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            this.scrollX = this.list.scrollLeft;
            this.pause();
        }

        dragMove(e) {
            if (!this.isDragging) return;
            const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const moveX = this.startX - x;
            this.list.scrollLeft = this.scrollX + moveX;
        }

        endDrag() {
            this.isDragging = false;
            if (!this.isPaused) this.start();
        }

        move(direction) {
            const itemWidth = this.items[0].offsetWidth;
            this.currentIndex += direction;
            this.updatePosition();

            if (this.currentIndex >= this.items.length - this.items.length / 3) {
                setTimeout(() => {
                    this.list.style.transition = 'none';
                    this.currentIndex = this.items.length / 3;
                    this.updatePosition(false);
                }, 500);
            }

            if (this.currentIndex < this.items.length / 3) {
                setTimeout(() => {
                    this.list.style.transition = 'none';
                    this.currentIndex = this.items.length - this.items.length / 3 - 1;
                    this.updatePosition(false);
                }, 500);
            }
        }

        updatePosition(smooth = true) {
            this.list.style.transition = smooth ? 'transform 0.5s ease' : 'none';
            const offset = -this.currentIndex * this.items[0].offsetWidth;
            this.list.style.transform = `translateX(${offset}px)`;
        }

        startAutoScroll() {
            this.pause();
            this.autoScrollInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.move(1);
                }
            }, 3000);
        }

        start() {
            this.pause();
            this.autoScrollInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.move(1);
                }
            }, 3000);
        }

        pause() {
            clearInterval(this.autoScrollInterval);
        }
    }

    document.querySelectorAll('.slider').forEach(slider => {
        new Slider(slider);
    });
});
