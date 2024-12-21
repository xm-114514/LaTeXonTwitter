const loadMathJax = () => {
  return new Promise(async (resolve, reject) => {
    const getScript = async (name) => {
      const url = chrome.runtime.getURL(name);
      console.log(`Loading script: ${url}`);
      return url; 
    };

    try {
      const configScript = document.createElement("script");
      configScript.src = await getScript("mathjax-config.js");
      configScript.async = false; 
      configScript.onload = () => {
        console.log("MathJax config loaded");
      };
      configScript.onerror = (err) => {
        console.error("Failed to load MathJax config", err);
        reject(err);
      };
      document.head.appendChild(configScript);

      const mathjaxScript = document.createElement("script");
      mathjaxScript.src = await getScript("math-jax/es5/tex-mml-chtml.js");
      mathjaxScript.async = true;
      mathjaxScript.onload = () => {
        console.log("MathJax loaded successfully.");
        resolve();
      };
      mathjaxScript.onerror = (err) => {
        console.error("Failed to load MathJax", err);
        reject(err);
      };
      document.head.appendChild(mathjaxScript);
    } catch (err) {
      console.error("Error loading scripts", err);
      reject(err);
    }
  });
};

loadMathJax()
  .then(() => {
    console.log("MathJax loaded and initialized.");
  })
  .catch((err) => console.error("Error initializing MathJax:", err));
