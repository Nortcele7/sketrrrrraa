// Boundary dimensions
const boundaryWidth = 40;
const boundaryHeight = 15;
const wallHeight = 10;
const roofHeight = 2.1; // Height of the triangular peak


// Initialize scene
function initScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background
    return scene;
}

// Initialize camera
function initCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 10, 15); // Camera position
    camera.lookAt(0, 0, 0); // Camera looks at the center
    return camera;
}

// Initialize renderer
function initRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

// Initialize orbit controls
function initControls(camera, renderer) {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    return controls;
}

// Add lighting to the scene
function addLighting(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
    directionalLight.position.set(10, 10, 10); // Position the light
    scene.add(directionalLight);
}

// Create ground (floor)
function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(boundaryWidth, boundaryHeight);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xa0a0a0, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    return ground;
}

// Create walls of the house
function createWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x7C4F30 }); // Mud color for walls

    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(boundaryWidth, wallHeight, 0.1), wallMaterial); // Front wall
    wall1.position.set(0, wallHeight / 2, -boundaryHeight / 2);

    const wall2 = new THREE.Mesh(new THREE.BoxGeometry(boundaryWidth, wallHeight, 0.1), wallMaterial); // Back wall
    wall2.position.set(0, wallHeight / 2, boundaryHeight / 2);

    const wall3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, wallHeight, boundaryHeight), wallMaterial); // Left wall
    wall3.position.set(-boundaryWidth / 2, wallHeight / 2, 0);

    const wall4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, wallHeight, boundaryHeight), wallMaterial); // Right wall
    wall4.position.set(boundaryWidth / 2, wallHeight / 2, 0);

    return [wall1, wall2, wall3, wall4];
}

// Create roof (two slanted roof sections)
function createRoof() {
    const roofWidth = boundaryWidth;
    const roofDepth = boundaryHeight*3.8/5;
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000, side: THREE.DoubleSide });

    // Roof geometry (two slanted triangular sections)
    const roofGeometry = new THREE.PlaneGeometry(roofWidth, roofDepth);

    // Create the first slanted roof section (slant at 45 degrees)
    const roof1 = new THREE.Mesh(roofGeometry, roofMaterial);
    roof1.rotation.x = Math.PI / 2.7; // Slant the roof to make it triangular (45 degrees)
    roof1.position.set(0, wallHeight + roofHeight / 2, -roofDepth / 2.2); // Position it at the back side
    return roof1;
}

// Create second slanted roof section (slant at -45 degrees)
function createRoof2() {
    const roofWidth = boundaryWidth;
    const roofDepth = boundaryHeight*3.8/5;
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B0000, side: THREE.DoubleSide });

    // Roof geometry (two slanted triangular sections)
    const roofGeometry = new THREE.PlaneGeometry(roofWidth, roofDepth);

    // Create the second slanted roof section (slant at -45 degrees)
    const roof2 = new THREE.Mesh(roofGeometry, roofMaterial);
    roof2.rotation.x = -Math.PI / 2.7; // Inverse slant (135 degrees)
    roof2.position.set(0, wallHeight + roofHeight / 2, roofDepth / 2.2); // Position it at the front side
    return roof2;
}

// Main function to setup the scene
function main() {
    const scene = initScene();
    const camera = initCamera();
    const renderer = initRenderer();
    const controls = initControls(camera, renderer);

    addLighting(scene); // Add lighting to the scene

    const ground = createGround(); // Create the ground
    scene.add(ground);

    const walls = createWalls(); // Create the walls
    walls.forEach(wall => scene.add(wall));

    const roof1 = createRoof(); // Create the first slanted roof section
    scene.add(roof1);

    const roof2 = createRoof2(); // Create the second slanted roof section
    scene.add(roof2);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

// Run the main function to start the scene
main();