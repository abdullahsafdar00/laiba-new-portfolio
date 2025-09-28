import React from 'react';

const LetsTalk = () => {
  const calUrl = import.meta.env.VITE_CAL_URL || 'https://cal.com/laiba-safdar';

  return (
    <section id="let-start" className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-2">Ready to start? Let’s talk</h2>
        <p className="text-sm text-gray-600 mb-6">Pick a convenient time below — this will create a booking via Cal.com.</p>

        <div className="w-full rounded-lg overflow-hidden border border-gray-100">
          <iframe
            src={calUrl}
            style={{ width: '100%', height: 700, border: 0 }}
            allow="camera; microphone; clipboard-read; clipboard-write"
            loading="lazy"
            title="Cal.com booking calendar"
          />
        </div>

       
      </div>
    </section>
  );
};

export default LetsTalk;
