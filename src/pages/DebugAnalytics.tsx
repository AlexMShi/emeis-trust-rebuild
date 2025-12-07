import { useState, useEffect } from 'react';
import { Copy, Trash2, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredEvents, clearStoredEvents, exportEventsAsJson, AnalyticsEvent } from '@/lib/analytics';

const DebugAnalytics = () => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setEvents(getStoredEvents());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportEventsAsJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all analytics events?')) {
      clearStoredEvents();
      setEvents([]);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([exportEventsAsJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emeis-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredEvents = filter
    ? events.filter(e => 
        e.event.toLowerCase().includes(filter.toLowerCase()) ||
        e.page.toLowerCase().includes(filter.toLowerCase()) ||
        JSON.stringify(e.properties).toLowerCase().includes(filter.toLowerCase())
      )
    : events;

  const eventsByType = filteredEvents.reduce((acc, e) => {
    acc[e.event] = (acc[e.event] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-semibold text-foreground">
              Analytics Debug
            </h1>
            <p className="text-muted-foreground">
              View and export tracked events
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy JSON'}
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="destructive" onClick={handleClear}>
              <Trash2 className="h-4 w-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="card-trust p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Events</p>
            <p className="text-3xl font-bold text-foreground">{events.length}</p>
          </div>
          <div className="card-trust p-6">
            <p className="text-sm text-muted-foreground mb-1">Unique Event Types</p>
            <p className="text-3xl font-bold text-foreground">{Object.keys(eventsByType).length}</p>
          </div>
          <div className="card-trust p-6">
            <p className="text-sm text-muted-foreground mb-1">Latest Event</p>
            <p className="text-lg font-medium text-foreground truncate">
              {events[events.length - 1]?.event || 'None'}
            </p>
          </div>
        </div>

        {/* Event Type Breakdown */}
        <div className="card-trust p-6 mb-8">
          <h2 className="font-semibold text-foreground mb-4">Event Types</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(eventsByType)
              .sort((a, b) => b[1] - a[1])
              .map(([event, count]) => (
                <button
                  key={event}
                  onClick={() => setFilter(filter === event ? '' : event)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === event
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {event} ({count})
                </button>
              ))}
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter events..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Events List */}
        <div className="card-trust overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No events recorded yet. Interact with the site to see events here.
              </div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-card border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Event</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Page</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Properties</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Experiments</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.slice().reverse().map((event) => (
                    <tr key={event.id} className="border-b border-border hover:bg-secondary/30">
                      <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
                          {event.event}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-foreground">{event.page}</td>
                      <td className="p-4 text-sm text-muted-foreground font-mono text-xs max-w-xs truncate">
                        {event.properties ? JSON.stringify(event.properties) : '-'}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground font-mono text-xs">
                        {event.experimentVariants 
                          ? Object.entries(event.experimentVariants).map(([k, v]) => `${k}:${v}`).join(', ')
                          : '-'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugAnalytics;
