import React, { useRef, useEffect } from 'react';

export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Detect mobile
        const isMobile = window.innerWidth < 768;

        // Optimized particle count for mobile vs desktop
        const particleCount = isMobile ? 25 : 45;

        // Mouse interaction
        let mouse = {
            x: null,
            y: null,
            radius: isMobile ? 80 : 120
        };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleTouchMove = (event) => {
            if (event.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = event.touches[0].clientX - rect.left;
                mouse.y = event.touches[0].clientY - rect.top;
            }
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        if (!isMobile) {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);
        } else {
            // Minimal touch interaction to avoid scroll interference
            canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        }

        const resizeCanvas = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
            init();
        };

        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.dx = -this.dx;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.dy = -this.dy;
                }

                // Interaction with mouse/touch - throttled for performance
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 1.5;
                        const directionY = forceDirectionY * force * 1.5;

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        const init = () => {
            particles = [];
            const colors = ['#3b82f6', '#f97316', '#a855f7', '#60a5fa', '#fb923c'];

            for (let i = 0; i < particleCount; i++) {
                let size = (Math.random() * 2) + 0.5;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let dx = (Math.random() - 0.5) * 0.6;
                let dy = (Math.random() - 0.5) * 0.6;
                let color = colors[Math.floor(Math.random() * colors.length)];

                particles.push(new Particle(x, y, dx, dy, size, color));
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Using slate-900 background
            ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }

            connect();
        };

        const connect = () => {
            // Connection logic optimized for mobile (shorter distance)
            const maxDistance = isMobile ? 120 : 180;

            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.12})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none sm:pointer-events-auto opacity-30"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
