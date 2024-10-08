"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Notice {
  id: number;
  user: string;
  title: string;
  body: string;
  tag: string | null;
}

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    axios.get<Notice[]>('/api/notices').then(response => {
      setNotices(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">お知らせ一覧</h1>
      <ul>
        {notices.map(notice => (
          <li key={notice.id} className="mb-2 border p-4 bg-gray-50">
            <h2 className="text-xl font-semibold">{notice.title}</h2>
            <p className="text-gray-800">{notice.user}</p>
            <p>{notice.body}</p>
            {notice.tag && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{notice.tag}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}