document.addEventListener('DOMContentLoaded', () => {
    const $searchInput = document.getElementById('search-input');
    const $searchResults = document.getElementById('search-results');
  
    fetch('/search.xml')
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
  
        $searchInput.addEventListener('input', (e) => {
          const query = e.target.value.trim().toLowerCase();
          $searchResults.innerHTML = '';
  
          if (query.length > 1) {
            Array.from(items).forEach(item => {
              const title = item.querySelector('title').textContent;
              const content = item.querySelector('content').textContent;
              const url = item.querySelector('url').textContent;
              
              if (title.toLowerCase().includes(query) || content.toLowerCase().includes(query)) {
                const li = document.createElement('li');
                li.innerHTML = `
                  <a href="${url}">
                    <div class="search-result-title">${title}</div>
                    <div class="search-result-excerpt">${content.substring(0, 100)}...</div>
                  </a>
                `;
                $searchResults.appendChild(li);
              }
            });
          }
        });
      });
  });