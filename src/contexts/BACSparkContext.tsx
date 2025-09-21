import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

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

// Generate 100 codes for each BAC type
const generateCodes = (): Code[] => {
    const codes: Code[] = [];
    const bacTypes = ['math', 'sciences', 'techniques', 'lettres', 'informatique', 'economie'];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    bacTypes.forEach(bacType => {
        for (let i = 1; i <= 100; i++) {
            // Generate deterministic suffix based on bacType and index
            const seed = (bacType.charCodeAt(0) + bacType.charCodeAt(1) + i) % chars.length;
            let suffix = '';
            for (let j = 0; j < 4; j++) {
                const charIndex = (seed + j * 7) % chars.length;
                suffix += chars.charAt(charIndex);
            }

            const codeNumber = String(i).padStart(3, '0');
            const bacPrefix = bacType === 'sciences' ? 'SCI' :
                bacType === 'techniques' ? 'TECH' :
                    bacType === 'lettres' ? 'LET' :
                        bacType === 'informatique' ? 'INFO' :
                            bacType === 'economie' ? 'ECO' : 'MATH';

            codes.push({
                id: `${bacType}_${i}`,
                code: `${bacPrefix}${codeNumber}${suffix}`,
                bacType: bacType,
                used: false
            });
        }
    });

    return codes;
};

// Predefined codes for each BAC type - 100 codes per type (600 total)
const PREDEFINED_CODES: Code[] = generateCodes();

interface BACSparkContextType {
    bacTypes: BACType[];
    codes: Code[];
    usedCodes: Code[];
    activeBac: string | null;
    validateCode: (inputCode: string) => boolean;
    markCodeAsUsed: (codeId: string) => void;
    getAvailableCodes: (bacType?: string) => Code[];
    copyCodeToClipboard: (code: string) => void;
}

const BACSparkContext = createContext<BACSparkContextType | undefined>(undefined);

export const BACSparkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bacTypes, setBacTypes] = useState<BACType[]>(() => BAC_TYPES);
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

    const value: BACSparkContextType = useMemo(() => ({
        bacTypes,
        codes: getAvailableCodes(),
        usedCodes,
        activeBac,
        validateCode,
        markCodeAsUsed,
        getAvailableCodes,
        copyCodeToClipboard
    }), [bacTypes, codes, usedCodes, activeBac]);

    return (
        <BACSparkContext.Provider value={value}>
            {children}
        </BACSparkContext.Provider>
    );
};

export const useBACSpark = () => {
    const context = useContext(BACSparkContext);
    if (context === undefined) {
        throw new Error('useBACSpark must be used within a BACSparkProvider');
    }
    return context;
};
