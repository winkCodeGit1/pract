// @mui
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function DeleteIcon({ disable }) {
  const theme = useTheme();
  //   const PRIMARY_MAIN = theme.palette.primary.main;
  const ERROR_DARK = theme.palette.error.main;
  const DISABLE = theme.palette.grey[500];
  //   const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <svg width='19' height='19' viewBox='0 0 24 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.125 23.1563C2.125 23.7779 2.37193 24.374 2.81147 24.8135C3.25101 25.2531 3.84715 25.5 4.46875 25.5H18.5312C19.1529 25.5 19.749 25.2531 20.1885 24.8135C20.6281 24.374 20.875 23.7779 20.875 23.1563V6.75001H2.125V23.1563ZM15.4062 10.6563C15.4062 10.4491 15.4886 10.2503 15.6351 10.1038C15.7816 9.95732 15.9803 9.87501 16.1875 9.87501C16.3947 9.87501 16.5934 9.95732 16.7399 10.1038C16.8864 10.2503 16.9688 10.4491 16.9688 10.6563V21.5938C16.9688 21.801 16.8864 21.9997 16.7399 22.1462C16.5934 22.2927 16.3947 22.375 16.1875 22.375C15.9803 22.375 15.7816 22.2927 15.6351 22.1462C15.4886 21.9997 15.4062 21.801 15.4062 21.5938V10.6563ZM10.7188 10.6563C10.7188 10.4491 10.8011 10.2503 10.9476 10.1038C11.0941 9.95732 11.2928 9.87501 11.5 9.87501C11.7072 9.87501 11.9059 9.95732 12.0524 10.1038C12.1989 10.2503 12.2812 10.4491 12.2812 10.6563V21.5938C12.2812 21.801 12.1989 21.9997 12.0524 22.1462C11.9059 22.2927 11.7072 22.375 11.5 22.375C11.2928 22.375 11.0941 22.2927 10.9476 22.1462C10.8011 21.9997 10.7188 21.801 10.7188 21.5938V10.6563ZM6.03125 10.6563C6.03125 10.4491 6.11356 10.2503 6.26007 10.1038C6.40659 9.95732 6.6053 9.87501 6.8125 9.87501C7.0197 9.87501 7.21841 9.95732 7.36493 10.1038C7.51144 10.2503 7.59375 10.4491 7.59375 10.6563V21.5938C7.59375 21.801 7.51144 21.9997 7.36493 22.1462C7.21841 22.2927 7.0197 22.375 6.8125 22.375C6.6053 22.375 6.40659 22.2927 6.26007 22.1462C6.11356 21.9997 6.03125 21.801 6.03125 21.5938V10.6563ZM21.6562 2.06251H15.7969L15.3379 1.14942C15.2407 0.954215 15.0909 0.79001 14.9054 0.675281C14.72 0.560553 14.5062 0.499852 14.2881 0.500009H8.70703C8.48944 0.499172 8.27602 0.559646 8.09121 0.674503C7.90641 0.789359 7.75769 0.953951 7.66211 1.14942L7.20312 2.06251H1.34375C1.13655 2.06251 0.937836 2.14482 0.791323 2.29133C0.64481 2.43784 0.5625 2.63656 0.5625 2.84376L0.5625 4.40626C0.5625 4.61346 0.64481 4.81217 0.791323 4.95869C0.937836 5.1052 1.13655 5.18751 1.34375 5.18751H21.6562C21.8635 5.18751 22.0622 5.1052 22.2087 4.95869C22.3552 4.81217 22.4375 4.61346 22.4375 4.40626V2.84376C22.4375 2.63656 22.3552 2.43784 22.2087 2.29133C22.0622 2.14482 21.8635 2.06251 21.6562 2.06251Z'
        fill={disable ? DISABLE : ERROR_DARK}
      />
    </svg>
  );
}