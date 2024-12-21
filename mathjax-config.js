window.MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    font: 'TeX', 
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"]
  },
  startup: {
    typeset: false,
  }
};
const renderTeXInTweets = () => {
  const tweets = document.querySelectorAll("article div[lang]");
  tweets.forEach((tweet) => {
    const text = tweet.textContent;
    if (text.includes("```tex") && text.includes("```")) {
      const start = text.indexOf("```tex") + 6;
      const end = text.indexOf("```", start);
      const texContent = text.substring(start, end).trim();
      if (!tweet.querySelector(".mathjax-rendered")) {
        const texContainer = document.createElement("div");
        texContainer.className = "mathjax-rendered";
        texContainer.innerHTML = `\\( ${texContent} \\)`;
        tweet.innerHTML = tweet.innerHTML.replace(
          text.substring(start - 6, end + 3), ""
        );
        tweet.appendChild(texContainer);
        MathJax.typesetPromise();
        console.log("tex")
      }
    }
  });
};
  
setInterval(() => renderTeXInTweets(), 500)