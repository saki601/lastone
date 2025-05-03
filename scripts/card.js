const latestEntries = {};

    function toggleEdit(section) {
      const native = document.getElementById(section + 'Native');
      const broiler = document.getElementById(section + 'Broiler');
      const by = document.getElementById(section + 'By');
      const btn = document.getElementById(section + 'Btn');

      if (btn.innerText === 'Update') {
        native.disabled = false;
        broiler.disabled = false;
        by.disabled = false;
        btn.innerText = 'Save';
      } else {
        const nativeVal = native.value;
        const broilerVal = broiler.value;
        const byVal = by.value;
        const date = new Date().toLocaleDateString();

        if (!nativeVal || !broilerVal || !byVal) {
          alert('Please fill all fields before saving.');
          return;
        }

        const table = document.getElementById('dataTable');
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = section.charAt(0).toUpperCase() + section.slice(1);
        newRow.insertCell(1).innerText = nativeVal;
        newRow.insertCell(2).innerText = broilerVal;
        newRow.insertCell(3).innerText = byVal;
        newRow.insertCell(4).innerText = date;

        if (!latestEntries[section] || new Date(latestEntries[section].date) < new Date(date)) {
          latestEntries[section] = { native: nativeVal, broiler: broilerVal, date };
          updateDisplayBoard();
        }

        native.disabled = true;
        broiler.disabled = true;
        by.disabled = true;
        btn.innerText = 'Update';

        native.value = '';
        broiler.value = '';
        by.value = '';
      }
    }

    function filterTable() {
      const dateInput = document.getElementById('searchInput').value.toLowerCase();
      const categoryInput = document.getElementById('categoryFilter').value.toLowerCase();
      const table = document.getElementById('dataTable');
      const rows = table.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        const dateText = rows[i].cells[4].textContent.toLowerCase();
        const categoryText = rows[i].cells[0].textContent.toLowerCase();

        const matchDate = dateText.includes(dateInput);
        const matchCategory = !categoryInput || categoryText === categoryInput;

        rows[i].style.display = matchDate && matchCategory ? '' : 'none';
      }
    }

    function updateDisplayBoard() {
      const board = document.getElementById('displayBoardList');
      board.innerHTML = '';
      for (const [category, data] of Object.entries(latestEntries)) {
        const li = document.createElement('li');
        li.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${data.native}N / ${data.broiler}B on ${data.date}`;
        board.appendChild(li);
      }
    }
