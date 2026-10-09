import { css } from 'styled-components';

// Inter (https://rsms.me/inter) and JetBrains Mono (https://www.jetbrains.com/lp/mono/)
// are both licensed under the SIL Open Font License 1.1, see the OFL.txt next to each font.
import InterRegular from '@fonts/Inter/Inter-Regular.woff2';
import InterMedium from '@fonts/Inter/Inter-Medium.woff2';
import InterSemiBold from '@fonts/Inter/Inter-SemiBold.woff2';

import InterItalic from '@fonts/Inter/Inter-Italic.woff2';
import InterMediumItalic from '@fonts/Inter/Inter-MediumItalic.woff2';
import InterSemiBoldItalic from '@fonts/Inter/Inter-SemiBoldItalic.woff2';

import JetBrainsMonoRegular from '@fonts/JetBrainsMono/JetBrainsMono-Regular.woff2';
import JetBrainsMonoSemiBold from '@fonts/JetBrainsMono/JetBrainsMono-SemiBold.woff2';

import JetBrainsMonoItalic from '@fonts/JetBrainsMono/JetBrainsMono-Italic.woff2';
import JetBrainsMonoSemiBoldItalic from '@fonts/JetBrainsMono/JetBrainsMono-SemiBoldItalic.woff2';

const interNormalWeights = {
  400: InterRegular,
  500: InterMedium,
  600: InterSemiBold,
};

const interItalicWeights = {
  400: InterItalic,
  500: InterMediumItalic,
  600: InterSemiBoldItalic,
};

const jetBrainsMonoNormalWeights = {
  400: JetBrainsMonoRegular,
  600: JetBrainsMonoSemiBold,
};

const jetBrainsMonoItalicWeights = {
  400: JetBrainsMonoItalic,
  600: JetBrainsMonoSemiBoldItalic,
};

const inter = {
  name: 'Inter',
  normal: interNormalWeights,
  italic: interItalicWeights,
};

const jetBrainsMono = {
  name: 'JetBrains Mono',
  normal: jetBrainsMonoNormalWeights,
  italic: jetBrainsMonoItalicWeights,
};

// Every browser in our browserslist supports woff2, so no woff fallback is needed
const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, woff2] of Object.entries(family[style])) {
    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${woff2}) format('woff2');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  }

  return styles;
};

const interNormal = createFontFaces(inter);
const interItalic = createFontFaces(inter, 'italic');

const jetBrainsMonoNormal = createFontFaces(jetBrainsMono);
const jetBrainsMonoItalic = createFontFaces(jetBrainsMono, 'italic');

const Fonts = css`
  ${interNormal + interItalic + jetBrainsMonoNormal + jetBrainsMonoItalic}
`;

export default Fonts;
