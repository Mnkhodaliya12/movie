import React from 'react';
import AdminLayout from '../components/AdminLayout.jsx';

function AdminDashboard() {
  const stats = [
    { label: 'Total Movies', value: '1,248', trend: '+12 this week' },
    { label: 'Active Users', value: '3,572', trend: '+4.3% vs last week' },
    { label: 'Favorites Saved', value: '18,903', trend: '+382 today' },
  ];

  const recentActivity = [
    { id: 1, user: 'User-1432', action: 'Added "Inception" to favorites', time: '2 min ago' },
    { id: 2, user: 'User-0871', action: 'Searched for "Spider-Man"', time: '6 min ago' },
    { id: 3, user: 'User-2210', action: 'Viewed "Interstellar" details', time: '10 min ago' },
    { id: 4, user: 'User-3328', action: 'Cleared all favorites', time: '18 min ago' },
  ];

  const systemHealth = [
    { name: 'API Latency', value: '142 ms', status: 'Good' },
    { name: 'Error Rate', value: '0.4%', status: 'Warning' },
    { name: 'Cache Hit Rate', value: '91%', status: 'Good' },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Monitor movies, user activity, and system health for the Movies Hub platform."
    >
      {/* Header actions inside card */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="text-xs text-slate-500">Overview of platform metrics</div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button className="rounded-full bg-orange-500 px-4 py-1.5 font-medium text-white shadow-sm shadow-orange-500/40 hover:bg-orange-400">
            Add movie
          </button>
          <button className="rounded-full border border-slate-200 px-4 py-1.5 font-medium text-slate-600 hover:bg-slate-50">
            Export data
          </button>
        </div>
      </div>

      {/* Stats and activity in light cards */}
      <div className="space-y-6 px-4 py-4 md:px-6 md:py-5">
        {/* Top stats */}
        <section className="grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {item.value}
              </p>
              <p className="mt-1 text-xs text-emerald-600">
                {item.trend}
              </p>
            </div>
          ))}
        </section>

        {/* Activity and system health */}
        <section className="grid gap-6 items-start lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Recent activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.7rem] text-slate-600">
                Live stream
              </span>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 py-2.5">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.user}</p>
                    <p className="mt-0.5 text-slate-500">{item.action}</p>
                  </div>
                  <p className="whitespace-nowrap text-[0.7rem] text-slate-500">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* System health */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">System health</h2>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px] shadow-emerald-500/20" />
            </div>
            <ul className="space-y-2 text-xs">
              {systemHealth.map((metric) => (
                <li
                  key={metric.name}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-slate-900">{metric.name}</p>
                    <p className="text-[0.7rem] text-slate-500">{metric.status}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{metric.value}</p>
                </li>
              ))}
            </ul>
            <p className="text-[0.7rem] text-slate-500">
              Data shown here is mocked for UI purposes. Hook this up to your real monitoring
              or analytics service when ready.
            </p>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
