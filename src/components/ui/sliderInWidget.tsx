"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SlideInWidget = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 一定時間後に表示する
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // 3秒後に表示

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  // 閉じる処理
  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`fixed bottom-5 left-5 transition-transform duration-500 ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="bg-white p-4 rounded-lg flex items-center space-x-3 ">
        {/* アイコン */}
        <Image src="/handshake.png" alt="Icon" width={40} height={40} />
        
        {/* メッセージ */}
        <p className="text-sm font-semibold">Professional Travel Planner helps you plan your next trip</p>

        {/* 閉じるボタン */}
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          
        </button>
      </div>
    </div>
  );
};

export default SlideInWidget;
