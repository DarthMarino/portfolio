import { onMount, onCleanup, type Component } from "solid-js";
import * as THREE from "three";

const BackgroundScene: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let animationId: number;
  let geometries: THREE.Mesh[] = [];
  let textSprites: THREE.Sprite[] = [];

  // Helper function to create a canvas texture with text
  const createTextTexture = (text: string, color: string) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 512;

    // Draw text with glow effect for better visibility
    context.fillStyle = color;
    context.font = 'bold 200px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Add subtle shadow/glow
    context.shadowColor = color;
    context.shadowBlur = 10;
    context.fillText(text, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const init = () => {
    if (!canvasRef) return;

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4a9eff, 1, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff4a9e, 0.8, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);

    // Create floating geometric shapes
    createGeometries();

    // Create programming language text sprites
    createTextSprites();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      // Animate geometries
      geometries.forEach((mesh, i) => {
        mesh.rotation.x = time * (0.3 + i * 0.1);
        mesh.rotation.y = time * (0.2 + i * 0.15);

        // Floating motion
        mesh.position.y += Math.sin(time + i) * 0.002;
        mesh.position.x += Math.cos(time + i * 0.5) * 0.002;
      });

      // Animate text sprites with gentle floating
      textSprites.forEach((sprite, i) => {
        // Gentle rotation
        sprite.material.rotation = time * (0.1 + i * 0.05);

        // Floating motion (slower than geometries)
        const initial = (sprite as any).initialPosition;
        sprite.position.y = initial.y + Math.sin(time * 0.5 + i) * 0.5;
        sprite.position.x = initial.x + Math.cos(time * 0.3 + i * 0.7) * 0.5;
      });

      renderer.render(scene, camera);
    };
    animate();
  };

  // Check if two positions are too close (collision detection)
  const isTooClose = (pos1: number[], pos2: number[], minDist: number): boolean => {
    const dx = pos1[0] - pos2[0];
    const dy = pos1[1] - pos2[1];
    const dz = pos1[2] - pos2[2];
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    return distance < minDist;
  };

  // Generate a random position within bounds, avoiding collisions
  const generateSafePosition = (
    existingPositions: number[][],
    bounds: { x: [number, number]; y: [number, number]; z: [number, number] },
    minDistance: number,
    maxAttempts: number = 50
  ): number[] => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const candidate = [
        bounds.x[0] + Math.random() * (bounds.x[1] - bounds.x[0]),
        bounds.y[0] + Math.random() * (bounds.y[1] - bounds.y[0]),
        bounds.z[0] + Math.random() * (bounds.z[1] - bounds.z[0]),
      ];

      // Check if this position is safe (not too close to existing shapes)
      const isSafe = existingPositions.every(
        (pos) => !isTooClose(candidate, pos, minDistance)
      );

      if (isSafe) {
        return candidate;
      }
    }

    // If we couldn't find a safe position, return a random one anyway
    return [
      bounds.x[0] + Math.random() * (bounds.x[1] - bounds.x[0]),
      bounds.y[0] + Math.random() * (bounds.y[1] - bounds.y[0]),
      bounds.z[0] + Math.random() * (bounds.z[1] - bounds.z[0]),
    ];
  };

  const createGeometries = () => {
    // Define 3D space bounds
    const bounds = {
      x: [-35, 35],  // Left to right
      y: [-25, 25],  // Bottom to top
      z: [-40, -5],  // Far to near
    };

    const minDistance = 8; // Minimum distance between shape centers
    const existingPositions: number[][] = [];

    // Create 25+ geometric shapes with variety
    const shapeTypes = [
      () => new THREE.TorusGeometry(2 + Math.random() * 2, 0.5 + Math.random() * 0.5, 16, 100),
      () => new THREE.OctahedronGeometry(1.5 + Math.random() * 2),
      () => new THREE.TorusKnotGeometry(1.5 + Math.random(), 0.3 + Math.random() * 0.3, 100, 16),
      () => new THREE.IcosahedronGeometry(1.5 + Math.random() * 1.5),
      () => new THREE.DodecahedronGeometry(1.5 + Math.random() * 2),
      () => new THREE.TetrahedronGeometry(2 + Math.random() * 2),
      () => new THREE.SphereGeometry(1 + Math.random() * 2, 32, 32),
      () => new THREE.ConeGeometry(1.5 + Math.random(), 2 + Math.random() * 2, 32),
      () => new THREE.CylinderGeometry(1 + Math.random(), 1 + Math.random(), 2 + Math.random(), 32),
      () => new THREE.BoxGeometry(2 + Math.random() * 2, 2 + Math.random() * 2, 2 + Math.random() * 2),
    ];

    // Generate 28 shapes (to ensure we have 25+ after any filtering)
    for (let i = 0; i < 28; i++) {
      // Select random geometry type
      const geometryCreator = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const geometry = geometryCreator();

      // Generate safe position
      const position = generateSafePosition(existingPositions, bounds, minDistance);
      existingPositions.push(position);

      // Create material with varied colors
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL((i * 0.05) % 1, 0.5 + Math.random() * 0.3, 0.4 + Math.random() * 0.2),
        roughness: 0.2 + Math.random() * 0.4,
        metalness: 0.5 + Math.random() * 0.5,
        transparent: true,
        opacity: 0.2 + Math.random() * 0.15,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);

      // Random initial rotation
      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;

      scene.add(mesh);
      geometries.push(mesh);
    }

    console.log(`Created ${geometries.length} geometric shapes with proper spacing`);
  };

  const createTextSprites = () => {
    // Programming language text sprites with their colors
    const languages = [
      { text: 'TS', color: '#3178c6' },     // TypeScript Blue
      { text: 'Go', color: '#00ADD8' },     // Go Cyan/Blue
      { text: 'C#', color: '#9b4f96' },     // C# Purple
      { text: 'C++', color: '#00599C' },    // C++ Blue
      { text: 'JS', color: '#f7df1e' },     // JavaScript Yellow
      { text: 'PG', color: '#336791' },     // PostgreSQL Blue
    ];

    // Use same bounds as geometries
    const bounds = {
      x: [-35, 35],
      y: [-25, 25],
      z: [-40, -5],
    };

    // Get existing geometry positions for collision detection
    const existingPositions = geometries.map(mesh => [
      mesh.position.x,
      mesh.position.y,
      mesh.position.z
    ]);

    languages.forEach(({ text, color }) => {
      // Generate position that doesn't overlap with geometries or other sprites
      const position = generateSafePosition(
        [...existingPositions, ...textSprites.map(s => [s.position.x, s.position.y, s.position.z])],
        bounds,
        10 // Slightly larger minimum distance for text
      );

      const texture = createTextTexture(text, color);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.5,
        depthTest: false, // Render on top of geometries
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(position[0], position[1], position[2]);
      sprite.scale.set(6, 6, 1); // Larger for better visibility

      // Store initial position for animation
      (sprite as any).initialPosition = { x: position[0], y: position[1], z: position[2] };

      scene.add(sprite);
      textSprites.push(sprite);
    });

    console.log(`Created ${textSprites.length} text sprites with proper spacing`);
  };

  onMount(() => {
    init();
  });

  onCleanup(() => {
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
    geometries.forEach((mesh) => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(mat => mat.dispose());
      } else {
        mesh.material.dispose();
      }
    });
    textSprites.forEach((sprite) => {
      if (sprite.material.map) sprite.material.map.dispose();
      sprite.material.dispose();
    });
    window.removeEventListener("resize", () => {});
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        "z-index": 1,
        "pointer-events": "none",
      }}
    />
  );
};

export default BackgroundScene;
