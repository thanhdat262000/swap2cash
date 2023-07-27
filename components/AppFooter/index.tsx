import { FacebookOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useApplicationContext } from 'contexts/ApplicationContext';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
type FooterProps = Record<string, never>;

const Footer: React.FC<FooterProps> = ({}) => {
  const { t } = useTranslation('common');
  const { appConfig } = useApplicationContext();
  const { facebookLink, instagramLink, telegramLink, twitterLink, whatsappLink, youtubeLink } = appConfig || {};
  console.log('twitterLink', twitterLink);
  console.log('appConfig', appConfig);
  return (
    <footer id="footer" className="footer border-divider border-t">
      <div className="footer__content">
        <div className="footer__left">
          Offset your token footprint.
          <br />
          For free, join now!
        </div>
        <div className="footer__right">
          <div className="footer__contact">
            <div className="footer__title">Contact us</div>
            <div className="footer__item">support@swap2cash.com</div>
          </div>
          <div className="footer__social">
            <div className="footer__title">Social networks</div>
            <div className="footer_social_link">
              {facebookLink && (
                <div className="footer__item footer__item__link">
                  <a href={facebookLink} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </div>
              )}
              {instagramLink && (
                <div className="footer__item footer__item__link">
                  <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </div>
              )}
              {telegramLink && (
                <div className="footer__item footer__item__link">
                  <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                    Telegram
                  </a>
                </div>
              )}
              {twitterLink && (
                <div className="footer__item footer__item__link">
                  <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </div>
              )}
              {whatsappLink && (
                <div className="footer__item footer__item__link">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Whatsapp
                  </a>
                </div>
              )}
              {youtubeLink && (
                <div className="footer__item footer__item__link">
                  <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                    Youtube
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
