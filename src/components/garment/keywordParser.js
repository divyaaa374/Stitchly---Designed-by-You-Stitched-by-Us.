/**
 * Natural Language Keyword Parser for Indian Haute Couture Prompts
 * Extracts colors, garment types, occasions, fabrics, and trims,
 * and synthesizes 4 distinct, stylistically coherent design variations.
 */

const COLOR_MAP = {
  red: '#A81C38',
  crimson: '#8B1E3F',
  maroon: '#68132C',
  pink: '#F9D5DC',
  rose: '#D9718A',
  blush: '#F9D5DC',
  fuschia: '#D8315B',
  mint: '#D5EFE3',
  sage: '#B5D8C6',
  green: '#2D6A4F',
  emerald: '#1B4332',
  ivory: '#FFFDF9',
  cream: '#FFF9F5',
  white: '#FFFFFF',
  gold: '#FFF1B8',
  champagne: '#FFE2CF',
  butter: '#FFF1B8',
  yellow: '#FDE075',
  mustard: '#E0A96D',
  plum: '#4A3F5C',
  purple: '#6B4C70',
  lavender: '#E4DAF6',
  lilac: '#D6C7F1',
  peach: '#FFE2CF',
  coral: '#F7A072',
  sky: '#D8E8F8',
  blue: '#3A506B',
  navy: '#1D2D44',
  black: '#2F263D',
};

export function parsePrompt(prompt = '') {
  const p = prompt.toLowerCase();

  // 1. Detect Garment Type
  let type = 'lehenga';
  if (p.includes('anarkali')) type = 'anarkali';
  else if (p.includes('kurta') || p.includes('gharara') || p.includes('sharara')) type = 'kurta set';
  else if (p.includes('blouse') || p.includes('choli')) type = 'blouse';
  else if (p.includes('sherwani') || p.includes('bandhgala') || p.includes('achkan')) type = 'sherwani';

  // 2. Detect Color
  let detectedColour = null;
  let detectedColorName = 'Royal Crimson';
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (p.includes(key)) {
      detectedColour = hex;
      detectedColorName = key.charAt(0).toUpperCase() + key.slice(1);
      break;
    }
  }

  // Fallbacks by garment type
  if (!detectedColour) {
    if (type === 'sherwani') {
      detectedColour = '#FFF1B8';
      detectedColorName = 'Champagne Ivory';
    } else if (type === 'anarkali' || type === 'kurta set') {
      detectedColour = '#D5EFE3';
      detectedColorName = 'Pistachio Mint';
    } else {
      detectedColour = '#8B1E3F';
      detectedColorName = 'Royal Crimson';
    }
  }

  // 3. Detect Fabric
  let fabric = 'silk';
  if (p.includes('velvet')) fabric = 'velvet';
  else if (p.includes('georgette') || p.includes('organza') || p.includes('chiffon')) fabric = 'georgette';
  else if (p.includes('banarasi') || p.includes('brocade') || p.includes('katan')) fabric = 'banarasi';
  else if (p.includes('cotton') || p.includes('chanderi') || p.includes('mulmul')) fabric = 'cotton';

  // 4. Detect Embroidery Intensity
  let embroidery = 'moderate';
  if (p.includes('heavy') || p.includes('zardozi') || p.includes('bridal') || p.includes('dabka')) {
    embroidery = 'heavy';
  } else if (p.includes('royal') || p.includes('mughal') || p.includes('heritage')) {
    embroidery = 'royal';
  } else if (p.includes('subtle') || p.includes('pearl') || p.includes('mukaish')) {
    embroidery = 'subtle';
  } else if (p.includes('minimal') || p.includes('clean') || p.includes('light')) {
    embroidery = 'minimal';
  }

  // 5. Detect Neckline
  let neckline = 'sweetheart';
  if (p.includes('v-neck') || p.includes('v neck')) neckline = 'v-neck';
  else if (p.includes('round') || p.includes('scoop')) neckline = 'round';
  else if (p.includes('mandarin') || p.includes('collar') || p.includes('band')) neckline = 'mandarin';
  else if (p.includes('plunge') || p.includes('deep')) neckline = 'plunge';
  else if (p.includes('square')) neckline = 'square';
  if (type === 'sherwani') neckline = 'mandarin';

  // 6. Detect Sleeve
  let sleeve = 'elbow';
  if (p.includes('sleeveless')) sleeve = 'sleeveless';
  else if (p.includes('cap')) sleeve = 'cap';
  else if (p.includes('full') || p.includes('long')) sleeve = 'full';
  else if (p.includes('bell') || p.includes('flare')) sleeve = 'bell';
  if (type === 'sherwani') sleeve = 'full';

  // 7. Detect Occasion
  let occasion = 'Wedding & Reception';
  if (p.includes('sangeet')) occasion = 'Sangeet & Cocktail';
  else if (p.includes('mehendi') || p.includes('haldi')) occasion = 'Mehendi & Day Celebrations';
  else if (p.includes('reception')) occasion = 'Grand Reception';
  else if (p.includes('festival') || p.includes('diwali') || p.includes('eid')) occasion = 'Festive Celebration';

  return {
    type,
    colour: detectedColour,
    colorName: detectedColorName,
    fabric,
    embroidery,
    neckline,
    sleeve,
    occasion,
    dupatta: type !== 'sherwani',
    lining: true,
  };
}

