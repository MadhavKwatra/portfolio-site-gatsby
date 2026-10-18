import React from 'react';
import styled from 'styled-components';
import { phoneRecapLinks } from '@config';
import { PhoneRecapLayout, Seo } from '@components';
import { JoinBox, TesterMail, Why } from '@components/phoneRecapJoin';

// Where the tester form on /phonerecap/ lands after Netlify stores the POST.
// It never shows the email that was sent.

const StyledThanks = styled.section`
  && {
    padding: 40px 0 64px;
  }
`;

const PhoneRecapThanksPage = () => (
  <PhoneRecapLayout links={phoneRecapLinks} joinHref="/phonerecap/#join">
    <StyledThanks aria-labelledby="h-thanks">
      <JoinBox>
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="m4.5 12.5 5 5 10-11" />
          </svg>
        </span>
        <h1 className="title disp" id="h-thanks">
          Thanks! You’re on the list.
        </h1>
        <p className="sub">Here is what happens next:</p>
        <ol className="nexts">
          <li>
            <span>
              <b>I add you to the tester list</b> in Google Play Console, usually within a few days.
            </span>
          </li>
          <li>
            <span>
              <b>You get the Google Play link</b> by email when the test opens. Tap it and choose
              “Become a tester”.
            </span>
          </li>
          <li>
            <span>
              <b>Install PhoneRecap and keep it 14 days.</b> Open it every few days. Tell me what
              breaks.
            </span>
          </li>
        </ol>
        <p className="pnote">
          Changed your mind? Email <TesterMail /> and I remove you. Your email is deleted within 30
          days after the public launch.
        </p>
        <Why />
        <div className="back">
          <a className="button" href="/phonerecap/">
            Back to PhoneRecap
          </a>
          <a href="/">madhavkwatra.in</a>
        </div>
      </JoinBox>
    </StyledThanks>
  </PhoneRecapLayout>
);

export default PhoneRecapThanksPage;

// eslint-disable-next-line react/prop-types
export const Head = ({ location }) => (
  <Seo
    title="Thanks for joining the PhoneRecap test"
    description="You are on the PhoneRecap tester list. Here is what happens next."
    image="/phonerecap-og.jpg"
    pathname={location.pathname}
    noindex
  />
);
