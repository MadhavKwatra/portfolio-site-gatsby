import React from 'react';
import styled, { css } from 'styled-components';

// Shared pieces of the PhoneRecap "Join the test" box, used on /phonerecap/ and
// /phonerecap/thanks/. Texts come from the approved mock (PhoneRecap repo,
// docs/design/prototypes/designs/portfolio-mock/page.html, layout A + join A).

export const TESTER_MAIL = 'madhav.kwat+phonerecap@gmail.com';

// No Google Group (owner, 2026-10-18): testers send their Gmail, or DM on socials
export const DM_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/iammadhavkwatra' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/madhav-kwatra/' },
  { name: 'X', url: 'https://x.com/madhav_kwatra' },
];

// PhoneRecap sticker button: ink border + hard offset shadow
export const stickerButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  border: 3px solid var(--ink);
  border-radius: 14px;
  background-color: var(--tomato);
  color: var(--ink);
  font-family: var(--font-sans);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.1;
  text-decoration: none;
  box-shadow: 4px 4px 0 var(--shadow, var(--ink));
  cursor: pointer;
  transition:
    transform 0.12s,
    box-shadow 0.12s;

  &:hover,
  &:focus-visible {
    color: var(--ink);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--shadow, var(--ink));
  }
  &:active {
    transform: translate(3px, 3px);
    box-shadow: 1px 1px 0 var(--shadow, var(--ink));
  }
  &:after {
    display: none !important;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const numberedCircle = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--ink);
  color: var(--cream2);
  display: grid;
  place-items: center;
  font-family: var(--display);
  font-size: 17px;
  font-style: italic;
  font-weight: 800;
  line-height: 1;
`;

export const JoinBox = styled.div`
  position: relative;
  max-width: 760px;
  margin: 0 auto;
  padding: 34px 36px 30px;
  border: 4px solid var(--ink);
  border-radius: 24px;
  background-color: var(--cream2);
  color: var(--ink);
  box-shadow: 10px 10px 0 var(--tomato);
  scroll-margin-top: 96px;

  @media (max-width: 480px) {
    padding: 26px 20px 22px;
    border-radius: 20px;
    box-shadow: 7px 7px 0 var(--tomato);
  }

  h1,
  h2,
  h3 {
    color: var(--ink);
  }

  /* Links on cream: ink and underlined, never the site's green */
  a {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 2px;
    overflow-wrap: anywhere;

    &:hover,
    &:focus-visible {
      color: var(--ink);
      text-decoration-thickness: 2px;
    }
    &:after {
      display: none;
    }
  }

  .kicker {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin: 0;
    color: #4d4a44;
    font-family: var(--font-mono);
    font-size: 12.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;

    .need {
      padding: 3px 8px;
      border-radius: 6px;
      background-color: var(--ink);
      color: var(--cream2);
    }
  }

  .title {
    margin: 12px 0 10px;
    font-size: clamp(46px, 8vw, 64px);
  }

  .sub {
    max-width: 560px;
    margin: 0;
    color: #33302b;
    font-size: 17px;
  }

  .steps {
    display: flex;
    flex-direction: column;
    margin: 26px 0 0;
    padding: 0;
    list-style: none;

    & > li {
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      gap: 0 18px;
      padding: 18px 0;
      border-top: 2px dashed rgba(11, 12, 15, 0.22);

      &:first-child {
        padding-top: 4px;
        border-top: 0;
      }

      @media (max-width: 480px) {
        grid-template-columns: 36px minmax(0, 1fr);
        gap: 0 14px;
      }
    }

    .n {
      ${numberedCircle};
      width: 44px;
      height: 44px;
      font-size: 24px;

      @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        font-size: 20px;
      }
    }

    h3 {
      margin: 9px 0 6px;
      font-size: 19px;

      @media (max-width: 480px) {
        margin-top: 6px;
      }
    }

    p {
      color: #3d3a35;
      font-size: 16px;
    }
  }

  /* Form */
  .field-label {
    display: block;
    margin: 0 0 8px;
    color: var(--ink);
    font-size: 15px;
    font-weight: 600;
  }

  .input {
    width: 100%;
    min-height: 52px;
    padding: 0 16px;
    border: 2.5px solid var(--ink);
    border-radius: 12px;
    background-color: #fff;
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 17px;
    font-weight: 500;

    &:focus {
      outline: 3px solid var(--sky);
      outline-offset: 2px;
    }
    &:user-invalid {
      border-color: #c2261a;
      background-color: #fff1ee;
    }
  }

  .hint {
    margin: 7px 0 0;
    color: #55514a;
    font-size: 13.5px;
  }

  .check {
    display: grid;
    grid-template-columns: 26px minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    margin: 18px 0;
    font-size: 15px;
    line-height: 1.45;
    cursor: pointer;

    input {
      appearance: none;
      -webkit-appearance: none;
      display: grid;
      place-items: center;
      width: 26px;
      height: 26px;
      margin: 1px 0 0;
      border: 2.5px solid var(--ink);
      border-radius: 7px;
      background-color: #fff;
      cursor: pointer;

      &:checked {
        background-color: var(--ink);
      }
      &:checked:after {
        content: '';
        width: 7px;
        height: 13px;
        border: solid var(--cream2);
        border-width: 0 3px 3px 0;
        transform: translateY(-2px) rotate(45deg);
      }
      &:focus-visible {
        outline: 3px solid var(--sky);
        outline-offset: 2px;
      }
    }
  }

  .button {
    ${stickerButton};
  }

  .pnote {
    margin: 16px 0 0;
    padding: 2px 0 2px 12px;
    border-left: 4px solid var(--tomato);
    color: #4d4a44;
    font-size: 13.5px;
    line-height: 1.5;
  }

  .note {
    margin: 14px 0 0;
    color: #55514a;
    font-size: 14px;
  }

  .why {
    margin: 22px 0 0;
    padding-top: 16px;
    border-top: 3px solid var(--ink);
    color: #33302b;
    font-size: 15px;

    b {
      color: var(--ink);
    }
  }

  /* Thank-you state */
  .tick {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border: 3px solid var(--ink);
    border-radius: 18px;
    background-color: var(--sun);
    box-shadow: 4px 4px 0 var(--ink);
    transform: rotate(-6deg);

    svg {
      width: 34px;
      height: 34px;
      fill: none;
      stroke: var(--ink);
      stroke-width: 3.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  .tick + .title {
    margin-top: 22px;
  }

  .nexts {
    display: grid;
    gap: 14px;
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
    counter-reset: nx;

    li {
      counter-increment: nx;
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 12px;
      color: #3d3a35;
      font-size: 16px;

      &:before {
        ${numberedCircle};
        content: counter(nx);
      }
    }

    b {
      color: var(--ink);
    }
  }

  .back {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 18px;
    align-items: center;
    margin-top: 26px;

    .button {
      background-color: var(--cream2);
    }
  }
`;

export const Why = () => (
  <p className="why">
    <b>Why 12 testers?</b> Google Play asks new developers to test with 12+ people for 14 days
    before launch.
  </p>
);

export const TesterMail = () => <a href={`mailto:${TESTER_MAIL}`}>{TESTER_MAIL}</a>;
