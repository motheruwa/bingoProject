import React, { useEffect, useRef } from "react";

function BouncingBalls() {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create bingo balls with different gradients
    const balls = [];
    const gradients = [
      ["rgb(0, 162, 255)", "rgb(6, 6, 51)"], // Gradient 1
      ["rgb(124, 6, 89)", "rgb(64, 9, 78)"], // Gradient 2
      ["rgb(6, 161, 115)", "rgb(7, 90, 39)"], // Gradient 3
      ["rgb(201, 136, 17)", "rgb(71, 31, 5)"], // Gradient 4
      ["rgb(163, 159, 152)", "rgb(22, 14, 8)"], // Gradient 5
    ];

    for (let i = 0; i < 20; i++) {
      const radius = Math.random() * 20 + 30;
      const gradient = gradients[Math.floor(Math.random() * gradients.length)]; // Random gradient for each ball
      balls.push({
        x: Math.random() * (canvas.width - radius * 2) + radius,
        y: Math.random() * (canvas.height - radius * 2) + radius,
        radius,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        number: Math.floor(Math.random() * 75) + 1,
        colorStart: gradient[0],
        colorEnd: gradient[1],
      });
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach((ball) => {
        // Move ball
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Bounce off walls
        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
          ball.dx = -ball.dx;
        }

        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.dy = -ball.dy;
        }

        // Create gradient for each ball
        const gradient = ctx.createRadialGradient(
          ball.x,
          ball.y,
          0,
          ball.x,
          ball.y,
          ball.radius
        );
        gradient.addColorStop(0, ball.colorStart); // Start color
        gradient.addColorStop(1, ball.colorEnd); // End color

        // Draw ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient; // Use the gradient as fill
        ctx.fill();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        // Draw number
        ctx.fillStyle = "#FFFFFF";
        ctx.font = `${ball.radius * 0.7}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ball.number.toString(), ball.x, ball.y);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
      aria-hidden="true"
    />
  );
}

export default BouncingBalls;
