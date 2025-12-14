// js/lens-compatibility.js
// Comprehensive lens compatibility data structure mapping camera models to compatible lenses
// Mount compatibility rules:
// - Canon EF: Full-frame DSLR (works on all EF/EF-S bodies)
// - Canon EF-S: Crop sensor DSLR (only works on APS-C bodies like 90D, 80D, Rebel series)
// - Canon RF: Mirrorless full-frame (EOS R series)
// - Canon EF-M: Mirrorless crop sensor (EOS M series)
// - Nikon F: DSLR mount (works on all F-mount bodies)
// - Nikon Z: Mirrorless mount (Z series)
// - Sony E: Crop sensor mirrorless (works on all E-mount bodies)
// - Sony FE: Full-frame mirrorless (works on all E-mount bodies)
// - Fujifilm X: X-mount mirrorless (all X-series cameras)

// Lens libraries by mount type
const canonEFLenses = [
  { id: "canon-ef-50mm-1.8", name: "Canon EF 50mm f/1.8 STM", bonus: 3000, mount: "EF" },
  { id: "canon-ef-24-70mm-2.8", name: "Canon EF 24-70mm f/2.8L II USM", bonus: 15000, mount: "EF" },
  { id: "canon-ef-70-200mm-2.8", name: "Canon EF 70-200mm f/2.8L IS III USM", bonus: 25000, mount: "EF" },
  { id: "canon-ef-85mm-1.4", name: "Canon EF 85mm f/1.4L IS USM", bonus: 20000, mount: "EF" },
  { id: "canon-ef-16-35mm-2.8", name: "Canon EF 16-35mm f/2.8L III USM", bonus: 18000, mount: "EF" },
  { id: "canon-ef-24-105mm-4", name: "Canon EF 24-105mm f/4L IS II USM", bonus: 12000, mount: "EF" },
  { id: "canon-ef-35mm-1.4", name: "Canon EF 35mm f/1.4L II USM", bonus: 16000, mount: "EF" },
  { id: "canon-ef-100mm-2.8-macro", name: "Canon EF 100mm f/2.8L Macro IS USM", bonus: 14000, mount: "EF" },
  { id: "canon-ef-70-200mm-4", name: "Canon EF 70-200mm f/4L IS II USM", bonus: 18000, mount: "EF" },
  { id: "canon-ef-17-40mm-4", name: "Canon EF 17-40mm f/4L USM", bonus: 8000, mount: "EF" }
];

const canonEFSLenses = [
  { id: "canon-efs-55-250mm", name: "Canon EF-S 55-250mm f/4-5.6 IS STM", bonus: 5000, mount: "EF-S" },
  { id: "canon-efs-18-55mm", name: "Canon EF-S 18-55mm f/3.5-5.6 IS STM", bonus: 2000, mount: "EF-S" },
  { id: "canon-efs-10-18mm", name: "Canon EF-S 10-18mm f/4.5-5.6 IS STM", bonus: 4000, mount: "EF-S" },
  { id: "canon-efs-18-135mm", name: "Canon EF-S 18-135mm f/3.5-5.6 IS USM", bonus: 6000, mount: "EF-S" },
  { id: "canon-efs-24mm-2.8", name: "Canon EF-S 24mm f/2.8 STM", bonus: 3000, mount: "EF-S" },
  { id: "canon-efs-10-22mm", name: "Canon EF-S 10-22mm f/3.5-4.5 USM", bonus: 7000, mount: "EF-S" },
  { id: "canon-efs-17-55mm-2.8", name: "Canon EF-S 17-55mm f/2.8 IS USM", bonus: 10000, mount: "EF-S" }
];

const canonRFLenses = [
  { id: "canon-rf-24-70mm-2.8", name: "Canon RF 24-70mm f/2.8L IS USM", bonus: 20000, mount: "RF" },
  { id: "canon-rf-70-200mm-2.8", name: "Canon RF 70-200mm f/2.8L IS USM", bonus: 30000, mount: "RF" },
  { id: "canon-rf-50mm-1.2", name: "Canon RF 50mm f/1.2L USM", bonus: 25000, mount: "RF" },
  { id: "canon-rf-85mm-1.2", name: "Canon RF 85mm f/1.2L USM", bonus: 28000, mount: "RF" },
  { id: "canon-rf-24-105mm-4", name: "Canon RF 24-105mm f/4L IS USM", bonus: 15000, mount: "RF" },
  { id: "canon-rf-15-35mm-2.8", name: "Canon RF 15-35mm f/2.8L IS USM", bonus: 22000, mount: "RF" },
  { id: "canon-rf-35mm-1.8", name: "Canon RF 35mm f/1.8 Macro IS STM", bonus: 8000, mount: "RF" },
  { id: "canon-rf-50mm-1.8", name: "Canon RF 50mm f/1.8 STM", bonus: 4000, mount: "RF" },
  { id: "canon-rf-100-500mm", name: "Canon RF 100-500mm f/4.5-7.1L IS USM", bonus: 35000, mount: "RF" }
];

