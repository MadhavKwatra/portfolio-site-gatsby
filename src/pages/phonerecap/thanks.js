import React from 'react';
import styled from 'styled-components';
import { phoneRecapLinks } from '@config';
import { PhoneRecapLayout, Seo } from '@components';
import { JoinBox, PLAY_LEGAL, PlayBadge, TesterMail } from '@components/phoneRecapJoin';

// Was the tester form's thank-you page (until 2026-11-07). The URL stays (CLAUDE.md rule); old
// links now land on "the test is over, it's on Google Play".

const StyledThanks = styled.section`
  && {
    padding: 40px 0 64px;
  }

  .get {
    margin: 18px 0 6px;
  }

  .play-badge {
    display: inline-block;
    line-height: 0;

    img {
      display: block;
      height: auto;
    }
  }
`;

const PhoneRecapThanksPage = () => (
  <PhoneRecapLayout links={phoneRecapLinks} joinHref="/phonerecap/#get">
    <StyledThanks aria-labelledby="h-thanks">
      <JoinBox>
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="m4.5 12.5 5 5 10-11" />
          </svg>
        </span>
        <h1 className="title disp" id="h-thanks">
          Thanks! The test is done.
        </h1>
        <p className="sub">
          PhoneRecap passed Google Play’s test and is now live for everyone, thanks to the people
          who tested it. Testers keep the same app and their saved days.
        </p>
        <div className="get">
          <PlayBadge width={240} />
        </div>
        <p className="pnote">
          Signed up as a tester? Your email is deleted within 30 days after the launch (7 Nov 2026),
          or sooner if you ask: <TesterMail />.
        </p>
        <p className="pnote">{PLAY_LEGAL}</p>
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
