'use client';

import { useState } from 'react';
import { Save, Bell, Lock, Palette, User } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and application preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id ? 'border-orange text-orange' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-orange/10 flex items-center justify-center text-orange text-3xl font-bold">
                JD
              </div>
              <div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-gray-500">Super Admin</p>
                <button className="mt-2 text-sm text-orange hover:underline">Change Avatar</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input type="tel" defaultValue="+251911223344" className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <input type="text" defaultValue="Super Administrator" disabled className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50" />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="flex items-center gap-2 px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === 'notifications' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email updates about property approvals</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Get instant alerts for new pending properties</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-gray-500">Stay informed about new orders and payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-orange after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input type="password" placeholder="Enter current password" className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input type="password" placeholder="Enter new password" className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <button className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">Update Password</button>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data</p>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">Delete Account</button>
            </div>
          </div>
        )}

        {/* Appearance Settings */}
        {activeTab === 'appearance' && (
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-orange">Light</button>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg">Dark</button>
                <button className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-900 text-gray-900 rounded-lg">System</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Accent Color</label>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-orange border-2 border-white shadow"></button>
                <button className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow"></button>
                <button className="w-10 h-10 rounded-full bg-green-600 border-2 border-white shadow"></button>
                <button className="w-10 h-10 rounded-full bg-purple-600 border-2 border-white shadow"></button>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange-600">Save Preferences</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}