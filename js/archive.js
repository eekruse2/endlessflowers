document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('archive-container');

  try {
    const res = await fetch('/api/archive');
    const archive = await res.json();

    if (!archive.length) {
      container.innerHTML = "<p>No items in archive yet.</p>";
      return;
    }

    archive.forEach(entry => {
  const item = document.createElement('div');
  item.style.marginBottom = '2rem';

  const img = document.createElement('img');
  img.src = entry.imageUrl;
  img.alt = "Archived Flower";
  img.style.maxWidth = "300px";

  const quote = document.createElement('p');
  quote.textContent = entry.quote;

  const date = document.createElement('small');
  date.textContent = `Saved on: ${entry.date}`;

  // ✅ Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️ Delete';
  deleteBtn.style.marginTop = '0.5rem';
  deleteBtn.style.display = 'block';

  deleteBtn.addEventListener('click', async () => {
    const confirmed = confirm('Are you sure you want to delete this archived flower?');

    if (confirmed) {
      try {
        const response = await fetch(`/api/archive?id=${entry._id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          item.remove(); // ✅ remove from page if deletion succeeds
        } else {
          alert('Failed to delete entry.');
        }
      } catch (err) {
        console.error('Error deleting entry:', err);
        alert('Network error while deleting.');
      }
    }
  });

  // Append all elements to the archive item container
  item.appendChild(img);
  item.appendChild(quote);
  item.appendChild(date);
  item.appendChild(deleteBtn); // ✅ add button to page

  // Append item to the main container
  container.appendChild(item);
});

  } catch (err) {
    console.error('Failed to load archive:', err);
    container.innerHTML = "<p>Error loading archive.</p>";
  }
});

