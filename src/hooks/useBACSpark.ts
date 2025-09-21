import { useState, useEffect } from 'react';

export interface BACType {
  id: string;
  name: string;
  status: 'locked' | 'active';
  documents: string[];
}

export interface Code {
  id: string;
  code: string;
  bacType: string;
  used: boolean;
  usedAt?: Date;
}

const BAC_TYPES: BACType[] = [
  {
    id: 'math',
    name: 'Mathématiques',
    status: 'locked',
    documents: [
      'https://drive.google.com/file/d/1abc123/view',
      'https://drive.google.com/file/d/1def456/view',
    ]
  },
  {
    id: 'sciences',
    name: 'Sciences Expérimentales',
    status: 'locked',
    documents: [
      'https://drive.google.com/file/d/1ghi789/view',
      'https://drive.google.com/file/d/1jkl012/view',
    ]
  },
  {
    id: 'techniques',
    name: 'Techniques',
    status: 'locked',
    documents: [
      'https://drive.google.com/file/d/1mno345/view',
      'https://drive.google.com/file/d/1pqr678/view',
    ]
  },
  {
    id: 'lettres',
    name: 'Lettres',
    status: 'locked',
    documents: [
      'https://drive.google.com/file/d/1stu901/view',
      'https://drive.google.com/file/d/1vwx234/view',
    ]
  },
  {
    id: 'informatique',
    name: 'Sciences de l\'informatique',
    status: 'locked',
    documents: [
      'https://drive.google.com/file/d/1yza567/view',
      'https://drive.google.com/file/d/1bcd890/view',
    ]
  },
  {
    id: 'economie',
    name: 'Économie',
    status: 'locked',
    documents: [
      'https://drive.google.com/file/d/1efg123/view',
      'https://drive.google.com/file/d/1hij456/view',
    ]
  }
];

