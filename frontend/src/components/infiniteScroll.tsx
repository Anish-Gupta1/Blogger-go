import React, { useEffect, useRef, ReactNode } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ children, onLoadMore, hasMore, isLoading }) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <>
      {children}
      {(hasMore || isLoading) && (
        <div ref={observerTarget} className="h-10 flex items-center justify-center">
          {isLoading && <div className="loader"></div>}
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;