/**
 * Generates 4 meaningfully distinct variations based on the parsed prompt
 */
export function generateVariationsFromPrompt(promptText = '') {
  const base = parsePrompt(promptText);

  // Variation 1: Imperial Heritage (Full-scale royal craft)
  const var1 = {
    id: `var_${Date.now()}_1`,
    name: `Imperial Heritage ${capitalize(base.type)}`,
    tagline: 'Ancestral Zardozi & Royal Velvet',
    type: base.type,
    colour: base.colour,
    colorName: base.colorName,
    fabric: base.fabric === 'cotton' ? 'silk' : base.fabric,
    embroidery: 'royal',
    neckline: base.neckline,
    sleeve: base.sleeve === 'sleeveless' ? 'elbow' : base.sleeve,
    dupatta: base.dupatta,
    lining: true,
    estimatedPrice: 32500,
    estimatedDays: 14,
    recommendedTailor: 'Master Meera Devi (Jaipur)',
    notes: '24-Kali flare with antique dabka peacocks, scalloped hem and double-sided latkans.',
    swatches: [base.colour, '#FFF1B8', '#4A3F5C'],
  };

  // Variation 2: Pastel Atelier Contemporary (Lighter, organza / georgette focus)
  const pastelColor = base.colour === '#D5EFE3' ? '#E4DAF6' : '#D5EFE3';
  const var2 = {
    id: `var_${Date.now()}_2`,
    name: `Pastel Atelier ${capitalize(base.type)}`,
    tagline: 'Featherlight Organza & Pearl Edges',
    type: base.type,
    colour: pastelColor,
    colorName: pastelColor === '#D5EFE3' ? 'Pistachio Mint' : 'Misty Lavender',
    fabric: 'georgette',
    embroidery: 'subtle',
    neckline: base.neckline === 'mandarin' ? 'sweetheart' : 'v-neck',
    sleeve: 'bell',
    dupatta: base.dupatta,
    lining: true,
    estimatedPrice: 16800,
    estimatedDays: 8,
    recommendedTailor: 'Fatima Noor (Hyderabad)',
    notes: 'Fluid movement with sheer neckline inserts and pearl scallop drape.',
    swatches: [pastelColor, '#FFFFFF', '#FFE2CF'],
  };

  // Variation 3: Varanasi Banarasi Brocade (Structured gold zari weave)
  const brocadeColor = base.colour === '#FFE2CF' ? '#4A3F5C' : '#FFE2CF';
  const var3 = {
    id: `var_${Date.now()}_3`,
    name: `Nocturne Brocade ${capitalize(base.type)}`,
    tagline: 'Handloom Katan Silk & Mukaish Sequins',
    type: base.type,
    colour: brocadeColor,
    colorName: brocadeColor === '#FFE2CF' ? 'Blush Peach' : 'Royal Plum',
    fabric: 'banarasi',
    embroidery: 'moderate',
    neckline: 'plunge',
    sleeve: 'elbow',
    dupatta: base.dupatta,
    lining: true,
    estimatedPrice: 22400,
    estimatedDays: 11,
    recommendedTailor: 'Sunita & Ramesh Das (Varanasi)',
    notes: 'Structured sweetheart bodice with genuine gold zari thread motifs.',
    swatches: [brocadeColor, '#FFF1B8', '#D9718A'],
  };

  // Variation 4: Minimalist Gota Patti (Fresh, playful festive cut)
  const festiveColor = base.colour === '#FFF1B8' ? '#D9718A' : '#FFF1B8';
  const var4 = {
    id: `var_${Date.now()}_4`,
    name: `Festive Gota ${capitalize(base.type)}`,
    tagline: 'Chanderi Silk with Golden Lappe',
    type: base.type,
    colour: festiveColor,
    colorName: festiveColor === '#FFF1B8' ? 'Champagne Butter' : 'Rose Fuschia',
    fabric: 'cotton',
    embroidery: 'moderate',
    neckline: 'round',
    sleeve: 'cap',
    dupatta: base.dupatta,
    lining: true,
    estimatedPrice: 13500,
    estimatedDays: 7,
    recommendedTailor: 'Ustad Rajesh Kumar (Lucknow)',
    notes: 'Breezy silhouette ideal for daytime celebrations and sangeet dancing.',
    swatches: [festiveColor, '#FFE2CF', '#D5EFE3'],
  };

  return [var1, var2, var3, var4];
}

function capitalize(s = '') {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
