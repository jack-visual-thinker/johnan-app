import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, User } from 'lucide-react';

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
    <div className="start-view" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <h1 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '900', 
          color: 'var(--color-text)', 
          marginBottom: '1rem',
          lineHeight: 1.4
        }}>
          あなたの"<span style={{ color: 'var(--color-primary)' }}>じょうずかん</span>"を、<br />
          動物で見える化します
        </h1>

        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--color-text-sub)', 
          marginBottom: '3rem',
          lineHeight: 1.8
        }}>
          直感で答えるだけ。<br />
          あなたらしさが動物で分かる診断です
        </p>
        
        {/* User Input Form */}
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ 
            textAlign: 'left', 
            maxWidth: '500px', 
            margin: '0 auto 3rem auto',
            padding: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '1.5rem',
              color: 'var(--color-text)',
              textAlign: 'center'
            }}>
              診断を始める前に
            </h2>

            {/* Name Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="name" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                <User size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                お名前 <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="お名前を入力してください"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  fontSize: '1rem',
                  border: errors.name ? '2px solid red' : '2px solid #E0E0E0',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = errors.name ? 'red' : '#E0E0E0'}
              />
              {errors.name && (
                <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                <Mail size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                メールアドレス <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="診断結果を受け取るメールアドレス"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  fontSize: '1rem',
                  border: errors.email ? '2px solid red' : '2px solid #E0E0E0',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? 'red' : '#E0E0E0'}
              />
              {errors.email && (
                <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Privacy Notice */}
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--color-text-sub)',
              lineHeight: 1.6,
              marginTop: '1rem'
            }}>
              診断結果は入力いただいたメールアドレスにお送りします。<br />
              取得した情報は診断目的以外には使用しません。
            </p>
          </div>

          {/* Start Button */}
          <button type="submit" className="btn-primary">
            <Sparkles size={24} />
            診断スタート！
          </button>

          <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '1.5rem' }}>
            (全部で18問 / 3分くらいでおわるよ)
          </p>
        </form>
      </motion.div>
    </div>
  );
};
