/* Hand-drawn-feel inline SVG icon set — replaces emoji across the site.
   Stroke-based, 1.8px, round caps: quiet and human, never "AI clip-art". */
import React from 'react';

function Svg({ children, size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}

export const IPlay = (p) => <Svg {...p}><polygon points="6 4 20 12 6 20" fill="currentColor" stroke="none" /></Svg>;
export const IPause = (p) => <Svg {...p}><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none" /><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none" /></Svg>;
export const IDoc = (p) => <Svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></Svg>;
export const IImage = (p) => <Svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M4 18l5-5 3 3 4-4 4 4" /></Svg>;
export const IFolder = (p) => <Svg {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></Svg>;
export const IVideo = (p) => <Svg {...p}><rect x="2.5" y="6" width="13" height="12" rx="2" /><path d="M15.5 10.5l6-3.5v10l-6-3.5" /></Svg>;
export const IPin = (p) => <Svg {...p}><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></Svg>;
export const IPhone = (p) => <Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Svg>;
export const IMail = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg>;
export const IClock = (p) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>;
export const IArrow = (p) => <Svg {...p}><path d="M4 12h15" /><path d="M13 6l6 6-6 6" /></Svg>;
export const ICheck = (p) => <Svg {...p}><path d="M4.5 12.5l5 5L19.5 7" /></Svg>;
export const IX = (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const IMenu = (p) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
export const IGlobe = (p) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5z" /></Svg>;
export const IMegaphone = (p) => <Svg {...p}><path d="M3 11v3l4 .5V10.5z" /><path d="M7 10.5L18 5v13.5L7 14.5" /><path d="M18 8.5a3.5 3.5 0 0 1 0 6.5" /></Svg>;
export const IBook = (p) => <Svg {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5V5.5" /><path d="M20 18H6.5A2.5 2.5 0 0 0 4 20.5" /></Svg>;
export const ICap = (p) => <Svg {...p}><path d="M2 9.5L12 5l10 4.5L12 14z" /><path d="M6.5 11.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5" /><path d="M21.5 9.5V15" /></Svg>;
export const IChevron = (p) => <Svg {...p}><path d="M6 9.5l6 6 6-6" /></Svg>;
export const ISearch = (p) => <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></Svg>;
export const ICal = (p) => <Svg {...p}><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></Svg>;
export const IWhats = (p) => (
  <Svg {...p}>
    <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
    <path d="M9 8.8c.3-.7.7-.7 1-.7l.7.1c.3 0 .4.2.6.7l.8 1.7c.2.4 0 .8-.3 1l-.7.6c.5 1.2 1.4 2.1 2.6 2.6l.6-.7c.3-.3.6-.4 1-.2l1.7.8c.5.2.7.3.7.6l.1.7c0 .3 0 .7-.7 1-1.9.9-3.6.6-5.5-.5-1.6-1-2.9-2.3-3.9-3.9-1.1-1.9-1.4-3.6-.5-5.5z" strokeWidth="1.4" />
  </Svg>
);
export const IFb = (p) => <Svg {...p}><path d="M14.5 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6c-2.5 0-3.4 1.6-3.4 3.6v1.9H9V12h2v9h3.5v-9h2.4l.4-3.5z" fill="currentColor" stroke="none" /></Svg>;
export const IYt = (p) => <Svg {...p}><rect x="2.5" y="6" width="19" height="12.5" rx="3.5" /><polygon points="10.5 9.7 15.5 12.2 10.5 14.7" fill="currentColor" stroke="none" /></Svg>;
export const ISun = (p) => <Svg {...p}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3L19 19M19 5l-1.7 1.7M6.7 17.3L5 19" /></Svg>;
export const IMoon = (p) => <Svg {...p}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" /></Svg>;