// Predefined codes for each BAC type - 20 codes per type
const PREDEFINED_CODES: Code[] = [
  // Math codes
  { id: 'math_1', code: 'MATH001A1B2', bacType: 'math', used: false },
  { id: 'math_2', code: 'MATH002C3D4', bacType: 'math', used: false },
  { id: 'math_3', code: 'MATH003E5F6', bacType: 'math', used: false },
  { id: 'math_4', code: 'MATH004G7H8', bacType: 'math', used: false },
  { id: 'math_5', code: 'MATH005I9J0', bacType: 'math', used: false },
  { id: 'math_6', code: 'MATH006K1L2', bacType: 'math', used: false },
  { id: 'math_7', code: 'MATH007M3N4', bacType: 'math', used: false },
  { id: 'math_8', code: 'MATH008O5P6', bacType: 'math', used: false },
  { id: 'math_9', code: 'MATH009Q7R8', bacType: 'math', used: false },
  { id: 'math_10', code: 'MATH010S9T0', bacType: 'math', used: false },
  { id: 'math_11', code: 'MATH011U1V2', bacType: 'math', used: false },
  { id: 'math_12', code: 'MATH012W3X4', bacType: 'math', used: false },
  { id: 'math_13', code: 'MATH013Y5Z6', bacType: 'math', used: false },
  { id: 'math_14', code: 'MATH014A7B8', bacType: 'math', used: false },
  { id: 'math_15', code: 'MATH015C9D0', bacType: 'math', used: false },
  { id: 'math_16', code: 'MATH016E1F2', bacType: 'math', used: false },
  { id: 'math_17', code: 'MATH017G3H4', bacType: 'math', used: false },
  { id: 'math_18', code: 'MATH018I5J6', bacType: 'math', used: false },
  { id: 'math_19', code: 'MATH019K7L8', bacType: 'math', used: false },
  { id: 'math_20', code: 'MATH020M9N0', bacType: 'math', used: false },

  // Sciences codes
  { id: 'sciences_1', code: 'SCI001A1B2', bacType: 'sciences', used: false },
  { id: 'sciences_2', code: 'SCI002C3D4', bacType: 'sciences', used: false },
  { id: 'sciences_3', code: 'SCI003E5F6', bacType: 'sciences', used: false },
  { id: 'sciences_4', code: 'SCI004G7H8', bacType: 'sciences', used: false },
  { id: 'sciences_5', code: 'SCI005I9J0', bacType: 'sciences', used: false },
  { id: 'sciences_6', code: 'SCI006K1L2', bacType: 'sciences', used: false },
  { id: 'sciences_7', code: 'SCI007M3N4', bacType: 'sciences', used: false },
  { id: 'sciences_8', code: 'SCI008O5P6', bacType: 'sciences', used: false },
  { id: 'sciences_9', code: 'SCI009Q7R8', bacType: 'sciences', used: false },
  { id: 'sciences_10', code: 'SCI010S9T0', bacType: 'sciences', used: false },
  { id: 'sciences_11', code: 'SCI011U1V2', bacType: 'sciences', used: false },
  { id: 'sciences_12', code: 'SCI012W3X4', bacType: 'sciences', used: false },
  { id: 'sciences_13', code: 'SCI013Y5Z6', bacType: 'sciences', used: false },
  { id: 'sciences_14', code: 'SCI014A7B8', bacType: 'sciences', used: false },
  { id: 'sciences_15', code: 'SCI015C9D0', bacType: 'sciences', used: false },
  { id: 'sciences_16', code: 'SCI016E1F2', bacType: 'sciences', used: false },
  { id: 'sciences_17', code: 'SCI017G3H4', bacType: 'sciences', used: false },
  { id: 'sciences_18', code: 'SCI018I5J6', bacType: 'sciences', used: false },
  { id: 'sciences_19', code: 'SCI019K7L8', bacType: 'sciences', used: false },
  { id: 'sciences_20', code: 'SCI020M9N0', bacType: 'sciences', used: false },

  // Techniques codes
  { id: 'techniques_1', code: 'TECH001A1B2', bacType: 'techniques', used: false },
  { id: 'techniques_2', code: 'TECH002C3D4', bacType: 'techniques', used: false },
  { id: 'techniques_3', code: 'TECH003E5F6', bacType: 'techniques', used: false },
  { id: 'techniques_4', code: 'TECH004G7H8', bacType: 'techniques', used: false },
  { id: 'techniques_5', code: 'TECH005I9J0', bacType: 'techniques', used: false },
  { id: 'techniques_6', code: 'TECH006K1L2', bacType: 'techniques', used: false },
  { id: 'techniques_7', code: 'TECH007M3N4', bacType: 'techniques', used: false },
  { id: 'techniques_8', code: 'TECH008O5P6', bacType: 'techniques', used: false },
  { id: 'techniques_9', code: 'TECH009Q7R8', bacType: 'techniques', used: false },
  { id: 'techniques_10', code: 'TECH010S9T0', bacType: 'techniques', used: false },
  { id: 'techniques_11', code: 'TECH011U1V2', bacType: 'techniques', used: false },
  { id: 'techniques_12', code: 'TECH012W3X4', bacType: 'techniques', used: false },
  { id: 'techniques_13', code: 'TECH013Y5Z6', bacType: 'techniques', used: false },
  { id: 'techniques_14', code: 'TECH014A7B8', bacType: 'techniques', used: false },
  { id: 'techniques_15', code: 'TECH015C9D0', bacType: 'techniques', used: false },
  { id: 'techniques_16', code: 'TECH016E1F2', bacType: 'techniques', used: false },
  { id: 'techniques_17', code: 'TECH017G3H4', bacType: 'techniques', used: false },
  { id: 'techniques_18', code: 'TECH018I5J6', bacType: 'techniques', used: false },
  { id: 'techniques_19', code: 'TECH019K7L8', bacType: 'techniques', used: false },
  { id: 'techniques_20', code: 'TECH020M9N0', bacType: 'techniques', used: false },

  // Lettres codes
  { id: 'lettres_1', code: 'LET001A1B2', bacType: 'lettres', used: false },
  { id: 'lettres_2', code: 'LET002C3D4', bacType: 'lettres', used: false },
  { id: 'lettres_3', code: 'LET003E5F6', bacType: 'lettres', used: false },
  { id: 'lettres_4', code: 'LET004G7H8', bacType: 'lettres', used: false },
  { id: 'lettres_5', code: 'LET005I9J0', bacType: 'lettres', used: false },
  { id: 'lettres_6', code: 'LET006K1L2', bacType: 'lettres', used: false },
  { id: 'lettres_7', code: 'LET007M3N4', bacType: 'lettres', used: false },
  { id: 'lettres_8', code: 'LET008O5P6', bacType: 'lettres', used: false },
  { id: 'lettres_9', code: 'LET009Q7R8', bacType: 'lettres', used: false },
  { id: 'lettres_10', code: 'LET010S9T0', bacType: 'lettres', used: false },
  { id: 'lettres_11', code: 'LET011U1V2', bacType: 'lettres', used: false },
  { id: 'lettres_12', code: 'LET012W3X4', bacType: 'lettres', used: false },
  { id: 'lettres_13', code: 'LET013Y5Z6', bacType: 'lettres', used: false },
  { id: 'lettres_14', code: 'LET014A7B8', bacType: 'lettres', used: false },
  { id: 'lettres_15', code: 'LET015C9D0', bacType: 'lettres', used: false },
  { id: 'lettres_16', code: 'LET016E1F2', bacType: 'lettres', used: false },
  { id: 'lettres_17', code: 'LET017G3H4', bacType: 'lettres', used: false },
  { id: 'lettres_18', code: 'LET018I5J6', bacType: 'lettres', used: false },
  { id: 'lettres_19', code: 'LET019K7L8', bacType: 'lettres', used: false },
  { id: 'lettres_20', code: 'LET020M9N0', bacType: 'lettres', used: false },

  // Informatique codes
  { id: 'informatique_1', code: 'INFO001A1B2', bacType: 'informatique', used: false },
  { id: 'informatique_2', code: 'INFO002C3D4', bacType: 'informatique', used: false },
  { id: 'informatique_3', code: 'INFO003E5F6', bacType: 'informatique', used: false },
  { id: 'informatique_4', code: 'INFO004G7H8', bacType: 'informatique', used: false },
  { id: 'informatique_5', code: 'INFO005I9J0', bacType: 'informatique', used: false },
  { id: 'informatique_6', code: 'INFO006K1L2', bacType: 'informatique', used: false },
  { id: 'informatique_7', code: 'INFO007M3N4', bacType: 'informatique', used: false },
  { id: 'informatique_8', code: 'INFO008O5P6', bacType: 'informatique', used: false },
  { id: 'informatique_9', code: 'INFO009Q7R8', bacType: 'informatique', used: false },
  { id: 'informatique_10', code: 'INFO010S9T0', bacType: 'informatique', used: false },
  { id: 'informatique_11', code: 'INFO011U1V2', bacType: 'informatique', used: false },
  { id: 'informatique_12', code: 'INFO012W3X4', bacType: 'informatique', used: false },
  { id: 'informatique_13', code: 'INFO013Y5Z6', bacType: 'informatique', used: false },
  { id: 'informatique_14', code: 'INFO014A7B8', bacType: 'informatique', used: false },
  { id: 'informatique_15', code: 'INFO015C9D0', bacType: 'informatique', used: false },
  { id: 'informatique_16', code: 'INFO016E1F2', bacType: 'informatique', used: false },
  { id: 'informatique_17', code: 'INFO017G3H4', bacType: 'informatique', used: false },
  { id: 'informatique_18', code: 'INFO018I5J6', bacType: 'informatique', used: false },
  { id: 'informatique_19', code: 'INFO019K7L8', bacType: 'informatique', used: false },
  { id: 'informatique_20', code: 'INFO020M9N0', bacType: 'informatique', used: false },

  // Économie codes
  { id: 'economie_1', code: 'ECO001A1B2', bacType: 'economie', used: false },
  { id: 'economie_2', code: 'ECO002C3D4', bacType: 'economie', used: false },
  { id: 'economie_3', code: 'ECO003E5F6', bacType: 'economie', used: false },
  { id: 'economie_4', code: 'ECO004G7H8', bacType: 'economie', used: false },
  { id: 'economie_5', code: 'ECO005I9J0', bacType: 'economie', used: false },
  { id: 'economie_6', code: 'ECO006K1L2', bacType: 'economie', used: false },
  { id: 'economie_7', code: 'ECO007M3N4', bacType: 'economie', used: false },
  { id: 'economie_8', code: 'ECO008O5P6', bacType: 'economie', used: false },
  { id: 'economie_9', code: 'ECO009Q7R8', bacType: 'economie', used: false },
  { id: 'economie_10', code: 'ECO010S9T0', bacType: 'economie', used: false },
  { id: 'economie_11', code: 'ECO011U1V2', bacType: 'economie', used: false },
  { id: 'economie_12', code: 'ECO012W3X4', bacType: 'economie', used: false },
  { id: 'economie_13', code: 'ECO013Y5Z6', bacType: 'economie', used: false },
  { id: 'economie_14', code: 'ECO014A7B8', bacType: 'economie', used: false },
  { id: 'economie_15', code: 'ECO015C9D0', bacType: 'economie', used: false },
  { id: 'economie_16', code: 'ECO016E1F2', bacType: 'economie', used: false },
  { id: 'economie_17', code: 'ECO017G3H4', bacType: 'economie', used: false },
  { id: 'economie_18', code: 'ECO018I5J6', bacType: 'economie', used: false },
  { id: 'economie_19', code: 'ECO019K7L8', bacType: 'economie', used: false },
  { id: 'economie_20', code: 'ECO020M9N0', bacType: 'economie', used: false },
];

