document.addEventListener('DOMContentLoaded', () => {
    class Slider {
        constructor(sliderElement) {
            this.slider = sliderElement;
            this.list = sliderElement.querySelector('.list');
            this.items = Array.from(sliderElement.querySelectorAll('.item'));
            this.prevBtn = sliderElement.querySelector('.prev-btn');
            this.nextBtn = sliderElement.querySelector('.next-btn');
            this.itemWidth = this.items[0].offsetWidth;
            this.currentIndex = 0;
            this.autoScrollInterval = null;
            this.isPaused = false;

            this.init();
        }

        init() {
            this.cloneItems();
            this.setupEvents();
            this.startAutoScroll();
        }

        cloneItems() {
            const clones = this.items.map(item => item.cloneNode(true));
            clones.forEach(clone => this.list.appendChild(clone));
        }

        setupEvents() {
            // Botões de navegação - agora com clique imediato
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.pause();
                    this.move(-1);
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.pause();
                    this.move(1);
                });
            }

            // Pausa no hover
            this.slider.addEventListener('mouseenter', () => {
                this.isPaused = true;
                this.pause();
            });

            this.slider.addEventListener('mouseleave', () => {
                this.isPaused = false;
                this.start();
            });
        }

        move(direction) {
            this.currentIndex += direction;

            // Lógica para efeito infinito
            if (this.currentIndex >= this.items.length) {
                this.list.style.transition = 'none';
                this.currentIndex = 0;
                this.updatePosition();
                setTimeout(() => {
                    this.list.style.transition = 'transform 0.5s ease';
                }, 20);
            } else if (this.currentIndex < 0) {
                this.list.style.transition = 'none';
                this.currentIndex = this.items.length - 1;
                this.updatePosition();
                setTimeout(() => {
                    this.list.style.transition = 'transform 0.5s ease';
                }, 20);
            } else {
                this.updatePosition();
            }

            // Reinicia o autoscroll após mudança manual
            if (!this.isPaused) {
                this.start();
            }
        }

        updatePosition() {
            const offset = -this.currentIndex * this.itemWidth;
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

    // Inicializa todos os sliders na página
    document.querySelectorAll('.slider').forEach(slider => {
        new Slider(slider);
    });
});