const canonEFMLenses = [
  { id: "canon-efm-22mm-2", name: "Canon EF-M 22mm f/2 STM", bonus: 3000, mount: "EF-M" },
  { id: "canon-efm-18-150mm", name: "Canon EF-M 18-150mm f/3.5-6.3 IS STM", bonus: 6000, mount: "EF-M" },
  { id: "canon-efm-11-22mm", name: "Canon EF-M 11-22mm f/4-5.6 IS STM", bonus: 5000, mount: "EF-M" },
  { id: "canon-efm-32mm-1.4", name: "Canon EF-M 32mm f/1.4 STM", bonus: 7000, mount: "EF-M" },
  { id: "canon-efm-15-45mm", name: "Canon EF-M 15-45mm f/3.5-6.3 IS STM", bonus: 2000, mount: "EF-M" }
];

const nikonFLenses = [
  { id: "nikon-f-50mm-1.8", name: "Nikon AF-S 50mm f/1.8G", bonus: 3000, mount: "F" },
  { id: "nikon-f-24-70mm-2.8", name: "Nikon AF-S 24-70mm f/2.8E ED VR", bonus: 18000, mount: "F" },
  { id: "nikon-f-70-200mm-2.8", name: "Nikon AF-S 70-200mm f/2.8E FL ED VR", bonus: 28000, mount: "F" },
  { id: "nikon-f-85mm-1.4", name: "Nikon AF-S 85mm f/1.4G", bonus: 22000, mount: "F" },
  { id: "nikon-f-14-24mm-2.8", name: "Nikon AF-S 14-24mm f/2.8G ED", bonus: 20000, mount: "F" },
  { id: "nikon-f-18-55mm", name: "Nikon AF-P 18-55mm f/3.5-5.6G VR", bonus: 2000, mount: "F" },
  { id: "nikon-f-70-300mm", name: "Nikon AF-P 70-300mm f/4.5-6.3G ED VR", bonus: 6000, mount: "F" },
  { id: "nikon-f-10-20mm", name: "Nikon AF-P 10-20mm f/4.5-5.6G VR", bonus: 4000, mount: "F" },
  { id: "nikon-f-35mm-1.8", name: "Nikon AF-S 35mm f/1.8G ED", bonus: 8000, mount: "F" },
  { id: "nikon-f-105mm-2.8-macro", name: "Nikon AF-S 105mm f/2.8G VR Macro", bonus: 12000, mount: "F" },
  { id: "nikon-f-24-120mm-4", name: "Nikon AF-S 24-120mm f/4G ED VR", bonus: 10000, mount: "F" }
];

const nikonZLenses = [
  { id: "nikon-z-24-70mm-2.8", name: "Nikon Z 24-70mm f/2.8 S", bonus: 22000, mount: "Z" },
  { id: "nikon-z-70-200mm-2.8", name: "Nikon Z 70-200mm f/2.8 VR S", bonus: 32000, mount: "Z" },
  { id: "nikon-z-50mm-1.8", name: "Nikon Z 50mm f/1.8 S", bonus: 8000, mount: "Z" },
  { id: "nikon-z-85mm-1.8", name: "Nikon Z 85mm f/1.8 S", bonus: 12000, mount: "Z" },
  { id: "nikon-z-24-120mm-4", name: "Nikon Z 24-120mm f/4 S", bonus: 15000, mount: "Z" },
  { id: "nikon-z-14-30mm-4", name: "Nikon Z 14-30mm f/4 S", bonus: 16000, mount: "Z" },
  { id: "nikon-z-35mm-1.8", name: "Nikon Z 35mm f/1.8 S", bonus: 10000, mount: "Z" },
  { id: "nikon-z-24-200mm", name: "Nikon Z 24-200mm f/4-6.3 VR", bonus: 12000, mount: "Z" },
  { id: "nikon-z-105mm-2.8-macro", name: "Nikon Z MC 105mm f/2.8 VR S", bonus: 14000, mount: "Z" }
];

const sonyELenses = [
  { id: "sony-e-16-50mm", name: "Sony E PZ 16-50mm f/3.5-5.6 OSS", bonus: 2000, mount: "E" },
  { id: "sony-e-55-210mm", name: "Sony E 55-210mm f/4.5-6.3 OSS", bonus: 4000, mount: "E" },
  { id: "sony-e-18-105mm", name: "Sony E PZ 18-105mm f/4 G OSS", bonus: 8000, mount: "E" },
  { id: "sony-e-10-18mm", name: "Sony E 10-18mm f/4 OSS", bonus: 6000, mount: "E" },
  { id: "sony-e-50mm-1.8", name: "Sony E 50mm f/1.8 OSS", bonus: 5000, mount: "E" },
  { id: "sony-e-35mm-1.8", name: "Sony E 35mm f/1.8 OSS", bonus: 7000, mount: "E" },
  { id: "sony-e-18-135mm", name: "Sony E 18-135mm f/3.5-5.6 OSS", bonus: 7000, mount: "E" }
];

