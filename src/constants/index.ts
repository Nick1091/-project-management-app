import igorPhoto from '../assets/img/igor.png';
import nickPhoto from '../assets/img/nick.png';
import annPhoto from '../assets/img/ann.png';

const URL = 'https://project-management-app-65.herokuapp.com';

export const REQUEST_URLS = {
  SING_UP_URL: `${URL}/signup`,
  SING_IN_URL: `${URL}/signin`,
  BOARDS_URL: `${URL}/boards`,
  USERS: `${URL}/users`,
};
export const contacts = [
  {
    name: 'Igor Alyanoy',
    link: 'https://github.com/alyanoyigor',
    id: 0,
    linkedIn: 'https://www.linkedin.com/in/alyanoyigor/',
    photo: `${igorPhoto}`,
  },
  {
    name: 'Nikolaу Kuckharchuk',
    link: 'https://github.com/Nick1091',
    id: 1,
    linkedIn: 'https://www.linkedin.com/in/nickolai-nick-7a0a00b2/',
    photo: `${nickPhoto}`,
  },
  {
    name: 'Anna Voroshilova',
    link: 'https://github.com/VoroshilovaAV',
    id: 2,
    linkedIn: 'https://www.linkedin.com/in/anna-voroshilova/',
    photo: `${annPhoto}`,
  },
];
export const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 1920,
  desktopL: 2560,
};

export const device = {
  mobileS: `(min-width: ${size.mobileS}px)`,
  mobileM: `(min-width: ${size.mobileM}px)`,
  mobileL: `(min-width: ${size.mobileL}px)`,
  tablet: `(min-width: ${size.tablet}px)`,
  laptop: `(min-width: ${size.laptop}px)`,
  laptopL: `(min-width: ${size.laptopL}px)`,
  desktop: `(min-width: ${size.desktop}px)`,
  desktopL: `(min-width: ${size.desktopL}px)`,
};
