import React from 'react';
import Layout from '@theme/Layout';

export default function Hello() {
  return (
    <Layout title="Hello" description="Hello React Page">
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe 
            src="https://www.loom.com/embed/f00bb49768b249f9a4359f5971631cbb?sid=8f6ac82f-4b76-43a6-a086-04ec3a6405bd" 
            frameBorder="0" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
        </iframe>
      </div>
    </Layout>
  );
}