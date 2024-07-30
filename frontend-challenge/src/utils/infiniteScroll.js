export const infiniteScroll = (callback, threshold = 100) => {
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + threshold < document.documentElement.offsetHeight) return;
    callback();
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};
