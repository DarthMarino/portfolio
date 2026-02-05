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

  const createGeometries = () => {
    // Create various geometric shapes - well distributed in 3D space
    const shapes = [
      { geometry: new THREE.TorusGeometry(3, 0.8, 16, 100), position: [-20, 10, -8] },
      { geometry: new THREE.OctahedronGeometry(2.5), position: [18, -8, -25] },
      { geometry: new THREE.TorusKnotGeometry(2, 0.5, 100, 16), position: [-10, -15, -30] },
      { geometry: new THREE.IcosahedronGeometry(2), position: [15, 15, -15] },
      { geometry: new THREE.DodecahedronGeometry(2.5), position: [5, -18, -35] },
      { geometry: new THREE.TetrahedronGeometry(3), position: [-25, 3, -20] },
      { geometry: new THREE.SphereGeometry(1.5, 32, 32), position: [10, 5, -28] },
    ];

    shapes.forEach(({ geometry, position }, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL((i * 0.15) % 1, 0.6, 0.5),
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.25,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);

      // Random initial rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;

      scene.add(mesh);
      geometries.push(mesh);
    });

    // Add wireframe overlays for more visual interest
    shapes.slice(0, 4).forEach(({ geometry, position }, i) => {
      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
      });

      const wireframeMesh = new THREE.Mesh(geometry.clone(), wireframeMaterial);
      wireframeMesh.position.set(position[0], position[1], position[2]);
      wireframeMesh.rotation.copy(geometries[i].rotation);

      scene.add(wireframeMesh);
      geometries.push(wireframeMesh);
    });
  };

  const createTextSprites = () => {
    // Programming language text sprites with their colors - positioned between geometries
    const languages = [
      { text: 'TS', color: '#3178c6', position: [-15, 0, -12] },     // TypeScript Blue
      { text: 'Go', color: '#00ADD8', position: [20, 5, -18] },      // Go Cyan/Blue
      { text: 'C#', color: '#9b4f96', position: [-5, -10, -22] },    // C# Purple
      { text: 'C++', color: '#00599C', position: [12, -12, -10] },   // C++ Blue
      { text: 'JS', color: '#f7df1e', position: [0, 12, -26] },      // JavaScript Yellow
      { text: 'PG', color: '#336791', position: [-18, -8, -16] },    // PostgreSQL Blue
    ];

    languages.forEach(({ text, color, position }) => {
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
