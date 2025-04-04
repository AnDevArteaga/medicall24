import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-WS3L8DBTSS';

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.set({ hitType: "pageview", page: window.location.pathname });
};