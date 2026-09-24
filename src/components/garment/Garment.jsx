import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FabricDefs, FABRICS } from './fabrics';
import { ScallopedHem, NecklineEmbroidery } from './embroidery';
import Mannequin from './mannequin';

export const Garment = ({
  type = 'lehenga', // 'lehenga', 'kurta set', 'blouse', 'sherwani', 'anarkali'
  colour = '#8B1E3F',
  sleeve = 'elbow', // 'sleeveless', 'cap', 'elbow', 'full', 'bell'
  neckline = 'sweetheart', // 'sweetheart', 'v-neck', 'round', 'mandarin', 'plunge', 'square'
  fabric = 'silk', // 'silk', 'velvet', 'georgette', 'banarasi', 'cotton'
  embroidery = 'heavy', // 'none', 'minimal', 'subtle', 'moderate', 'heavy', 'royal'
  length = 'ankle', // 'cropped', 'knee', 'ankle', 'floor'
  dupatta = true,
  lining = true,
  showMannequin = true,
  className = '',
}) => {
  const fabricConfig = FABRICS[fabric] || FABRICS.silk;

  // Pattern or gradient fill overlay based on selected fabric
  const getTextureOverlay = () => {
    if (fabric === 'banarasi') return 'url(#banarasiBrocade)';
    if (fabric === 'georgette') return 'url(#georgetteWeave)';
    if (fabric === 'cotton') return 'url(#cottonMatte)';
    if (fabric === 'silk') return 'url(#silkSheenGradient)';
    return null;
  };

  const textureFill = getTextureOverlay();
  const isSheer = fabric === 'georgette';

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full max-h-[540px] drop-shadow-lg overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fabric Definitions & SVG Filters */}
        <FabricDefs />

        {/* 1. Mannequin Stand */}
        {showMannequin && <Mannequin showStand={true} showTorso={true} />}

        {/* 2. Main Garment Group with smooth spring transition */}
        <g id="garment-main-group" filter={fabric === 'velvet' ? 'url(#velvetTexture)' : undefined}>
          
          {/* ======================= A. LEHENGA ======================= */}
          {type === 'lehenga' && (
            <g id="lehenga-silhouette">
              {/* Can-can & Lining layer peeking at base */}
              {lining && (
                <path
                  d="M172 235 L95 385 Q200 398 305 385 L228 235 Z"
                  fill="#FFF9F5"
                  opacity={0.7}
                  stroke="#4A3F5C"
                  strokeWidth="0.8"
                />
              )}

              {/* Flared 24-Kali Skirt */}
              <motion.path
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                d="M170 230 Q200 234 230 230 L315 380 Q200 396 85 380 Z"
                fill={colour}
                opacity={fabricConfig.opacity}
                stroke="#4A3F5C"
                strokeWidth="2"
              />

              {/* Fabric Texture Pattern on Skirt */}
              {textureFill && (
                <path
                  d="M170 230 Q200 234 230 230 L315 380 Q200 396 85 380 Z"
                  fill={textureFill}
                  opacity={0.4}
                  pointerEvents="none"
                />
              )}

              {/* Kali Stitch / Fluting Lines */}
              <g stroke="#ffffff" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 4">
                <line x1="200" y1="234" x2="200" y2="396" />
                <line x1="185" y1="232" x2="140" y2="388" />
                <line x1="215" y1="232" x2="260" y2="388" />
                <line x1="175" y1="231" x2="110" y2="384" />
                <line x1="225" y1="231" x2="290" y2="384" />
              </g>

              {/* Waistband (Kamarbandh) */}
              <rect x="168" y="222" width="64" height="10" rx="3" fill="url(#zariGold)" stroke="#4A3F5C" strokeWidth="1.5" />
              {/* Latkan Tassel string hanging on left */}
              <path d="M174 232 C170 250, 165 270, 162 290" fill="none" stroke="#D9718A" strokeWidth="1.8" />
              <circle cx="162" cy="292" r="3.5" fill="url(#zariGold)" stroke="#4A3F5C" strokeWidth="1" />
              <circle cx="160" cy="300" r="2.5" fill="#FFE2CF" />

              {/* Hem Embroidery Scallop */}
              <ScallopedHem y={375} width={230} startX={85} level={embroidery} strokeColor="url(#zariGold)" />

              {/* Choli (Blouse Top) */}
              <path
                d="M165 92 Q200 98 235 92 L228 178 Q200 182 172 178 Z"
                fill={colour}
                stroke="#4A3F5C"
                strokeWidth="2"
              />
              {textureFill && (
                <path
                  d="M165 92 Q200 98 235 92 L228 178 Q200 182 172 178 Z"
                  fill={textureFill}
                  opacity={0.4}
                />
              )}
              {/* Princess Seams on Blouse */}
              <path d="M185 110 Q182 145 186 178" fill="none" stroke="#4A3F5C" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <path d="M215 110 Q218 145 214 178" fill="none" stroke="#4A3F5C" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

              {/* Neckline Cutout & Embroidery */}
              <NecklineEmbroidery type={neckline} level={embroidery} />

              {/* Sleeves */}
              {renderSleeves({ sleeve, colour, textureFill, embroidery })}
            </g>
          )}

          {/* ======================= B. ANARKALI ======================= */}
          {type === 'anarkali' && (
            <g id="anarkali-silhouette">
              {/* Floor-sweeping Kali Skirt */}
              <motion.path
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                d="M168 180 Q200 184 232 180 L325 390 Q200 408 75 390 Z"
                fill={colour}
                opacity={fabricConfig.opacity}
                stroke="#4A3F5C"
                strokeWidth="2"
              />
              {textureFill && (
                <path
                  d="M168 180 Q200 184 232 180 L325 390 Q200 408 75 390 Z"
                  fill={textureFill}
                  opacity={0.4}
                />
              )}

              {/* Fluting Kalis */}
              <g stroke="#ffffff" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 4">
                <line x1="200" y1="184" x2="200" y2="408" />
                <line x1="185" y1="182" x2="135" y2="398" />
                <line x1="215" y1="182" x2="265" y2="398" />
                <line x1="175" y1="181" x2="105" y2="394" />
                <line x1="225" y1="181" x2="295" y2="394" />
              </g>

              {/* Empire Waist Trim */}
              <rect x="168" y="174" width="64" height="7" rx="2" fill="url(#zariGold)" stroke="#4A3F5C" strokeWidth="1" />

              {/* Hem Embroidery */}
              <ScallopedHem y={386} width={250} startX={75} level={embroidery} strokeColor="url(#zariGold)" />

              {/* Bodice / Yoke */}
              <path
                d="M165 92 Q200 98 235 92 L232 175 Q200 178 168 175 Z"
                fill={colour}
                stroke="#4A3F5C"
                strokeWidth="2"
              />
              {textureFill && (
                <path
                  d="M165 92 Q200 98 235 92 L232 175 Q200 178 168 175 Z"
                  fill={textureFill}
                  opacity={0.4}
                />
              )}

              {/* Neckline */}
              <NecklineEmbroidery type={neckline} level={embroidery} />

              {/* Sleeves */}
              {renderSleeves({ sleeve, colour, textureFill, embroidery })}
            </g>
          )}

          {/* ======================= C. KURTA SET ======================= */}
          {type === 'kurta set' && (
            <g id="kurta-silhouette">
              {/* Pants / Gharara Peeking underneath */}
              <path d="M172 290 L145 405 L182 405 L188 290 Z" fill="#FFF9F5" stroke="#4A3F5C" strokeWidth="1.8" />
              <path d="M228 290 L255 405 L218 405 L212 290 Z" fill="#FFF9F5" stroke="#4A3F5C" strokeWidth="1.8" />
              <line x1="145" y1="400" x2="182" y2="400" stroke="url(#zariGold)" strokeWidth="2" />
              <line x1="218" y1="400" x2="255" y2="400" stroke="url(#zariGold)" strokeWidth="2" />

              {/* Straight / A-Line Kurta Tunic */}
              <motion.path
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                d="M162 90 L238 90 L250 310 Q200 316 150 310 Z"
                fill={colour}
                opacity={fabricConfig.opacity}
                stroke="#4A3F5C"
                strokeWidth="2"
              />
              {textureFill && (
                <path
                  d="M162 90 L238 90 L250 310 Q200 316 150 310 Z"
                  fill={textureFill}
                  opacity={0.4}
                />
              )}

              {/* Side Slits (Chak) */}
              <line x1="165" y1="230" x2="150" y2="310" stroke="#4A3F5C" strokeWidth="1.5" />
              <line x1="235" y1="230" x2="250" y2="310" stroke="#4A3F5C" strokeWidth="1.5" />

              {/* Center Placket / Buttons */}
              <line x1="200" y1="92" x2="200" y2="180" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
              <circle cx="200" cy="115" r="2" fill="url(#zariGold)" />
              <circle cx="200" cy="135" r="2" fill="url(#zariGold)" />
              <circle cx="200" cy="155" r="2" fill="url(#zariGold)" />

              {/* Hem Embroidery */}
              <ScallopedHem y={306} width={100} startX={150} level={embroidery} strokeColor="url(#zariGold)" />

              {/* Neckline */}
              <NecklineEmbroidery type={neckline} level={embroidery} />

              {/* Sleeves */}
              {renderSleeves({ sleeve, colour, textureFill, embroidery })}
            </g>
          )}

          {/* ======================= D. DESIGNER BLOUSE ======================= */}
          {type === 'blouse' && (
            <g id="blouse-silhouette">
              {/* Structured Blouse Bodice */}
              <motion.path
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                d="M162 90 Q200 98 238 90 L230 185 Q200 190 170 185 Z"
                fill={colour}
                stroke="#4A3F5C"
                strokeWidth="2.2"
              />
              {textureFill && (
                <path
                  d="M162 90 Q200 98 238 90 L230 185 Q200 190 170 185 Z"
                  fill={textureFill}
                  opacity={0.4}
                />
              )}

              {/* Corset / Princess Cut Underwire lines */}
              <path d="M178 120 Q185 155 180 185" fill="none" stroke="#4A3F5C" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
              <path d="M222 120 Q215 155 220 185" fill="none" stroke="#4A3F5C" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />

              {/* Lower Band Embroidery */}
              <path d="M170 185 Q200 190 230 185" stroke="url(#zariGold)" strokeWidth="3.5" fill="none" />

              {/* Latkan back tassels dangling */}
              <path d="M192 188 C190 220, 185 240, 182 260" stroke="#D9718A" strokeWidth="1.6" fill="none" />
              <circle cx="182" cy="262" r="3.5" fill="url(#zariGold)" />
              <path d="M208 188 C210 220, 215 240, 218 260" stroke="#D9718A" strokeWidth="1.6" fill="none" />
              <circle cx="218" cy="262" r="3.5" fill="url(#zariGold)" />

              {/* Neckline */}
              <NecklineEmbroidery type={neckline} level={embroidery} />

              {/* Sleeves */}
              {renderSleeves({ sleeve, colour, textureFill, embroidery })}
            </g>
          )}

          {/* ======================= E. SHERWANI ======================= */}
          {type === 'sherwani' && (
            <g id="sherwani-silhouette">
              {/* Churidar trousers underneath */}
              <path d="M185 290 L170 410 L195 410 L200 290 Z" fill="#FFF9F5" stroke="#4A3F5C" strokeWidth="1.8" />
              <path d="M215 290 L230 410 L205 410 L200 290 Z" fill="#FFF9F5" stroke="#4A3F5C" strokeWidth="1.8" />

              {/* Structured Coat Body */}
              <motion.path
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                d="M158 85 L242 85 L252 335 Q200 342 148 335 Z"
                fill={colour}
                opacity={fabricConfig.opacity}
                stroke="#4A3F5C"
                strokeWidth="2.2"
              />
              {textureFill && (
                <path
                  d="M158 85 L242 85 L252 335 Q200 342 148 335 Z"
                  fill={textureFill}
                  opacity={0.4}
                />
              )}

              {/* Angrakha diagonal overlap or center seam */}
              <path d="M192 88 L218 190 L218 338" stroke="#4A3F5C" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* Row of ornamental buttons */}
              {[105, 125, 145, 165, 185].map((y) => (
                <circle key={y} cx="218" cy={y} r="2.5" fill="#ffffff" stroke="#4A3F5C" strokeWidth="1" />
              ))}

              {/* Mandarin Collar */}
              <path d="M182 85 C182 76 218 76 218 85 Z" fill="url(#zariGold)" stroke="#4A3F5C" strokeWidth="1.8" />

              {/* Pocket square accent */}
              <path d="M172 130 L188 130 L180 122 Z" fill="#D9718A" />

              {/* Hem Embroidery */}
              <ScallopedHem y={332} width={104} startX={148} level={embroidery} strokeColor="url(#zariGold)" />

              {/* Full Men's Sleeves */}
              {renderSleeves({ sleeve: 'full', colour, textureFill, embroidery })}
            </g>
          )}

          {/* ======================= DUPATTA DRAPE ======================= */}
          {dupatta && type !== 'sherwani' && (
            <g id="dupatta-drape" opacity={0.88}>
              {/* Translucent cascading organza dupatta */}
              <path
                d="M165 92 Q140 180 115 280 Q90 380 100 420 Q120 425 130 380 Q150 260 180 135 Z"
                fill={isSheer ? '#D5EFE3' : '#F9D5DC'}
                opacity={0.65}
                stroke="url(#zariGold)"
                strokeWidth="1.5"
              />
              {/* Gold borders on dupatta edge */}
              <path
                d="M165 92 Q140 180 115 280 Q90 380 100 420"
                fill="none"
                stroke="url(#zariGold)"
                strokeWidth="3"
              />
              {/* Pearl bead edging on dupatta */}
              <path
                d="M165 92 Q140 180 115 280 Q90 380 100 420"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            </g>
          )}

        </g>
      </svg>
    </div>
  );
};

