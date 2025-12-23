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

export const exportAssetsToCSV = (assets) => {
    // 1. Group assets by category
    const grouped = {};
    assets.forEach(asset => {
        const cat = asset.category || 'ไม่ระบุ';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(asset);
    });

    // 2. Define Headers
    const headers = ['รหัสทรัพย์สิน', 'ชื่อทรัพย์สิน', 'หมวดหมู่', 'ยี่ห้อ', 'Serial Number', 'ราคาทุน', 'วันที่ซื้อ', 'อายุการใช้งาน', 'สถานที่', 'สถานะ'];

    let csvRows = [];
    csvRows.push(headers.join(","));

    let grandTotal = 0;

    // 3. Process each group
    Object.entries(grouped).forEach(([category, items]) => {
        // Category Header Row
        csvRows.push(`""`); // Empty row for spacing
        csvRows.push(`"--- หมวดหมู่: ${category} ---",,,,,,,,,,`);

        let categoryTotal = 0;

        // Data Rows
        items.forEach(asset => {
            const row = [
                `"${asset.code}"`,
                `"${asset.name}"`,
                `"${asset.category}"`,
                `"${asset.brand || ''}"`,
                `"${asset.serial || ''}"`,
                asset.price,
                `"${asset.purchaseDate}"`,
                asset.usefulLife,
                `"${asset.location}"`,
                `"${asset.status}"`
            ];
            csvRows.push(row.join(","));
            categoryTotal += asset.price;
        });

        // Category Subtotal Row
        csvRows.push(`"รวมหมวด ${category}",,,,,"${categoryTotal}",,,,`);
        grandTotal += categoryTotal;
    });

    // 4. Grand Total Row
    csvRows.push(`""`);
    csvRows.push(`"มูลค่ารวมทรัพย์สินทั้งหมด",,,,,"${grandTotal}",,,,`);

    // 5. Combine with BOM for Thai Excel support
    const csvContent = "\uFEFF" + csvRows.join("\n");

    // 6. Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Asset_Categorized_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
