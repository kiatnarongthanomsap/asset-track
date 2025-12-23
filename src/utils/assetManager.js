/**
 * Logic for generating Asset Numbers
 * Pattern: {PREFIX}-{YEAR}-{RUNNING}
 * E.g. COM-2567-0001
 */
export const generateAssetCode = (prefix, year, runningNumber, padding = 4) => {
    const paddedRunning = String(runningNumber).padStart(padding, '0');
    return `${prefix}-${year}-${paddedRunning}`;
};

/**
 * Depreciation Calculation Utility (Straight-Line)
 */
export const calculateStraightLineDepreciation = (cost, purchaseDate, usefulLife, scrapValue = 1) => {
    const buyDate = new Date(purchaseDate);
    const today = new Date();

    // Calculate Age in Months/Years
    const diffTime = Math.abs(today - buyDate);
    const ageYears = diffTime / (1000 * 60 * 60 * 24 * 365);

    // Yearly Depreciation
    const yearlyDep = (cost - scrapValue) / usefulLife;

    // Accumulated Depreciation
    let accumulated = yearlyDep * ageYears;
    const maxDep = cost - scrapValue;

    if (accumulated > maxDep) {
        accumulated = maxDep;
    }

    // Book Value
    const bookValue = cost - accumulated;

    return {
        annualDepreciation: yearlyDep,
        accumulatedDepreciation: accumulated,
        bookValue: bookValue < scrapValue ? scrapValue : bookValue,
        ageInYears: ageYears.toFixed(2)
    };
};

/**
 * Default Categories Configuration
 */
export const ASSET_CATEGORIES = [
    { id: 'com', name: 'คอมพิวเตอร์', prefix: 'COM', usefulLife: 5 },
    { id: 'fur', name: 'เฟอร์นิเจอร์', prefix: 'FUR', usefulLife: 8 },
    { id: 'veh', name: 'ยานพาหนะ', prefix: 'VEH', usefulLife: 10 },
    { id: 'ele', name: 'เครื่องใช้ไฟฟ้า', prefix: 'ELE', usefulLife: 5 },
];