const sonyFELenses = [
  { id: "sony-fe-24-70mm-2.8", name: "Sony FE 24-70mm f/2.8 GM", bonus: 20000, mount: "FE" },
  { id: "sony-fe-70-200mm-2.8", name: "Sony FE 70-200mm f/2.8 GM OSS", bonus: 30000, mount: "FE" },
  { id: "sony-fe-85mm-1.4", name: "Sony FE 85mm f/1.4 GM", bonus: 25000, mount: "FE" },
  { id: "sony-fe-16-35mm-2.8", name: "Sony FE 16-35mm f/2.8 GM", bonus: 22000, mount: "FE" },
  { id: "sony-fe-50mm-1.4", name: "Sony FE 50mm f/1.4 ZA", bonus: 15000, mount: "FE" },
  { id: "sony-fe-100-400mm", name: "Sony FE 100-400mm f/4.5-5.6 GM OSS", bonus: 35000, mount: "FE" },
  { id: "sony-fe-24-105mm-4", name: "Sony FE 24-105mm f/4 G OSS", bonus: 14000, mount: "FE" },
  { id: "sony-fe-35mm-1.8", name: "Sony FE 35mm f/1.8", bonus: 9000, mount: "FE" },
  { id: "sony-fe-90mm-2.8-macro", name: "Sony FE 90mm f/2.8 Macro G OSS", bonus: 16000, mount: "FE" },
  { id: "sony-fe-55mm-1.8", name: "Sony FE 55mm f/1.8 ZA", bonus: 12000, mount: "FE" }
];

const fujifilmXLenses = [
  { id: "fuji-x-18-55mm", name: "Fujinon XF 18-55mm f/2.8-4 R LM OIS", bonus: 8000, mount: "X" },
  { id: "fuji-x-35mm-1.4", name: "Fujinon XF 35mm f/1.4 R", bonus: 10000, mount: "X" },
  { id: "fuji-x-23mm-2", name: "Fujinon XF 23mm f/2 R WR", bonus: 7000, mount: "X" },
  { id: "fuji-x-56mm-1.2", name: "Fujinon XF 56mm f/1.2 R", bonus: 15000, mount: "X" },
  { id: "fuji-x-50-140mm-2.8", name: "Fujinon XF 50-140mm f/2.8 R LM OIS WR", bonus: 20000, mount: "X" },
  { id: "fuji-x-16-55mm-2.8", name: "Fujinon XF 16-55mm f/2.8 R LM WR", bonus: 18000, mount: "X" },
  { id: "fuji-x-10-24mm-4", name: "Fujinon XF 10-24mm f/4 R OIS", bonus: 14000, mount: "X" },
  { id: "fuji-x-18-135mm", name: "Fujinon XF 18-135mm f/3.5-5.6 R LM OIS WR", bonus: 10000, mount: "X" },
  { id: "fuji-x-27mm-2.8", name: "Fujinon XF 27mm f/2.8 R WR", bonus: 5000, mount: "X" },
  { id: "fuji-x-80mm-2.8-macro", name: "Fujinon XF 80mm f/2.8 R LM OIS WR Macro", bonus: 16000, mount: "X" },
  { id: "fuji-x-50mm-2", name: "Fujinon XF 50mm f/2 R WR", bonus: 7000, mount: "X" },
  { id: "fuji-x-90mm-2", name: "Fujinon XF 90mm f/2 R LM WR", bonus: 14000, mount: "X" }
];

