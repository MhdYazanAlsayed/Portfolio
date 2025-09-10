/**
 * 🚀 ADVANCED THREE.JS SPACE THEME EFFECTS
 *
 * This file contains stunning space-themed animations and effects:
 * - Floating particle systems around buttons
 * - Orbital animations for interactive elements
 * - Energy beam effects for button interactions
 * - Dynamic nebula background enhancements
 * - Holographic UI projections
 * - Quantum field effects
 */

import * as THREE from "https://cdn.skypack.dev/three@0.158.0";

class SpaceEffectsManager {
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

    this.particleSystems = new Map();
    this.orbitalElements = new Map();
    this.energyBeams = new Map();
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
    this.renderer.domElement.style.zIndex = "1";

    document.body.appendChild(this.renderer.domElement);

    // Setup camera
    this.camera.position.z = 5;

    // Create ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);

    // Create directional light for depth
    const directionalLight = new THREE.DirectionalLight(0x9a7ac2, 0.5);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);
  }

  setupEventListeners() {
    window.addEventListener("resize", () => this.onWindowResize());

    // Mouse tracking for interactive effects
    document.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Button hover effects
    document.addEventListener("mouseover", (event) => {
      if (
        event.target.classList.contains("btn-lavender") ||
        event.target.classList.contains("btn-cyan") ||
        event.target.classList.contains("btn-gold") ||
        event.target.classList.contains("btn-magenta") ||
        event.target.classList.contains("btn-lime") ||
        event.target.classList.contains("btn-holographic") ||
        event.target.classList.contains("btn-neural") ||
        event.target.classList.contains("btn-quantum") ||
        event.target.classList.contains("btn-matrix") ||
        event.target.classList.contains("btn-glitch")
      ) {
        this.createButtonParticles(event.target);
        this.createEnergyBeam(event.target);
      }
    });

    document.addEventListener("mouseout", (event) => {
      if (
        event.target.classList.contains("btn-lavender") ||
        event.target.classList.contains("btn-cyan") ||
        event.target.classList.contains("btn-gold") ||
        event.target.classList.contains("btn-magenta") ||
        event.target.classList.contains("btn-lime") ||
        event.target.classList.contains("btn-holographic") ||
        event.target.classList.contains("btn-neural") ||
        event.target.classList.contains("btn-quantum") ||
        event.target.classList.contains("btn-matrix") ||
        event.target.classList.contains("btn-glitch")
      ) {
        this.removeButtonParticles(event.target);
        this.removeEnergyBeam(event.target);
      }
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // 🌟 Floating Particle System for Buttons
  createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
    const centerY =
      (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Get button color theme
    let particleColor = new THREE.Color(0x9a7ac2); // Default lavender
    if (button.classList.contains("btn-cyan"))
      particleColor = new THREE.Color(0x55cde0);
    else if (button.classList.contains("btn-gold"))
      particleColor = new THREE.Color(0xa6804f);
    else if (button.classList.contains("btn-magenta"))
      particleColor = new THREE.Color(0xd85db9);
    else if (button.classList.contains("btn-lime"))
      particleColor = new THREE.Color(0x9fe35b);
    else if (button.classList.contains("btn-holographic"))
      particleColor = new THREE.Color(0x55cde0);
    else if (button.classList.contains("btn-neural"))
      particleColor = new THREE.Color(0x9a7ac2);
    else if (button.classList.contains("btn-quantum"))
      particleColor = new THREE.Color(0x55cde0);
    else if (button.classList.contains("btn-matrix"))
      particleColor = new THREE.Color(0x9fe35b);
    else if (button.classList.contains("btn-glitch"))
      particleColor = new THREE.Color(0xd85db9);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position particles around button
      positions[i3] = centerX + (Math.random() - 0.5) * 0.3;
      positions[i3 + 1] = centerY + (Math.random() - 0.5) * 0.2;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.5;

      // Color variation
      const colorVariation = new THREE.Color(particleColor);
      colorVariation.offsetHSL(0, 0, (Math.random() - 0.5) * 0.3);
      colors[i3] = colorVariation.r;
      colors[i3 + 1] = colorVariation.g;
      colors[i3 + 2] = colorVariation.b;

      sizes[i] = Math.random() * 0.02 + 0.01;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particles.userData = {
      button: button,
      time: 0,
      originalPositions: positions.slice(),
    };

    this.scene.add(particles);
    this.particleSystems.set(button, particles);
  }

  removeButtonParticles(button) {
    const particles = this.particleSystems.get(button);
    if (particles) {
      this.scene.remove(particles);
      this.particleSystems.delete(button);
    }
  }

  // ⚡ Energy Beam Effects
  createEnergyBeam(button) {
    const rect = button.getBoundingClientRect();
    const startX = ((rect.left + rect.width / 2) / window.innerWidth) * 2 - 1;
    const startY = (-(rect.top + rect.height / 2) / window.innerHeight) * 2 + 1;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    const colors = new Float32Array(6);

    // Beam from button to center of screen
    positions[0] = startX;
    positions[1] = startY;
    positions[2] = 0;
    positions[3] = 0;
    positions[4] = 0;
    positions[5] = 0;

    // Energy beam color
    const beamColor = new THREE.Color(0x55cde0);
    colors[0] = beamColor.r;
    colors[1] = beamColor.g;
    colors[2] = beamColor.b;
    colors[3] = beamColor.r * 0.3;
    colors[4] = beamColor.g * 0.3;
    colors[5] = beamColor.b * 0.3;

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const beam = new THREE.Line(geometry, material);
    beam.userData = { button: button, time: 0 };

    this.scene.add(beam);
    this.energyBeams.set(button, beam);
  }

  removeEnergyBeam(button) {
    const beam = this.energyBeams.get(button);
    if (beam) {
      this.scene.remove(beam);
      this.energyBeams.delete(button);
    }
  }

  // 🌌 Dynamic Nebula Background
  createNebulaBackground() {
    const nebulaGeometry = new THREE.PlaneGeometry(10, 10);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        vec3 nebulaColor1 = vec3(0.6, 0.4, 0.8); // Lavender
        vec3 nebulaColor2 = vec3(0.3, 0.8, 0.9); // Cyan
        vec3 nebulaColor3 = vec3(0.8, 0.3, 0.7); // Magenta
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 6; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 p = uv * 3.0;
          
          float n1 = fbm(p + time * 0.1);
          float n2 = fbm(p * 2.0 + time * 0.15);
          float n3 = fbm(p * 4.0 + time * 0.2);
          
          vec3 color = mix(nebulaColor1, nebulaColor2, n1);
          color = mix(color, nebulaColor3, n2 * 0.5);
          color *= n3 * 0.3 + 0.1;
          
          gl_FragColor = vec4(color, 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    nebula.position.z = -2;
    this.scene.add(nebula);

    return nebula;
  }

  // 🛸 Orbital Elements
  createOrbitalElement(centerX, centerY, radius, speed, color) {
    const geometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 32);
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const ring = new THREE.Mesh(geometry, material);
    ring.position.set(centerX, centerY, 0);
    ring.userData = { speed: speed, time: 0 };

    this.scene.add(ring);
    return ring;
  }

  // 🎯 Quantum Field Effect
  createQuantumField() {
    const fieldGeometry = new THREE.PlaneGeometry(8, 8);
    const fieldMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2() },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mouse;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          vec2 center = vec2(0.5, 0.5);
          
          float dist = distance(uv, center);
          float wave = sin(dist * 20.0 - time * 5.0) * 0.5 + 0.5;
          
          vec3 color = vec3(0.3, 0.8, 0.9) * wave * 0.3;
          
          gl_FragColor = vec4(color, wave * 0.2);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    field.position.z = -1;
    this.scene.add(field);

    return field;
  }

  // 🎬 Animation Loop
  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    // Update particle systems
    this.particleSystems.forEach((particles, button) => {
      const positions = particles.geometry.attributes.position.array;
      const originalPositions = particles.userData.originalPositions;
      const time = (particles.userData.time += 0.016);

      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        positions[i] = originalPositions[i] + Math.sin(time + i3) * 0.02;
        positions[i + 1] =
          originalPositions[i + 1] + Math.cos(time + i3) * 0.02;
        positions[i + 2] =
          originalPositions[i + 2] + Math.sin(time * 2 + i3) * 0.01;
      }

      particles.geometry.attributes.position.needsUpdate = true;
    });

    // Update energy beams
    this.energyBeams.forEach((beam, button) => {
      const time = (beam.userData.time += 0.016);
      const positions = beam.geometry.attributes.position.array;

      // Animate beam intensity
      positions[3] = Math.sin(time * 3) * 0.1;
      positions[4] = Math.cos(time * 3) * 0.1;

      beam.geometry.attributes.position.needsUpdate = true;
      beam.material.opacity = 0.3 + Math.sin(time * 2) * 0.3;
    });

    // Update orbital elements
    this.orbitalElements.forEach((element, key) => {
      const time = (element.userData.time += 0.016);
      element.rotation.z = time * element.userData.speed;
    });

    // Update nebula
    if (this.nebula) {
      this.nebula.material.uniforms.time.value = elapsedTime;
    }

    // Update quantum field
    if (this.quantumField) {
      this.quantumField.material.uniforms.time.value = elapsedTime;
      this.quantumField.material.uniforms.mouse.value.set(
        this.mouse.x,
        this.mouse.y
      );
    }

    this.renderer.render(this.scene, this.camera);
  }

  // 🚀 Initialize all effects
  initializeEffects() {
    // Create nebula background
    this.nebula = this.createNebulaBackground();

    // Create quantum field
    this.quantumField = this.createQuantumField();

    // Create orbital elements around the screen
    const orbitalColors = [0x9a7ac2, 0x55cde0, 0xd85db9, 0x9fe35b];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const radius = 2 + i * 0.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const orbital = this.createOrbitalElement(
        x,
        y,
        0.3,
        0.5 + i * 0.2,
        orbitalColors[i]
      );
      this.orbitalElements.set(`orbital_${i}`, orbital);
    }
  }
}

// Initialize the space effects when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const spaceEffects = new SpaceEffectsManager();
  spaceEffects.initializeEffects();

  // Make it globally accessible for debugging
  window.spaceEffects = spaceEffects;
});

export default SpaceEffectsManager;