export const useBACSpark = () => {
  const [bacTypes, setBacTypes] = useState<BACType[]>(BAC_TYPES);
  const [codes, setCodes] = useState<Code[]>(() => [...PREDEFINED_CODES]);
  const [activeBac, setActiveBac] = useState<string | null>(null);
  const [usedCodes, setUsedCodes] = useState<Code[]>([]);

  const validateCode = (inputCode: string): boolean => {
    const code = codes.find(c => c.code === inputCode.toUpperCase() && !c.used);

    if (code) {
      // Activate the corresponding BAC type
      setBacTypes(prev => prev.map(bac => ({
        ...bac,
        status: bac.id === code.bacType ? 'active' : 'locked'
      })));
      setActiveBac(code.bacType);
      return true;
    }
    return false;
  };

  const markCodeAsUsed = (codeId: string) => {
    setCodes(prev => {
      const updatedCodes = prev.map(code =>
        code.id === codeId
          ? { ...code, used: true, usedAt: new Date() }
          : code
      );

      // Add to used codes
      const usedCode = updatedCodes.find(c => c.id === codeId);
      if (usedCode) {
        setUsedCodes(prevUsed => [...prevUsed, usedCode]);
      }

      return updatedCodes.filter(code => !code.used);
    });
  };

  const getAvailableCodes = (bacType?: string) => {
    return codes.filter(code =>
      !code.used && (bacType ? code.bacType === bacType : true)
    );
  };

  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return {
    bacTypes,
    codes: getAvailableCodes(),
    usedCodes,
    activeBac,
    validateCode,
    markCodeAsUsed,
    getAvailableCodes,
    copyCodeToClipboard
  };
};