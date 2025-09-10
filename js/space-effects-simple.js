/**
 * 🚀 SIMPLE SPACE EFFECTS - NO MODULES REQUIRED
 *
 * This version uses CDN Three.js and doesn't require ES6 modules
 * Perfect for easy integration with your existing setup
 */

// Wait for Three.js to load from CDN
function initSpaceEffects() {
  if (typeof THREE === "undefined") {
    setTimeout(initSpaceEffects, 100);
    return;
  }

  class SimpleSpaceEffects {
    constructor() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      this.effects = new Map();
      this.mouse = new THREE.Vector2();
      this.clock = new THREE.Clock();

      this.init();
      this.setupEventListeners();
      this.animate();
    }

    init() {
      // Setup renderer
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.domElement.style.position = "fixed";
      this.renderer.domElement.style.top = "0";
      this.renderer.domElement.style.left = "0";
      this.renderer.domElement.style.pointerEvents = "none";
      this.renderer.domElement.style.zIndex = "2";

      document.body.appendChild(this.renderer.domElement);

      // Setup camera
      this.camera.position.z = 5;

      // Create lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      this.scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x9a7ac2, 1, 100);
      pointLight.position.set(10, 10, 10);
      this.scene.add(pointLight);

      this.pointLight = pointLight;
    }

    setupEventListeners() {
      window.addEventListener("resize", () => this.onWindowResize());

      // Mouse tracking
      document.addEventListener("mousemove", (event) => {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update light position
        this.pointLight.position.x = this.mouse.x * 10;
        this.pointLight.position.y = this.mouse.y * 10;
      });

      // Button interactions
      document.addEventListener("mouseover", (event) => {
        if (this.isButton(event.target)) {
          this.createButtonEffect(event.target);
        }
      });

      document.addEventListener("mouseout", (event) => {
        if (this.isButton(event.target)) {
          this.removeButtonEffect(event.target);
        }
      });

      // Click effects
      document.addEventListener("click", (event) => {
        if (this.isButton(event.target)) {
          this.createClickEffect(event.target);
        }
      });
    }

    isButton(element) {
      return (
        element.classList.contains("btn-lavender") ||
        element.classList.contains("btn-cyan") ||
        element.classList.contains("btn-gold") ||
        element.classList.contains("btn-magenta") ||
        element.classList.contains("btn-lime") ||
        element.classList.contains("btn-holographic") ||
        element.classList.contains("btn-neural") ||
        element.classList.contains("btn-quantum") ||
        element.classList.contains("btn-matrix") ||
        element.classList.contains("btn-glitch") ||
        element.classList.contains("btn-glass") ||
        element.classList.contains("btn-outline-lavender") ||
        element.classList.contains("btn-outline-cyan")
      );
    }

    createButtonEffect(button) {
      const rect = button.getBoundingClientRect();
      const centerX =
        ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
      const centerY =
        (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

      // Create floating particles
      this.createFloatingParticles(button, centerX, centerY);

      // Create energy ring
      this.createEnergyRing(button, centerX, centerY);
    }

    createFloatingParticles(button, centerX, centerY) {
      const particleCount = 30;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      // Get button color
      const color = this.getButtonColor(button);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position particles around button
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 0.15 + Math.random() * 0.1;

        positions[i3] = centerX + Math.cos(angle) * radius;
        positions[i3 + 1] = centerY + Math.sin(angle) * radius;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.2;

        // Color variation
        colors[i3] = color.r + (Math.random() - 0.5) * 0.3;
        colors[i3 + 1] = color.g + (Math.random() - 0.5) * 0.3;
        colors[i3 + 2] = color.b + (Math.random() - 0.5) * 0.3;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      particles.userData = {
        button: button,
        time: 0,
        centerX: centerX,
        centerY: centerY,
        originalPositions: positions.slice(),
      };

      this.scene.add(particles);
      this.effects.set(`particles_${button}`, particles);
    }

    createEnergyRing(button, centerX, centerY) {
      const ringGeometry = new THREE.RingGeometry(0.1, 0.12, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: this.getButtonColor(button),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(centerX, centerY, 0);
      ring.userData = { button: button, time: 0 };

      this.scene.add(ring);
      this.effects.set(`ring_${button}`, ring);
    }

    createClickEffect(button) {
      const rect = button.getBoundingClientRect();
      const centerX =
        ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
      const centerY =
        (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

      // Create explosion particles
      const explosionCount = 20;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(explosionCount * 3);
      const colors = new Float32Array(explosionCount * 3);
      const velocities = new Float32Array(explosionCount * 3);

      const color = this.getButtonColor(button);

      for (let i = 0; i < explosionCount; i++) {
        const i3 = i * 3;

        // Start at button center
        positions[i3] = centerX;
        positions[i3 + 1] = centerY;
        positions[i3 + 2] = 0;

        // Random explosion velocities
        const speed = Math.random() * 0.1 + 0.05;
        const angle = Math.random() * Math.PI * 2;
        velocities[i3] = Math.cos(angle) * speed;
        velocities[i3 + 1] = Math.sin(angle) * speed;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

        // Color
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(velocities, 3)
      );

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
      });

      const explosion = new THREE.Points(geometry, material);
      explosion.userData = {
        button: button,
        time: 0,
        maxLifetime: 2,
      };

      this.scene.add(explosion);
      this.effects.set(`explosion_${button}`, explosion);

      // Remove explosion after 2 seconds
      setTimeout(() => {
        this.scene.remove(explosion);
        this.effects.delete(`explosion_${button}`);
      }, 2000);
    }

    getButtonColor(button) {
      const colorMap = {
        "btn-lavender": 0x9a7ac2,
        "btn-cyan": 0x55cde0,
        "btn-gold": 0xa6804f,
        "btn-magenta": 0xd85db9,
        "btn-lime": 0x9fe35b,
        "btn-holographic": 0x55cde0,
        "btn-neural": 0x9a7ac2,
        "btn-quantum": 0x55cde0,
        "btn-matrix": 0x9fe35b,
        "btn-glitch": 0xd85db9,
      };

      for (const [className, color] of Object.entries(colorMap)) {
        if (button.classList.contains(className)) {
          return new THREE.Color(color);
        }
      }

      return new THREE.Color(0x9a7ac2); // Default
    }

    removeButtonEffect(button) {
      const keysToRemove = [];
      this.effects.forEach((effect, key) => {
        if (effect.userData.button === button) {
          this.scene.remove(effect);
          keysToRemove.push(key);
        }
      });

      keysToRemove.forEach((key) => this.effects.delete(key));
    }

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      const elapsedTime = this.clock.getElapsedTime();

      // Update all effects
      this.effects.forEach((effect, key) => {
        if (effect.userData.time !== undefined) {
          effect.userData.time += 0.016;
        }

        if (key.startsWith("particles_")) {
          this.updateFloatingParticles(effect);
        } else if (key.startsWith("ring_")) {
          this.updateEnergyRing(effect);
        } else if (key.startsWith("explosion_")) {
          this.updateExplosion(effect);
        }
      });

      // Update light
      this.pointLight.intensity = 0.5 + Math.sin(elapsedTime) * 0.3;

      this.renderer.render(this.scene, this.camera);
    }

    updateFloatingParticles(particles) {
      const positions = particles.geometry.attributes.position.array;
      const originalPositions = particles.userData.originalPositions;
      const time = particles.userData.time;

      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        positions[i] = originalPositions[i] + Math.sin(time + i3) * 0.01;
        positions[i + 1] =
          originalPositions[i + 1] + Math.cos(time + i3) * 0.01;
        positions[i + 2] =
          originalPositions[i + 2] + Math.sin(time * 2 + i3) * 0.005;
      }

      particles.geometry.attributes.position.needsUpdate = true;
    }

    updateEnergyRing(ring) {
      const time = ring.userData.time;
      ring.rotation.z = time * 2;
      ring.material.opacity = 0.3 + Math.sin(time * 3) * 0.3;
    }

    updateExplosion(explosion) {
      const positions = explosion.geometry.attributes.position.array;
      const velocities = explosion.geometry.attributes.velocity.array;
      const time = explosion.userData.time;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Apply gravity
        velocities[i + 1] -= 0.001;
      }

      explosion.geometry.attributes.position.needsUpdate = true;

      // Fade out
      const alpha = Math.max(0, 1 - time / explosion.userData.maxLifetime);
      explosion.material.opacity = alpha;
    }
  }

  // Initialize effects
  const spaceEffects = new SimpleSpaceEffects();
  window.spaceEffects = spaceEffects;

  console.log("🚀 Space Effects Initialized!");
}

// Load Three.js from CDN and initialize
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js";
script.onload = initSpaceEffects;
document.head.appendChild(script);
