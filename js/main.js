console.log("✔️ main.js loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const img     = document.getElementById('daily-flower');
  const quoteEl = document.getElementById('daily-quote');

const quotes = [
  "“Love is the silent symphony that plays between two hearts.” – Unknown",
  "“In the garden of the heart, love is the most radiant flower.” – Unknown",
  "“Love is the art of two souls painting a shared masterpiece.” – Unknown",
  "“Where love grows, miracles blossom.” – Unknown",
  "“Love is the map that leads us home, no matter how far we roam.” – Unknown",
  "“To love deeply is to see the divine in another.” – Unknown",
  "“Love is the thread that weaves our stories into eternity.” – Unknown",
  "“When love speaks, even silence listens.” – Unknown",
  "“Love is the compass that guides us through life's storms.” – Unknown",
  "“In the echo of love, we hear the sound of eternity.” – Unknown",
  "“Love is the light that turns shadows into stars.” – Unknown",
  "“With love in your heart, every journey becomes a homecoming.” – Unknown",
  "“Love is the key that unlocks the treasures of the soul.” – Unknown",
  "“Love's whisper is louder than any shout.” – Unknown",
  "“To love is to give wings to another's dreams.” – Unknown",
  "“Love is the spark that kindles the fire of hope.” – Unknown",
  "“Love writes its story in the ink of the heart.” – Unknown",
  "“The heartbeat of love is the music of the universe.” – Unknown",
  "“Love is the breeze that carries joy to our soul.” – Unknown",
  "“In love's embrace, we find our truest selves.” – Unknown",
  "“Love is the sunrise that banishes the night.” – Unknown",
  "“Where love flows, life flourishes.” – Unknown",
  "“Love is the bridge between fear and freedom.” – Unknown",
  "“In every love story, we write a poem with our lives.” – Unknown",
  "“Love's gentle touch can heal the deepest wounds.” – Unknown",
  "“To be loved is to breathe a kindness that lasts forever.” – Unknown",
  "“Love is the dance of two hearts beating as one.” – Unknown",
  "“Where love is planted, joy takes root.” – Unknown",
  "“Love is the candle that lights the darkest path.” – Unknown",
  "“In the silence of love, we discover our voice.” – Unknown",
  "“Love is the gift we give when we give our all.” – Unknown",
  "“To love is to discover infinity in another's gaze.” – Unknown",
  "“Love turns ordinary moments into timeless treasures.” – Unknown",
  "“The fragrance of love lingers long after the moment passes.” – Unknown",
  "“Love is the foundation on which dreams are built.” – Unknown",
  "“In love's mirror, we see our best reflection.” – Unknown",
  "“Love is the heartbeat that echoes through the ages.” – Unknown",
  "“To love without measure is to touch the divine.” – Unknown",
  "“Love writes songs no composer can replicate.” – Unknown",
  "“In every act of love, we find a piece of ourselves.” – Unknown",
  "“Love is the lighthouse that guides us through the dark.” – Unknown",
  "“With love, the ordinary becomes extraordinary.” – Unknown",
  "“Love is a flame that never fades.” – Unknown",
  "“In love’s light, shadows dissolve.” – Unknown",
  "“Love is the answer to questions we never knew we asked.” – Unknown",
  "“To love is to embrace the beautiful mystery.” – Unknown",
  "“Love is the melody that lingers long after the song ends.” – Unknown",
  "“In the presence of love, wounds turn to wisdom.” – Unknown",
  "“Love is the tapestry of moments woven together.” – Unknown",
  "“To love is to walk hand in hand with forever.” – Unknown",
  "“Love is the fire that warms the coldest heart.” – Unknown",
  "“In loving, we find our true courage.” – Unknown",
  "“Love is the whisper that drowns out doubt.” – Unknown",
  "“To love is to see with the heart's eyes.” – Unknown",
  "“Love is the poem our souls recite each day.” – Unknown",
  "“In the glow of love, all things shine brighter.” – Unknown",
  "“Love is the heartbeat of our humanity.” – Unknown",
  "“To love is to be gently undone.” – Unknown",
  "“Love writes its own timeless tale.” – Unknown",
  "“In love's embrace, time stands still.” – Unknown",
  "“Love is the river that flows without end.” – Unknown",
  "“To love is to set another free.” – Unknown",
  "“Love is the essence of every prayer.” – Unknown",
  "“In love, we find our greatest strength.” – Unknown",
  "“Love is the canvas where dreams paint themselves.” – Unknown",
  "“To love is to discover the divine in every moment.” – Unknown",
  "“Love is the currency that enriches every soul.” – Unknown",
  "“In love’s glow, we see the world anew.” – Unknown",
  "“Love is the seed from which joy grows.” – Unknown",
  "“To love is to become fearless in the face of uncertainty.” – Unknown",
  "“Love is the melody that binds our hearts.” – Unknown",
  "“In love’s garden, all seasons are spring.” – Unknown",
  "“Love is the compass that points us to hope.” – Unknown",
  "“To love is to feel the pulse of the universe.” – Unknown",
  "“Love is the breath that animates our being.” – Unknown",
  "“In the poetry of love, every line is a promise.” – Unknown",
  "“Love is the echo of eternity within us.” – Unknown",
  "“To love is to stand in the light of another soul.” – Unknown",
  "“Love is the gift that needs no wrapping.” – Unknown",
  "“In love's eyes, we are all beautiful.” – Unknown",
  "“Love is the journey home to ourselves.” – Unknown",
  "“To love is to know the language of the heart.” – Unknown",
  "“Love is the music that plays in silence.” – Unknown",
  "“In every heartbeat of love, we find hope.” – Unknown",
  "“Love is the infinite in a finite moment.” – Unknown",
  "“To love is to witness the miracle of life.” – Unknown",
  "“Love is the anchor in life’s stormy seas.” – Unknown",
  "“In love's warmth, every winter melts.” – Unknown",
  "“Love is the key to unlock every heart.” – Unknown",
  "“To love is to embrace the beauty of imperfection.” – Unknown",
  "“Love is the silent promise that never fades.” – Unknown",
  "“In the symphony of life, love is the crescendo.” – Unknown",
  "“Love is the silent pact between two souls.” – Unknown",
  "“To love is to open windows in another's soul.” – Unknown",
  "“Love is the spark that ignites every sunrise.” – Unknown",
  "“In love's presence, the ordinary glows.” – Unknown",
  "“Love is the mirror that reflects our best selves.” – Unknown",
  "“To love is to dance without music.” – Unknown",
  "“Love is the art of finding beauty in another.” – Unknown",
  "“In the embrace of love, we find our truest home.” – Unknown"
];

  function msUntilMidnight() {
    const now  = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return next.getTime() - now.getTime();
  }

  async function update() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;

    try {
      const res = await fetch(`/api/flower?day=${dayOfYear}`);
      const data = await res.json();

      if (!data.photos || !data.photos.length) throw new Error("No photos found");

      const imageUrl = data.photos[0].src.large;
      img.src = imageUrl;
      img.alt = "Flower of the Day";
      quoteEl.textContent = quotes[quoteIndex];
      console.log("Showing:", imageUrl, "— Quote:", quoteEl.textContent);
    } catch (err) {
      console.error("Failed to load flower image:", err);
    }
  }

  update(); // show immediately

  const DAY_MS = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    update();                             // first nightly update
    setInterval(update, DAY_MS);          // then every 24h
  }, msUntilMidnight());

  // ✅ ADDITION: Save to Archive logic
  const saveBtn = document.getElementById('save-to-archive'); // Make sure this button exists in your HTML

  if (saveBtn) {
    saveBtn.addEventListener('click', async () => {
      const messageInput = document.getElementById('archive-message'); // Get the textarea
      const archiveEntry = {
        date: new Date().toISOString().split('T')[0],
        imageUrl: img.src,
        quote: quoteEl.textContent,
        messageEl: messageInput ? messageInput.value : '' // ← ADD THIS LINE
      };
try {
  const response = await fetch('/api/archive', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(archiveEntry)
  });

  if (response.ok) {
    alert('Saved to shared archive!');
  } else {
    alert('Failed to save to archive.');
  }
} catch (err) {
  console.error("Error saving to archive:", err);
  alert('Network error when saving.');
}

 
    });
  }
});