const lensCompatibility = {
  Canon: {
    // Canon EF Full-Frame DSLRs (EF mount only - no EF-S)
    "5D Mark IV": canonEFLenses,
    "EOS 5D Mark IV": canonEFLenses,
    "Canon EOS 5D Mark IV": canonEFLenses,
    "Canon 5D Mark IV": canonEFLenses,
    "5D Mark III": canonEFLenses,
    "EOS 5D Mark III": canonEFLenses,
    "Canon 5D Mark III": canonEFLenses,
    "5D Mark II": canonEFLenses,
    "EOS 5D Mark II": canonEFLenses,
    "Canon 5D Mark II": canonEFLenses,
    "5D": canonEFLenses,
    "EOS 5D": canonEFLenses,
    "Canon 5D": canonEFLenses,
    "5DS": canonEFLenses,
    "EOS 5DS": canonEFLenses,
    "Canon 5DS": canonEFLenses,
    "5DS R": canonEFLenses,
    "EOS 5DS R": canonEFLenses,
    "Canon 5DS R": canonEFLenses,
    "6D Mark II": canonEFLenses,
    "EOS 6D Mark II": canonEFLenses,
    "Canon 6D Mark II": canonEFLenses,
    "6D": canonEFLenses,
    "EOS 6D": canonEFLenses,
    "Canon 6D": canonEFLenses,
    "1D X Mark III": canonEFLenses,
    "EOS-1D X Mark III": canonEFLenses,
    "Canon 1D X Mark III": canonEFLenses,
    "1D X Mark II": canonEFLenses,
    "EOS-1D X Mark II": canonEFLenses,
    "Canon 1D X Mark II": canonEFLenses,
    "1D X": canonEFLenses,
    "EOS-1D X": canonEFLenses,
    "Canon 1D X": canonEFLenses,
    "1D Mark IV": canonEFLenses,
    "EOS-1D Mark IV": canonEFLenses,
    "Canon 1D Mark IV": canonEFLenses,
    "1Ds Mark III": canonEFLenses,
    "EOS-1Ds Mark III": canonEFLenses,
    "Canon 1Ds Mark III": canonEFLenses,
    
    // Canon APS-C DSLRs (EF + EF-S mount)
    "90D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 90D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 90D": [...canonEFLenses, ...canonEFSLenses],
    "80D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 80D": [...canonEFLenses, ...canonEFSLenses],
    "77D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 77D": [...canonEFLenses, ...canonEFSLenses],
    "70D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 70D": [...canonEFLenses, ...canonEFSLenses],
    "100D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 100D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 100D": [...canonEFLenses, ...canonEFSLenses],
    "200D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 200D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 200D": [...canonEFLenses, ...canonEFSLenses],
    "200D Mark II": [...canonEFLenses, ...canonEFSLenses],
    "EOS 200D Mark II": [...canonEFLenses, ...canonEFSLenses],
    "60D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 60D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 60D": [...canonEFLenses, ...canonEFSLenses],
    "50D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 50D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 50D": [...canonEFLenses, ...canonEFSLenses],
    "7D Mark II": [...canonEFLenses, ...canonEFSLenses],
    "EOS 7D Mark II": [...canonEFLenses, ...canonEFSLenses],
    "7D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 7D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T7i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T7i": [...canonEFLenses, ...canonEFSLenses],
    "800D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 800D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T6i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T6i": [...canonEFLenses, ...canonEFSLenses],
    "750D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 750D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T7": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T7": [...canonEFLenses, ...canonEFSLenses],
    "2000D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 2000D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel SL3": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel SL3": [...canonEFLenses, ...canonEFSLenses],
    "250D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 250D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T8i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T8i": [...canonEFLenses, ...canonEFSLenses],
    "850D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 850D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 850D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T6": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T6": [...canonEFLenses, ...canonEFSLenses],
    "1300D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 1300D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 1300D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T5": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T5": [...canonEFLenses, ...canonEFSLenses],
    "1200D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 1200D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 1200D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T100": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T100": [...canonEFLenses, ...canonEFSLenses],
    "4000D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 4000D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 4000D": [...canonEFLenses, ...canonEFSLenses],
    "3000D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 3000D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 3000D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel SL2": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel SL2": [...canonEFLenses, ...canonEFSLenses],
    "Rebel SL1": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel SL1": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T4i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T4i": [...canonEFLenses, ...canonEFSLenses],
    "650D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 650D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 650D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T3i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T3i": [...canonEFLenses, ...canonEFSLenses],
    "600D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 600D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 600D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T3": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T3": [...canonEFLenses, ...canonEFSLenses],
    "1100D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 1100D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 1100D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T2i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T2i": [...canonEFLenses, ...canonEFSLenses],
    "550D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 550D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 550D": [...canonEFLenses, ...canonEFSLenses],
    "Rebel T1i": [...canonEFLenses, ...canonEFSLenses],
    "EOS Rebel T1i": [...canonEFLenses, ...canonEFSLenses],
    "500D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 500D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 500D": [...canonEFLenses, ...canonEFSLenses],
    "450D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 450D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 450D": [...canonEFLenses, ...canonEFSLenses],
    "400D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 400D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 400D": [...canonEFLenses, ...canonEFSLenses],
    "350D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 350D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 350D": [...canonEFLenses, ...canonEFSLenses],
    "300D": [...canonEFLenses, ...canonEFSLenses],
    "EOS 300D": [...canonEFLenses, ...canonEFSLenses],
    "Canon 300D": [...canonEFLenses, ...canonEFSLenses],
    
    // Canon RF Mirrorless (RF mount)
    "EOS R5": canonRFLenses,
    "Canon EOS R5": canonRFLenses,
    "R5": canonRFLenses,
    "EOS R6": canonRFLenses,
    "Canon EOS R6": canonRFLenses,
    "R6": canonRFLenses,
    "EOS R": canonRFLenses,
    "Canon EOS R": canonRFLenses,
    "R": canonRFLenses,
    "EOS RP": canonRFLenses,
    "Canon EOS RP": canonRFLenses,
    "RP": canonRFLenses,
    "EOS R3": canonRFLenses,
    "Canon EOS R3": canonRFLenses,
    "R3": canonRFLenses,
    "EOS R7": canonRFLenses,
    "Canon EOS R7": canonRFLenses,
    "R7": canonRFLenses,
    "EOS R10": canonRFLenses,
    "Canon EOS R10": canonRFLenses,
    "R10": canonRFLenses,
    
    // Canon EF-M Mirrorless (EF-M mount)
    "EOS M50": canonEFMLenses,
    "Canon EOS M50": canonEFMLenses,
    "M50": canonEFMLenses,
    "EOS M50 Mark II": canonEFMLenses,
    "Canon EOS M50 Mark II": canonEFMLenses,
    "M50 Mark II": canonEFMLenses,
    "EOS M6 Mark II": canonEFMLenses,
    "Canon EOS M6 Mark II": canonEFMLenses,
    "M6 Mark II": canonEFMLenses,
    "EOS M6": canonEFMLenses,
    "Canon EOS M6": canonEFMLenses,
    "M6": canonEFMLenses,
    "EOS M5": canonEFMLenses,
    "Canon EOS M5": canonEFMLenses,
    "M5": canonEFMLenses,
    "EOS M200": canonEFMLenses,
    "Canon EOS M200": canonEFMLenses,
    "M200": canonEFMLenses
  },
  
  Nikon: {
    // Nikon Full-Frame DSLRs (F-mount)
    "D850": nikonFLenses,
    "Nikon D850": nikonFLenses,
    "D810": nikonFLenses,
    "Nikon D810": nikonFLenses,
    "D800": nikonFLenses,
    "Nikon D800": nikonFLenses,
    "D800E": nikonFLenses,
    "Nikon D800E": nikonFLenses,
    "D780": nikonFLenses,
    "Nikon D780": nikonFLenses,
    "D750": nikonFLenses,
    "Nikon D750": nikonFLenses,
    "D700": nikonFLenses,
    "Nikon D700": nikonFLenses,
    "D610": nikonFLenses,
    "Nikon D610": nikonFLenses,
    "D600": nikonFLenses,
    "Nikon D600": nikonFLenses,
    "Df": nikonFLenses,
    "Nikon Df": nikonFLenses,
    "D5": nikonFLenses,
    "Nikon D5": nikonFLenses,
    "D6": nikonFLenses,
    "Nikon D6": nikonFLenses,
    "D4": nikonFLenses,
    "Nikon D4": nikonFLenses,
    "D4S": nikonFLenses,
    "Nikon D4S": nikonFLenses,
    "D3": nikonFLenses,
    "Nikon D3": nikonFLenses,
    "D3S": nikonFLenses,
    "Nikon D3S": nikonFLenses,
    
    // Nikon APS-C DSLRs (F-mount)
    "D7500": nikonFLenses,
    "Nikon D7500": nikonFLenses,
    "D7200": nikonFLenses,
    "Nikon D7200": nikonFLenses,
    "D7100": nikonFLenses,
    "Nikon D7100": nikonFLenses,
    "D7000": nikonFLenses,
    "Nikon D7000": nikonFLenses,
    "D500": nikonFLenses,
    "Nikon D500": nikonFLenses,
    "D5600": nikonFLenses,
    "Nikon D5600": nikonFLenses,
    "D5500": nikonFLenses,
    "Nikon D5500": nikonFLenses,
    "D5300": nikonFLenses,
    "Nikon D5300": nikonFLenses,
    "D5200": nikonFLenses,
    "Nikon D5200": nikonFLenses,
    "D5100": nikonFLenses,
    "Nikon D5100": nikonFLenses,
    "D5000": nikonFLenses,
    "Nikon D5000": nikonFLenses,
    "D3500": nikonFLenses,
    "Nikon D3500": nikonFLenses,
    "D3400": nikonFLenses,
    "Nikon D3400": nikonFLenses,
    "D3300": nikonFLenses,
    "Nikon D3300": nikonFLenses,
    "D3200": nikonFLenses,
    "Nikon D3200": nikonFLenses,
    "D3100": nikonFLenses,
    "Nikon D3100": nikonFLenses,
    "D3000": nikonFLenses,
    "Nikon D3000": nikonFLenses,
    "D90": nikonFLenses,
    "Nikon D90": nikonFLenses,
    "D80": nikonFLenses,
    "Nikon D80": nikonFLenses,
    "D70": nikonFLenses,
    "Nikon D70": nikonFLenses,
    "D70S": nikonFLenses,
    "Nikon D70S": nikonFLenses,
    "D60": nikonFLenses,
    "Nikon D60": nikonFLenses,
    "D50": nikonFLenses,
    "Nikon D50": nikonFLenses,
    "D40": nikonFLenses,
    "Nikon D40": nikonFLenses,
    "D40X": nikonFLenses,
    "Nikon D40X": nikonFLenses,
    
    // Nikon Z Mirrorless (Z-mount)
    "Z6": nikonZLenses,
    "Nikon Z6": nikonZLenses,
    "Z 6": nikonZLenses,
    "Z6 II": nikonZLenses,
    "Nikon Z6 II": nikonZLenses,
    "Z 6 II": nikonZLenses,
    "Z7": nikonZLenses,
    "Nikon Z7": nikonZLenses,
    "Z 7": nikonZLenses,
    "Z7 II": nikonZLenses,
    "Nikon Z7 II": nikonZLenses,
    "Z 7 II": nikonZLenses,
    "Z5": nikonZLenses,
    "Nikon Z5": nikonZLenses,
    "Z 5": nikonZLenses,
    "Z50": nikonZLenses,
    "Nikon Z50": nikonZLenses,
    "Z 50": nikonZLenses,
    "Z9": nikonZLenses,
    "Nikon Z9": nikonZLenses,
    "Z 9": nikonZLenses,
    "Z30": nikonZLenses,
    "Nikon Z30": nikonZLenses,
    "Z 30": nikonZLenses,
    "Zfc": nikonZLenses,
    "Nikon Zfc": nikonZLenses,
    "Z fc": nikonZLenses
  },
  
  Sony: {
    // Sony APS-C E-mount (E + FE lenses compatible)
    "Alpha A6700": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6700": [...sonyELenses, ...sonyFELenses],
    "A6700": [...sonyELenses, ...sonyFELenses],
    "Alpha 6700": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha 6700": [...sonyELenses, ...sonyFELenses],
    "Alpha A6600": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6600": [...sonyELenses, ...sonyFELenses],
    "A6600": [...sonyELenses, ...sonyFELenses],
    "Alpha A6500": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6500": [...sonyELenses, ...sonyFELenses],
    "A6500": [...sonyELenses, ...sonyFELenses],
    "Alpha A6400": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6400": [...sonyELenses, ...sonyFELenses],
    "A6400": [...sonyELenses, ...sonyFELenses],
    "Alpha A6300": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6300": [...sonyELenses, ...sonyFELenses],
    "A6300": [...sonyELenses, ...sonyFELenses],
    "Alpha A6100": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6100": [...sonyELenses, ...sonyFELenses],
    "A6100": [...sonyELenses, ...sonyFELenses],
    "Alpha A6000": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A6000": [...sonyELenses, ...sonyFELenses],
    "A6000": [...sonyELenses, ...sonyFELenses],
    "Alpha A5100": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A5100": [...sonyELenses, ...sonyFELenses],
    "A5100": [...sonyELenses, ...sonyFELenses],
    "Alpha A5000": [...sonyELenses, ...sonyFELenses],
    "Sony Alpha A5000": [...sonyELenses, ...sonyFELenses],
    "A5000": [...sonyELenses, ...sonyFELenses],
    "ZV-E10": [...sonyELenses, ...sonyFELenses],
    "Sony ZV-E10": [...sonyELenses, ...sonyFELenses],
    "NEX-7": [...sonyELenses, ...sonyFELenses],
    "Sony NEX-7": [...sonyELenses, ...sonyFELenses],
    "NEX-6": [...sonyELenses, ...sonyFELenses],
    "Sony NEX-6": [...sonyELenses, ...sonyFELenses],
    "NEX-5": [...sonyELenses, ...sonyFELenses],
    "Sony NEX-5": [...sonyELenses, ...sonyFELenses],
    
    // Sony Full-Frame E-mount (FE lenses only)
    "Alpha A7 III": sonyFELenses,
    "Sony Alpha A7 III": sonyFELenses,
    "A7 III": sonyFELenses,
    "A7III": sonyFELenses,
    "Alpha A7R IV": sonyFELenses,
    "Sony Alpha A7R IV": sonyFELenses,
    "A7R IV": sonyFELenses,
    "A7RIV": sonyFELenses,
    "Alpha A7R III": sonyFELenses,
    "Sony Alpha A7R III": sonyFELenses,
    "A7R III": sonyFELenses,
    "A7RIII": sonyFELenses,
    "Alpha A7 II": sonyFELenses,
    "Sony Alpha A7 II": sonyFELenses,
    "A7 II": sonyFELenses,
    "A7II": sonyFELenses,
    "Alpha A7": sonyFELenses,
    "Sony Alpha A7": sonyFELenses,
    "A7": sonyFELenses,
    "Alpha A7S III": sonyFELenses,
    "Sony Alpha A7S III": sonyFELenses,
    "A7S III": sonyFELenses,
    "A7SIII": sonyFELenses,
    "Alpha A7S II": sonyFELenses,
    "Sony Alpha A7S II": sonyFELenses,
    "A7S II": sonyFELenses,
    "A7SII": sonyFELenses,
    "Alpha A7C": sonyFELenses,
    "Sony Alpha A7C": sonyFELenses,
    "A7C": sonyFELenses,
    "Alpha A9": sonyFELenses,
    "Sony Alpha A9": sonyFELenses,
    "A9": sonyFELenses,
    "Alpha A9 II": sonyFELenses,
    "Sony Alpha A9 II": sonyFELenses,
    "A9 II": sonyFELenses,
    "A9II": sonyFELenses,
    "Alpha A1": sonyFELenses,
    "Sony Alpha A1": sonyFELenses,
    "A1": sonyFELenses,
    "Alpha A7R V": sonyFELenses,
    "Sony Alpha A7R V": sonyFELenses,
    "A7R V": sonyFELenses,
    "A7RV": sonyFELenses,
    "Alpha A7 IV": sonyFELenses,
    "Sony Alpha A7 IV": sonyFELenses,
    "A7 IV": sonyFELenses,
    "A7IV": sonyFELenses,
    "Alpha A7S": sonyFELenses,
    "Sony Alpha A7S": sonyFELenses,
    "A7S": sonyFELenses,
    "Alpha A7R": sonyFELenses,
    "Sony Alpha A7R": sonyFELenses,
    "A7R": sonyFELenses,
    "Alpha A7R II": sonyFELenses,
    "Sony Alpha A7R II": sonyFELenses,
    "A7R II": sonyFELenses,
    "A7RII": sonyFELenses
  },
  
  Fujifilm: {
    // Fujifilm X-mount (all X-series cameras)
    "X-T4": fujifilmXLenses,
    "Fujifilm X-T4": fujifilmXLenses,
    "X-T3": fujifilmXLenses,
    "Fujifilm X-T3": fujifilmXLenses,
    "X-T2": fujifilmXLenses,
    "Fujifilm X-T2": fujifilmXLenses,
    "X-T30": fujifilmXLenses,
    "Fujifilm X-T30": fujifilmXLenses,
    "X-T30 II": fujifilmXLenses,
    "Fujifilm X-T30 II": fujifilmXLenses,
    "X-T20": fujifilmXLenses,
    "Fujifilm X-T20": fujifilmXLenses,
    "X-T200": fujifilmXLenses,
    "Fujifilm X-T200": fujifilmXLenses,
    "X-Pro3": fujifilmXLenses,
    "Fujifilm X-Pro3": fujifilmXLenses,
    "X-Pro2": fujifilmXLenses,
    "Fujifilm X-Pro2": fujifilmXLenses,
    "X-E4": fujifilmXLenses,
    "Fujifilm X-E4": fujifilmXLenses,
    "X-E3": fujifilmXLenses,
    "Fujifilm X-E3": fujifilmXLenses,
    "X-S10": fujifilmXLenses,
    "Fujifilm X-S10": fujifilmXLenses,
    "X-H1": fujifilmXLenses,
    "Fujifilm X-H1": fujifilmXLenses,
    "X-H2": fujifilmXLenses,
    "Fujifilm X-H2": fujifilmXLenses,
    "X-H2S": fujifilmXLenses,
    "Fujifilm X-H2S": fujifilmXLenses,
    "X-A7": fujifilmXLenses,
    "Fujifilm X-A7": fujifilmXLenses,
    "X-A5": fujifilmXLenses,
    "Fujifilm X-A5": fujifilmXLenses,
    "X100V": fujifilmXLenses,
    "Fujifilm X100V": fujifilmXLenses
  }
};

