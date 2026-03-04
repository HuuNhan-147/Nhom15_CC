import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../utils/mockData';

function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập mã OTP, 3: đặt mật khẩu mới, 4: thành công
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Bước 1: Gửi OTP qua email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      setError('Email không tồn tại trong hệ thống!');
      setLoading(false);
      return;
    }

    // Mock: tạo OTP 6 số
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setLoading(false);
    setStep(2);
  };

  // Bước 2: Xác nhận OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (otp !== generatedOtp) {
      setError('Mã xác nhận không đúng!');
      setLoading(false);
      return;
    }

    setLoading(false);
    setStep(3);
  };

  // Bước 3: Đặt mật khẩu mới
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock: cập nhật mật khẩu
    const user = mockUsers.find(u => u.email === email);
    if (user) user.password = newPassword;

    setLoading(false);
    setStep(4);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setLoading(false);
    setError('');
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              {step === 4 ? (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white">
              {step === 1 && 'Quên mật khẩu?'}
              {step === 2 && 'Nhập mã xác nhận'}
              {step === 3 && 'Đặt mật khẩu mới'}
              {step === 4 && 'Thành công!'}
            </h1>
            <p className="text-amber-100 mt-1 text-sm">
              {step === 1 && 'Nhập email để nhận mã xác nhận'}
              {step === 2 && `Mã OTP đã gửi đến ${email}`}
              {step === 3 && 'Tạo mật khẩu mới cho tài khoản'}
              {step === 4 && 'Mật khẩu đã được cập nhật'}
            </p>
          </div>

          {/* Progress steps */}
          {step < 4 && (
            <div className="px-8 pt-6">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map(s => (
                  <React.Fragment key={s}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      s < step ? 'bg-green-500 text-white'
                        : s === step ? 'bg-amber-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {s < step ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : s}
                    </div>
                    {s < 3 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-colors ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">Email</span>
                <span className="text-xs text-gray-400">Xác nhận</span>
                <span className="text-xs text-gray-400">Mật khẩu</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="px-8 py-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* === STEP 1: Nhập email === */}
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email đã đăng ký</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input type="email" id="email" value={email}
                      onChange={e => { setEmail(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                      placeholder="you@example.com" required autoComplete="email" />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang gửi...
                    </>
                  ) : 'Gửi mã xác nhận'}
                </button>
              </form>
            )}

            {/* === STEP 2: Nhập OTP === */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                {/* Hint OTP (demo) */}
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-700 font-medium">💡 Demo — Mã OTP của bạn:</p>
                  <p className="text-lg font-mono font-bold text-amber-800 tracking-widest mt-1">{generatedOtp}</p>
                </div>

                <div>
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-1.5">Mã xác nhận (6 số)</label>
                  <input type="text" id="otp" value={otp}
                    onChange={e => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-center text-2xl font-mono tracking-[0.5em] font-bold"
                    placeholder="••••••" required maxLength={6} autoFocus />
                </div>

                <button type="submit" disabled={loading || otp.length !== 6}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang xác nhận...
                    </>
                  ) : 'Xác nhận'}
                </button>

                <div className="flex justify-between items-center text-sm">
                  <button type="button" onClick={() => { setStep(1); setOtp(''); setError(''); }}
                    className="text-gray-500 hover:text-gray-700 transition-colors">
                    ← Quay lại
                  </button>
                  <button type="button" onClick={handleResendOtp} disabled={loading}
                    className="text-amber-600 font-medium hover:text-amber-700 transition-colors disabled:opacity-50">
                    Gửi lại mã
                  </button>
                </div>
              </form>
            )}

            {/* === STEP 3: Đặt mật khẩu mới === */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">Mật khẩu mới</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input type="password" id="newPassword" value={newPassword}
                      onChange={e => { setNewPassword(e.target.value); setError(''); }}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm"
                      placeholder="Tối thiểu 6 ký tự" required autoComplete="new-password" />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">Xác nhận mật khẩu mới</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <input type="password" id="confirmPassword" value={confirmPassword}
                      onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm ${
                        confirmPassword && confirmPassword !== newPassword
                          ? 'border-red-300 bg-red-50'
                          : confirmPassword && confirmPassword === newPassword
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="Nhập lại mật khẩu mới" required autoComplete="new-password" />
                    {confirmPassword && confirmPassword === newPassword && (
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang cập nhật...
                    </>
                  ) : 'Đặt mật khẩu mới'}
                </button>
              </form>
            )}

            {/* === STEP 4: Thành công === */}
            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Đổi mật khẩu thành công!</h3>
                <p className="text-sm text-gray-500 mb-6">Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ.</p>
                <Link to="/login"
                  className="inline-block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all text-center">
                  Đăng nhập ngay
                </Link>
              </div>
            )}

            {/* Back to login */}
            {step < 4 && (
              <p className="text-center text-sm text-gray-500 mt-6">
                Nhớ mật khẩu rồi?{' '}
                <Link to="/login" className="text-amber-600 font-semibold hover:text-amber-700 hover:underline">
                  Đăng nhập
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