/**
 * Procedural Sleeve Geometry Generator
 */
function renderSleeves({ sleeve, colour, textureFill, embroidery }) {
  const isHeavy = embroidery === 'heavy' || embroidery === 'royal';

  if (sleeve === 'sleeveless') {
    // Clean armhole cut
    return (
      <g className="sleeveless-cuffs">
        <path d="M162 90 Q155 110 166 128" fill="none" stroke="#4A3F5C" strokeWidth="2" />
        <path d="M238 90 Q245 110 234 128" fill="none" stroke="#4A3F5C" strokeWidth="2" />
      </g>
    );
  }

  if (sleeve === 'cap') {
    return (
      <g className="cap-sleeves">
        {/* Left Cap */}
        <path d="M162 90 L140 105 L148 118 L166 112 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        {/* Right Cap */}
        <path d="M238 90 L260 105 L252 118 L234 112 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
      </g>
    );
  }

  if (sleeve === 'elbow') {
    return (
      <g className="elbow-sleeves">
        {/* Left elbow sleeve */}
        <path d="M162 90 L135 125 L145 175 L168 165 L170 128 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        {textureFill && <path d="M162 90 L135 125 L145 175 L168 165 L170 128 Z" fill={textureFill} opacity={0.4} />}
        <line x1="145" y1="175" x2="168" y2="165" stroke="url(#zariGold)" strokeWidth={isHeavy ? 3.5 : 2} />

        {/* Right elbow sleeve */}
        <path d="M238 90 L265 125 L255 175 L232 165 L230 128 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        {textureFill && <path d="M238 90 L265 125 L255 175 L232 165 L230 128 Z" fill={textureFill} opacity={0.4} />}
        <line x1="255" y1="175" x2="232" y2="165" stroke="url(#zariGold)" strokeWidth={isHeavy ? 3.5 : 2} />
      </g>
    );
  }

  if (sleeve === 'full') {
    return (
      <g className="full-sleeves">
        {/* Left full sleeve */}
        <path d="M162 90 L135 125 L130 235 L146 235 L168 165 L170 128 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        {textureFill && <path d="M162 90 L135 125 L130 235 L146 235 L168 165 L170 128 Z" fill={textureFill} opacity={0.4} />}
        <line x1="130" y1="235" x2="146" y2="235" stroke="url(#zariGold)" strokeWidth={isHeavy ? 3.5 : 2} />

        {/* Right full sleeve */}
        <path d="M238 90 L265 125 L270 235 L254 235 L232 165 L230 128 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        {textureFill && <path d="M238 90 L265 125 L270 235 L254 235 L232 165 L230 128 Z" fill={textureFill} opacity={0.4} />}
        <line x1="270" y1="235" x2="254" y2="235" stroke="url(#zariGold)" strokeWidth={isHeavy ? 3.5 : 2} />
      </g>
    );
  }

  if (sleeve === 'bell') {
    return (
      <g className="bell-sleeves">
        {/* Left flared bell sleeve */}
        <path d="M162 90 L135 130 L115 220 Q135 228 152 215 L168 145 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        <path d="M115 220 Q135 228 152 215" fill="none" stroke="url(#zariGold)" strokeWidth={3} />

        {/* Right flared bell sleeve */}
        <path d="M238 90 L265 130 L285 220 Q265 228 248 215 L232 145 Z" fill={colour} stroke="#4A3F5C" strokeWidth="2" />
        <path d="M285 220 Q265 228 248 215" fill="none" stroke="url(#zariGold)" strokeWidth={3} />
      </g>
    );
  }

  return null;
}

export default Garment;
