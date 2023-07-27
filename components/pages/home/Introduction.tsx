import { Col, Row } from 'antd';
import React from 'react';

function Introduction() {
  return (
    <Row className="intro-container" justify="space-between" gutter={[16, 16]}>
      <Col className="intro-info" xs={24} md={24} sm={24} xl={15}>
        <h1 className="intro-info__title">The Most Secure World’s Best P2P Crypto Exchange with Zero fees</h1>
        <div className="intro-info__desc">
          The Exchange that gives back to the community. We’ve made selling or buying cryptocurrency, fast, easy and
          secure. With our peer to peer (P2P) exchange, Buyers no longer have to go through the torture of buying crypto
          with high transaction fees then waiting days, weeks and sometimes much longer to move their crypto off of
          their platform. Sellers get their funds much faster than going through a traditional exchange and paying
          exorbitant fees to get their funds the next day. We even have a referral program to give back more to everyone
          who helps us to build a better exchange for all.
        </div>
      </Col>
      <Col xs={24} md={24} sm={24} xl={9} className="intro-img">
        <img src="https://static.cex.io/landings/media/3x-get-started-banner.png" alt="banner" className="max-w-full" />
      </Col>
    </Row>
  );
}

export default Introduction;
