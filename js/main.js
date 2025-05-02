console.log("✔️ main.js loaded");

document.addEventListener('DOMContentLoaded', async () => {
  const img      = document.getElementById('daily-flower');
  const quoteEl  = document.getElementById('daily-quote');

  // build image list
  const res   = await fetch('flowers/');
  const text  = await res.text();
  const doc   = new DOMParser().parseFromString(text, 'text/html');
  const images = Array.from(doc.querySelectorAll('a'))
    .map(a => a.getAttribute('href'))
    .filter(name => /\.(jpe?g|png|gif|avif)$/i.test(name))
    .map(name => `flowers/${name}`);

  if (!images.length) {
    console.error("No images found in /flowers/");
    return;
  }

  // your quotes
 const quotes = [
  "“Love is composed of a single soul inhabiting two bodies.” – Aristotle",
  "“Where there is love there is life.” – Mahatma Gandhi",
  "“Love isn’t something you find. Love is something that finds you.” – Loretta Young",
  "“To love and be loved is to feel the sun from both sides.” – David Viscott",
  "“You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.” – Dr. Seuss",
  "“The best thing to hold onto in life is each other.” – Audrey Hepburn",
  "“Love recognizes no barriers.” – Maya Angelou",
  "“In dreams and in love there are no impossibilities.” – János Arany",
  "“Love is the bridge between you and everything.” – Rumi",
  "“At the touch of love everyone becomes a poet.” – Plato",
  "“Love is a friendship set to music.” – Joseph Campbell",
  "“To love oneself is the beginning of a lifelong romance.” – Oscar Wilde",
  "“Love does not consist in gazing at each other, but in looking outward together in the same direction.” – Antoine de Saint-Exupéry",
  "“We accept the love we think we deserve.” – Stephen Chbosky",
  "“True love stories never have endings.” – Richard Bach",
  "“Love is an irresistible desire to be irresistibly desired.” – Robert Frost",
  "“The giving of love is an education in itself.” – Eleanor Roosevelt",
  "“Love is the ultimate expression of the will to live.” – Tom Wolfe",
  "“Love is the only force capable of transforming an enemy into a friend.” – Martin Luther King Jr.",
  "“Love cures people—both the ones who give it and the ones who receive it.” – Karl A. Menninger",
  "“A flower cannot blossom without sunshine, and man cannot live without love.” – Max Müller",
  "“Love is light, that dissolves all walls between souls.” – unknown",
  "“Love is not only something you feel, it is something you do.” – David Wilkerson",
  "“Love’s greatest gift is its ability to make everything it touches sacred.” – Barbara De Angelis",
  "“To love and be loved is to feel the worth of everything.” – George Sand",
  "“Love is the magician that pulls man out of his own hat.” – Ben Hecht",
  "“Love is the poetry of the senses.” – Honoré de Balzac",
  "“The heart has its reasons which reason knows not of.” – Blaise Pascal",
  "“Love is the only gold.” – Alfred Lord Tennyson",
  "“Love is a canvas furnished by nature and embroidered by imagination.” – Voltaire",
  "“Love is a promise; love is a souvenir, once given never forgotten, never let it disappear.” – John Lennon",
  "“Love is a game that two can play and both win.” – Eva Gabor",
  "“Love is the flower you’ve got to let grow.” – John Lennon",
  "“Love is the rain that nourishes fire.” – Neil Gaiman",
  "“Love is just a word until someone comes along and gives it meaning.” – Paulo Coelho",
  "“Love is like war: easy to begin but very hard to stop.” – H. L. Mencken",
  "“Love is the master key that opens the gates of happiness.” – Oliver Wendell Holmes Sr.",
  "“Love is the greatest refreshment in life.” – Pablo Picasso",
  "“Love is a better teacher than duty.” – Albert Einstein",
  "“Love is an act of endless forgiveness.” – Peter Ustinov",
  "“Love is the only reality and it is not a mere sentiment.” – Rabindranath Tagore",
  "“Love makes your soul crawl out from its hiding place.” – Zora Neale Hurston",
  "“Love doesn’t make the world go ’round. Love is what makes the ride worthwhile.” – Franklin P. Jones",
  "“Love is the sweetest thing in all the world, and yet to love and be loved is a love too great.” – George Sand",
  "“Love is an endless mystery, for it has nothing else to explain it.” – Rabindranath Tagore",
  "“Love is a string of moments stitched together with hope.” – unknown",
  "“Love is not a matter of counting the years, but making the years count.” – Michelle St. Amand",
  "“Love is seeing yourself in someone else, someone else in yourself.” – Oscar Wilde",
  "“Love is the light that brightens every heart that sees it.” – unknown"
];

  let idx = 0;
  function update() {
    img.src       = images[idx];
    img.alt       = `Flower #${idx + 1}`;
    quoteEl.textContent = quotes[idx % quotes.length];
    console.log("Showing:", images[idx], "— Quote:", quoteEl.textContent);
    idx = (idx + 1) % images.length;
  }

  // helper to compute ms until next local midnight
  function msUntilMidnight() {
    const now  = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return next.getTime() - now.getTime();
  }

  // 1) Show today’s image immediately
  update();

  // 2) In msUntilMidnight() ms, run update & then every 24h
  const DAY_MS = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    update();                             // first nightly update
    setInterval(update, DAY_MS);          // then every 24h
  }, msUntilMidnight());
});

