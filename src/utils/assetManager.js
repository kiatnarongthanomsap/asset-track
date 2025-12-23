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

    // 2. Define Headers - Extended to match all data
    const headers = ['รหัสทรัพย์สิน', 'ชื่อทรัพย์สิน', 'หมวดหมู่', 'ยี่ห้อ', 'Serial Number', 'ราคาทุน', 'วันที่ซื้อ', 'อายุการใช้งาน', 'สถานที่', 'สถานะ', 'พิมพ์สติ๊กเกอร์'];

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
                `"${asset.status}"`,
                `"${asset.isStickerPrinted ? 'Yes' : 'No'}"`
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
    link.setAttribute("download", `Asset_Report_Complete_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Download a template for CSV Import
 */
export const downloadCSVTemplate = () => {
    const headers = ['รหัสทรัพย์สิน', 'ชื่อทรัพย์สิน', 'หมวดหมู่', 'ยี่ห้อ', 'Serial Number', 'ราคาทุน', 'วันที่ซื้อ', 'อายุการใช้งาน', 'สถานที่', 'สถานะ'];
    const example = ['COM-2567-0001', 'เครื่องคอมพิวเตอร์พกพา', 'Computer', 'Dell', 'X123456789', '45000', '2024-01-20', '5', 'ห้องประชุม 1', 'Normal'];

    const csvRows = [headers.join(","), example.join(",")];
    const csvContent = "\uFEFF" + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Asset_Import_Template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Handle CSV Parsing for Import
 */
export const parseAssetCSV = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n');
            if (lines.length < 2) {
                resolve([]);
                return;
            }

            const assets = [];
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line || line.startsWith('"---') || line.startsWith('""') || line.includes('รวมหมวด')) continue;

                const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
                if (values.length < 10) continue;

                assets.push({
                    id: Date.now() + i,
                    code: values[0],
                    name: values[1],
                    category: values[2],
                    brand: values[3],
                    serial: values[4],
                    price: parseFloat(values[5]) || 0,
                    purchaseDate: values[6],
                    usefulLife: parseInt(values[7]) || 5,
                    location: values[8],
                    status: values[9] || 'Normal',
                    isStickerPrinted: false,
                    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=300'
                });
            }
            resolve(assets);
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
};


/**
 * Export Assets that haven't had stickers printed (Excel Compatible)
 */
export const exportPendingStickersCSV = (assets) => {
    const pendingAssets = assets.filter(a => !a.isStickerPrinted);

    const headers = ['รหัสทรัพย์สิน', 'ชื่อทรัพย์สิน', 'หมวดหมู่', 'ยี่ห้อ', 'Serial Number', 'สถานที่', 'สถานะการพิมพ์สติ๊กเกอร์'];

    const rows = pendingAssets.map(asset => [
        `"${asset.code}"`,
        `"${asset.name}"`,
        `"${asset.category}"`,
        `"${asset.brand || ''}"`,
        `"${asset.serial || ''}"`,
        `"${asset.location}"`,
        `"ยังไม่พิมพ์"`
    ]);

    const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Pending_Stickers_Report_${new Date().toISOString().split('T')[0]}.csv`);
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
