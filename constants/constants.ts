import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLUMN_WIDTH = (width - 48) / 2; // Account for container padding + gaps
export const PLACEHOLDER_BLURHASH = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4';