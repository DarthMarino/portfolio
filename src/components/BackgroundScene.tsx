import { onMount, onCleanup, type Component } from "solid-js";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const BackgroundScene: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let animationId: number;
  let geometries: THREE.Mesh[] = [];
  let textMeshes: THREE.Mesh[] = [];

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

    // Create programming language 3D text meshes
    createTextMeshes();

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

      // Animate geometries - same speed, random directions
      const rotationSpeed = 0.3; // Uniform rotation speed for all shapes
      geometries.forEach((mesh, i) => {
        const speed = (mesh as any).rotationSpeed;
        mesh.rotation.x = time * rotationSpeed * speed.x;
        mesh.rotation.y = time * rotationSpeed * speed.y;
        mesh.rotation.z = time * rotationSpeed * speed.z;

        // Floating motion
        mesh.position.y += Math.sin(time + i) * 0.002;
        mesh.position.x += Math.cos(time + i * 0.5) * 0.002;
      });

      // Animate 3D text meshes with gentle floating and rotation
      const textRotationSpeed = 0.15; // Slower uniform rotation for text
      textMeshes.forEach((mesh, i) => {
        const speed = (mesh as any).rotationSpeed;
        if (speed) {
          mesh.rotation.x += textRotationSpeed * speed.x * 0.01;
          mesh.rotation.y += textRotationSpeed * speed.y * 0.01;
          mesh.rotation.z += textRotationSpeed * speed.z * 0.01;
        }

        // Floating motion (slower than geometries)
        const initial = (mesh as any).initialPosition;
        if (initial) {
          mesh.position.y = initial.y + Math.sin(time * 0.5 + i) * 0.5;
          mesh.position.x = initial.x + Math.cos(time * 0.3 + i * 0.7) * 0.5;
        }
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
    // Define 3D space bounds - expanded for more sparse distribution
    const bounds = {
      x: [-70, 70],   // Left to right (expanded)
      y: [-45, 45],   // Bottom to top (expanded)
      z: [-100, -15], // Far to near (wider depth range)
    };

    const existingPositions: number[][] = [];

    // Depth range for calculating opacity and saturation
    const zNear = bounds.z[1];  // -15 (closest)
    const zFar = bounds.z[0];   // -100 (furthest)

    // Create 25+ geometric shapes with variety - scaled down 35% for subtlety
    const shapeTypes = [
      () => new THREE.TorusGeometry(1.3 + Math.random() * 1.3, 0.3 + Math.random() * 0.3, 16, 100),
      () => new THREE.OctahedronGeometry(1 + Math.random() * 1.3),
      () => new THREE.TorusKnotGeometry(1 + Math.random() * 0.65, 0.2 + Math.random() * 0.2, 100, 16),
      () => new THREE.IcosahedronGeometry(1 + Math.random() * 1),
      () => new THREE.DodecahedronGeometry(1 + Math.random() * 1.3),
      () => new THREE.TetrahedronGeometry(1.3 + Math.random() * 1.3),
      () => new THREE.SphereGeometry(0.65 + Math.random() * 1.3, 32, 32),
      () => new THREE.ConeGeometry(1 + Math.random() * 0.65, 1.3 + Math.random() * 1.3, 32),
      () => new THREE.CylinderGeometry(0.65 + Math.random() * 0.65, 0.65 + Math.random() * 0.65, 1.3 + Math.random() * 0.65, 32),
      () => new THREE.BoxGeometry(1.3 + Math.random() * 1.3, 1.3 + Math.random() * 1.3, 1.3 + Math.random() * 1.3),
    ];

    // Grid-based positioning for even distribution
    const numShapes = 35;
    const cols = 7; // 7 columns
    const rows = 5; // 5 rows (7x5 = 35 shapes)

    const cellWidth = (bounds.x[1] - bounds.x[0]) / cols;
    const cellHeight = (bounds.y[1] - bounds.y[0]) / rows;

    // Generate shapes in grid pattern
    for (let i = 0; i < numShapes; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Calculate cell center
      const cellCenterX = bounds.x[0] + (col + 0.5) * cellWidth;
      const cellCenterY = bounds.y[0] + (row + 0.5) * cellHeight;

      // Add random offset within cell (70% of cell size to prevent edge overlap)
      const offsetX = (Math.random() - 0.5) * cellWidth * 0.7;
      const offsetY = (Math.random() - 0.5) * cellHeight * 0.7;
      const randomZ = bounds.z[0] + Math.random() * (bounds.z[1] - bounds.z[0]);

      const position = [
        cellCenterX + offsetX,
        cellCenterY + offsetY,
        randomZ
      ];
      existingPositions.push(position);

      // Select random geometry type
      const geometryCreator = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const geometry = geometryCreator();

      // Calculate depth factor (0 = far, 1 = near)
      const depthFactor = (position[2] - zFar) / (zNear - zFar);

      // Depth-based opacity: far objects more transparent, near objects more opaque
      const minOpacity = 0.05;  // Far objects barely visible
      const maxOpacity = 0.25;  // Near objects more visible
      const opacity = minOpacity + (maxOpacity - minOpacity) * depthFactor;

      // Depth-based saturation: far objects desaturated, near objects vibrant
      const minSaturation = 0.2;  // Far objects grey-ish
      const maxSaturation = 0.8;  // Near objects colorful
      const saturation = minSaturation + (maxSaturation - minSaturation) * depthFactor;

      // Create material with depth-based properties
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL((i * 0.05) % 1, saturation, 0.4 + Math.random() * 0.2),
        roughness: 0.2 + Math.random() * 0.4,
        metalness: 0.5 + Math.random() * 0.5,
        transparent: true,
        opacity: opacity,
        wireframe: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position[0], position[1], position[2]);

      // Random initial rotation
      mesh.rotation.x = Math.random() * Math.PI * 2;
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;

      // Store random rotation direction (normalized) for consistent speed
      const rotX = (Math.random() - 0.5) * 2;
      const rotY = (Math.random() - 0.5) * 2;
      const rotZ = (Math.random() - 0.5) * 2;
      const magnitude = Math.sqrt(rotX * rotX + rotY * rotY + rotZ * rotZ);
      (mesh as any).rotationSpeed = {
        x: rotX / magnitude,
        y: rotY / magnitude,
        z: rotZ / magnitude,
      };

      scene.add(mesh);
      geometries.push(mesh);
    }
  };

  const createTextMeshes = () => {
    // Load font and create 3D text geometries
    const loader = new FontLoader();

    // Load font from CDN
    loader.load(
      'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
      (font) => {
        // Programming language text with their colors - Your tech stack
        const languages = [
          { text: 'TS', color: '#3178c6' },      // TypeScript Blue
          { text: 'Go', color: '#00ADD8' },      // Go Cyan/Blue
          { text: 'JS', color: '#f7df1e' },      // JavaScript Yellow
          { text: 'SQL', color: '#4479A1' },     // SQL Blue
          { text: 'React', color: '#61DAFB' },   // React Cyan
          { text: 'Node', color: '#339933' },    // Node.js Green
          { text: 'Solid', color: '#2c4f7c' },   // SolidJS Blue
          { text: 'Flutter', color: '#02569B' }, // Flutter Blue
          { text: 'SQLite', color: '#003B57' },  // SQLite Dark Blue
          { text: 'PG', color: '#336791' },      // PostgreSQL Blue
          { text: 'C#', color: '#9b4f96' },      // C# Purple
          { text: 'C++', color: '#00599C' },     // C++ Blue
          { text: 'Rust', color: '#CE412B' },    // Rust Orange
        ];

        // Expanded bounds for more sparse distribution
        const bounds = {
          x: [-70, 70],
          y: [-45, 45],
          z: [-100, -15],
        };

        // Depth range for calculating opacity
        const zNear = bounds.z[1];  // -15 (closest)
        const zFar = bounds.z[0];   // -100 (furthest)

        // Grid-based positioning for text meshes (5 columns x 3 rows for 13+ items)
        const cols = 5;
        const rows = 3;
        const cellWidth = (bounds.x[1] - bounds.x[0]) / cols;
        const cellHeight = (bounds.y[1] - bounds.y[0]) / rows;

        languages.forEach(({ text, color }, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);

          // Calculate cell center with offset to avoid geometric shapes
          const cellCenterX = bounds.x[0] + (col + 0.5) * cellWidth;
          const cellCenterY = bounds.y[0] + (row + 0.5) * cellHeight;

          // Add random offset within cell
          const offsetX = (Math.random() - 0.5) * cellWidth * 0.6;
          const offsetY = (Math.random() - 0.5) * cellHeight * 0.6;
          const randomZ = bounds.z[0] + Math.random() * (bounds.z[1] - bounds.z[0]);

          const position = [
            cellCenterX + offsetX,
            cellCenterY + offsetY,
            randomZ
          ];

          // Create 3D text geometry - scaled down 35%
          const textGeometry = new TextGeometry(text, {
            font: font,
            size: 2,
            depth: 0.3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.08,
            bevelSize: 0.08,
            bevelSegments: 5,
          });

          // Center the text geometry
          textGeometry.computeBoundingBox();
          const centerOffset = -0.5 * (textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x);
          textGeometry.translate(centerOffset, 0, 0);

          // Calculate depth factor for this text mesh
          const depthFactor = (position[2] - zFar) / (zNear - zFar);

          // Depth-based opacity for text: far = transparent, near = more visible
          const minOpacity = 0.15;  // Far text barely visible
          const maxOpacity = 0.5;   // Near text clearly visible
          const textOpacity = minOpacity + (maxOpacity - minOpacity) * depthFactor;

          // Create material with depth-based opacity
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 0.3,
            metalness: 0.8,
            transparent: true,
            opacity: textOpacity,
          });

          const textMesh = new THREE.Mesh(textGeometry, material);
          textMesh.position.set(position[0], position[1], position[2]);

          // Random initial rotation
          textMesh.rotation.x = (Math.random() - 0.5) * 0.5;
          textMesh.rotation.y = (Math.random() - 0.5) * 0.5;

          // Store random rotation direction for consistent speed
          const rotX = (Math.random() - 0.5) * 2;
          const rotY = (Math.random() - 0.5) * 2;
          const rotZ = (Math.random() - 0.5) * 2;
          const magnitude = Math.sqrt(rotX * rotX + rotY * rotY + rotZ * rotZ);
          (textMesh as any).rotationSpeed = {
            x: rotX / magnitude,
            y: rotY / magnitude,
            z: rotZ / magnitude,
          };

          // Store initial position for animation
          (textMesh as any).initialPosition = { x: position[0], y: position[1], z: position[2] };

          scene.add(textMesh);
          textMeshes.push(textMesh);
        });
      },
      undefined,
      (error) => {
        console.error('Error loading font:', error);
      }
    );
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
    textMeshes.forEach((mesh) => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(mat => mat.dispose());
      } else {
        mesh.material.dispose();
      }
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
