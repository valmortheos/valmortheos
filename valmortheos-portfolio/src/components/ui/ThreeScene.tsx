'use client'; // Diperlukan untuk komponen yang menggunakan hook React seperti useState, useEffect

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha: true untuk background transparan
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00CED1, 1, 100); // Warna brand-blue
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Diamond-like object (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1, 0); // Radius 1, detail 0
    const material = new THREE.MeshStandardMaterial({
      color: 0x00CED1, // Warna brand-blue
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.8,
      emissive: 0x00CED1, // Sedikit bersinar
      emissiveIntensity: 0.2,
    });
    const diamond = new THREE.Mesh(geometry, material);
    scene.add(diamond);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      diamond.rotation.x += 0.005;
      diamond.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeScene;
