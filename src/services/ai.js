import { generateVariationsFromPrompt, parsePrompt } from '../components/garment/keywordParser.js';

export const aiService = {
  /**
   * Generates 4 bespoke couture design variations based on text prompt and optional reference image.
   * Default: rich local procedural SVG simulation.
   * If VITE_AI_API_KEY is present, attempts real API fetch with seamless fallback.
   */
  async generateDesigns(promptText = '', refImage = null) {
    const apiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_AI_API_KEY;

    if (apiKey) {
      try {
        // Structure for external API (e.g. OpenAI DALL-E / Imagen / Stability)
        // Here we attempt a structured request, but fall back gracefully
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: `High-end Indian Haute Couture garment: ${promptText}. Editorial photoshoot, pastel atelier background.`,
            n: 4,
            size: '512x512',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Map external images into our parametric design format
          const procedural = generateVariationsFromPrompt(promptText);
          return procedural.map((v, i) => ({
            ...v,
            externalImage: data.data?.[i]?.url || null,
          }));
        }
      } catch (err) {
        console.warn('External AI API unavailable, using Stitchly Atelier procedural generator:', err);
      }
    }

    // Default: Rich local simulation with ~2.5s creative latency
    await new Promise((resolve) => setTimeout(resolve, 2400));
    return generateVariationsFromPrompt(promptText);
  },

  /**
   * Parse prompt parameters directly
   */
  parsePrompt(promptText) {
    return parsePrompt(promptText);
  },

  /**
   * Compatibility alias for Part 1 callers
   */
  async generateVariations(promptText) {
    return this.generateDesigns(promptText);
  },
};

export default aiService;
