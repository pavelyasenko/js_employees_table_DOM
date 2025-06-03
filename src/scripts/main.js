'use strict';

// #region value
const tbody = document.querySelector('tbody');
const headers = document.querySelectorAll('th');
const body = document.querySelector('body');

// #endregion

// #region clickSort
headers.forEach((header, columIndex) => {
  header.addEventListener('click', (e) => {
    const originalRows = [...tbody.querySelectorAll('TH')];
    const rows = [...originalRows];

    rows.sort((rowA, rowB) => {
      const firsttColum = rowA.children[columIndex].textContent.trim();
      const secondColum = rowB.children[columIndex].textContent.trim();

      const firstColumnWithoutSymbols = firsttColum.replace(/[$,]/g, '');
      const secondColumnWithoutSymbols = secondColum.replace(/[$,]/g, '');

      if (
        !isNaN(firstColumnWithoutSymbols) &&
        !isNaN(secondColumnWithoutSymbols)
      ) {
        return firstColumnWithoutSymbols - secondColumnWithoutSymbols;
      } else {
        return firsttColum.localeCompare(secondColum);
      }
    });

    const isAlreadySorted = originalRows.every((row, i) => row === rows[i]);

    if (isAlreadySorted) {
      rows.reverse();
    }

    rows.forEach((row) => tbody.appendChild(row));
  });
});
// #endregion

// #region newForm
const form = document.createElement('form');

form.setAttribute('class', 'new-employee-form');

form.innerHTML = `
  <label>
    Name: <input name="name" type="text" data-qa="name" />
  </label>
  <label>
    Position: <input name="position" type="text" data-qa="position" />
  </label>
  <label>
    Age: <input name="age" type="number" data-qa="age" />
  </label>
  <label>
    Salary: <input name="salary" type="number" data-qa="salary" />
  </label>
  <label>
    Office:
    <select name="office" data-qa="office">
      <option value="">Select office</option>
      <option value="New York">New York</option>
      <option value="London">London</option>
      <option value="Tokyo">Tokyo</option>
      <option value="Sydney">Sydney</option>
    </select>
  </label>
  <button type="submit">Отправить</button>
`;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const namee = formData.get('name').trim();
  const position = formData.get('position').trim();
  const age = Number(formData.get('age'));
  const salary = Number(formData.get('salary'));
  const office = formData.get('office');

  if (!namee || !position || !age || !salary || !office) {
    // eslint-disable-next-line no-undef
    showNotification('All fields are required.', 'error');

    return;
  }

  if (namee.length < 4) {
    // eslint-disable-next-line no-undef
    showNotification('Name must be at least 4 characters long.', 'error');

    return;
  }

  if (age < 18 || age > 90) {
    // eslint-disable-next-line no-undef
    showNotification('Age must be between 18 and 90.', 'error');

    return;
  }

  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td>${namee}</td>
    <td>${position}</td>
    <td>${age}</td>
    <td>$${salary.toLocaleString()}</td>
    <td>${office}</td>
  `;

  tbody.appendChild(newRow);
  // eslint-disable-next-line no-undef
  enableRowSelection();
  // eslint-disable-next-line no-undef
  showNotification('Employee added successfully.', 'success');
  form.reset();
});

body.appendChild(form);
// #endregion

// #region rowSelection
const tr = tbody.querySelectorAll('tr');

tr.forEach((TrRow) => {
  TrRow.addEventListener('click', () => {
    tr.forEach((r) => r.classList.remove('active'));
    TrRow.classList.add('active');
  });
});
// #endregion
