const API_URL ='https://health-tracker-ykxw.onrender.com/api/health';

const form = document.getElementById('healthForm');
const historyTable = document.getElementById('historyTable');

/* DATE */

const today = new Date();

document.getElementById('todayDate').innerText =
  today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

/* FORM SUBMIT */

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const data = {

    date: document.getElementById('date').value,

    weight: document.getElementById('weight').value,

    steps: document.getElementById('steps').value,

    water: document.getElementById('water').value,

    sleep: document.getElementById('sleep').value,

    calories: document.getElementById('calories').value,

    mood: document.getElementById('mood').value,

    notes: document.getElementById('notes').value,
  };

  try {

    await fetch(API_URL, {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)

    });

    form.reset();

    loadData();

  } catch (error) {

    console.log(error);

  }

});

/* LOAD DATA */

async function loadData() {

  try {

    const response = await fetch(API_URL);

    const entries = await response.json();

    historyTable.innerHTML = '';

    if (entries.length > 0) {

      const latest = entries[0];

      animateValue('stepsCard', latest.steps || 0);

      animateValue('waterCard', latest.water || 0);

      animateValue('sleepCard', latest.sleep || 0);

      animateValue('calorieCard', latest.calories || 0);

      document.getElementById('moodCard').innerText =
        getMoodEmoji(latest.mood);

    }

    entries.forEach(entry => {

      historyTable.innerHTML += `

      <tr>

        <td>${formatDate(entry.date)}</td>

        <td>${entry.weight} kg</td>

        <td>${entry.steps}</td>

        <td>${entry.water}</td>

        <td>${entry.sleep} hrs</td>

        <td>${entry.calories}</td>

        <td>${getMoodEmoji(entry.mood)}</td>

      </tr>

      `;

    });

  } catch (error) {

    console.log(error);

  }

}

/* FORMAT DATE */

function formatDate(dateString){

  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {

    day:'numeric',
    month:'short',
    year:'numeric'

  });

}

/* MOOD EMOJIS */

function getMoodEmoji(mood){

  if(!mood) return '🙂';

  mood = mood.toLowerCase();

  if(mood.includes('happy')) return '😊';

  if(mood.includes('sad')) return '😔';

  if(mood.includes('angry')) return '😡';

  if(mood.includes('tired')) return '🥱';

  if(mood.includes('excited')) return '🤩';

  return '🙂';

}

/* CARD ANIMATION */

function animateValue(id, value){

  let start = 0;

  const duration = 700;

  const increment = value / (duration / 16);

  const element = document.getElementById(id);

  const timer = setInterval(() => {

    start += increment;

    if(start >= value){

      start = value;

      clearInterval(timer);

    }

    element.innerText = Math.floor(start);

  },16);

}

/* INITIAL LOAD */

loadData();

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker
      .register('./sw.js')

      .then(() => console.log('PWA Loaded'));

  });

}