// Drop <GlobalPolishStyles /> once anywhere in your app (e.g. in App.jsx,
// alongside <ScrollProgressBar /> and <Navbar />). It injects global CSS —
// no wrapper markup, renders nothing visible itself.
const GlobalPolishStyles = () => (
  <style>{`
    html {
      scroll-behavior: smooth;
    }

    /* Custom scrollbar — Chrome/Edge/Safari */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #060f26;
    }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #2d5fc4, #1a3a7c);
      border-radius: 10px;
      border: 2px solid #060f26;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #4a90d9, #2d5fc4);
    }

    /* Custom scrollbar — Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: #2d5fc4 #060f26;
    }
  `}</style>
)

export default GlobalPolishStyles