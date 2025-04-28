// Format number with commas and 2 decimal places
export const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};