/**
 * Check if camera is a fixed-lens camera (bridge, point-and-shoot, compact)
 * These cameras do not support interchangeable lenses
 * @param {string} brand - Camera brand
 * @param {string} model - Camera model
 * @returns {boolean} True if fixed-lens camera
 */
function isFixedLensCamera(brand, model) {
  if (!brand || !model) return false;
  
  const modelLower = model.toLowerCase();
  
  // Nikon fixed-lens series (all Coolpix models)
  const brandLower = brand.toLowerCase();
  if (brandLower === 'nikon' && modelLower.includes('coolpix')) {
    return true;
  }
  
  // Nikon 1 series (mirrorless but discontinued - still interchangeable)
  // Keep this as interchangeable lens camera
  
  // Canon fixed-lens series
  if (brand === 'Canon' && (
    modelLower.includes('powershot') ||
    modelLower.includes('sx')
  )) {
    return true;
  }
  
  // Sony fixed-lens series
  if (brand === 'Sony' && (
    modelLower.includes('rx') ||
    modelLower.includes('cyber-shot')
  )) {
    return true;
  }
  
  // Fujifilm fixed-lens series (X100 series has fixed lens)
  if (brand === 'Fujifilm' && (
    modelLower.includes('x100') &&
    !modelLower.includes('x100v') // X100V can have adapters
  )) {
    return true;
  }
  
  // GoPro, DJI - all fixed lens
  if (brand === 'GoPro' || brand === 'DJI') {
    return true;
  }
  
  return false;
}

