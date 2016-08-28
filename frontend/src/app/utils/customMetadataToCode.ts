export function customMetadataToCode(metadata) {
    return `${JSON.stringify({ metadata }, null, 2)};`;
}