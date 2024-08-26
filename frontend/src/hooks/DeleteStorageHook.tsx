"use client";

import { useEffect } from "react";

export default function DeleteStorageHook() {
  useEffect(() => {
    localStorage.removeItem('seeRepliesId');
    localStorage.removeItem('seeRepliesContent');
    localStorage.removeItem('seeRepliesUsername');

    localStorage.removeItem('replyingTweetId');
    localStorage.removeItem('replyingTweetContent');
    localStorage.removeItem('replyingTweetUsername');
  }, [])

  return null;
}