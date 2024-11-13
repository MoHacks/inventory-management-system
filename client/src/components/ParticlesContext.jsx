import React, { createContext, useContext, useState, useEffect } from 'react';
import { tsParticles } from "@tsparticles/engine";
import { loadTrianglesPreset } from '@tsparticles/preset-triangles';


const ParticlesContext = createContext();

export const useParticles = () => useContext(ParticlesContext);

export const ParticlesProvider = ({ children }) => {
  const [particles, setParticles] = useState(null);

  useEffect(() => {
    const loadParticles = async () => {
      await loadTrianglesPreset(tsParticles);
      const particlesInstance = await tsParticles.load({
        id: "tsparticles",
        options: {
          preset: "triangles",
        },
      });
      setParticles(particlesInstance);
    };

    loadParticles();

    return () => {
      if (particles) {
        particles.destroy(); // Clean up particles on unmount
      }
    };
  }, [particles]);

  return (
    <ParticlesContext.Provider value={{ particles }}>
      {children}
    </ParticlesContext.Provider>
  );
};
