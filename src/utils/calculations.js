export const calculateDepreciation = (price, purchaseDateStr, usefulLifeYears) => {
    // ถ้าไม่มีวันที่ซื้อ ให้ใช้ค่า default
    if (!purchaseDateStr || purchaseDateStr === '') {
        return {
            ageYears: '0.0',
            annualDepreciation: 0,
            accumulatedDepreciation: 0,
            bookValue: price || 0
        };
    }

    const purchaseDate = new Date(purchaseDateStr);
    const today = new Date();

    // ตรวจสอบว่า purchaseDate ถูกต้องหรือไม่
    if (isNaN(purchaseDate.getTime())) {
        return {
            ageYears: '0.0',
            annualDepreciation: 0,
            accumulatedDepreciation: 0,
            bookValue: price || 0
        };
    }

    // วันที่ใช้งาน (Age in days)
    const diffTime = Math.abs(today - purchaseDate);
    const ageDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const ageYears = ageDays / 365;

    // มูลค่าซาก (Residual Value) - ปกติ 1 บาทเพื่อให้รู้ว่ายังมีทรัพย์สินอยู่
    const residualValue = 1;

    // ค่าเสื่อมราคาต่อปี (Annual Depreciation)
    const annualDepreciation = (price - residualValue) / usefulLifeYears;

    // ค่าเสื่อมราคาสะสม (Accumulated Depreciation)
    // ห้ามเกิน (ราคาทุน - 1 บาท)
    let accumulatedDepreciation = annualDepreciation * ageYears;
    const maxDepreciation = price - residualValue;

    if (accumulatedDepreciation > maxDepreciation) {
        accumulatedDepreciation = maxDepreciation;
    }

    // มูลค่าตามบัญชี (Book Value)
    const bookValue = price - accumulatedDepreciation;

    return {
        ageYears: ageYears.toFixed(1),
        annualDepreciation,
        accumulatedDepreciation,
        bookValue: bookValue < 1 ? 1 : bookValue // Min 1 Baht
    };
};
