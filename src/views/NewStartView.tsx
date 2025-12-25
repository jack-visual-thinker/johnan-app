import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User } from 'lucide-react';
import startBtnImg from '../assets/start_btn.png';
import headerTitleImg from '../assets/header_title.png';
import { FloatingIcons } from '../components/FloatingIcons';

type Props = {
  onStart: (userData: { name: string; email: string }) => void;
};

export const NewStartView: React.FC<Props> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!validateEmail(email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onStart({ name, email });
  };

  return (
    <div className="start-view" style={{ textAlign: 'center', paddingBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
      <FloatingIcons />
      <motion.div style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >



        {/* Subtitle / Headline - Main Title */}
        <div style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>
          <img
            src={headerTitleImg}
            alt="あなたはどのレジェンドタイプ？"
            style={{
              maxWidth: '90%',
              width: '700px',
              display: 'block',
              margin: '0 auto',
              transform: 'rotate(-2deg)'
            }}
          />
        </div>


        {/* Introduction Text Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.5rem',
          maxWidth: '500px',
          margin: '0 auto 1rem auto',
          textAlign: 'left',
          color: 'var(--color-text)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          fontFamily: 'var(--font-body)',
          lineHeight: '1.8'
        }}>
          <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            JOHNAN（ジョウナン）の長い歴史の中には、今の私たちを作ってくれた『レジェンド』たちがいます。
          </p>
          <p>
            あなたの性格は、歴史上の誰に似ているかな？<br />
            質問に答えて、あなたの中に眠るレジェンドの魂を見つけよう！
          </p>
        </div>



        <form onSubmit={handleSubmit}>
          <div className="card" style={{
            textAlign: 'left',
            maxWidth: '400px',
            margin: '0 auto 1rem auto',
            padding: '2rem 2rem',
            backgroundColor: 'var(--color-card-brown)',
            color: 'var(--color-text-white)',
            boxShadow: '0 10px 0 rgba(0,0,0,0.1)',
            borderRadius: '24px'
          }}>
            <h2 style={{
              fontSize: '1.4rem',
              marginBottom: '2rem',
              color: 'var(--color-text-white)',
              textAlign: 'center',
              fontFamily: 'var(--font-handwritten)'
            }}>
              診断をはじめる前に
            </h2>

            {/* Name Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="name" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: 'var(--font-handwritten)'
              }}>
                <User size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                おなまえ
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder=""
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  fontSize: '1.1rem',
                  color: 'white',
                  background: 'transparent',
                  border: errors.name ? '3px solid #ff6b6b' : '3px solid white',
                  borderRadius: '16px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-handwritten)'
                }}
                onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                onBlur={(e) => e.target.style.background = 'transparent'}
              />
              {errors.name && (
                <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: 'var(--font-handwritten)'
              }}>
                <Mail size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder=""
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  fontSize: '1.1rem',
                  color: 'white',
                  background: 'transparent',
                  border: errors.email ? '3px solid #ff6b6b' : '3px solid white',
                  borderRadius: '16px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-handwritten)'
                }}
                onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                onBlur={(e) => e.target.style.background = 'transparent'}
              />
              {errors.email && (
                <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div style={{ width: '80%', height: '2px', background: 'rgba(255,255,255,0.3)', margin: '2rem auto 0 auto', borderRadius: '2px' }}></div>

          </div>

          {/* Start Button */}
          <button type="submit" className="" style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            marginBottom: '2rem',
            display: 'inline-block'
          }}>
            <img src={startBtnImg} alt="診断スタート！" style={{ width: '100%', maxWidth: '300px', display: 'block' }} />
          </button>
        </form>

        <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '1.5rem' }}>
          (全部で18問 / 3分くらいでおわるよ)
        </p>
      </motion.div>
    </div >
  );
};

