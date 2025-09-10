/**
 * 🌌 ADVANCED SPACE EFFECTS - NO MODULES VERSION
 *
 * This version uses CDN Three.js and doesn't require ES6 modules
 * Contains all the advanced effects: particle swarms, energy fields, holographic projections
 */

// Wait for Three.js to load from CDN
function initAdvancedSpaceEffects() {
  if (typeof THREE === "undefined") {
    setTimeout(initAdvancedSpaceEffects, 100);
    return;
  }

  class AdvancedSpaceEffects {
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
        powerPreference: "high-performance",
      });

      this.effects = new Map();
      this.mouse = new THREE.Vector2();
      this.clock = new THREE.Clock();

      this.init();
      this.setupEventListeners();
      this.animate();
    }

    init() {
      // Setup renderer with advanced settings
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

      // Create advanced lighting setup
      this.setupLighting();
    }

    setupLighting() {
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
      this.scene.add(ambientLight);

      // Dynamic colored lights
      const light1 = new THREE.PointLight(0x9a7ac2, 1, 100);
      light1.position.set(10, 10, 10);
      this.scene.add(light1);

      const light2 = new THREE.PointLight(0x55cde0, 1, 100);
      light2.position.set(-10, -10, 10);
      this.scene.add(light2);

      const light3 = new THREE.PointLight(0xd85db9, 1, 100);
      light3.position.set(0, 10, -10);
      this.scene.add(light3);

      // Store lights for animation
      this.lights = [light1, light2, light3];
    }

    setupEventListeners() {
      window.addEventListener("resize", () => this.onWindowResize());

      // Enhanced mouse tracking
      document.addEventListener("mousemove", (event) => {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update lights based on mouse position
        this.lights.forEach((light, index) => {
          const angle = (index / this.lights.length) * Math.PI * 2;
          light.position.x = Math.cos(angle + this.mouse.x * 0.5) * 15;
          light.position.y = Math.sin(angle + this.mouse.y * 0.5) * 15;
        });
      });

      // Enhanced button interactions
      document.addEventListener("mouseover", (event) => {
        if (this.isButton(event.target)) {
          this.createAdvancedButtonEffect(event.target);
        }
      });

      document.addEventListener("mouseout", (event) => {
        if (this.isButton(event.target)) {
          this.removeAdvancedButtonEffect(event.target);
        }
      });

      // Click effects
      document.addEventListener("click", (event) => {
        if (this.isButton(event.target)) {
          this.createClickExplosion(event.target);
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

    // 🌟 Advanced Button Effects
    createAdvancedButtonEffect(button) {
      const rect = button.getBoundingClientRect();
      const centerX =
        ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
      const centerY =
        (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

      // Create particle swarm
      this.createParticleSwarm(button, centerX, centerY);

      // Create energy field
      this.createEnergyField(button, centerX, centerY);

      // Create holographic projection
      this.createHolographicProjection(button, centerX, centerY);
    }

    createParticleSwarm(button, centerX, centerY) {
      const particleCount = 80;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      // Get button theme colors
      const themeColors = this.getButtonThemeColors(button);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position particles in a sphere around button
        const radius = 0.25;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i3] = centerX + radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = centerY + radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Random velocities
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        // Color based on theme
        const colorIndex = Math.floor(Math.random() * themeColors.length);
        const color = themeColors[colorIndex];
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
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const swarm = new THREE.Points(geometry, material);
      swarm.userData = {
        button: button,
        time: 0,
        centerX: centerX,
        centerY: centerY,
      };

      this.scene.add(swarm);
      this.effects.set(`swarm_${button}`, swarm);
    }

    createEnergyField(button, centerX, centerY) {
      const fieldGeometry = new THREE.PlaneGeometry(0.6, 0.6);
      const fieldMaterial = new THREE.MeshBasicMaterial({
        color: this.getButtonColor(button),
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });

      const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      field.position.set(centerX, centerY, 0);
      field.userData = { button: button, time: 0 };

      this.scene.add(field);
      this.effects.set(`field_${button}`, field);
    }

    createHolographicProjection(button, centerX, centerY) {
      const projectionGeometry = new THREE.RingGeometry(0.15, 0.18, 32);
      const projectionMaterial = new THREE.MeshBasicMaterial({
        color: this.getButtonColor(button),
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const projection = new THREE.Mesh(projectionGeometry, projectionMaterial);
      projection.position.set(centerX, centerY, 0.1);
      projection.userData = { button: button, time: 0 };

      this.scene.add(projection);
      this.effects.set(`projection_${button}`, projection);
    }

    createClickExplosion(button) {
      const rect = button.getBoundingClientRect();
      const centerX =
        ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
      const centerY =
        (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

      const explosionCount = 40;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(explosionCount * 3);
      const colors = new Float32Array(explosionCount * 3);
      const velocities = new Float32Array(explosionCount * 3);
      const lifetimes = new Float32Array(explosionCount);

      const themeColors = this.getButtonThemeColors(button);

      for (let i = 0; i < explosionCount; i++) {
        const i3 = i * 3;

        // Start at button center
        positions[i3] = centerX;
        positions[i3 + 1] = centerY;
        positions[i3 + 2] = 0;

        // Random explosion velocities
        const speed = Math.random() * 0.15 + 0.08;
        const angle = Math.random() * Math.PI * 2;
        velocities[i3] = Math.cos(angle) * speed;
        velocities[i3 + 1] = Math.sin(angle) * speed;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.08;

        // Random lifetime
        lifetimes[i] = Math.random() * 2 + 1;

        // Random color
        const colorIndex = Math.floor(Math.random() * themeColors.length);
        const color = themeColors[colorIndex];
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
      geometry.setAttribute(
        "lifetime",
        new THREE.BufferAttribute(lifetimes, 1)
      );

      const material = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
      });

      const explosion = new THREE.Points(geometry, material);
      explosion.userData = {
        button: button,
        time: 0,
        maxLifetime: Math.max(...lifetimes),
      };

      this.scene.add(explosion);
      this.effects.set(`explosion_${button}`, explosion);

      // Remove explosion after max lifetime
      setTimeout(() => {
        this.scene.remove(explosion);
        this.effects.delete(`explosion_${button}`);
      }, explosion.userData.maxLifetime * 1000);
    }

    getButtonThemeColors(button) {
      const colorMap = {
        "btn-lavender": [new THREE.Color(0x9a7ac2), new THREE.Color(0x7f63ab)],
        "btn-cyan": [new THREE.Color(0x55cde0), new THREE.Color(0x2c9fb3)],
        "btn-gold": [new THREE.Color(0xa6804f), new THREE.Color(0x8f6a3e)],
        "btn-magenta": [new THREE.Color(0xd85db9), new THREE.Color(0xa1478b)],
        "btn-lime": [new THREE.Color(0x9fe35b), new THREE.Color(0x6ea83e)],
        "btn-holographic": [
          new THREE.Color(0x9a7ac2),
          new THREE.Color(0x55cde0),
          new THREE.Color(0xd85db9),
        ],
        "btn-neural": [new THREE.Color(0x46366d), new THREE.Color(0x9a7ac2)],
        "btn-quantum": [new THREE.Color(0x55cde0), new THREE.Color(0xd85db9)],
        "btn-matrix": [new THREE.Color(0x9fe35b), new THREE.Color(0x6ea83e)],
        "btn-glitch": [new THREE.Color(0xd85db9), new THREE.Color(0xa1478b)],
      };

      for (const [className, colors] of Object.entries(colorMap)) {
        if (button.classList.contains(className)) {
          return colors;
        }
      }

      return [new THREE.Color(0x9a7ac2)]; // Default
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

    removeAdvancedButtonEffect(button) {
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

        if (key.startsWith("swarm_")) {
          this.updateParticleSwarm(effect);
        } else if (key.startsWith("field_")) {
          this.updateEnergyField(effect);
        } else if (key.startsWith("projection_")) {
          this.updateHolographicProjection(effect);
        } else if (key.startsWith("explosion_")) {
          this.updateExplosion(effect);
        }
      });

      // Update lights
      this.lights.forEach((light, index) => {
        const time = elapsedTime + (index * Math.PI) / 3;
        light.intensity = 0.5 + Math.sin(time) * 0.3;
      });

      this.renderer.render(this.scene, this.camera);
    }

    updateParticleSwarm(swarm) {
      const positions = swarm.geometry.attributes.position.array;
      const velocities = swarm.geometry.attributes.velocity.array;
      const time = swarm.userData.time;

      for (let i = 0; i < positions.length; i += 3) {
        // Update positions
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Add some orbital motion
        const angle = time + (i / 3) * 0.1;
        positions[i] += Math.sin(angle) * 0.002;
        positions[i + 1] += Math.cos(angle) * 0.002;

        // Keep particles near button
        const dist = Math.sqrt(
          Math.pow(positions[i] - swarm.userData.centerX, 2) +
            Math.pow(positions[i + 1] - swarm.userData.centerY, 2)
        );

        if (dist > 0.4) {
          // Pull back towards center
          const pullForce = 0.015;
          velocities[i] = (swarm.userData.centerX - positions[i]) * pullForce;
          velocities[i + 1] =
            (swarm.userData.centerY - positions[i + 1]) * pullForce;
        }
      }

      swarm.geometry.attributes.position.needsUpdate = true;
    }

    updateEnergyField(field) {
      const time = field.userData.time;
      field.rotation.z = time * 1.5;
      field.material.opacity = 0.2 + Math.sin(time * 2) * 0.2;
    }

    updateHolographicProjection(projection) {
      const time = projection.userData.time;
      projection.rotation.z = time * 3;
      projection.material.opacity = 0.4 + Math.sin(time * 4) * 0.3;
    }

    updateExplosion(explosion) {
      const positions = explosion.geometry.attributes.position.array;
      const velocities = explosion.geometry.attributes.velocity.array;
      const lifetimes = explosion.geometry.attributes.lifetime.array;
      const time = explosion.userData.time;

      for (let i = 0; i < positions.length; i += 3) {
        const lifetime = lifetimes[i / 3];

        if (time < lifetime) {
          // Update positions
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Apply gravity
          velocities[i + 1] -= 0.002;

          // Fade out
          const alpha = 1 - time / lifetime;
          explosion.material.opacity = alpha;
        }
      }

      explosion.geometry.attributes.position.needsUpdate = true;
    }
  }

  // Initialize advanced effects
  const advancedEffects = new AdvancedSpaceEffects();
  window.advancedEffects = advancedEffects;

  console.log("🌌 Advanced Space Effects Initialized!");
}

// Load Three.js from CDN and initialize
const script = document.createElement("script");
script.src =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r158/three.min.js";
script.onload = initAdvancedSpaceEffects;
document.head.appendChild(script);
