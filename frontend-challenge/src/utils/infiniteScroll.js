export const infiniteScroll = (callback, threshold = 100) => {
  let debounceTimeout;

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + threshold >= document.documentElement.offsetHeight) {
      if (debounceTimeout) clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        callback();
      }, 200);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};
