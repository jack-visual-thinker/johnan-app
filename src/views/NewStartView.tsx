import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, User } from 'lucide-react';
import startBtnImg from '../assets/button.png';
import headerTitleImg from '../assets/title3.png';
import { FloatingIcons } from '../components/FloatingIcons';
import { useLanguage } from '../i18n/LanguageContext';
import { START_COPY } from '../i18n/content';

const assetSrc = (asset: string | { src: string }) =>
  typeof asset === 'string' ? asset : asset.src;

type Props = {
  nickname: string;
  agreed: boolean;
  onNicknameChange: (nickname: string) => void;
  onAgreementChange: (agreed: boolean) => void;
  onShowTerms: () => void;
  onStart: () => void;
};

export const NewStartView: React.FC<Props> = ({
  nickname,
  agreed,
  onNicknameChange,
  onAgreementChange,
  onShowTerms,
  onStart,
}) => {
  const { language } = useLanguage();
  const copy = START_COPY[language];
  const [nicknameError, setNicknameError] = useState(false);
  const [agreementError, setAgreementError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNicknameMissing = !nickname.trim();
    setNicknameError(isNicknameMissing);
    setAgreementError(!agreed);

    if (isNicknameMissing || !agreed) return;
    onStart();
  };

  const canStart = Boolean(nickname.trim()) && agreed;

  return (
    <div
      className="start-view start-view-container"
      style={{
        textAlign: 'center',
        paddingBottom: '4rem',
        position: 'relative',
        overflowX: 'hidden',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @media (min-width: 768px) {
          .start-view-container {
            padding-top: 1rem !important;
            padding-bottom: 2rem !important;
          }
          .title-logo-img {
            width: 500px !important;
          }
          .intro-box,
          .form-card {
            max-width: 600px !important;
          }
          .intro-box {
            padding: 0.8rem 1.5rem !important;
          }
          .form-card {
            padding: 1rem 1.5rem !important;
          }
          .start-btn {
            width: 240px !important;
          }
        }
        @media (max-width: 480px) {
          .start-title-wrap {
            margin-top: -30px !important;
            margin-bottom: -35px !important;
          }
        }
      `}</style>

      <FloatingIcons />
      <motion.div
        style={{ position: 'relative', zIndex: 1, width: '100%' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p style={{ margin: '0 0 0.25rem', color: '#6B5439', fontSize: '0.8rem', fontWeight: 'bold' }}>
          {copy.eyebrow}
        </p>

        <div className="start-title-wrap" style={{ marginBottom: '-50px', marginTop: '-50px' }}>
          {language === 'ja' ? (
            <img
              src={assetSrc(headerTitleImg)}
              alt={copy.heroAlt}
              className="title-logo-img"
              style={{
                maxWidth: '90%',
                width: '700px',
                display: 'block',
                margin: '0 auto',
                transform: 'rotate(-2deg)',
              }}
            />
          ) : (
            <h1
              className="title-logo-img"
              style={{
                maxWidth: '90%',
                width: '700px',
                margin: '0 auto',
                minHeight: '150px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B5439',
                fontSize: 'clamp(2rem, 8vw, 4.2rem)',
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: '-0.035em',
                transform: 'rotate(-2deg)',
                textShadow: '0 3px 0 rgba(255,255,255,0.55)',
              }}
            >
              {copy.heroTitle}
            </h1>
          )}
        </div>

        <div
          className="intro-box"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '0.8rem',
            maxWidth: '400px',
            margin: '0 auto 10px auto',
            textAlign: 'left',
            color: 'var(--color-text)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.5,
            fontSize: '13px',
            position: 'relative',
          }}
        >
          <p style={{ marginBottom: '0.4rem', fontWeight: 'bold' }}>
            {copy.introLead}
          </p>
          <p style={{ margin: 0 }}>
            {copy.introBody}<br />
            {copy.introBodySecond}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div
            className="card form-card"
            style={{
              textAlign: 'left',
              maxWidth: '400px',
              margin: '0 auto',
              padding: '1rem',
              backgroundColor: 'var(--color-card-brown)',
              color: 'var(--color-text-white)',
              boxShadow: '0 10px 0 rgba(0,0,0,0.1)',
              borderRadius: '24px',
              position: 'relative',
            }}
          >
            <h1
              style={{
                fontSize: '1rem',
                marginBottom: '0.8rem',
                color: 'var(--color-text-white)',
                textAlign: 'center',
                fontFamily: 'var(--font-handwritten)',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
              }}
            >
              {copy.formTitle}
            </h1>

            <div style={{ marginBottom: '0.8rem' }}>
              <label
                htmlFor="nickname"
                style={{
                  display: 'block',
                  marginBottom: '0.3rem',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  fontFamily: 'var(--font-handwritten)',
                }}
              >
                <User size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                {copy.nickname}
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                maxLength={30}
                autoComplete="off"
                placeholder={copy.nicknamePlaceholder}
                aria-invalid={nicknameError}
                aria-describedby={nicknameError ? 'nickname-error' : undefined}
                onChange={(event) => {
                  onNicknameChange(event.target.value);
                  if (event.target.value.trim()) setNicknameError(false);
                }}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.8rem',
                  fontSize: '16px',
                  color: 'white',
                  background: 'rgba(255,255,255,0.08)',
                  border: nicknameError ? '3px solid #FFD1D1' : '2px solid rgba(255,255,255,0.65)',
                  borderRadius: '12px',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-handwritten)',
                }}
              />
              {nicknameError && (
                <p id="nickname-error" role="alert" style={{ color: '#FFE2E2', fontSize: '0.8rem', margin: '0.4rem 0 0', fontWeight: 'bold' }}>
                  {copy.nicknameError}
                </p>
              )}
            </div>

            <label
              htmlFor="terms-agreement"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                background: agreed ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)',
                border: agreementError ? '2px solid #FFD1D1' : '2px solid rgba(255,255,255,0.35)',
                borderRadius: '12px',
                padding: '0.75rem',
                cursor: 'pointer',
              }}
            >
              <input
                id="terms-agreement"
                type="checkbox"
                checked={agreed}
                onChange={(event) => {
                  onAgreementChange(event.target.checked);
                  if (event.target.checked) setAgreementError(false);
                }}
                style={{ width: '20px', height: '20px', margin: 0, accentColor: '#F4C430', flexShrink: 0 }}
              />
              <span style={{ fontSize: '0.9rem', lineHeight: 1.45 }}>
                {language === 'en' && copy.agreement}
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    onShowTerms();
                  }}
                  style={{
                    appearance: 'none',
                    border: 0,
                    padding: 0,
                    background: 'none',
                    color: '#FFF6B8',
                    font: 'inherit',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {copy.terms}
                </button>
                {language === 'ja' && copy.agreement}
              </span>
            </label>

            {agreementError && (
              <p role="alert" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#FFE2E2', fontSize: '0.8rem', margin: '0.4rem 0 0', fontWeight: 'bold' }}>
                <AlertCircle size={15} /> {copy.agreementError}
              </p>
            )}
          </div>

          <button
            type="submit"
            aria-disabled={!canStart}
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: canStart ? 'pointer' : 'not-allowed',
              marginBottom: '2rem',
              marginTop: '12px',
              display: 'inline-block',
              position: 'relative',
              zIndex: 2,
              opacity: canStart ? 1 : 0.55,
            }}
          >
            {language === 'ja' ? (
              <img
                src={assetSrc(startBtnImg)}
                alt={copy.start}
                className="start-btn"
                style={{ width: '100%', maxWidth: '280px', display: 'block' }}
              />
            ) : (
              <span
                className="start-btn"
                style={{
                  width: '280px',
                  maxWidth: 'calc(100vw - 48px)',
                  minHeight: '68px',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '999px',
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#F4C430',
                  color: '#5D4037',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  boxShadow: '0 6px 0 #C99D19',
                }}
              >
                {copy.start}
              </span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
