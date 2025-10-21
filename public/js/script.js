
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const categoryFilter = document.getElementById('category-filter');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      populateCategories(talks);
      renderSchedule(talks);
    });

  function populateCategories(talks) {
    const categories = new Set();
    talks.forEach(talk => {
      talk.category.forEach(cat => categories.add(cat));
    });
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });
  }

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date('2025-10-21T10:00:00');

    talksToRender.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      const talkElement = document.createElement('div');
      talkElement.classList.add('accordion-item');
      talkElement.innerHTML = `
        <h2 class="accordion-header" id="heading-${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
            ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: ${talk.title}
          </button>
        </h2>
        <div id="collapse-${index}" class="accordion-collapse collapse" aria-labelledby="heading-${index}" data-bs-parent="#schedule">
          <div class="accordion-body">
            <p><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
            <p><strong>Category:</strong> ${talk.category.join(', ')}</p>
            <p>${talk.description}</p>
          </div>
        </div>
      `;
      scheduleContainer.appendChild(talkElement);

      currentTime = new Date(endTime.getTime() + 10 * 60000); // 10 minute break

      if (index === 1) { // Lunch break after the second talk
        const lunchTime = new Date(currentTime);
        currentTime = new Date(currentTime.getTime() + 60 * 60000); // 1 hour lunch
        const lunchElement = document.createElement('div');
        lunchElement.classList.add('alert', 'alert-info');
        lunchElement.textContent = `${lunchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: Lunch Break`;
        scheduleContainer.appendChild(lunchElement);
      }
    });
  }

  categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory === 'all') {
      renderSchedule(talks);
    } else {
      const filteredTalks = talks.filter(talk => talk.category.includes(selectedCategory));
      renderSchedule(filteredTalks);
    }
  });
});


