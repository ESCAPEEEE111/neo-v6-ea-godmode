import React, { useState, useEffect } from 'react';
import { Shield, Users, MessageSquare, TrendingUp, Eye, Mail, Calendar, Settings, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const AdminDashboard = ({ className = "" }) => {
  const [analytics, setAnalytics] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      
      // Load analytics
      const analyticsResponse = await fetch(`${backendUrl}/api/analytics/summary`);
      const analyticsData = await analyticsResponse.json();
      if (analyticsData.success) {
        setAnalytics(analyticsData.data);
      }

      // Load recent contacts
      const contactsResponse = await fetch(`${backendUrl}/api/contact?limit=10`);
      const contactsData = await contactsResponse.json();
      setContacts(Array.isArray(contactsData) ? contactsData : []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setIsLoading(false);
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        // Refresh contacts
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
    }
  };

  const exportData = async (type) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      let endpoint = '';
      
      switch (type) {
        case 'contacts':
          endpoint = '/api/contact';
          break;
        case 'analytics':
          endpoint = '/api/analytics/summary';
          break;
        default:
          return;
      }

      const response = await fetch(`${backendUrl}${endpoint}`);
      const data = await response.json();
      
      // Create and download CSV
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}_export_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: Eye },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-orange-500';
      case 'converted': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-black text-matrix-green p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin text-matrix-green">
            <RefreshCw className="w-8 h-8" />
          </div>
          <span className="ml-2 font-mono">LOADING_ADMIN_MATRIX...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-matrix-green p-6 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-matrix-green matrix-text-glow" />
            <div>
              <h1 className="text-3xl font-bold font-mono matrix-text-glow">ADMIN_MATRIX</h1>
              <p className="text-matrix-green/60 font-mono">NOWHERE_DIGITAL_CONTROL_PANEL</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => loadDashboardData()}
              className="bg-matrix-green text-black hover:bg-matrix-green/80 font-mono"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              REFRESH
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-6 bg-black/50 p-1 rounded-lg border border-matrix-green/20">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-matrix-green text-black shadow-matrix'
                  : 'text-matrix-green hover:bg-matrix-green/10'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-matrix-green font-mono flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  PAGE_VIEWS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-matrix-green font-mono">
                  {analytics?.today?.page_views || 0}
                </div>
                <p className="text-matrix-green/60 text-sm font-mono">Today</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-matrix-green font-mono flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  CONTACTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-matrix-green font-mono">
                  {analytics?.total?.contacts || 0}
                </div>
                <p className="text-matrix-green/60 text-sm font-mono">Total</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-matrix-green font-mono flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  CHAT_SESSIONS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-matrix-green font-mono">
                  {analytics?.total?.chat_sessions || 0}
                </div>
                <p className="text-matrix-green/60 text-sm font-mono">Total</p>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-matrix-green/30 hover:border-matrix-green transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-matrix-green font-mono flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  BOOKINGS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-matrix-green font-mono">
                  {analytics?.total?.bookings || 0}
                </div>
                <p className="text-matrix-green/60 text-sm font-mono">Total</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-black/50 border-matrix-green/30">
            <CardHeader>
              <CardTitle className="text-matrix-green font-mono">RECENT_CONTACTS</CardTitle>
              <CardDescription className="text-matrix-green/60 font-mono">
                Latest inquiries from the matrix
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.slice(0, 5).map((contact, index) => (
                  <div key={contact.id || index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-matrix-green/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="font-mono font-semibold text-matrix-green">
                          {contact.name}
                        </div>
                        <Badge className={`${getStatusColor(contact.status)} text-white font-mono text-xs`}>
                          {contact.status?.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-matrix-green/60 font-mono">
                        {contact.email} | {contact.service?.replace('_', ' ').toUpperCase()}
                      </div>
                      <div className="text-xs text-matrix-green/40 font-mono mt-1">
                        {contact.message?.substring(0, 80)}...
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateContactStatus(contact.id, 'contacted')}
                        className="border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 font-mono text-xs"
                      >
                        CONTACT
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-matrix-green font-mono">CONTACT_MANAGEMENT</h2>
            <Button
              onClick={() => exportData('contacts')}
              className="bg-matrix-green text-black hover:bg-matrix-green/80 font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              EXPORT
            </Button>
          </div>

          <Card className="bg-black/50 border-matrix-green/30">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/50 border-b border-matrix-green/30">
                    <tr className="text-matrix-green font-mono text-sm">
                      <th className="p-4 text-left">NAME</th>
                      <th className="p-4 text-left">EMAIL</th>
                      <th className="p-4 text-left">SERVICE</th>
                      <th className="p-4 text-left">STATUS</th>
                      <th className="p-4 text-left">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={contact.id || index} className="border-b border-matrix-green/10 hover:bg-matrix-green/5">
                        <td className="p-4 font-mono text-matrix-green">{contact.name}</td>
                        <td className="p-4 font-mono text-matrix-green/80">{contact.email}</td>
                        <td className="p-4 font-mono text-matrix-green/80">{contact.service?.replace('_', ' ').toUpperCase()}</td>
                        <td className="p-4">
                          <Badge className={`${getStatusColor(contact.status)} text-white font-mono text-xs`}>
                            {contact.status?.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact.id, 'contacted')}
                              className="border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 font-mono text-xs"
                            >
                              CONTACT
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateContactStatus(contact.id, 'qualified')}
                              className="border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 font-mono text-xs"
                            >
                              QUALIFY
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-matrix-green font-mono">ANALYTICS_MATRIX</h2>
            <Button
              onClick={() => exportData('analytics')}
              className="bg-matrix-green text-black hover:bg-matrix-green/80 font-mono"
            >
              <Download className="w-4 h-4 mr-2" />
              EXPORT
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-matrix-green/30">
              <CardHeader>
                <CardTitle className="text-matrix-green font-mono">TODAY_METRICS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Page Views:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.today?.page_views || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Contact Forms:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.today?.contact_forms || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Chat Sessions:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.today?.chat_sessions || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Bookings:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.today?.bookings || 0}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/50 border-matrix-green/30">
              <CardHeader>
                <CardTitle className="text-matrix-green font-mono">TOTAL_METRICS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Total Contacts:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.total?.contacts || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Total Bookings:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.total?.bookings || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Chat Sessions:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.total?.chat_sessions || 0}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <span className="font-mono text-matrix-green">Portfolio Items:</span>
                  <span className="font-mono font-bold text-matrix-green">{analytics?.total?.portfolio_items || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-matrix-green font-mono">SYSTEM_SETTINGS</h2>
          
          <Card className="bg-black/50 border-matrix-green/30">
            <CardHeader>
              <CardTitle className="text-matrix-green font-mono">MATRIX_CONFIGURATION</CardTitle>
              <CardDescription className="text-matrix-green/60 font-mono">
                System configuration and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-black/30 rounded-lg border border-matrix-green/20">
                <div className="font-mono text-matrix-green mb-2">SYSTEM_STATUS:</div>
                <div className="text-sm font-mono text-matrix-green/80">
                  ✓ Backend API: OPERATIONAL<br />
                  ✓ Database: CONNECTED<br />
                  ✓ AI Services: ACTIVE<br />
                  ✓ Email Services: CONFIGURED
                </div>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg border border-matrix-green/20">
                <div className="font-mono text-matrix-green mb-2">MATRIX_VERSION:</div>
                <div className="text-sm font-mono text-matrix-green/80">
                  NOWHERE_DIGITAL_v2.0.0<br />
                  MATRIX_ENHANCED_BUILD
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;