/**
 * Get compatible lenses for a specific camera brand and model
 * @param {string} brand - Camera brand (e.g., "Canon", "Sony", "Nikon", "Fujifilm")
 * @param {string} model - Camera model (e.g., "5D Mark IV", "Alpha A6500", "Canon EOS 5D Mark IV")
 * @returns {Array} Array of compatible lens objects, or empty array if not found
 */
function getCompatibleLenses(brand, model) {
  if (!brand || !model) {
    if (window.Logger) {
      window.Logger.warn("getCompatibleLenses: brand or model is missing", { brand, model });
    }
    return [];
  }
  
  // Check if this is a fixed-lens camera
  if (isFixedLensCamera(brand, model)) {
    if (window.Logger) {
      window.Logger.log(`getCompatibleLenses: ${brand} ${model} is a fixed-lens camera - no interchangeable lenses supported`);
    }
    return [];
  }
  
  // Normalize brand name (capitalize first letter)
  const normalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  
  // Check if brand exists
  if (!lensCompatibility[normalizedBrand]) {
    if (window.Logger) {
      window.Logger.warn(`getCompatibleLenses: Brand "${normalizedBrand}" not found in compatibility data`);
    }
    return [];
  }
  
  // Normalize model name - remove brand prefix if duplicated
  let normalizedModel = model.trim();
  
  // Remove brand prefixes from model names
  const brandPrefixes = {
    'Canon': ['canon ', 'eos ', 'canon eos '],
    'Nikon': ['nikon '],
    'Sony': ['sony ', 'sony alpha ', 'alpha '],
    'Fujifilm': ['fujifilm ', 'fuji ']
  };
  
  if (brandPrefixes[normalizedBrand]) {
    const prefixes = brandPrefixes[normalizedBrand];
    const lowerModel = normalizedModel.toLowerCase();
    
    // Try removing each prefix (longest first to handle "sony alpha" before "sony")
    for (const prefix of prefixes.sort((a, b) => b.length - a.length)) {
      if (lowerModel.startsWith(prefix)) {
        normalizedModel = normalizedModel.substring(prefix.length).trim();
        break;
      }
    }
  }
  
  // Try exact model match first
  if (lensCompatibility[normalizedBrand][model]) {
    return lensCompatibility[normalizedBrand][model];
  }
  
  // Try normalized model match
  if (lensCompatibility[normalizedBrand][normalizedModel]) {
    return lensCompatibility[normalizedBrand][normalizedModel];
  }
  
  // Try case-insensitive match
  const modelKeys = Object.keys(lensCompatibility[normalizedBrand]);
  const matchedModel = modelKeys.find(key => 
    key.toLowerCase() === model.toLowerCase() || 
    key.toLowerCase() === normalizedModel.toLowerCase()
  );
  
  if (matchedModel) {
    return lensCompatibility[normalizedBrand][matchedModel];
  }
  
  // Try partial match (e.g., "5D Mark IV" matches "EOS 5D Mark IV")
  // This handles cases where model might be "5D Mark IV" but DB has "EOS 5D Mark IV"
  const partialMatch = modelKeys.find(key => {
    const keyLower = key.toLowerCase();
    const modelLower = model.toLowerCase();
    const normalizedModelLower = normalizedModel.toLowerCase();
    
    // Check if key contains model or vice versa (with minimum length to avoid false matches)
    const minMatchLength = 3; // Avoid matching on very short strings like "R"
    
    if (modelLower.length >= minMatchLength && keyLower.includes(modelLower)) {
      return true;
    }
    if (keyLower.length >= minMatchLength && modelLower.includes(keyLower)) {
      return true;
    }
    if (normalizedModelLower.length >= minMatchLength && keyLower.includes(normalizedModelLower)) {
      return true;
    }
    if (keyLower.length >= minMatchLength && normalizedModelLower.includes(keyLower)) {
      return true;
    }
    
    return false;
  });
  
  if (partialMatch) {
    if (window.Logger) {
      window.Logger.log(`getCompatibleLenses: Found partial match "${partialMatch}" for model "${model}"`);
    }
    return lensCompatibility[normalizedBrand][partialMatch];
  }
  
  // If no match found, return empty array
  if (window.Logger) {
    window.Logger.warn(`getCompatibleLenses: Model "${model}" (normalized: "${normalizedModel}") not found for brand "${normalizedBrand}". Available models:`, modelKeys);
  }
  return [];
}

// Export globally
window.lensCompatibility = lensCompatibility;
window.getCompatibleLenses = getCompatibleLenses;
window.isFixedLensCamera = isFixedLensCamera;

