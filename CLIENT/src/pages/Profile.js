import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { mockAddresses, mockWishlist, mockProducts } from '../utils/mockData';

function Profile() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'password' | 'addresses' | 'wishlist'
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
  });

  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null); // null | 'new' | addressId
  const [addressForm, setAddressForm] = useState({
    label: '', fullName: '', phone: '', address: '', ward: '', district: '', city: '', zipCode: '', isDefault: false,
  });

  // Wishlist
  const [wishlist, setWishlist] = useState([]);

  // Load addresses & wishlist
  useEffect(() => {
    if (user) {
      setAddresses(mockAddresses.filter(a => a.userId === user.id));
      const userWishlist = mockWishlist.filter(w => w.userId === user.id);
      const wishlistWithProducts = userWishlist.map(w => ({
        ...w,
        product: mockProducts.find(p => p.id === w.productId),
      })).filter(w => w.product);
      setWishlist(wishlistWithProducts);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      await updateProfile(profileData);
      setEditing(false);
      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi cập nhật thông tin!' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp!' });
      return;
    }

    setSaving(true);
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi đổi mật khẩu!' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // === Address handlers ===
  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 400));

    if (editingAddress === 'new') {
      const newAddr = { ...addressForm, id: Date.now(), userId: user.id };
      if (newAddr.isDefault) {
        setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
      } else {
        setAddresses(prev => [...prev, newAddr]);
      }
      setMessage({ type: 'success', text: 'Thêm địa chỉ thành công!' });
    } else {
      setAddresses(prev => prev.map(a => {
        if (a.id === editingAddress) return { ...a, ...addressForm };
        if (addressForm.isDefault) return { ...a, isDefault: false };
        return a;
      }));
      setMessage({ type: 'success', text: 'Cập nhật địa chỉ thành công!' });
    }

    setEditingAddress(null);
    setAddressForm({ label: '', fullName: '', phone: '', address: '', ward: '', district: '', city: '', zipCode: '', isDefault: false });
    setSaving(false);
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr.id);
    setAddressForm({
      label: addr.label, fullName: addr.fullName, phone: addr.phone,
      address: addr.address, ward: addr.ward, district: addr.district,
      city: addr.city, zipCode: addr.zipCode, isDefault: addr.isDefault,
    });
    setMessage({ type: '', text: '' });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    setMessage({ type: 'success', text: 'Đã xóa địa chỉ!' });
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    setMessage({ type: 'success', text: 'Đã đặt làm địa chỉ mặc định!' });
  };

  // === Wishlist handlers ===
  const handleRemoveWishlist = (wishlistId) => {
    setWishlist(prev => prev.filter(w => w.id !== wishlistId));
    setMessage({ type: 'success', text: 'Đã xóa khỏi danh sách yêu thích!' });
  };

  if (!user) return null;

  // Lấy chữ cái đầu tên
  const initials = user.fullName
    ? user.fullName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const tabs = [
    { id: 'info', label: 'Thông tin cá nhân', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'password', label: 'Đổi mật khẩu', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )},
    { id: 'addresses', label: 'Sổ địa chỉ', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'wishlist', label: 'Yêu thích', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white/30">
              {initials}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
              <p className="text-green-100 flex items-center gap-1 justify-center sm:justify-start mt-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {user.email}
              </p>
              <p className="text-green-200 text-sm mt-1">
                Thành viên từ: {user.createdAt || 'N/A'}
              </p>
            </div>
            {/* Logout button */}
            <div className="sm:ml-auto">
              <button onClick={handleLogout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm flex items-center gap-2 ${
          message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {message.type === 'success' ? (
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {tabs.map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMessage({ type: '', text: '' }); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                }`}>
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-md p-6">

            {/* === TAB: Thông tin cá nhân === */}
            {activeTab === 'info' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Thông tin cá nhân</h2>
                  {!editing && (
                    <button onClick={() => setEditing(true)}
                      className="px-4 py-2 text-sm font-medium text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Chỉnh sửa
                    </button>
                  )}
                </div>

                {editing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Họ và tên</label>
                        <input type="text" name="fullName" value={profileData.fullName} onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                        <input type="email" name="email" value={profileData.email} onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm cursor-not-allowed" disabled />
                        <p className="text-xs text-gray-400 mt-1">Email không thể thay đổi</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số điện thoại</label>
                        <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="0901234567" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Thành phố</label>
                        <input type="text" name="city" value={profileData.city} onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Tp. Hồ Chí Minh" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Địa chỉ</label>
                      <input type="text" name="address" value={profileData.address} onChange={handleProfileChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="123 Đường Lê Lợi" />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mã bưu điện</label>
                      <input type="text" name="zipCode" value={profileData.zipCode} onChange={handleProfileChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="70000" />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={saving}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2 text-sm">
                        {saving ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Đang lưu...
                          </>
                        ) : 'Lưu thay đổi'}
                      </button>
                      <button type="button" onClick={() => {
                        setEditing(false);
                        setProfileData({
                          fullName: user.fullName, email: user.email, phone: user.phone || '',
                          address: user.address || '', city: user.city || '', zipCode: user.zipCode || '',
                        });
                      }}
                        className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                        Huỷ bỏ
                      </button>
                    </div>
                  </form>
                ) : (
                  /* View mode */
                  <div className="space-y-4">
                    <InfoRow icon={<UserIcon />} label="Họ và tên" value={user.fullName} />
                    <InfoRow icon={<EmailIcon />} label="Email" value={user.email} />
                    <InfoRow icon={<PhoneIcon />} label="Số điện thoại" value={user.phone || '—'} />
                    <InfoRow icon={<AddressIcon />} label="Địa chỉ" value={user.address || '—'} />
                    <InfoRow icon={<CityIcon />} label="Thành phố" value={user.city || '—'} />
                    <InfoRow icon={<ZipIcon />} label="Mã bưu điện" value={user.zipCode || '—'} />
                  </div>
                )}
              </div>
            )}

            {/* === TAB: Đổi mật khẩu === */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-6">Đổi mật khẩu</h2>
                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mật khẩu hiện tại</label>
                    <input type="password" name="currentPassword"
                      value={passwordData.currentPassword} onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Nhập mật khẩu hiện tại" required autoComplete="current-password" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mật khẩu mới</label>
                    <input type="password" name="newPassword"
                      value={passwordData.newPassword} onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Tối thiểu 6 ký tự" required autoComplete="new-password" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Xác nhận mật khẩu mới</label>
                    <input type="password" name="confirmNewPassword"
                      value={passwordData.confirmNewPassword} onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Nhập lại mật khẩu mới" required autoComplete="new-password" />
                  </div>
                  <button type="submit" disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2 text-sm mt-2">
                    {saving ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Đang cập nhật...
                      </>
                    ) : 'Cập nhật mật khẩu'}
                  </button>
                </form>
              </div>
            )}

            {/* === TAB: Sổ địa chỉ === */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Sổ địa chỉ</h2>
                  {editingAddress === null && (
                    <button onClick={() => {
                      setEditingAddress('new');
                      setAddressForm({ label: '', fullName: '', phone: '', address: '', ward: '', district: '', city: '', zipCode: '', isDefault: false });
                      setMessage({ type: '', text: '' });
                    }}
                      className="px-4 py-2 text-sm font-medium text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Thêm địa chỉ
                    </button>
                  )}
                </div>

                {/* Address Form (Add/Edit) */}
                {editingAddress !== null && (
                  <form onSubmit={handleSaveAddress} className="mb-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-700 mb-4">
                      {editingAddress === 'new' ? '➕ Thêm địa chỉ mới' : '✏️ Chỉnh sửa địa chỉ'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Tên gợi nhớ</label>
                        <input type="text" name="label" value={addressForm.label} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="VD: Nhà riêng, Văn phòng..." required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Họ và tên người nhận</label>
                        <input type="text" name="fullName" value={addressForm.fullName} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="Nguyễn Văn A" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Số điện thoại</label>
                        <input type="tel" name="phone" value={addressForm.phone} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="0901234567" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Địa chỉ</label>
                        <input type="text" name="address" value={addressForm.address} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="Số nhà, đường..." required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Phường/Xã</label>
                        <input type="text" name="ward" value={addressForm.ward} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="Phường Bến Nghé" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Quận/Huyện</label>
                        <input type="text" name="district" value={addressForm.district} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="Quận 1" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Tỉnh/Thành phố</label>
                        <input type="text" name="city" value={addressForm.city} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="Tp. Hồ Chí Minh" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Mã bưu điện</label>
                        <input type="text" name="zipCode" value={addressForm.zipCode} onChange={handleAddressFormChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder="70000" />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 mt-4 cursor-pointer">
                      <input type="checkbox" name="isDefault" checked={addressForm.isDefault} onChange={handleAddressFormChange}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500" />
                      <span className="text-sm text-gray-700">Đặt làm địa chỉ mặc định</span>
                    </label>
                    <div className="flex gap-3 mt-5">
                      <button type="submit" disabled={saving}
                        className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 text-sm flex items-center gap-2">
                        {saving ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Đang lưu...
                          </>
                        ) : 'Lưu địa chỉ'}
                      </button>
                      <button type="button" onClick={() => setEditingAddress(null)}
                        className="px-5 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                        Huỷ bỏ
                      </button>
                    </div>
                  </form>
                )}

                {/* Address List */}
                {addresses.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="font-medium">Chưa có địa chỉ nào</p>
                    <p className="text-sm mt-1">Thêm địa chỉ giao hàng để đặt hàng nhanh hơn</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map(addr => (
                      <div key={addr.id}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          addr.isDefault ? 'border-green-300 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-gray-800">{addr.label}</span>
                              {addr.isDefault && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                  Mặc định
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 font-medium">{addr.fullName}</p>
                            <p className="text-sm text-gray-500">{addr.phone}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {addr.address}
                              {addr.ward && `, ${addr.ward}`}
                              {addr.district && `, ${addr.district}`}
                              {addr.city && `, ${addr.city}`}
                              {addr.zipCode && ` - ${addr.zipCode}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                            {!addr.isDefault && (
                              <button onClick={() => handleSetDefaultAddress(addr.id)}
                                title="Đặt mặc định"
                                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            <button onClick={() => handleEditAddress(addr)}
                              title="Chỉnh sửa"
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            {!addr.isDefault && (
                              <button onClick={() => handleDeleteAddress(addr.id)}
                                title="Xoá"
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* === TAB: Yêu thích === */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Sản phẩm yêu thích</h2>
                  <span className="text-sm text-gray-500">{wishlist.length} sản phẩm</span>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <p className="font-medium">Chưa có sản phẩm yêu thích</p>
                    <p className="text-sm mt-1">Hãy thêm sản phẩm vào danh sách để theo dõi</p>
                    <Link to="/products"
                      className="inline-block mt-4 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all text-sm">
                      Khám phá sản phẩm
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map(item => {
                      const product = mockProducts.find(p => p._id === item.productId || p.id === item.productId);
                      if (!product) return null;
                      return (
                        <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all group">
                          {/* Product Image */}
                          <Link to={`/products/${product._id || product.id}`} className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                              {product.image || product.images?.[0] ? (
                                <img src={product.image || product.images[0]} alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </Link>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <Link to={`/products/${product._id || product.id}`}
                              className="text-sm font-semibold text-gray-800 hover:text-green-600 transition-colors line-clamp-2">
                              {product.name}
                            </Link>

                            {/* Rating */}
                            {product.rating && (
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} className={`w-3.5 h-3.5 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                      fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-400">({product.rating})</span>
                              </div>
                            )}

                            {/* Price */}
                            <div className="mt-1">
                              <span className="text-base font-bold text-green-600">
                                {(product.price || 0).toLocaleString('vi-VN')}₫
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xs text-gray-400 line-through ml-2">
                                  {product.originalPrice.toLocaleString('vi-VN')}₫
                                </span>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 mt-2">
                              <Link to={`/products/${product._id || product.id}`}
                                className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors">
                                Xem chi tiết
                              </Link>
                              <button onClick={() => handleRemoveWishlist(item.id)}
                                className="px-3 py-1 bg-red-50 text-red-500 text-xs font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Bỏ thích
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* ======== Helper Components ======== */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-800 font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function AddressIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CityIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function ZipIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );
}

export default Profile;
