document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('archive-container');

  // ✅ Setup modal elements and state
  const modal = document.getElementById('delete-modal');              // Modal container
  const confirmBtn = document.getElementById('confirm-delete');       // "Yes, delete" button
  const cancelBtn = document.getElementById('cancel-delete');         // "Cancel" button
  let pendingDelete = null;                                           // Will store { id, item }

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
      item.appendChild(quote); // ✅ Don't forget this
      if (entry.message && entry.message.trim()) {
        const messageEl = document.createElement('p');
        messageEl.textContent = `💬 ${entry.message}`;
        messageEl.style.fontStyle = 'italic';
        messageEl.style.marginTop = '0.25rem';
        item.appendChild(messageEl); // ✅ Append message to item
      }
      const date = document.createElement('small');
      date.textContent = `Saved on: ${entry.date}`;

      // ✅ Add delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️ Delete';
      deleteBtn.style.marginTop = '0.5rem';
      deleteBtn.style.display = 'block';

      // ✅ When user clicks delete, show the modal and store this entry
      deleteBtn.addEventListener('click', () => {
        pendingDelete = { id: entry._id, item };   // Save reference for later
        modal.classList.remove('hidden');          // Show the modal
      });

      // Append all elements to the archive item container
      item.appendChild(img);
      item.appendChild(quote);
      item.appendChild(date);
      item.appendChild(deleteBtn); // ✅ add delete button

      // Append the whole item to the archive container
      container.appendChild(item);
    });

    // ✅ Confirm delete: send DELETE request and remove item from page
    confirmBtn.addEventListener('click', async () => {
      if (!pendingDelete) return;

      try {
        const response = await fetch(`/api/archive?id=${pendingDelete.id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          pendingDelete.item.remove(); // Remove element from page
        } else {
          alert('Failed to delete entry.');
        }
      } catch (err) {
        console.error('Error deleting entry:', err);
        alert('Network error while deleting.');
      }

      modal.classList.add('hidden'); // Hide modal
      pendingDelete = null;          // Reset delete state
    });

    // ✅ Cancel delete: hide modal and clear state
    cancelBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      pendingDelete = null;
    });

  } catch (err) {
    console.error('Failed to load archive:', err);
    container.innerHTML = "<p>Error loading archive.</p>";
  }
});


